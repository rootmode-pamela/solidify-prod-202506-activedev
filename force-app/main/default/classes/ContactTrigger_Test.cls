@isTest
public class ContactTrigger_Test {
    @isTest
    public static void testUpdate(){
        Contact c = new Contact (LastName = 'Test', FirstName = 'Teddy', MailingState ='California');
        insert c;
        c.Term_Due_Scenario_1__c = 2;
        c.Rate_Scenario_1__c = 2;
        c.First_Loan_Amount_Scenario_1__c = 2;
        c.CancelMIAtS1__c = 2;
        c.PaymentResultS1__c = 2;
        c.UFMIPFFS1__c = .2;
        c.EstimatedMortgageInsuranceScenario1__c = 2; 
        c.Term_Due_Scenario_2__c = 2;
        c.RateScenario2__c = 2;
        c.First_Loan_Amount_Scenario_2__c =2;
        c.PaymentResultS2__c = 2;
        c.UFMIPFFS2__c = .22;
        c.EstimatedMortgageInsuranceScenario2__c = 2; 
        c.CancelMIAtS2__c = 2;
        c.First_Loan_Amount_Scenario_3__c =2;
        c.PaymentResultS3__c = 2;
        c.UFMIPFFS3__c = .2;
        c.EstimatedMortgageInsuranceScenario3__c = 2; 
        c.CancelMIAtS3__c = 2;
        c.Term_Due_Scenario_3__c = 2;
        c.RateScenario3__c = 2;
        c.First_Loan_Amount_Scenario_3__c =2;
        update c;
        
        Contact newContact = [SELECT LastName FROM Contact];
        System.assertEquals ('Test', newContact.LastName);
    }
    @isTest
    public static void testDelete() {
        Contact c = new Contact (LastName = 'Test', FirstName = 'Teddy');
        insert c;
        delete c;
        undelete c;
    }

}