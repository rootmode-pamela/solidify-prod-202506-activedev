trigger leadOriginatorTrigger on Lead (before insert, before update) {
    if(Trigger.isInsert) {
        leadOriginatorHandler.onInsert(Trigger.new);
    }
    if(Trigger.isUpdate) {
        leadOriginatorHandler.onUpdate(Trigger.new, Trigger.oldMap);
    }

}