trigger ProposalTrigger on Proposal__c (before insert, before update, after insert, after update, after undelete) {

    if(trigger.isBefore){
        if(trigger.isInsert){
            ProposalTriggerHandler.beforeInsert(trigger.new);
            ProposalTriggerHandler.beforeUpdate(trigger.new);
        }
        
        if(trigger.isUpdate){
            ProposalTriggerHandler.beforeUpdate(trigger.new);

        }
    }
    
    if(trigger.IsAfter){
        system.debug('AfterTrigger RunCount '+ triggerRunCount.runCount);
        if(triggerRunCount.runCount==0){
            triggerRunCount.runCount ++;
            ProposalTriggerHandler.afterInsertUpdate(trigger.newMap.keyset(), trigger.oldMap );      
        }

    }
}