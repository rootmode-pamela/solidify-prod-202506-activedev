/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 05-11-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   04-27-2021   ChangeMeIn@UserSettingsUnder.SFDoc   Initial Version
**/
@isTest
public class SolidifyComparisonControllerTest {
	@isTest
    public static void testScenariosPDFPage(){
        Lead testLead = new Lead();
        testLead.LastName = 'TestLastName';
        testLead.FirstName = 'TestFirstName';
        testLead.Purpose__c = 'Refinance';
        insert testLead;

        Contact testContact = new Contact();
        testContact.LastName = 'TestLastName';
        testContact.FirstName = 'TestFirstName';
        insert testContact;

        Proposal__c testProposal = new Proposal__c();
        testProposal.Name = 'TestPropName';
        insert testProposal;

        Properties__c prop = new Properties__c(Name = '1415 16th Street');
        insert prop;
        
        Test.startTest();
        SolidifyComparisonController.getLeadInfo(testLead.id);
        SolidifyComparisonController.getContactInfo(testContact.id);
        SolidifyComparisonController.getProposalInfo(testProposal.id);
        SolidifyComparisonController.getChartData(testProposal.id);
        SolidifyComparisonController.getRateAnalysisProposalInfo(testProposal.id);
        SolidifyComparisonController.getRecordForProp(testLead.id, 'Lead');
        SolidifyComparisonController.getRecordDataProp(testLead.Id, 'Lead');
		Test.stopTest();
    }
}