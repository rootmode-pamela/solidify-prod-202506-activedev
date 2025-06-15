@isTest(SeeAllData=true)
public class tst_encompass_trigger_Loan {
	@isTest 
	static void testTrigger() {
		String recordTypeId;
		List<encompass_By_EM__Data_Model__c> dataModels = [SELECT Id, encompass_By_EM__Mappings__c, encompass_By_EM__Additional_Mappings__c FROM encompass_By_EM__Data_Model__c];
		for(encompass_By_EM__Data_Model__c record : dataModels) {
			String mappingsJsonString = String.isBlank(record.encompass_By_EM__Additional_Mappings__c) ? record.encompass_By_EM__Mappings__c : record.encompass_By_EM__Mappings__c + record.encompass_By_EM__Additional_Mappings__c;
			Map<String, Object> mappings = (Map<String, Object>)JSON.deserializeUntyped(mappingsJsonString);
			String primaryObjectName = (String)mappings.get('objectName');
			if(primaryObjectName == 'Opportunity') {
				Map<String, Object> recordTypeMapping = (Map<String, Object>)(((List<Object>)mappings.get('recordTypeMappings'))[0]);
				recordTypeId = (String)recordTypeMapping.get('recordType');
				break;
			}
		}
		Test.setMock(HttpCalloutMock.class, new encompass_By_EM.mockCalloutGeneratorForTrigger());
		Test.startTest();
			Schema.SObjectType objType0 = Schema.Opportunity.getSObjectType();
			SObject obj0 = objType0.newSObject();
			obj0.put('IsPrivate', true);
			obj0.put('Name', 's');
			obj0.put('StageName', 'New');
			obj0.put('CloseDate', Date.today());
			SObject userSObject0 = Schema.User.getSObjectType().newSObject();
			userSObject0.put('Id', '0055G000005xJLNQA2');
			obj0.putSObject('Owner', userSObject0);
			obj0.put('Budget_Confirmed__c', true);
			obj0.put('Discovery_Completed__c', true);
			obj0.put('ROI_Analysis_Completed__c', true);
			obj0.put('Escrows_Waived__c', true);
			obj0.put('First_Time_Homebuyer__c', true);
			obj0.put('Appraisal_Required__c', true);
			obj0.put('RateSheet_Checkbox__c', true);
			obj0.put('Title_Required__c', true);
			obj0.put('Payoff_Required__c', true);
			obj0.put('X2nd_Payoff_Required__c', true);
			obj0.put('Credit_Supplement_Required__c', true);
			obj0.put('Evidence_of_Insurance_Required__c', true);
			obj0.put('Subordination_Required__c', true);
			obj0.put('VOE_Required__c', true);
			obj0.put('Send_Gift_Required__c', true);
			obj0.put('Update_Loan_File_Team__c', true);
			obj0.put('Override_Stage_Change__c', true);
			obj0.put('HOA_Docs_Required__c', true);
			obj0.put('encompass_By_EM__Is_Deleted__c', true);
			obj0.put('Adjustments_Other_Credits__c', true);
			obj0.put('encompass_By_EM__Encompass_Loan_Id__c', 'testval');
        
		if(recordTypeId != 'default') {
			obj0.put('RecordTypeId', recordTypeId);
		}
		Database.insert(obj0);
		Test.stopTest();
	}
}