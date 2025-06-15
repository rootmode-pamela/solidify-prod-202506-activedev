public class contactOriginatorHandler {
	public static void onInsert(List<Contact> conList) {
        Map<String, Id> userMap = new Map<String, Id>();
        for (User newUser : [SELECT ID, FirstName, LastName FROM USER]) {
            String userName = newUSer.FirstName + ' ' + newUser.LastName;
            userMap.put(userName, newUser.Id);
        }
        for(Contact con : conList) {
            con.Loan_Originator_User__c = userMap.get(con.Loan_Originator__c);           
        }
        
    }
    public static void onUpdate(List<Contact> conList, Map<Id, Contact> oldMap) {
        Map<String, Id> userMap = new Map<String, Id>();
        for (User newUser : [SELECT ID, FirstName, LastName FROM USER]) {
            String userName = newUSer.FirstName + ' ' + newUser.LastName;
            userMap.put(userName, newUser.Id);
        }
        
        for(Contact con : conList) {
            if(con.Loan_Originator__c != oldMap.get(con.Id).Loan_Originator__c) {
                con.Loan_Originator_User__c = userMap.get(con.Loan_Originator__c);                
            }
        }       
    }
}