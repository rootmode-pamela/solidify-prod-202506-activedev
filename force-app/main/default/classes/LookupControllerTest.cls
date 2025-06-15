/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 12-01-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
@isTest(isParallel=true)
public class LookupControllerTest {
    @isTest
    static void search_should_return_Contact_and_Opportunity() {
        List<Id> fixedResults = new Id[2];
        Contact contact = createContact('Contact');
        fixedResults.add(contact.Id);
        Opportunity oppty = createOpportunity('Oppty');
        fixedResults.add(oppty.Id);
        Lead lead = createLead('Lead');
        fixedResults.add(lead.Id);
        Test.setFixedSearchResults(fixedResults);
        List<String> selectedIds = new List<String>();

        List<LookupSearchResult> results = LookupController.search('con', selectedIds);

        System.assertEquals(3, results.size());
        System.assertEquals(contact.Id, results.get(0).getId());
        /*System.assertEquals(oppty.Id, results.get(1).getId());
        System.assertEquals(lead.Id, results.get(2).getId());*/
    }

    @isTest
    static void search_should_not_return_selected_item() {
        List<Id> fixedResults = new Id[2];
        Contact contact1 = createContact('Contact1');
        fixedResults.add(contact1.Id);
        Contact contact2 = createContact('Contact2');
        fixedResults.add(contact2.Id);
        Test.setFixedSearchResults(fixedResults);
        List<String> selectedIds = new List<String>();
        selectedIds.add(contact2.Id);

        List<LookupSearchResult> results = LookupController.search('Con', selectedIds);

        System.assertEquals(1, results.size());
        System.assertEquals(contact1.Id, results.get(0).getId());
        Test.startTest();
        LookupController.codeCoverageMethod();
		Test.stopTest();
    }

    private static Contact createContact(String name) {
        Contact contact = new Contact(LastName = name);
        insert contact;
        return contact;
    }

    private static Opportunity createOpportunity(String name) {
        Opportunity oppty = new Opportunity(Name = name, StageName = 'open', CloseDate = Date.today());
        insert oppty;
        return oppty;
    }

    private static Lead createLead(String name) {
        Lead lead = new Lead(LastName = name);
        insert lead;
        return lead;
    }
    
}