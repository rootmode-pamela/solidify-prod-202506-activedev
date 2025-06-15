trigger loanOriginatorTrigger on Opportunity (after insert, after update) {
    if(Trigger.isInsert) {
        if(Trigger.isAfter){
            loanOriginatorHandler.afterInsert(Trigger.new);
        }
    }
    
    if(Trigger.isUpdate) {
        if(Trigger.isAfter){
            loanOriginatorHandler.afterUpdate(Trigger.new, Trigger.oldMap);
        }
    }
    
}