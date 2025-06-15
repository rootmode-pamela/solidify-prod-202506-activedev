@isTest
public class CustomNewLoanContTest {

    @TestSetup
    static void setup() {
        insert new Account(Name = 'Test Account');
    }


    @isTest static void testMethod1(){
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
        
        Properties__c prop = new Properties__c();
        

        test.startTest();
        CustomNewLoanCont.saveLoanRecord(newOpportunity);
        CustomNewLoanCont.getPicklistValues('Loan_Originator__c');

        List<String> stringIds = new List<String>();
        CustomNewLoanCont.searchContact('Test', stringIds, '');
        CustomNewLoanCont.searchAccount('Test', stringIds, '');
        CustomNewLoanCont.searchProperty('Test', stringIds, '');
        CustomNewLoanCont.searchUser2('Test', stringIds, '');
        CustomNewLoanCont.getRecentlyCreatedRecords('Contact');
        CustomNewLoanCont.savePropertyRecord(prop, NULL, NULL);

        newOpportunity.Borrower_Record__c = newContact.Id;
        update newOpportunity;
        CustomNewLoanCont.saveLoanRecord(newOpportunity);
        test.stopTest();
    }


}