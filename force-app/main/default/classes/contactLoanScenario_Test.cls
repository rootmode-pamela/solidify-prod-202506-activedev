@isTest
private class contactLoanScenario_Test {
    @isTest static void checkMethods(){
        Account acc = new Account(Name='Test Account');
        insert acc;
        Contact con = new Contact(LastName = 'Test Contact',
                                 AccountId = acc.Id,
                                 Number_of_Units__c = '2',
                                 Occupancy__c = 'Primary',
                                 Estimated_Value__c = 700000,
                                 Current_Program__c = 'Test Program',
                                 Current_Balance__c = 60000,
                                 Current_Rate__c = 3.15,
                                 Current_Payment__c = 1435);
                                    
        insert con;
        Opportunity opp = new Opportunity(Name = 'Test Loan',
                                         StageName = 'Closed Won',
                                         CloseDate = Date.today());
        insert opp;
        Properties__c prop = new Properties__c(Household__c = acc.Id,
                                              Most_Recent_Closed_Opportunity__c = opp.Id);
        insert prop;
        
       opp.Subject_Property_Name__c = prop.Id;
        update opp;
	
        contactScenarioController.hasActiveLoans(con.Id);
        contactScenarioController.updateLoanDetails(con.Id, prop.Id);
    }
}