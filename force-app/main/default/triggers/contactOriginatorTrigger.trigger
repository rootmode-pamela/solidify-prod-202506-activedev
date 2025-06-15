trigger contactOriginatorTrigger on Contact (before insert, before update) {
    if(Trigger.isInsert) {
        contactOriginatorHandler.onInsert(Trigger.new);
    }
    if(Trigger.isUpdate) {
        contactOriginatorHandler.onUpdate(Trigger.new, Trigger.oldMap);
    }

}