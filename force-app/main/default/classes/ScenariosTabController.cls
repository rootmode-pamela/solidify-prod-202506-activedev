/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 08-12-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   04-03-2021   ChangeMeIn@UserSettingsUnder.SFDoc   Initial Version
**/
public with sharing class ScenariosTabController {
    @AuraEnabled(cacheable=true)
    public static List<Properties__c> getPropertyList(Id conId) {
        Contact con = [SELECT Id, AccountId FROM Contact WHERE Id =:conId LIMIT 1];
        Account household = [SELECT Id FROM Account WHERE Id = :con.AccountId];
        
        return [SELECT Id, Name, Estimated_Value__c, Property_Type__c, Occupancy__c, 
        Number_of_Units__c FROM Properties__c WHERE Household__c= :household.Id];
    }

    @AuraEnabled
    public static Properties__c getPropertyDetails(Id recordId) {
        return [SELECT Id, Name, Estimated_Value__c, Property_Type__c, Number_of_Units__c, 
        Occupancy_of_Most_Recent_Closing__c, Purpose_of_Most_Recent_Closing__c, 
        Purchase_Price_of_Most_Recent_Closing__c, Appraised_Value_of_Most_Recent_Closing__c, 
        Loan_Amt_with_MIP_of_Most_Recent_Closing__c, LTV_of_Most_Recent_Closing__c, Most_Recent_Closing__c, 
        Days_Since_Most_Recent_Closing__c, Lender_of_Most_Recent_Closing__c, Loan_Program_of_Most_Recent_Closing__c, 
        Rate_of_Most_Recent_Closing__c, Scheduled_Balance_of_Most_Recent_Closing__c, PaymentAmount__c FROM Properties__c WHERE Id= :recordId];
    }

    @AuraEnabled
    public static String createProposalButtonMethod(Id recordId) {
        System.debug('@@@ createProposalButton: ' + recordId);

        Map<String, Object> myMap = new Map<String, Object>();
        myMap.put('Recordid', recordId);
        
        Flow.Interview.Lead_Contact_create_Proposal createProposalFlow = new Flow.Interview.Lead_Contact_create_Proposal(myMap);
        createProposalFlow.start();

        List<Proposal__c> proposalList = [SELECT Id FROM Proposal__c ORDER BY CreatedDate DESC LIMIT 1];

        System.debug('@@@ proposalId: ' + proposalList.get(0).Id);

        return proposalList.get(0).Id;
    }
}