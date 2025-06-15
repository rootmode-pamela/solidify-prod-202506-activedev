trigger OFlowLeadDeleteTrigger on Lead (before update, before delete) {
    if (Trigger.isUpdate) {
        OFlowLeadDeleteHandler.onConvert(Trigger.New);
    }
    if (Trigger.isDelete) {
        OFlowLeadDeleteHandler.onDelete(Trigger.Old);
    }
}