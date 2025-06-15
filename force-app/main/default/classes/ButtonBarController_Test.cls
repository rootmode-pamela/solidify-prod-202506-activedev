@isTest
public class ButtonBarController_Test {
    
    @testSetup
    public static void testData(){
        Opportunity o = new Opportunity(Name = 'Test Loan', CloseDate = Date.Today(), StageName = 'New');
        insert o;
    }
    
    @isTest
    public static void testAll(){
        String recordId = [SELECT Id FROM Opportunity LIMIT 1].Id;
        Opportunity loan = ButtonBarController.getProperties(recordId);
    }

}