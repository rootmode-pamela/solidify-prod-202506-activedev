@isTest
public class solidifyQuotesTrigger_Test {

    @testSetup
    public static void setup(){
        Account a = New Account(Name = 'TestAccount');
        insert a;
        Opportunity l = new Opportunity(Name = 'TestLoan', AccountId = a.id, StageName = 'New', CloseDate = date.Today());
        insert l;
    	Quote q = new Quote (Name = 'Test', OpportunityId = l.id);
    	insert q;
    }
    
    @isTest
    public static void testUpdate(){
     test.startTest();
    	Quote q = [SELECT Id, Current_Loan_Amount__c, Current_Interest_Rate__c, Current_Loan_Term__c, 
                   Current_Loan_First_Payment__c, Current_Loan_Last_Payment_Made__c, New_Loan_Amount__c,
                   New_Loan_Interest_Rate__c, New_Loan_Term__c, Current_Loan_Monthly_Payment__c FROM Quote LIMIT 1];
    	q.Name = 'TestUpdate';
        q.Current_Loan_Amount__c = 500000;
    	q.Current_Interest_Rate__c = 4.140;
   		q.Current_Loan_Term__c = 360;
        q.Current_Loan_First_Payment__c = date.valueOf('2019-01-01');
        q.Current_Loan_Last_Payment_Made__c = date.valueOf('2019-10-08');
        q.New_Loan_Amount__c = 492800;
        q.New_Loan_Interest_Rate__c = 3.99;
        q.New_Loan_Term__c = 360;
        update q;
        
        Quote q2 = [SELECT Id, Current_Loan_Balance_Remaining__c, New_Loan_Payment_To_Keep_Term__c, 
                    Current_Loan_Payments_Remaining__c, Current_Loan_Monthly_Payment__c, New_Loan_Monthly_Payment__c, Same_Payment_Term_Reduction__c from Quote LIMIT 1];
        system.assertEquals(492863.81, q2.Current_Loan_Balance_Remaining__c);
        system.assertEquals(2427.61, q2.Current_Loan_Monthly_Payment__c);
        system.assertEquals(2349.86, q2.New_Loan_Monthly_Payment__c);
        system.debug(q2.Current_Loan_Payments_Remaining__c);
        system.assertEquals(2384.80, q2.New_Loan_Payment_To_Keep_Term__c);
        system.assertEquals(11, q2.Same_Payment_Term_Reduction__c);
        
     test.stopTest();
	
        
        
    }

}