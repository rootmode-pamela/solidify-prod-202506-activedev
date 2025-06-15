@isTest
public class customLookUpController_Test {
    @isTest 
    public static void testQueries(){
    
        String searchKeyWord = 'Test';
        Account acc = new Account(Name='Test Account');
        insert acc;
        
        Contact con = new Contact(AccountId=acc.Id,LastName='Test Contact');
        insert con;
        String contactId = con.Id;
        
        Lead l = new Lead(LastName='Test Lead',Status='New',Company='Test Company');
        insert l;
        
        Opportunity opp = new Opportunity(Name='Test Opp',StageName='New',CloseDate=Date.today(),ContactId=contactId);
        insert opp;
        
        test.startTest();
            
            List<Opportunity> oppList = customLookUpController.getLoanList(contactId);
            System.assertEquals(1, oppList.Size());
            
            List<sObject> borrowers = customLookUpController.getBorrowerList(searchKeyWord);
            System.assertEquals(2, borrowers.size());
                                                
		test.stopTest();        
    }
}