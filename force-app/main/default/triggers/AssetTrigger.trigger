trigger AssetTrigger on Asset__c (after insert, after update) {
    
    if(Trigger.IsInsert){
        AssetTriggerHandler.handleAfterInsert(Trigger.New);
    } else {
        AssetTriggerHandler.handleAfterUpdate(Trigger.New, Trigger.oldMap);
    }
    
    
    

}