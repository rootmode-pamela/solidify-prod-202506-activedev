@isTest
public class OFlowDeleteTest {
    @isTest
    public static void onDelete() {
        Lead lead = new Lead(FirstName = 'Dom', LastName = 'Test');
        insert lead;
        Case oFlow1 = new Case(Status = 'New', Lead__c = lead.Id, Subject = 'Test');
        insert oFlow1;
        Contact con = new Contact(FirstName = 'Dom', LastName = 'Test');
        insert con;
        Account act = new Account(Name = 'Test Account');
        insert act;
        Properties__c  prop = new Properties__c (Name = 'Test Property');
        insert prop;
        Opportunity  loan = new Opportunity (Name = 'Test', Borrower_Record__c = con.Id, CoBorrower_Record__c = con.Id, 
                                   AccountId = act.Id, StageName = 'Prospect', CloseDate = Date.today(), Subject_Property_Name__c = prop.Id);
        insert loan;
        Case oFlow2 = new Case(Status = 'New', Lead__c = lead.Id, Subject = 'Test 2', Loan__c = loan.Id);
        insert oFlow2;
        Test.startTest();
        delete loan;
        delete lead;
        Test.stopTest();
        List<Case> caseList = [SELECT Id FROM Case WHERE Subject = 'Test' OR Subject = 'Test 2'];
        System.assertEquals(0, caseList.size());
    }
    public static void onConvert() {
        Lead lead = new Lead(FirstName = 'Dom', LastName = 'Test');
        insert lead;
        Case oFlow1 = new Case(Status = 'New', Lead__c = lead.Id, Subject = 'Test');
        insert oFlow1;
        Test.startTest();
        lead.IsConverted = TRUE;
        update lead;
        Test.stopTest();
        List<Case> caseList = [SELECT Id FROM Case WHERE Subject = 'Test'];
        System.assertEquals(0, caseList.size());
    }
    
}