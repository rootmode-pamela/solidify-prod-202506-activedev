trigger encompass_trigger_Loan on Opportunity (after insert, after update) {
	if(!System.isBatch() && !System.isFuture()) {
		for(Opportunity i : Trigger.New) {
            if (i.encompass_By_EM__Encompass_Loan_Id__c != null)
            {
			String triggerType = trigger.isInsert ? 'insert' : 'update';
			encompass_By_EM.loanHandler.triggerHelper(i.Id, triggerType);
            }
		}
	}
}