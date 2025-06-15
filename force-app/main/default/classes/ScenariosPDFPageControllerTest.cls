/************************************************************************************************************
* @description : Test class of ScenariosPDFPageController
* @author      : Capital S
* @date        : 2021-04-13
* **********************************************************************************************************/
@isTest
public class ScenariosPDFPageControllerTest {
	@isTest
    public static void testScenariosPDFPage(){
        Lead testLead = new Lead();
        testLead.LastName = 'TestLastName';
        testLead.FirstName = 'TestFirstName';
        testLead.Purpose__c = 'Refinance';
        insert testLead;
        
        Test.startTest();
        PageReference pageRef = Page.ScenariosPDFPage;
        pageRef.getParameters().put('id', testLead.Id);
        Test.setCurrentPage(pageRef);
        
        ScenariosPDFPageController testScenariosPDFPage = new ScenariosPDFPageController();
        system.assert(testScenariosPDFPage.isRefinance == true);
		Test.stopTest();
    }
}