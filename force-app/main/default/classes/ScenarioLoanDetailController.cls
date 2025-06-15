public with sharing class ScenarioLoanDetailController {

	@AuraEnabled
	public static Map<String, String> getPropertyTypePicklist(){
		Map<String, String> options = new Map<String, String>();

		Schema.DescribeFieldResult fieldResult = Properties__c.Property_Type__c.getDescribe();

		List<Schema.PicklistEntry> pValues = fieldResult.getPicklistValues();
		for (Schema.PicklistEntry p: pValues) {
			options.put(p.getValue(), p.getLabel());
		}

		return options;
	}

	@AuraEnabled
	public static void updateProperties(String opportunityId, String propertyId, String propertyTypeValue) {
		Properties__c properties;
        if (String.isEmpty(propertyId)) {
            properties = new Properties__c(Property_Type__c = propertyTypeValue);
        } else {
            properties = [SELECT Id, Property_Type__c FROM Properties__c WHERE Id =: propertyId];
        }
        System.debug(properties);
		if (String.isEmpty(propertyId)) {
            properties = new Properties__c(Property_Type__c = propertyTypeValue);
            System.debug(properties);
			Opportunity opportunity = [SELECT Id, Subject_Property_Name__c FROM Opportunity WHERE Id =: opportunityId];
            insert properties;
            System.debug(properties);
            opportunity.Subject_Property_Name__c = properties.Id;
            update opportunity;
            System.debug(properties);
		}
		properties.Property_Type__c = propertyTypeValue;
		update properties;
	}
}