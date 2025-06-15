global class solidifyUtil {
    
    public static Boolean runOnce = true;
        
    
    public void onAfterUpdate(map<Id, Proposal__c> mapNewProposal, map<Id, Proposal__c> mapOldProposal){
        Update [SELECT Id, Name FROM Proposal__c WHERE Id IN: mapNewProposal.keyset()];
        solidifyUtil.runOnce = true;
        System.debug('Is After Update');
    }
    //interest rates are always taken as Annual Rate
    //Number of payments or term are always in Months
    
    //return remaining balance of loan after numberPayments has been made
    
    global class balanceInputs {
        @InvocableVariable (required=true)
        global decimal loanAmt;
        @InvocableVariable (required=true)
        global decimal interestRate;
        @InvocableVariable (required=true)
        global integer numberPayments;
        @InvocableVariable (required=true)
        global decimal Payment;
    }
    
    @invocableMethod
    global static list<decimal> balance(List<balanceInputs> inputs){
        list<decimal> returnList = new list<decimal>();
        for (balanceInputs i:inputs){
        decimal d = solidifyUtil.balance(i.loanAmt, i.interestRate, i.numberPayments, i.payment);
        returnList.add(d);
        }
        return returnList;
    }
    
    
    global static decimal balance(decimal loanAmt, decimal interestRate, integer numberPayments, decimal payment ){
		decimal monthlyI = interestRate/12/100;
        decimal bal = ( loanAmt * (1 + monthlyI).pow(numberPayments) ) - ( (payment/monthlyI)*( (1+monthlyI).pow(numberPayments) -1) );
        return bal.setScale(2);
    }
    
    @AuraEnabled
    global static decimal payment(decimal loanAmt, decimal annualInterestRate, integer termYrs){
        decimal monthlyI = annualInterestRate/1200;
        decimal payment = ( loanAmt *( monthlyI) ) / ( 1- (1/( 1 + monthlyI).pow(termYrs*12)) );
        return payment.setScale(2);
    }

    global static decimal pmt(decimal loanAmt, decimal annualInterestRate, integer termMos){
        decimal monthlyI = annualInterestRate/1200;
        decimal payment = ( loanAmt *( monthlyI) ) / ( 1- (1/( 1 + monthlyI).pow(termMos)) );
        return payment.setScale(2);
    }

    global static integer numberPayments(decimal loanAmt, decimal annualInterestRate, decimal payment){
        decimal monthlyI = annualInterestRate/12/100;
        system.debug(monthlyI);
        decimal numberPayments = ((-1* math.log(1-(monthlyI*loanAmt/payment))) / math.log(1 + monthlyI)).round(System.RoundingMode.HALF_UP);
        integer n = integer.ValueOf(numberPayments);
        system.debug( numberPayments );
        return n;
        
    }
    
    global static String abbreviateMailingState (String mailingState){
        string state = mailingState.deleteWhitespace().toLowerCase();
       	List<StateCode__mdt> code = [SELECT DeveloperName, Abbreviation__c FROM StateCode__mdt WHERE DeveloperName = :state LIMIT 1 ];
        
        if(code.size()>0){
            return code[0].Abbreviation__c;
        } else {
            return mailingState;
        }
    }
    @AuraEnabled
    global static decimal getBreakevenPayment(decimal finalResultBase, decimal finalResultComp, decimal loanAmtBase, decimal loanAmtComp,
                                              decimal termMos, decimal rateBase, decimal rateComp, decimal closingCostBase, decimal closingCostComp){
        Decimal pmtBase = finalResultBase;
        Decimal pmtComp = finalResultComp;      
        system.debug('Payment Base: ' + pmtBase);
        system.debug('Payment Comp: ' + pmtComp);
        decimal breakeven = 0;
        
        Decimal currBalBase = loanAmtBase;
        Decimal currBalComp = loanAmtComp;
        Decimal cumIntPaidBase = 0;
        Decimal cumIntPaidComp = 0;
        for(Integer i=1; i<=TermMos; i++){
			double currIntPaidBase = rateBase*currBalBase/100/12;
            double currPrincBase = pmtBase - currIntPaidBase;
            currBalBase = currBalBase - currPrincBase;
            cumIntPaidBase = cumIntPaidBase + currIntPaidBase;
            system.debug( (currBalBase+currPrincBase).round() + ' | ' + currIntPaidBase.round() + ' | ' + cumIntPaidBase.round() + ' | ' + (cumIntPaidBase+closingCostBase).round());
            
            double currIntPaidComp = rateComp*currBalComp/100/12;
            double currPrincComp = pmtComp - currIntPaidComp;
            currBalComp = currBalComp - currPrincComp;
            cumIntPaidComp = cumIntPaidComp + currIntPaidComp; 
            system.debug( (currBalComp+currPrincComp).round() + ' | ' + currIntPaidComp.round() + ' | ' + cumIntPaidComp.round() +  ' | ' + (cumIntPaidComp+ closingCostComp).round()  );
            if( (cumIntPaidComp+closingCostComp) <= (cumIntPaidBase+closingCostBase) ){
                breakeven = i;
                system.debug('Breakeven: ' + i);
                break;
            }
        }
        
        return breakeven;
        
    }
    
    @auraEnabled
    global static decimal APR(){
        Decimal APR;
        return APR;
		        
    }

    global static decimal effectiveRate(Decimal termYears, decimal payment, decimal loanAmount, decimal startingInterest){
        Decimal guess = startingInterest/1200;
        if(termYears >0 && loanAmount > 0 && payment > 0) {

            //Finding interest give PV and FV is a trial-and-error process.  We start with a guess value, and keep calculating
            //until we (hopefully) get convergence on a rate
            // see https://xplaind.com/764715/interest-rate
            //FV =  
            Double periods = termYears * 12;
            Decimal present = loanAmount;
            Decimal future = 0;
            

            //somewhat randomly, we're going to assign an upper and lower bound within logical possible interest rates
            Double upperBound = (Double)24/1200;
            system.debug(upperBound);
            Double lowerBound = (Double)1/1200;
            
            //limit iterations in case the sequence does not converge
            for(Integer i=0;i<250;i++){
                //Calculate FV, which should approach 0
                //FV = PV × (1 + rate)^nper - payment × [(1 + rate)^nper - 1)/rate]
                system.debug(guess);
                future = (loanAmount * math.pow(Double.valueOf(1+guess), periods) - (payment * (math.pow(Double.valueOf(1+guess), periods) -1 )/guess)).setScale(2);
                system.debug('guess:' + guess + ' FV:'+ future);
                Decimal newGuess;

                if(future>0){
                    //interest rate has an inverse relationship to FV, so since FV is too high, we need to reduce
                    //our guess - pick on half way between current and lowest.  Set this guess as the new upper bound 
                    newGuess = (guess+lowerBound)/2;
                    upperBound = guess;
                } else if(future<0){
                    //FV is too low so we need to increase guess - halfway between current and highest
                    system.debug(upperBound);
                    system.debug((upperBound+guess)/2);
                    newGuess = (guess+upperBound)/2;
                    lowerBound = guess;
                } else if (future == 0){
                    return (guess*1200).setScale(3);
                }
                guess = newGuess;
            }
           
        }

        return (guess*1200).setScale(3);
    }


    
}