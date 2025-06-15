@isTest
public class AccountOwnerUpdate_Test {

    @testSetup
    public static void makeData(){
       Profile p = [SELECT Id FROM Profile WHERE Name='Standard User']; 
       User u = new User(Alias = 'standt', Email='firstUser@solidify.com', 
            EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
            LocaleSidKey='en_US', ProfileId = p.Id, IsActive = true,
            TimeZoneSidKey='America/Los_Angeles', UserName='firstuser@solidify.com');
		insert u;
        
       	User u2 = new User(Alias = 'standt', Email='seconduser@solidify.com', 
            EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
            LocaleSidKey='en_US', ProfileId = p.Id, IsActive = true,
            TimeZoneSidKey='America/Los_Angeles', UserName='seconduser@solidify.com');
		 insert u2;
        
        Account a = new Account (Name = 'Test Household', OwnerId = u.id);
        insert a;
        
        Contact c = new Contact (LastName = 'Test', AccountId = a.id, OwnerId = u.id);
        insert c;
        
        Opportunity o = new Opportunity (Name = 'Test Opp', StageName = 'New', CLoseDate = Date.today(), AccountId = a.id, OwnerId = u.id);
        insert o;
    }
    
    @isTest
    public static void testAll(){
        Account a = [SELECT Id, OwnerId from Account LIMIT 1];
        User o2 = [SELECT Id FROM User WHERE IsActive = true AND email = 'seconduser@solidify.com'];
        system.debug(o2);
        Test.startTest();
        List<AccountOwnerUpdate.AccountOwnerUpdateInputs> inputs = new List<AccountOwnerUpdate.AccountOwnerUpdateInputs>();
        AccountOwnerUpdate.AccountOwnerUpdateInputs i = new AccountOwnerUpdate.AccountOwnerUpdateInputs();
        i.AccountId = a.id;
        i.ownerId = o2.id;
        inputs.add(i);
        AccountOwnerUpdate.updateAccountRelatedRecordOwner(inputs);
        Test.stopTest();
    }
    
    @isTest
    public static void testBatch(){
        
    }
   
}