@isTest
public class loanTriggerHandler_Test {

    @isTest
    public static void testAll() {        
        Account a = New Account(Name = 'Test Account');
        insert a;
        Opportunity oldloan = new Opportunity(Name = 'Test older', AccountId = a.id, CloseDate = Date.today().addDays(-45), StageName = 'Prospect');
        insert oldloan;
        Opportunity loan = new Opportunity(Name = 'Test', AccountId = a.id, Loan_Originator__c = 'Dusty Broderick', CloseDate = Date.today(), StageName = 'Prospect');
        insert loan;
        Opportunity newLoan = [SELECT Id, OwnerId, AccountId FROM Opportunity WHERE Name = 'Test'];

		test.startTest();
        User u = [SELECT Id FROM User where UserType = 'Standard' AND Id != :newloan.OwnerId LIMIT 1];
        Assert.areNotEqual(null, u.id);
        newloan.OwnerId = u.id;
        update newloan;

        test.stopTest();
       
    }
    
}