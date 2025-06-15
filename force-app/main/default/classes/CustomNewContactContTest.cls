@isTest
public class CustomNewContactContTest {
    @isTest static void testMethod1(){
        Account newAccount = new Account();
        newAccount.Name='Test Account';
        insert newAccount;

        Contact newContact = new Contact();
        newContact.FirstName = 'Test';
        newContact.LastName = 'Contact';
        newContact.AccountId = newAccount.Id;
        newContact.Number_of_Units__c = '2';
        newContact.Occupancy__c = 'Primary';
        newContact.Estimated_Value__c = 700000;
        newContact.Current_Program__c = 'Test Program';
        newContact.Current_Balance__c = 60000;
        newContact.Current_Rate__c = 3.15;
        newContact.Current_Payment__c = 1435;                 
        
        Contact newContact2 = new Contact();
        newContact2.FirstName = 'Test2';
        newContact2.LastName = 'Contact';
        newContact2.AccountId = newAccount.Id;
        newContact2.Number_of_Units__c = '2';
        newContact2.Occupancy__c = 'Primary';
        newContact2.Estimated_Value__c = 700000;
        newContact2.Current_Program__c = 'Test Program';
        newContact2.Current_Balance__c = 60000;
        newContact2.Current_Rate__c = 3.15;
        newContact2.Current_Payment__c = 1435;

        Contact newContact3 = new Contact();
        
        test.startTest();
        List<String> stringIds = new List<String>();
        CustomNewContactCont.searchAccount('Test', stringIds, '');
        CustomNewContactCont.searchUser2('Test', stringIds, '');
        CustomNewContactCont.loadExistingUser2();
        CustomNewContactCont.getRecentlyCreatedAccount();
        CustomNewContactCont.saveContactOtherHelper(newContact, newAccount.Id);
        CustomNewContactCont.saveContactClientHelper(newContact2, newContact3);

        newContact.Id = null;
        newContact.AccountId = null;
        newContact2.Id = null;
        newContact2.AccountId = null;
        CustomNewContactCont.saveContactClientHelper(newContact2, newContact3);
        test.stopTest();
    }

}