public class leadOriginatorHandler {
    public static void onInsert(List<Lead> leadList) {
        Map<String, Id> userMap = new Map<String, Id>();
        for (User newUser : [SELECT ID, FirstName, LastName FROM USER]) {
            String userName = newUSer.FirstName + ' ' + newUser.LastName;
            userMap.put(userName, newUser.Id);
        }
        for(Lead lead : leadList) {
            lead.Loan_Originator_User__c = userMap.get(lead.Loan_Originator__c);           
        }
        
    }
    public static void onUpdate(List<Lead> leadList, Map<Id, Lead> oldMap) {
        Map<String, Id> userMap = new Map<String, Id>();
        for (User newUser : [SELECT ID, FirstName, LastName FROM USER]) {
            String userName = newUSer.FirstName + ' ' + newUser.LastName;
            userMap.put(userName, newUser.Id);
        }
        
        for(Lead lead : leadList) {
            if(lead.Loan_Originator__c != oldMap.get(lead.Id).Loan_Originator__c) {
                lead.Loan_Originator_User__c = userMap.get(lead.Loan_Originator__c);                
            }
        }       
    }

}