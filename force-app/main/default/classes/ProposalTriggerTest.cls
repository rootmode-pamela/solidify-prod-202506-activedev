@isTest
public class ProposalTriggerTest {

    @TestSetup
    static void testData(){
        Account a = new Account(Name = 'Test Household');
        insert a;

        Contact c = new Contact(FirstName = 'Borrower', LastName = 'Test', accountId = a.Id);
        insert c;

        Properties__c p = new Properties__c(Name = 'Borrower - 1415 State Street', Property_Street__c = '1415 State Street', Property_City__c = 'San Diego' );
        insert p;

        Opportunity l = new Opportunity(Name = 'Borrower State Street Purchase', CloseDate = Date.Today().addYears(-1), StageName = 'New', AccountId = a.Id, ContactId = c.Id, Subject_Property_Name__c = p.Id );
        insert l;
        l.StageName = 'Closed Won';
        update l;

        OpportunityContactRole ocr = new OpportunityContactRole(ContactId = c.id, OpportunityId= l.id, Role = 'Borrower');
        insert ocr;
    }

    @isTest
    public static void testRefiProposal(){
        Opportunity o = [SELECT Id FROM Opportunity];
        Contact c = [SELECT Id FROM Contact];
        Proposal__c p = new Proposal__c (
            Name = 'Test', 
            recordTypeId = Constants.REFI_PROPOSAL_RECORDTYPEID, 
            Most_recent_Loan__c = o.id, 
            Borrower__c = c.id,
            Current_Loan_Amount__c = 350000,
            New_Loan_Amount__c = 250000,
            Current_Interest_Rate__c = 4.25,
            New_Loan_Interest_Rate__c = 3.75,
            Current_Loan_Term__c = 30,
            New_Loan_Term__c = 30);
        insert p;
        p.New_Loan_Amount__c = 300000;
        p.New_Loan_Interest_Rate__c = 2.75;
        p.Est_Fees_Lender__c = 2000;
        p.Global_Pricing_Adjuster__c = 0;
        p.Origination_Fee__c = 1.5;
        update p;
        
        Proposal__c newProp = [SELECT Name, New_Loan_Amount__c FROM Proposal__c];
        System.assertEquals (300000, newProp.New_Loan_Amount__c);
    }

    @isTest
    public static void testRateAnalysisProposal(){
        Opportunity o = [SELECT Id FROM Opportunity];
        Contact c = [SELECT Id FROM Contact];
        Proposal__c p = new Proposal__c (
            Name = 'Test', 
            recordTypeId = Constants.RATE_ANALYSIS_RECORDTYPEID, 
            Most_recent_Loan__c = o.id, 
            Borrower__c = c.id,
            New_Loan_Amount__c =300000,
            Fixed_Term_Years__c = 30,
            Origination_Fee__c = 1.5,
            Rate_1__c = 1.5,
            Total_Cost_1__c = 3000,
            Price_1__c = 1.2,
            Rate_2__c = 2,
            Total_Cost_2__c = 3000,
            Price_2__c = .6,
            Rate_3__c = 2.5,
            Total_Cost_3__c = 3000,
            Price_3__c = 0,
            Rate_4__c = 3,
            Total_Cost_4__c = 3000,
            Price_4__c = 0,
            Rate_5__c = 3.5,
            Total_Cost_5__c = 3000,
            Price_5__c = 0,
            Rate_6__c = 4,
            Total_Cost_6__c = 3000,
            Price_6__c = 0);

        insert p;
       
        p.Est_Fees_Lender__c = 2000;
        p.Global_Pricing_Adjuster__c = 1;   
        p.Add_Fees_to_Loan_Balance__c = 'No';
        update p;
        
        Proposal__c newProp = [SELECT Rate_6__c FROM Proposal__c];
        System.assertEquals (4, newProp.Rate_6__c);

        p.Override_Comp__c = true;
        p.Add_Fees_to_Loan_Balance__c = 'Yes';
        update p;
    }

    @isTest
    public static void testLoanCompProposal(){ 

        Opportunity o = [SELECT Id FROM Opportunity];
        Contact c = [SELECT Id FROM Contact];
        Proposal__c p = new Proposal__c (
            Name = 'Test', 
            recordTypeId = Constants.LOAN_COMP_RECORDTYPEID, 
            Most_recent_Loan__c = o.id, 
            Borrower__c = c.id,
            Term_Due_Scenario_1__c = 30,
            Rate_Scenario_1__c = 2,
            First_Loan_Amount_Scenario_1__c = 200000,
            AppraisalFeeS1__c = 2000,
            CancelMIAtS1__c = 2,
            PaymentResultS1__c = 2,
            UFMIPFFS1__c = .2,
            EstimatedMortgageInsuranceScenario1__c = 2);
        insert p;

        p.CopytoScenarios2and3__c = true;
        p.Term_Due_Scenario_2__c = 30;
        p.Rate_Scenario_2__c = 3;
        p.First_Loan_Amount_Scenario_2__c =100000;
        p.AppraisalFeeS2__c = 3000;
        p.PaymentResultS2__c = 2;
        p.UFMIPFFS2__c = .22;
        p.EstimatedMortgageInsuranceScenario2__c = 200; 
        p.CancelMIAtS2__c = 2;
        p.First_Loan_Amount_Scenario_3__c =250000;
        p.PaymentResultS3__c = 2;
        p.UFMIPFFS3__c = .2;
        p.EstimatedMortgageInsuranceScenario3__c = 2; 
        p.AppraisalFeeS3__c = 1000;
        p.CancelMIAtS3__c = 2;
        p.Term_Due_Scenario_3__c = 15;
        p.Rate_Scenario_3__c = 2;
        p.Global_Pricing_Adjuster__c = 0;
        p.Origination_Fee__c = 1.5;
        update p;
        
        Proposal__c newProp = [SELECT Origination_Fee__c FROM Proposal__c];
        System.assertEquals (1.5, newProp.Origination_Fee__c);
    }


}