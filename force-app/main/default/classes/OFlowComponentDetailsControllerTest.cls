@isTest
public class OFlowComponentDetailsControllerTest {

    @isTest static void testMethodLoadRecord(){
        Account newAccount = new Account();
        newAccount.Name='Test Account';
        insert newAccount;

        Contact newContact = new Contact();
        newContact.LastName = 'Test Contact';
        newContact.AccountId = newAccount.Id;
        newContact.Number_of_Units__c = '2';
        newContact.Occupancy__c = 'Primary';
        newContact.Estimated_Value__c = 700000;
        newContact.Current_Program__c = 'Test Program';
        newContact.Current_Balance__c = 60000;
        newContact.Current_Rate__c = 3.15;
        newContact.Current_Payment__c = 1435;                 
        insert newContact;

        Opportunity newOpportunity = new Opportunity();
        newOpportunity.Name = 'Test Loan';
        newOpportunity.StageName = 'Closed Won';
        newOpportunity.CloseDate = Date.today();
        insert newOpportunity;

        Lead newLead = new Lead();
        newLead.LastName = 'Test';
        newLead.FirstName = 'Test';
        insert newLead;

        Case newCase = new Case();
        newCase.Subject = 'Test Subject';
        newCase.Status = 'New';
        insert newCase;

        test.startTest();
        OFlowComponentDetailsController.loadOFlowRecord(newCase.Id);
        OFlowComponentDetailsController.updateOFlowRecord(newCase);
        OFlowComponentDetailsController.getPicklistValues('Status');

        List<String> stringIds = new List<String>();
        OFlowComponentDetailsController.searchContact('Test', stringIds, '');
        OFlowComponentDetailsController.seachLead('Test', stringIds, '');
        OFlowComponentDetailsController.searchLoan('Test', stringIds, '');
        OFlowComponentDetailsController.searchAccount('Test', stringIds, '');
        test.stopTest();
    }
}