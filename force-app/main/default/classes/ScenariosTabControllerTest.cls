@isTest
public class ScenariosTabControllerTest {
@isTest
    public static void ContactScenariosControllerPage(){
        Account testAccount = new Account();
        testAccount.Name = 'TestACCName';
        insert testAccount;
        
        Contact testContact = new Contact();
        testContact.LastName = 'TestLastName';
        testContact.FirstName = 'TestFirstName';
        testContact.AccountId = testAccount.id;
        insert testContact;
       
        Lead testLead = new Lead();
        testLead.FirstName = 'Test';
        testLead.LastName = 'Lead';
        insert testLead;
        
        
        Properties__c testProperties = new Properties__c();
        testProperties.Name = 'TestPropName';
        testProperties.Household__c = testAccount.id;
        insert testProperties;
        
        Test.startTest();
        ScenariosTabController.getPropertyList(testContact.id);
        ScenariosTabController.getPropertyDetails(testProperties.id);
        ScenarioTabLeadCont.createProposalButtonMethod(testLead.Id);
        ScenariosTabController.createProposalButtonMethod(testAccount.Id);
		Test.stopTest();
       }
}