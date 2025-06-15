@isTest
public class LeadTrigger_Test {

    @isTest
    public static void testUpdate(){
        Lead l = new Lead (LastName = 'Test', FirstName = 'Teddy');
        insert l;
        l.Term_Due__c = 2;
        l.Rate_Scenario_1__c = 2;
        l.First_Loan_Amount_Scenario_1__c = 2;
        l.Term_Due_Scenario_2__c = 2;
        l.Rate_Scenario_2__c = 2;
        l.First_Loan_Amount_Scenario_2__c =2;
        l.PaymentResultS2__c = 2;
        l.UFMIPFFS2__c = .22;
        l.EstimatedMortgageInsuranceScenario2__c = 2; 
        l.CancelMIAtS2__c = 2;
        l.First_Loan_Amount_Scenario_3__c =2;
        l.PaymentResultS3__c = 2;
        l.UFMIPFFS3__c = .2;
        l.PaymentResultS3__c = 2;
        l.UFMIPFFS3__c = .2;
        l.EstimatedMortgageInsuranceScenario3__c = 2; 
        l.CancelMIAtS3__c = 2;
        l.Term_Due_Scenario_3__c = 2;
        l.Rate_Scenario_3__c = 2;
        l.First_Loan_Amount_Scenario_3__c =2;
        update l;
        
        Lead newLead = [SELECT Company FROM Lead];
        System.assertEquals ('Teddy Test - Household', newLead.Company);
    }
    @isTest
    public static void testDelete() {
        Lead l = new Lead (LastName = 'Test', FirstName = 'Teddy');
        insert l;
        delete l;
        undelete l;
    }
}