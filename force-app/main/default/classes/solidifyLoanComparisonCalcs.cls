//tested by ProposalTriggerTest
public class solidifyLoanComparisonCalcs {

    public static list<Proposal__c> beforeInsertCalcs (List<Proposal__c> proposals){

        List<String> oppIds = new List<String>();
        for(Proposal__c p: proposals){
            oppIds.add(p.Most_Recent_Loan__c);
        }

        Map<String, Opportunity> opps = new Map<String, Opportunity>([SELECT Id, Subject_Property_Name__c, ContactId, Loan_Originator_User__c, Current_Schedule_Balance__c, Due_In_Months__c  FROM Opportunity WHERE Id IN :oppIds]);

        for(Proposal__c p: proposals){
            if(opps.containsKey(p.Most_Recent_Loan__c)){
                Opportunity o = opps.get(p.Most_Recent_Loan__c);
                p.Term_Due_Scenario_1__c = o?.Due_In_Months__c>0 ? o?.Due_In_Months__c/12 : 30;
                p.Property__c = o?.Subject_Property_Name__c;
                p.Current_Loan_Amount__c = o?.Current_Schedule_Balance__c;
                p.Borrower__c = o?.ContactId;
                p.SolidifyContact__c = o?.Loan_Originator_User__c;
            }
        }

        return proposals;
    }

    public static list<Proposal__c> beforeUpdateCalcs (List<Proposal__c> proposals){

     /*   for(Proposal__c p: proposals){



        }
        */
        return proposals;
    }
    

    public static void afterCalcs(List<String> proposalIds) {

        List<Proposal__c> loanCompProposals = [SELECT Id, Term_Due_Scenario_1__c, Rate_Scenario_1__c, TotalFeesS1__c, First_Loan_Amount_Scenario_1__c, PaymentResultS1__c,
            Term_Due_Scenario_2__c, Rate_Scenario_2__c, TotalFeesS2__c, First_Loan_Amount_Scenario_2__c, PaymentResultS2__c, 
            Term_Due_Scenario_3__c, Rate_Scenario_3__c, TotalFeesS3__c, First_Loan_Amount_Scenario_3__c, PaymentResultS3__c,
            EstimatedMortgageInsuranceScenario1__c, CancelMIAtS1__c,UFMIPFFS1__c, 
            EstimatedMortgageInsuranceScenario2__c, CancelMIAtS2__c,UFMIPFFS2__c, 
            EstimatedMortgageInsuranceScenario3__c, CancelMIAtS3__c,UFMIPFFS3__c 
            FROM Proposal__c WHERE Id IN :proposalIds];
            
        for (Proposal__c l: loanCompProposals){

            //Scenario 1 Payment & APR
            if(l.Term_Due_Scenario_1__c != NULL && l.Rate_Scenario_1__c != NULL && l.TotalFeesS1__c != NULL && l.First_Loan_Amount_Scenario_1__c != NULL) {
                l.PaymentResultS1__c = solidifyUtil.payment(l.First_Loan_Amount_Scenario_1__c, l.Rate_Scenario_1__c, integer.ValueOf(l.Term_Due_Scenario_1__c));
                Double paymentForAPR1 = l.PaymentResultS1__c + ( nz(l.EstimatedMortgageInsuranceScenario1__c) - nz(l.CancelMIAtS1__c));
                system.debug(l.First_Loan_Amount_Scenario_1__c + ':'+ l.UFMIPFFS1__c +':' +l.TotalFeesS1__c);
                Double pvForAPR1 = l.First_Loan_Amount_Scenario_1__c - nz(l.UFMIPFFS1__c) - l.TotalFeesS1__c;
                l.APRScenario1__c = solidifyUtil.effectiveRate(l.Term_Due_Scenario_1__c, paymentForAPR1, pvForAPR1, l.Rate_Scenario_1__c);
            }   

            //Scenario 2 Payment & APR
            if(l.Term_Due_Scenario_2__c != NULL && l.Rate_Scenario_2__c != NULL && l.TotalFeesS2__c != NULL && l.First_Loan_Amount_Scenario_2__c != NULL) {
                l.PaymentResultS2__c = solidifyUtil.payment(l.First_Loan_Amount_Scenario_2__c, l.Rate_Scenario_2__c, integer.valueOf(l.Term_Due_Scenario_2__c));
                Double paymentForAPR2 = l.PaymentResultS2__c + ( nz(l.EstimatedMortgageInsuranceScenario2__c) - nz(l.CancelMIAtS2__c));
                Double pvForAPR2 = l.First_Loan_Amount_Scenario_2__c - nz(l.UFMIPFFS2__c) - l.TotalFeesS2__c;
                l.APRScenario2__c = solidifyUtil.effectiveRate(l.Term_Due_Scenario_2__c, paymentForAPR2, pvForAPR2, l.Rate_Scenario_2__c);
            }   

            //Scenario 3 Payment & APR
            if(l.Term_Due_Scenario_3__c != NULL && l.Rate_Scenario_3__c != NULL && l.TotalFeesS3__c != NULL && l.First_Loan_Amount_Scenario_3__c != NULL) {
                l.PaymentResultS3__c = solidifyUtil.payment(l.First_Loan_Amount_Scenario_3__c, l.Rate_Scenario_3__c, integer.ValueOf(l.Term_Due_Scenario_3__c));
                Double paymentForAPR3 = l.PaymentResultS3__c + ( nz(l.EstimatedMortgageInsuranceScenario3__c) - nz(l.CancelMIAtS3__c) );
                Double pvForAPR3 = l.First_Loan_Amount_Scenario_3__c - nz(l.UFMIPFFS3__c) - l.TotalFeesS3__c;
                l.APRScenario3__c = solidifyUtil.effectiveRate(l.Term_Due_Scenario_3__c, paymentForAPR3, pvForAPR3, l.Rate_Scenario_3__c);
            }   

        }
        update loanCompProposals;
    }    
    
    public static decimal nz(decimal input){
        if(input == null){
            return 0;
        } else {
            return input;
        }
    }
}