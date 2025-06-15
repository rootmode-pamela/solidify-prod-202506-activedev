@isTest
public class solidifyCustomSearch_Test {
	
    @testSetup
    static void stageTestData(){
    //Create test leads
    List<Lead> testLeads = new List<Lead>();
    	Lead tL1 = new Lead(firstname='Adam', Lastname= 'Test-Arch', mobilephone='855-555-1212', company='A', Lead_Time_Zone__c = 'Pacific' );
    	testLeads.add(tL1);
   		Lead tL2 = new Lead(firstname='Bonnie', lastname='Bishop', mobilephone='966-555-1212', company='B', Lead_Time_Zone__c = 'Mountain');
    	testLeads.add(tL2);
    insert testLeads;
    }
    
     testMethod static void doSearch() {
       test.startTest();
       
       	List<sobject> leads = solidifyCustomSearch.fetchLookUpValues('test', 'Lead');

		system.assertEquals(1, leads.size() );       
         
        test.stopTest();
     }
    
}