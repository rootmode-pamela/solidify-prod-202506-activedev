public class customLookUpController {
    @AuraEnabled
    public static List < sObject > getBorrowerList(String searchKeyWord) {

        List < sObject > borrowerList = new List < sObject > ();
        String searchKey = searchKeyWord + '%';
            
        String sQuery1 =  'select id, Name from Contact where LastName LIKE: searchKey  limit 10';
        List < sObject > lstOfRecords1 = Database.query(sQuery1);
        
        for (sObject obj1: lstOfRecords1) {
            borrowerList.add(obj1);
        }
        
        String sQuery2 =  'select id, Name from Contact where FirstName LIKE: searchKey  limit 5';
        List < sObject > lstOfRecords2 = Database.query(sQuery2);
        
        for (sObject obj2: lstOfRecords2) {
            borrowerList.add(obj2);
        }
        
        String sQuery3 =  'select id, Name from Contact where Name LIKE: searchKey  limit 5';
        List < sObject > lstOfRecords3 = Database.query(sQuery3);
        
        for (sObject obj3: lstOfRecords3) {
            borrowerList.add(obj3);
        }
 
		String sQuery4 =  'SELECT Id,Name,Status FROM Lead WHERE Status != \'Active Loan\' AND Status != \'Archived\' and LastName LIKE: searchKey  limit 10';
        List < sObject > lstOfRecords4 = Database.query(sQuery4);
        for (sObject obj4: lstOfRecords4) {
            borrowerList.add(obj4);
        }
        
        		String sQuery5 =  'SELECT Id,Name,Status FROM Lead WHERE Status != \'Active Loan\' AND Status != \'Archived\' and FirstName LIKE: searchKey  limit 5';
        List < sObject > lstOfRecords5 = Database.query(sQuery5);
        for (sObject obj5: lstOfRecords5) {
            borrowerList.add(obj5);
        }
        
        		String sQuery6 =  'SELECT Id,Name,Status FROM Lead WHERE Status != \'Active Loan\' AND Status != \'Archived\' and LastName LIKE: searchKey limit 5';
        List < sObject > lstOfRecords6 = Database.query(sQuery6);
        for (sObject obj6: lstOfRecords6) {
            borrowerList.add(obj6);
        }
     Set <sObject> recordSet = new Set <sObject>();
        recordSet.addAll(borrowerList);
        borrowerList.clear();
        borrowerList.addAll(recordSet);
    return borrowerList;
}
    
@AuraEnabled
    public static List<Opportunity> getLoanList(String contactId){
        List < Opportunity> loanList = new List < Opportunity > ();
          String sQuery =  'select id, Name,Purpose__c,Loan_Amount__c,Qual_FICO__c,Loan_Program__c,Loan_Type__c,Purchase_Price__c,Appraised_Value__c from Opportunity where ContactId=: contactId';
 
        List<Opportunity> opps = Database.query(sQuery);
        
       for (Opportunity opp : opps){
            	loanList.add(opp);
        }
  
        return loanList; 
    
    }
    
}