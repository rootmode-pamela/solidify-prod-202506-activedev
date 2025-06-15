trigger loanOwnerUpdateEventTrigger on loanOwnerUpdate__e (after insert) {

		for(loanOwnerUpdate__e e: Trigger.new){
        	AccountOwnerUpdate b = new AccountOwnerUpdate();
        	Map<String, String> accountToOwner = new Map<String, String>();
        	accountToOwner.put(e.AccountId__c, e.OwnerId__c);
        	b.accountToOwnerIds = accountToOwner;
        	Database.executeBatch(b, 1);   
        }
    
}