/**
* Created By : Pamela White 6/28/2022
* Description: Perform calculations on Proposal object for Rate Analysis
* 
* Test Class: ProposalTriggerTest
* Class Dependencies: 
* 
* 


* Change Log:
* 5/26/2022 by Pamela White - change source of order shipping fields to include custom line1, line2
*/

public class solidifyRateAnalysisCalcs {
    
    public static list<Proposal__c> beforeCalcs(LIst<Proposal__c> proposals){
        for(Proposal__c newProposal: proposals){
           
            system.debug('Before trig loan Amount: ' + newProposal.New_Loan_Amount__c);

            //adj calc
            Decimal gpa = (newProposal.Global_Pricing_Adjuster__c != null) ? newProposal.Global_Pricing_Adjuster__c : 0;
            Decimal price1 = (newProposal.Price_1__c != null) ? newProposal.Price_1__c : 0;
            Decimal price2 = (newProposal.Price_2__c != null) ? newProposal.Price_2__c : 0;
            Decimal price3 = (newProposal.Price_3__c != null) ? newProposal.Price_3__c : 0;
            Decimal price4 = (newProposal.Price_4__c != null) ? newProposal.Price_4__c : 0;
            Decimal price5 = (newProposal.Price_5__c != null) ? newProposal.Price_5__c : 0;
            Decimal price6 = (newProposal.Price_6__c != null) ? newProposal.Price_6__c : 0;
            Decimal adj1 = gpa + price1;
            Decimal adj2 = gpa + price2;
            Decimal adj3 = gpa + price3;
            Decimal adj4 = gpa + price4;
            Decimal adj5 = gpa + price5;
            Decimal adj6 = gpa + price6;
            //newProposal.Adj_Price_1__c = adj1;
            newProposal.Adj_Price_2__c = adj2;
            newProposal.Adj_Price_3__c = adj3;
            newProposal.Adj_Price_4__c = adj4;
            newProposal.Adj_Price_5__c = adj5;
            newProposal.Adj_Price_6__c = adj6;

            //enter 30 if term is null
			newProposal.Fixed_Term_Years__c = (newProposal.Fixed_Term_Years__c!=null) ?  newProposal.Fixed_Term_Years__c : 30;

            //set zeros if null
            Decimal estTitle = (newProposal.Est_Fees_Title_Escrow__c != null) ? newProposal.Est_Fees_Title_Escrow__c : 0;
            Decimal estLender = (newProposal.Est_Fees_Lender__c != null) ? newProposal.Est_Fees_Lender__c : 0;
            Decimal estCredit = (newProposal.Est_Fees_Appraisal_Credit__c != null) ? newProposal.Est_Fees_Appraisal_Credit__c : 0;
            Decimal standardFees = estTitle + estLender + estCredit;

            Decimal loanAmount = (newProposal.New_Loan_Amount__c != null) ? newProposal.New_Loan_Amount__c : 0;
            Decimal origFee = (newProposal.Origination_Fee__c != null) ? newProposal.Origination_Fee__c : 0;
            Decimal origValBase = loanAmount * origFee/100;
            Decimal origVal = 0;

            //set comp overrides & Origination fee
            if(newProposal.Override_Comp__c){
                if(origValBase < newProposal.Override_Min__c){
                	origVal = newProposal.Override_Min__c;
            	}
            	else if(origValBase > newProposal.Override_Max__c){
                	origVal = newProposal.Override_Max__c;
            	}
            } else {
                origVal = origValBase;
            }
            
            newProposal.Orig__c = origVal;
            
            Decimal rateCost1 = origVal + (adj1/100)*loanAmount;
            Decimal rateCost2 = origVal + (adj2/100)*loanAmount;
            Decimal rateCost3 = origVal + (adj3/100)*loanAmount;
            Decimal rateCost4 = origVal + (adj4/100)*loanAmount;
            Decimal rateCost5 = origVal + (adj5/100)*loanAmount;
            Decimal rateCost6 = origVal + (adj6/100)*loanAmount;
            
            Decimal totalCost1 = standardFees + origVal + ((adj1 / 100) * loanAmount);
            Decimal totalCost2 = standardFees + origVal + ((adj2 / 100) * loanAmount);
            Decimal totalCost3 = standardFees + origVal + ((adj3 / 100) * loanAmount);
            Decimal totalCost4 = standardFees + origVal + ((adj4 / 100) * loanAmount);
            Decimal totalCost5 = standardFees + origVal + ((adj5 / 100) * loanAmount);
            Decimal totalCost6 = standardFees + origVal + ((adj6 / 100) * loanAmount);


            if(newProposal.Add_Fees_to_Loan_Balance__c == 'Yes'){
                System.debug('@@@ totalCost1: ' + totalCost1);
                System.debug('@@@ adj1/100: ' + adj1/100);
                System.debug('@@@ origFee: ' + origFee/100);
                
              //If fees are included, Cost is the Total Cost as without Fees + Total Cost * (rate + Org )
  				Decimal totalCostNew1 = totalCost1 * (1+origFee/100+(adj1/100));
                Decimal totalCostNew2 = totalCost2 + (1+origFee/100+(adj2/100));
                Decimal totalCostNew3 = totalCost3 + (1+origFee/100+(adj3/100));
                Decimal totalCostNew4 = totalCost4 + (1+origFee/100+(adj4/100));
                Decimal totalCostNew5 = totalCost5 + (1+origFee/100+(adj5/100));
                Decimal totalCostNew6 = totalCost6 + (1+(adj6/100));
                newProposal.Total_Cost_1__c = totalCostNew1;
                newProposal.Total_Cost_2__c = totalCostNew2;
                newProposal.Total_Cost_3__c = totalCostNew3;
                newProposal.Total_Cost_4__c = totalCostNew4;
                newProposal.Total_Cost_5__c = totalCostNew5;
                newProposal.Total_Cost_6__c = totalCostNew6;
               	newProposal.RateCost1__c  = totalCostNew1-standardFees;
               	newProposal.RateCost2__c  = totalCostNew2-standardFees;
               	newProposal.RateCost3__c  = totalCostNew3-standardFees;
               	newProposal.RateCost4__c  = totalCostNew4-standardFees;
               	newProposal.RateCost5__c  = totalCostNew5-standardFees;
               	newProposal.RateCost6__c  = totalCostNew6-standardFees;
                
                newProposal.Total_Loan_Amount1__c = newProposal.New_Loan_Amount__c + newProposal.Total_Cost_1__c;
                newProposal.Total_Loan_Amount2__c = newProposal.New_Loan_Amount__c + newProposal.Total_Cost_2__c;
                newProposal.Total_Loan_Amount3__c = newProposal.New_Loan_Amount__c + newProposal.Total_Cost_3__c;
                newProposal.Total_Loan_Amount4__c = newProposal.New_Loan_Amount__c + newProposal.Total_Cost_4__c;
                newProposal.Total_Loan_Amount5__c = newProposal.New_Loan_Amount__c + newProposal.Total_Cost_5__c;
                newProposal.Total_Loan_Amount6__c = newProposal.New_Loan_Amount__c + newProposal.Total_Cost_6__c;

            }
            else if(newProposal.Add_Fees_to_Loan_Balance__c == 'No'){
     
                newProposal.RateCost1__c = rateCost1;
                newProposal.RateCost2__c = rateCost2;
                newProposal.RateCost3__c = rateCost3;
                newProposal.RateCost4__c = rateCost4;
                newProposal.RateCost5__c = rateCost5;
                newProposal.RateCost6__c = rateCost6;
                
                newProposal.Total_Cost_1__c = totalCost1;
                newProposal.Total_Cost_2__c = totalCost2;
                newProposal.Total_Cost_3__c = totalCost3;
                newProposal.Total_Cost_4__c = totalCost4;
                newProposal.Total_Cost_5__c = totalCost5;
                newProposal.Total_Cost_6__c = totalCost6;

                newProposal.Total_Loan_Amount1__c = newProposal.New_Loan_Amount__c;
                newProposal.Total_Loan_Amount2__c = newProposal.New_Loan_Amount__c;
                newProposal.Total_Loan_Amount3__c = newProposal.New_Loan_Amount__c;
                newProposal.Total_Loan_Amount4__c = newProposal.New_Loan_Amount__c;
                newProposal.Total_Loan_Amount5__c = newProposal.New_Loan_Amount__c;
                newProposal.Total_Loan_Amount6__c = newProposal.New_Loan_Amount__c;
            }
        }
        return proposals;
    }


