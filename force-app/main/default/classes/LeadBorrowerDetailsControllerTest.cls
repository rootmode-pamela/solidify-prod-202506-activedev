@isTest
public class LeadBorrowerDetailsControllerTest {
    
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

        Lead newLead = new Lead();
        newLead.LastName = 'Test';
        newLead.FirstName = 'Test';
        insert newLead;

        test.startTest();
        LeadBorrowerDetailsController.loadLeadRecord(newLead.Id);
        LeadBorrowerDetailsController.updateLeadRecord(newLead);

        List<String> stringIds = new List<String>();
        LeadBorrowerDetailsController.searchContact('Test', stringIds, '');
        test.stopTest();
    }

    @isTest static void testMethodGoogleMapTest(){

        Test.setMock(HttpCalloutMock.class, new solidifyGoogleMapsMock());
        
        // Call method to test.
        // This causes a fake response to be sent
        // from the class that implements HttpCalloutMock. 
        
        String url = '';
        HttpResponse res = LeadBorrowerDetailsController.fullResponse(url);
        
        // Verify response received contains fake values
        String contentType = res.getHeader('Content-Type');
        System.assert(contentType == 'application/json');
        String actualValue = res.getBody();
        String expectedValue = '{"example":"test"}';
        System.assertEquals(actualValue, expectedValue);
        System.assertEquals(200, res.getStatusCode());
        
        String input = '1234';
        String suggestion = LeadBorrowerDetailsController.getSuggestions(input);
        String place = LeadBorrowerDetailsController.getPlaceDetails(input);
    }
}