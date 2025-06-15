@isTest
public with sharing class ScenarioTriggerHandler_Test {
    @isTest
    public static void testAll() {
        scenario__c s = new Scenario__c(
        Purpose_Scenario_1__c = 'Purchase',
        DownPaymentScenario1__c = 2000);
        insert s;
        s.CopyToScenarios2and3__c = true;
        update s;

    }
}