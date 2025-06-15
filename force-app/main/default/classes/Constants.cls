public class Constants {
    
    public static final String REFI_PROPOSAL_RECORDTYPEID = Schema.SObjectType.Proposal__c.getRecordTypeInfosByDeveloperName().get('Refi').getRecordTypeId();
    public static final String RATE_ANALYSIS_RECORDTYPEID = Schema.SObjectType.Proposal__c.getRecordTypeInfosByDeveloperName().get('Rate_Analysis').getRecordTypeId();
    public static final String LOAN_COMP_RECORDTYPEID = Schema.SObjectType.Proposal__c.getRecordTypeInfosByDeveloperName().get('Comparison_Analysis').getRecordTypeId();
    public static final String SCENARIO_RECORDTYPEID = Schema.SObjectType.Proposal__c.getRecordTypeInfosByDeveloperName().get('Scenario').getRecordTypeId();

}