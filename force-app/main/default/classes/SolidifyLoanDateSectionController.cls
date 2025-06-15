public class SolidifyLoanDateSectionController {

	@AuraEnabled(cacheable=false)
	public static Opportunity getProperties (Id recordId) {
		Opportunity opportunity = [SELECT Id, Subject_Property_Name__c FROM Opportunity WHERE Id =: recordId ORDER BY CreatedDate DESC LIMIT 1];
		return opportunity;
	}

}