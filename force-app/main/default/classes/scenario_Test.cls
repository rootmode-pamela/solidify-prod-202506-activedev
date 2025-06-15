@isTest
public with sharing class scenario_Test {
    @isTest
    public static void testAll() {
        Scenario__c s = new Scenario__c(Purpose__c = 'Purchase');
        insert s;
        scenario.createProposalButtonMethod(s.Id);

    }
}