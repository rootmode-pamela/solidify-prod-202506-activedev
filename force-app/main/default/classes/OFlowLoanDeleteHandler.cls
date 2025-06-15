public class OFlowLoanDeleteHandler {
    public static void onDelete(List<Opportunity> loans) {
        List<Id> loanId = new List<Id>();
        for (Opportunity loan : loans) {
            loanId.add(loan.Id);
        }
        List<Case> OFlowDeleteList = [SELECT Id FROM Case WHERE Loan__c in :loanId];
        if (OFlowDeleteList.size() > 0) {
            delete OFlowDeleteList;
        }
        
    }
    public static void loanLost(List<Opportunity> loans) {
        List<Id> loanId = new List<Id>();
        for (Opportunity loan : loans) {
            if (loan.isClosed == true) {
                loanId.add(loan.Id);
            }
            
        }
        List<Case> OFlowDeleteList = [SELECT Id FROM Case WHERE Loan__c in :loanId];
        if (OFlowDeleteList.size() > 0) {
            delete OFlowDeleteList;
        }
    }
}