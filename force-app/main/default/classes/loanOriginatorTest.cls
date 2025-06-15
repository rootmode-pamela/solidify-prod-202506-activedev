@isTest
public class loanOriginatorTest {
    @isTest
    public static void testInsert() {        
        Opportunity loan = new Opportunity(Name = 'Test', Loan_Originator__c = 'Dusty Broderick', CloseDate = Date.today(), StageName = 'Prospect');
        insert loan;
        Opportunity newLoan = [SELECT Id, Loan_Originator_User__c FROM Opportunity WHERE Name = 'Test'];
        User newUser = [SELECT ID FROM User WHERE FirstName = 'Dusty' AND LastName = 'Broderick'];
        System.assertEquals(newUser.Id, newLoan.Loan_Originator_User__c);
    }
    @isTest
    public static void testUpdate() {
        Opportunity loan = new Opportunity(Name = 'Test', CloseDate = Date.today(), StageName = 'Prospect');
        insert loan;
        loan.Loan_Originator__c = 'Dusty Broderick';
        update loan;
        Opportunity newLoan = [SELECT Id, Loan_Originator_User__c FROM Opportunity WHERE Name = 'Test'];
        User newUser = [SELECT ID FROM User WHERE FirstName = 'Dusty' AND LastName = 'Broderick'];
        System.assertEquals(newUser.Id, newLoan.Loan_Originator_User__c);
    }
    
}