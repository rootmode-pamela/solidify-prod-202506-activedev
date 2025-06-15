trigger propertyTrigger on Properties__c (after insert) {
    
    if(trigger.isAfter && trigger.isInsert){
        propertyTriggerHandler.afterInsert(trigger.newMap.keyset());
    }

}