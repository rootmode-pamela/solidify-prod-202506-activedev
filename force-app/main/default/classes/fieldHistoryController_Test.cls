@isTest
public class fieldHistoryController_Test {
    
	@isTest
    private static void  testOne(){
    	Opportunity opp = new Opportunity(Name='Test', StageName = 'Call', CloseDate=Date.Today(), COE__c = Date.today().AddDays(30));
       	insert opp;
        

    Test.startTest();
    fieldHistoryController_Test oppHistClass = new fieldHistoryController_Test();
    oppHistClass.processOpportunityUpdate(opp.Id);
 
    // Retrieve the history
    // public static List<sObject> getFieldHistory(string sObjectName, string recordId, string fieldName, string commaDelimitedFieldNames, string additionalFilter, integer returnLimit) {
  
    OpportunityFieldHistory[] olist = fieldHistoryController.GetFieldHistory('Opportunity', opp.Id, 'COE__c', 'CreatedById, OldValue, NewValue', 'CreatedDate=TODAY', 2 );        
    
    Test.stopTest();
    System.assertEquals( olist.size(), 2);
	}


    public void processOpportunityUpdate(Id opportunityId){
       Opportunity opp1 = new Opportunity(Id = opportunityId, COE__c = Date.Today().AddDays(14));
       update opp1; 
       Opportunity opp2 = new Opportunity(Id = opportunityId, COE__c = Date.Today().AddDAys(45));
       update opp2;
    }
    
}