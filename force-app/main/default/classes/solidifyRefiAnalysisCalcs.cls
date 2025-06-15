public class solidifyRefiAnalysisCalcs {

    public static List<Proposal__c> beforeCalcs(List<Proposal__c> refis) {

        return refis;
    }

    public static void afterCalcs(List<String> refiIds){
        List<Proposal__c> refiProposals = [SELECT Id, Current_Loan_Amount__C, Current_Interest_Rate__c, Current_Loan_Term__c, Current_Loan_First_Payment__c, Current_Loan_Last_Payment_Made__c,
        Current_Loan_Number_Payments_Made__c, Current_Loan_Payments_Remaining__c,
        Current_Loan_Balance_Remaining__c, Current_Loan_Monthly_Payment__c,   
        New_Loan_Amount__c, New_Loan_Term__c, New_Loan_Interest_Rate__c, 
        New_Loan_Payment_To_Keep_Term__c, New_Loan_Monthly_Payment__c 
        FROM Proposal__c WHERE Id IN :refiIds];

        for(Proposal__c q: refiProposals){

            
            if (q.Current_Loan_Amount__c != null && q.Current_Interest_Rate__c != null && q.Current_Loan_Term__c != null){   
                q.Current_Loan_Monthly_Payment__c = solidifyUtil.pmt(q.Current_Loan_Amount__c, q.Current_Interest_Rate__c, integer.valueOf(q.Current_Loan_Term__c));
                system.debug(q.Current_Loan_Monthly_Payment__c);
                system.debug(q.Current_Loan_Number_Payments_Made__c);
                if(q.Current_Loan_Number_Payments_Made__c != null){
                        
                        q.Current_Loan_Balance_Remaining__c = solidifyUtil.balance( q.Current_Loan_Amount__c, q.Current_Interest_Rate__c, integer.valueOf(q.Current_Loan_Number_Payments_Made__c), q.Current_Loan_Monthly_Payment__c );
                }
            }

            if (q.New_Loan_Term__c !=null && q.New_Loan_Amount__c != null && q.New_Loan_Interest_Rate__c != null){
                q.New_Loan_Monthly_Payment__c = solidifyUtil.pmt(q.New_Loan_Amount__c, q.New_Loan_Interest_Rate__c, integer.valueOf(q.New_Loan_Term__c));
                if (q.Current_Loan_Number_Payments_Made__c!=null){                    
                    q.New_Loan_Payment_To_Keep_Term__c = solidifyUtil.pmt(q.New_Loan_Amount__c, q.New_Loan_Interest_Rate__c, integer.valueOf(q.Current_Loan_Payments_Remaining__c));
                }
                system.debug(solidifyUtil.numberPayments(q.New_Loan_Amount__c, q.New_Loan_Interest_Rate__c, q.Current_Loan_Monthly_Payment__c));
                q.Same_Payment_Term_Reduction__c = q.Current_Loan_Payments_Remaining__c - solidifyUtil.numberPayments(q.New_Loan_Amount__c, q.New_Loan_Interest_Rate__c, q.Current_Loan_Monthly_Payment__c);                
            }                     



        }

        update refiProposals;

    }

}