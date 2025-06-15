@isTest
public class leadOriginatorTest {
    @isTest
    public static void testInsert() {        
        Lead lead = new Lead(FirstName = 'Test', LastName = 'Tester', Loan_Originator__c = 'Dusty Broderick');
        insert lead;
        Lead newLead = [SELECT Id, Loan_Originator_User__c FROM Lead WHERE FirstName = 'Test'];
        User newUser = [SELECT ID FROM User WHERE FirstName = 'Dusty' AND LastName = 'Broderick'];
        System.assertEquals(newUser.Id, newLead.Loan_Originator_User__c);
    }
    @isTest
    public static void testUpdate() {
        Lead lead = new Lead(FirstName = 'Test', LastName = 'Tester');
        insert lead;
        lead.Loan_Originator__c = 'Dusty Broderick';
        update lead;
        Lead newLead = [SELECT Id, Loan_Originator_User__c FROM Lead WHERE FirstName = 'Test'];
        User newUser = [SELECT ID FROM User WHERE FirstName = 'Dusty' AND LastName = 'Broderick'];
        System.assertEquals(newUser.Id, newLead.Loan_Originator_User__c);
    }
    
}