@isTest
public class solidifyDataTableController_Test {

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
                                               AccountId=referredAcct.Id,  OwnerId=OwnerUser.Id, 
                                               Loan_Originator_User__c = OwnerUser.id, Amount = 200000);
        testOpps.add(OppClosedReferredBy);

        
        //Create account and Contact, no referral info
        Account Acct = new Account(Name='Client not referred', Ownerid = OwnerUser.Id, Loan_Originator_User__c = OwnerUser.Id);
        insert Acct;
        Contact cont = new Contact(FirstName='Test',LastName='Tester3', AccountId=Acct.Id, Type__c = 'Client');
        insert cont;
        Opportunity OppBuyersAgent = new Opportunity(Name='Opp - Buyers Agent - Closed', StageName='Closed Won', CloseDate=System.Today().addDays(-12),
                                               AccountId=Acct.Id, OwnerId=OwnerUser.Id, 
                                               Loan_Originator_User__c = OwnerUser.id, Buyers_Agent__c = contReferrer.id, Amount = 250000);
        testOpps.add(OppBuyersAgent);
        
        insert testOpps;
        
        Lead referredlead = new Lead(FirstName = 'Test', LastName = 'Referred', Company = 'Test', Referred_By__c = contReferrer.id, status = 'New');
        Lead ld = new Lead(FirstName = 'Test', LastName = 'Test', Company = 'Test', status = 'New');
        insert referredlead;
        insert ld;
    }
    
    //Run Get Records 
       testMethod static void testGetRecords() {
       test.startTest();
       
       solidifyDataTableController dt = new solidifyDataTableController();
       solidifyDataTableController.DataTableResponse rs = solidifyDataTableController.DataTableResponse.getRecords('Lead', 'solidifyReferrals', 'Loan_Amount__c', 'IsConverted = FALSE');
         
//           DataTableResponse getRecords(String strObjectName, String strFieldSetName, String strAmountField, String strQueryParams){                


        test.stopTest();
        //Confirm results
 //       string id4 = [Select id from Opportunity where Name = 'Processing Last Activity 1d, future scheduled' LIMIT 1].Id;
 //       string id3 = [Select id from Opportunity where Name = 'Processing Last Activity 1d' LIMIT 1].Id;
 //       System.assert([Select Id from Task WHERE What.ID = :id3].size()>=0);           
 //		System.assert([Select Id from Task WHERE What.ID = :id4].size()==0);
       }

    
}