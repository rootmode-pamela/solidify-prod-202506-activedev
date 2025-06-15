@isTest
public class solidify_ConvertClass_Test {

    @testSetup
    public static void testData(){
	    insert new Lead(FirstName = 'Richie', LastName = 'Rich');        
        insert new Lead(FirstName = 'Daddy', LastName = 'Warbucks');   
   
		Account a = new Account(Name = 'Richie Rich - Household');
		insert a;
        Contact c = new Contact(LastName = 'Rich', AccountId = a.id);
        insert c;
        Opportunity o = new Opportunity(Name = 'Loan XYZ', Opportunity_Identifier__c = 'Loan XYZ', CloseDate = Date.Today().AddDays(15), StageName = 'Application');
        insert o;
    }
    

    @isTest
    public static void testLeadConvert(){
        Lead l = [SELECT Id FROM LEAD WHERE LastName = 'Rich' LIMIT 1];
        ApexPages.StandardController c = new ApexPages.StandardController(l);
		solidify_leadConvert convert  = new solidify_leadConvert(c);
        convert.DoConvert();
        convert.doLoanSearch();
        
    }
}