@isTest
public class UpdateContactsStatusTest 
{
    public static testmethod void SetupTestData(){
        Account acc = new Account();
        acc.Household_Status__c = 'Inactive';
        acc.Name = 'Test Account 1';
        insert acc;
        
        Contact con1 = new Contact();
        con1.FirstName = 'Michelle';
        con1.LastName = 'Murphy';
        con1.AccountId = acc.Id;
        con1.Contact_Status__c = 'Inactive';
        insert con1;
        
        Contact con2 = new Contact();
        con2.FirstName = 'Susan';
        con2.LastName = 'Davis';
        con2.AccountId = acc.Id;
        con2.Contact_Status__c = 'Inactive';
        insert con2;     
        
        Test.startTest();
        acc.Household_Status__c= 'Fired';
        update acc;
        Test.stopTest();
    }
}