    public static void afterCalcs(List<String> proposalIds){

        system.debug('solidifyRateAnalysisCalcs');
        List<Proposal__c> rateProposals = [SELECT Id, Fixed_Term_Years__c, Rate_1__c, Rate_2__c, Rate_3__c,
                                           Rate_4__c, Rate_5__c, Rate_6__c,
                                           Monthly_PI_Pmt1__c, Monthly_PI_Pmt2__c, Monthly_PI_Pmt3__c, Monthly_PI_Pmt4__c, 
                                           Monthly_PI_Pmt5__c, Monthly_PI_Pmt6__c,
                                           Total_Cost_1__c, Total_Cost_2__c, Total_Cost_3__c, Total_Cost_4__c,
                                           Total_Cost_5__c, Total_Cost_6__c,
                                           Total_Loan_Amount1__c, Total_Loan_Amount2__c, Total_Loan_AMount3__c,
                            			   Total_Loan_Amount4__c, Total_Loan_Amount5__c, Total_Loan_Amount6__c, 
                                           Add_FFMIP_To_Loan__c, New_Loan_Amount__c, APR1__c, APR2__c, APR3__c, APR4__c,
                                           APR5__c, APR6__c, Add_Fees_To_Loan_Balance__c,
                                           MI_Percent__c, MI_CancelAtPercent__c,
                                           FFMIP1__c, FFMIP2__c, FFMIP3__c, FFMIP4__c, FFMIP5__c, FFMIP6__c,
                            			   TotalLoanWithFFMIP1__c, TotalLoanWIthFFMIP2__c, TotalLoanWithFFMIP3__c, TotalLoanWithFFMIP4__c,
                           				   TotalLoanWithFFMIP5__c, TotalLoanWithFFMIP6__c FROM Proposal__c 
                                           WHERE Id IN :proposalIds];
        
        For(Proposal__c p: rateProposals){
        //calculate PI Payment
    	Double totalLoanAmount1 = p.Add_FFMIP_To_Loan__c ? p.TotalLoanWithFFMIP1__c : p.Total_Loan_Amount1__c ;
    	Double totalLoanAmount2 = p.Add_FFMIP_To_Loan__c ? p.TotalLoanWithFFMIP2__c : p.Total_Loan_Amount2__c ;
    	Double totalLoanAmount3 = p.Add_FFMIP_To_Loan__c ? p.TotalLoanWithFFMIP3__c : p.Total_Loan_Amount3__c ;
    	Double totalLoanAmount4 = p.Add_FFMIP_To_Loan__c ? p.TotalLoanWithFFMIP4__c : p.Total_Loan_Amount4__c ;
    	Double totalLoanAmount5 = p.Add_FFMIP_To_Loan__c ? p.TotalLoanWithFFMIP5__c : p.Total_Loan_Amount5__c ;
    	Double totalLoanAmount6 = p.Add_FFMIP_To_Loan__c ? p.TotalLoanWithFFMIP6__c : p.Total_Loan_Amount6__c;


		system.debug('Payment inputs: ' + totalLoanAmount1 + ':' + p.Rate_1__c + ':' + p.Fixed_Term_Years__c);
     	if(p.Total_Loan_Amount1__c != NULL && p.Fixed_Term_Years__c != NULL && p.Rate_1__c != NULL) {    
        	p.Monthly_PI_Pmt1__c = solidifyUtil.payment(totalLoanAmount1, p.Rate_1__c, integer.valueOf(p.Fixed_Term_Years__c)); 
	     }
	     if(p.Total_Loan_Amount2__c != NULL && p.Fixed_Term_Years__c != NULL && p.Rate_2__c != NULL) {    
    	    p.Monthly_PI_Pmt2__c = solidifyUtil.payment(totalLoanAmount2, p.Rate_2__c, integer.valueOf(p.Fixed_Term_Years__c));
   	 	}
     	if(p.Total_Loan_Amount3__c != NULL && p.Fixed_Term_Years__c != NULL && p.Rate_3__c != NULL) {
        	p.Monthly_PI_Pmt3__c = solidifyUtil.payment(totalLoanAmount3, p.Rate_3__c, integer.valueOf(p.Fixed_Term_Years__c));
     	}
     	if(p.Total_Loan_Amount4__c != NULL && p.Fixed_Term_Years__c != NULL && p.Rate_4__c != NULL) {
        	p.Monthly_PI_Pmt4__c = solidifyUtil.payment(totalLoanAmount4, p.Rate_4__c, integer.valueOf(p.Fixed_Term_Years__c));
     	}
     	if(p.Total_Loan_Amount5__c != NULL && p.Fixed_Term_Years__c != NULL && p.Rate_5__c != NULL) {
        	p.Monthly_PI_Pmt5__c = solidifyUtil.payment(TotalLoanAmount5, p.Rate_5__c, integer.valueOf(p.Fixed_Term_Years__c));
     	}
     	if(p.Total_Loan_Amount6__c != NULL && p.Fixed_Term_Years__c != NULL && p.Rate_6__c != NULL) {
        	p.Monthly_PI_Pmt6__c = solidifyUtil.payment(totalLoanAmount6, p.Rate_6__c, integer.valueOf(p.Fixed_Term_Years__c));
     	}

        //calculate Breakeven
        system.debug('Payments: ' + p.Monthly_PI_Pmt1__c + ':' + p.Monthly_PI_Pmt1__c + ':' +p.Monthly_PI_Pmt2__c + ':' +p.Monthly_PI_Pmt3__c + ':' +p.Monthly_PI_Pmt4__c + ':' +p.Monthly_PI_Pmt5__c + ':' +p.Monthly_PI_Pmt6__c + ':');
        Decimal terms = p.Fixed_Term_Years__c*12;

        Decimal totalCostBase = p.Total_Cost_6__c>0 ? p.Total_Cost_6__c:0;

        p.Years_Until_BE1__c = solidifyUtil.getBreakevenPayment(p.Monthly_PI_Pmt6__c, p.Monthly_PI_Pmt1__c, totalLoanAmount6, totalLoanAmount1, 
                                                                    terms, p.Rate_6__c, p.Rate_1__c, totalCostBase, p.Total_Cost_1__c);
        
        p.Years_Until_BE2__c = solidifyUtil.getBreakevenPayment(p.Monthly_PI_Pmt6__c, p.Monthly_PI_Pmt2__c, totalLoanAmount6, totalLoanAmount2, 
                                                                    terms, p.Rate_6__c, p.Rate_2__c, totalCostBase, p.Total_Cost_2__c);
        
        p.Years_Until_BE3__c = solidifyUtil.getBreakevenPayment(p.Monthly_PI_Pmt6__c, p.Monthly_PI_Pmt3__c, totalLoanAmount6, totalLoanAmount3, 
                                                                    terms, p.Rate_6__c, p.Rate_3__c, totalCostBase, p.Total_Cost_3__c);
        
        p.Years_Until_BE4__c = solidifyUtil.getBreakevenPayment(p.Monthly_PI_Pmt6__c, p.Monthly_PI_Pmt4__c, totalLoanAmount6, totalLoanAmount4, 
                                                                    terms, p.Rate_6__c, p.Rate_4__c, totalCostBase , p.Total_Cost_4__c);
        
        p.Years_Until_BE5__c = solidifyUtil.getBreakevenPayment(p.Monthly_PI_Pmt6__c, p.Monthly_PI_Pmt5__c, totalLoanAmount6, totalLoanAmount5, 
                                                                    terms, p.Rate_6__c, p.Rate_5__c, totalCostBase , p.Total_Cost_5__c);

        //Present value for purposes of the effecitve rate calculation is the 
        //total loan (with or without fees) minus the fees.  
                                                                    
        Double pv1 = totalLoanAmount1 - p.Total_Cost_1__c - p.ffMIP1__c;
        Double pv2 = totalLoanAmount2 - p.Total_Cost_2__c - p.ffMIP2__c;
        Double pv3 = totalLoanAmount3 - p.Total_Cost_3__c - p.ffMIP3__c;
        Double pv4 = totalLoanAmount4 - p.Total_Cost_4__c - p.ffMIP4__c;
        Double pv5 = totalLoanAmount5 - p.Total_Cost_5__c - p.ffMIP5__c;
        system.debug(totalLoanAmount6+':'+p.Total_Cost_6__c+':'+p.ffMIP6__c);
        Double pv6 = totalLoanAmount6 - p.Total_Cost_6__c - p.ffMIP6__c;

        Double cancelPercent = (p.MI_CancelAtPercent__c == null || p.MI_CancelAtPercent__c == 0) ? 1: p.MI_CancelAtPercent__c/100 ; 
        Double MIPercent = p.MI_Percent__c==null ? 0: p.MI_Percent__c/100;
        Double monthlyMI = p.New_Loan_Amount__c*MIPercent/12;
        system.debug(MIPercent + ':' + cancelPercent + ':' + monthlyMI);
        Double payment1 = p.Monthly_PI_Pmt1__c + monthlyMI*(cancelPercent);
        Double payment2 = p.Monthly_PI_Pmt2__c + monthlyMI*(cancelPercent);
        Double payment3 = p.Monthly_PI_Pmt3__c + monthlyMI*(cancelPercent);
        Double payment4 = p.Monthly_PI_Pmt4__c + monthlyMI*(cancelPercent);
        Double payment5 = p.Monthly_PI_Pmt5__c + monthlyMI*(cancelPercent);
        Double payment6 = p.Monthly_PI_Pmt6__c + monthlyMI*(cancelPercent);

        
        //    global static decimal effectiveRate(Decimal termYears, decimal payment, decimal loanAmount, decimal startingInterest){
        system.debug(p.Fixed_Term_Years__c + ':' + payment1 + ':' + pv1 + ':' + p.Rate_1__c);
        p.APR1__c = solidifyUtil.effectiveRate(p.Fixed_Term_Years__c, payment1, pv1, p.Rate_1__c);
        p.APR2__c = solidifyUtil.effectiveRate(p.Fixed_Term_Years__c, payment2, pv2, p.Rate_2__c);
        p.APR3__c = solidifyUtil.effectiveRate(p.Fixed_Term_Years__c, payment3, pv3, p.Rate_3__c);
        p.APR4__c = solidifyUtil.effectiveRate(p.Fixed_Term_Years__c, payment4, pv4, p.Rate_4__c);
        p.APR5__c = solidifyUtil.effectiveRate(p.Fixed_Term_Years__c, payment5, pv5, p.Rate_5__c);
        p.APR6__c = solidifyUtil.effectiveRate(p.Fixed_Term_Years__c, payment6, pv6, p.Rate_6__c);
        }
        update rateProposals;

//        system.debug((solidifyUtil.effectiveRate(30.0, 2379.75, (413250.00-13033.00), 4.990 )));

    }

}