@IsTest
private class SolidifyLoanDateSectionControllerTest {

	@TestSetup
	static void setup() {
		insert new Account(Name = 'Test Account');
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
	}

	@isTest static void getPropertiesTest() {
		Properties__c newProp = new Properties__c(Name ='test');
		insert newProp;

		Opportunity newOpportunity = new Opportunity();
		newOpportunity.Name = 'Test Loan';
		newOpportunity.StageName = 'Closed Won';
		newOpportunity.CloseDate = Date.today();
		newOpportunity.Subject_Property_Name__c = newProp.Id;
		insert newOpportunity;

		SolidifyLoanDateSectionController.getProperties(newOpportunity.Id);
	}

}