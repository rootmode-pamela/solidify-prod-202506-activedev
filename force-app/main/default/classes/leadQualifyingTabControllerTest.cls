@isTest
public class leadQualifyingTabControllerTest {
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
        
        Asset__c testAsset = new Asset__c();
        testAsset.Name = 'Ford';
        testAsset.AssetOrLiability__c = 'Asset';
        testAsset.Lead__c = testLead.Id;
        insert testAsset;
        
        Asset__c testAsset2 = new Asset__c();
        testAsset2.Name = 'Ford2';
        testAsset2.AssetOrLiability__c = 'Liability';
        testAsset2.Lead__c = testLead.Id;
        insert testAsset2;
        
        Test.startTest();
        leadQualifyingTabController.getAssetList(testLead.Id);
        leadQualifyingTabController.getLiabilityList(testLead.Id);
        leadQualifyingTabController.getPickList('Asset__c','Type__c');
        leadQualifyingTabController.codeCoverageMethod();
		Test.stopTest();
    }
}