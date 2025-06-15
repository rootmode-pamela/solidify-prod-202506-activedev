@isTest
public class solidify_ProposalTrigger_Test {

    @testSetup
    public static void setup(){
        Account a = New Account(Name = 'TestAccount');
        insert a;
        Opportunity v1 = new Opportunity(Name = 'TestLoan', AccountId = a.id, StageName = 'New', CloseDate = date.Today());
        insert v1;
    	Proposal__c refiProp = new Proposal__c (Name = 'Test', Most_Recent_Loan__c = v1.id, RecordTypeId='012f4000000OatvAAC');
    	insert refiProp;
        
        Proposal__c rateProp =  new Proposal__c (Name = 'Test Rate',Most_Recent_Loan__c =v1.id,RecordTypeId='012f4000000ObpJAAS',
                                                 Rate_1__c = 3.15,Rate_2__c=3.2,Rate_3__c=3.3,Rate_4__c=3.4,Rate_5__c=3.5,Rate_6__c=3.6,
                                                 Price_1__c=0.6,Price_2__c=0.5,Price_3__c=0.4,Price_4__c=0.3,Price_5__c=0.2,Price_6__c=0.1,
                                                Fixed_Term_Years__c=30,Monthly_PI_Pmt6__c=10,Monthly_PI_Pmt1__c=1,Monthly_PI_Pmt2__c=2,
                                                Monthly_PI_Pmt3__c=3,Monthly_PI_Pmt4__c=4,Monthly_PI_Pmt5__c=5,Total_Loan_Amount1__c=100,Total_Loan_Amount2__c=200,
                                                Total_Loan_Amount3__c=300,Total_Loan_Amount4__c=400,Total_Loan_Amount5__c=500,Total_Loan_Amount6__c=600,
                                                Total_Cost_1__c=1,Total_Cost_2__c=2,Total_Cost_3__c=3,Total_Cost_4__c=4,Total_Cost_5__c=5,Total_Cost_6__c=6);
        insert rateProp;
        
        
    }
    
    @isTest
    public static void testUpdate(){
     test.startTest();
    	Proposal__c q = [SELECT Id, Current_Loan_Amount__c, Current_Interest_Rate__c, Current_Loan_Term__c, 
                   Current_Loan_First_Payment__c, Current_Loan_Last_Payment_Made__c, New_Loan_Amount__c,
                   New_Loan_Interest_Rate__c, New_Loan_Term__c, Current_Loan_Monthly_Payment__c FROM Proposal__c WHERE RecordTypeId ='012f4000000OatvAAC' LIMIT 1];
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
        
        Proposal__c q2 = [SELECT Id, Current_Loan_Balance_Remaining__c, New_Loan_Payment_To_Keep_Term__c, 
                    Current_Loan_Payments_Remaining__c, Current_Loan_Monthly_Payment__c, New_Loan_Monthly_Payment__c, 
                    Same_Payment_Term_Reduction__c FROM Proposal__c WHERE RecordTypeId ='012f4000000OatvAAC' LIMIT 1];

        system.assertEquals(2427.61, q2.Current_Loan_Monthly_Payment__c);
        system.assertEquals(2349.86, q2.New_Loan_Monthly_Payment__c);
        system.debug(q2.Current_Loan_Payments_Remaining__c);
        system.assertEquals(2384.80, q2.New_Loan_Payment_To_Keep_Term__c);
        system.assertEquals(11, q2.Same_Payment_Term_Reduction__c);
        
     test.stopTest();
	
        
        
    }

}