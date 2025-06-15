public class LoanDateSectionComponentController {
    
    @AuraEnabled
    public static Opportunity loadLoanRecord(String recordId){
        return [SELECT Id, Rush_Requested__c, Hold_Until__c FROM Opportunity WHERE Id =: recordId];
    }

    @AuraEnabled
    public static String updateLoanRecord(Opportunity loanRecord){
        try {
            update loanRecord;

            return 'Success';
        } catch (Exception e) {
            return 'Error: ' + e.getMessage();
        }
    }
}