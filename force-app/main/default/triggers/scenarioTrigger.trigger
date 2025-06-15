trigger scenarioTrigger on Scenario__c (before insert, before update) {

    scenarioTriggerHandler.beforeUpdate(trigger.new);

}