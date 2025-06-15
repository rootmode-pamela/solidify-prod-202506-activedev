@isTest
public class solidifyReferralSearchController_Test {

        //This method will stage all appropriate test data
    @testSetup
    static void stageTestData() {
        
        User OwnerUser = new User(Firstname='Test',lastname='Owner', Email = 'test@test.com', Username = 'testowner@solidfy.com.dev', alias = 'town', profileid = '00ef4000001B3XBAA0', TimeZoneSidKey = 'America/Los_Angeles', LocaleSidKey = 'en_US', EmailEncodingKey = 'ISO-8859-1', LanguageLocaleKey = 'en_US');
        insert OwnerUser;

        List<Opportunity> testOpps = new List<Opportunity>();
        
        //Create Referring account and Contact
        Account referringAcct = new Account(Name='Referring Realtor', Ownerid = OwnerUser.Id, Loan_Originator_User__c = OwnerUser.Id);
        insert referringAcct;
        Contact contReferrer = new Contact(FirstName='Test',LastName='Tester3', AccountId=referringAcct.Id, Type__c = 'Client');
        insert contReferrer;
        
		//create referred Account, Contacts, Opportunities
        Account referredAcct = new Account(Name='Referred Client Account', Ownerid = OwnerUser.Id, Loan_Originator_User__c = OwnerUser.Id, Referred_By__c = contReferrer.id );
        insert referredAcct;
        Contact referredCont = new Contact(FirstName='Test',LastName='Tester2', AccountId=referredAcct.Id );
        insert referredCont;
      
        Opportunity OppOpenReferredBy = new Opportunity(Name='ReferredOpp - Open', StageName='Analysis / TBD', CloseDate=System.Today().addDays(15),
                                               AccountId=referredAcct.Id,  
                                               OwnerId=OwnerUser.Id, Loan_Originator_User__c = OwnerUser.id, Amount = 150000);
        testOpps.add(OppOpenReferredBy);
        Opportunity OppClosedReferredBy = new Opportunity(Name='ReferredOpp - Closed', StageName='Closed Won', CloseDate=System.Today().addDays(-15),
                                               AccountId=referredAcct.Id, OwnerId=OwnerUser.Id, 
                                               Loan_Originator_User__c = OwnerUser.id, Amount = 200000);
        testOpps.add(OppClosedReferredBy);

    }
    
    //Run Get Referred Contacts 
       testMethod static void testGetReferredContacts() {
       test.startTest();
       
       solidifyReferralSearchController dt = new solidifyReferralSearchController();
       Contact referredCont = [Select id from Contact WHERE FirstName = 'Test' LIMIT 1];
       solidifyReferralSearchController.getReferredContacts( referredCont.id );
         
        test.stopTest();

        
    }
}