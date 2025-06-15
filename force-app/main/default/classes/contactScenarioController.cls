public class contactScenarioController {
	@AuraEnabled
    public static List<Properties__c> hasActiveLoans(String recordId){
		Contact con = [SELECT AccountId FROM Contact WHERE Id =:recordId LIMIT 1];
        Account acct = [SELECT Id FROM Account WHERE Id = :con.AccountId LIMIT 1];
        List<Properties__c> props = [SELECT Id, Property_Street__c FROM Properties__c WHERE Household__c  =:acct.Id AND Most_Recent_Closed_Opportunity__c != null];
        if(props.size() != 0){
            return props;
        }        
        else {
            return null;
        }       
    }

    @AuraEnabled
    public static void updateLoanDetails(String contactId, String propId){
        Contact con = [SELECT AccountId, Number_of_Units__c,Occupancy__c, Estimated_Value__c,Current_Program__c,Current_Balance__c,Current_Rate__c,Current_Payment__c 
                       FROM Contact 
                       WHERE Id =: contactId 
                       LIMIT 1];
        
        Account acct = [SELECT Id FROM Account WHERE Id =: con.AccountId LIMIT 1];
        Properties__c prop = [SELECT Id FROM Properties__c WHERE Household__c =: acct.Id LIMIT 1];
        
        Opportunity opp = [SELECT Occupancy__c,Subject_Prop_Type__c,Subject_Prop_No_Units__c,Loan_Program__c,Current_Schedule_Balance__c,Interest_Rate__c,Payment_Amount__c,Price_Est_Value__c
                          FROM Opportunity 
                          WHERE Subject_Property_Name__c = :prop.Id LIMIT 1];
        
        con.Number_of_Units__c = opp.Subject_Prop_No_Units__c;
        con.Subject_Property_Type__c = opp.Subject_Prop_Type__c;
        con.Occupancy__c = opp.Occupancy__c;
        con.Current_Program__c = opp.Loan_Program__c;
        con.Current_Balance__c = opp.Current_Schedule_Balance__c;
        con.Current_Rate__c = opp.Interest_Rate__c;
        con.Current_Payment__c = opp.Payment_Amount__c;
        con.Estimated_Value__c = opp.Price_Est_Value__c;
        update con;
    }  
}