@isTest
public class ScenarioLoanDetailControllerTest {

	@TestSetup
	static void setup() {
		insert new Properties__c(Property_Type__c = 'Test property');
        
	}

	@isTest
	static void validateGetPropertyTypePicklist() {
		Schema.DescribeFieldResult fieldResult = Properties__c.Property_Type__c.getDescribe();
		Map<String, String> result = ScenarioLoanDetailController.getPropertyTypePicklist();
		List<Schema.PicklistEntry> pValues = fieldResult.getPicklistValues();
		for (Schema.PicklistEntry p: pValues) {
			System.assertEquals(p.getLabel(), result.get(p.getValue()));
		}
	}

	@isTest
	static void validateUpdateProperties() {
		Properties__c properties = [SELECT Id, Property_Type__c FROM Properties__c WHERE Property_Type__c =: 'Test property'];
		ScenarioLoanDetailController.updateProperties(null, properties.Id, 'Detached');

		Properties__c properties2 = [SELECT Id, Property_Type__c FROM Properties__c WHERE Id =: properties.Id];
		System.assertEquals('Detached', properties2.Property_Type__c);
	}
    
    @isTest
	static void updatePropertiesTest() {
        Opportunity opp = new Opportunity(Name = 'Test Account', StageName = 'Won', COE__c = Date.today().addDays(5));
        insert opp;
		Properties__c properties = [SELECT Id, Property_Type__c FROM Properties__c WHERE Property_Type__c =: 'Test property'];
		ScenarioLoanDetailController.updateProperties(opp.Id, null, 'Detached');

		Opportunity oppAfterUpdate = [SELECT Id, Subject_Property_Name__r.Property_Type__c FROM Opportunity WHERE Id =: opp.Id];
		System.assertEquals('Detached', oppAfterUpdate.Subject_Property_Name__r.Property_Type__c);
	}
}