trigger OFlowLoanDeleteTrigger on Opportunity (before update, before delete) {
	if (Trigger.isUpdate) {
        OFlowLoanDeleteHandler.loanLost(Trigger.New);
    }
    if (Trigger.isDelete) {
        OFlowLoanDeleteHandler.onDelete(Trigger.Old);
    }
}