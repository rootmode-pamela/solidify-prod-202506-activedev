public class loanOriginatorHandler {
    
    public static void afterInsert(List<Opportunity> oppList){
        List<String> accountIds = new List<String>();
        List<String> oppIds = new LIst<String>();
        for(Opportunity opp: oppList){
            accountIds.add(opp.AccountId);
            oppIds.add(opp.id);
        }
        
        Map<String, Account> accounts = new Map<String, Account>([SELECT Id, OwnerId FROM Account WHERE Id IN :accountIds]);
        List<Opportunity> allOtherOpps = [SELECT Id, CloseDate, AccountId FROM Opportunity WHERE AccountID IN :accountIds and Id NOT IN :oppIds AND IsClosed = false];

		Map<String, List<Opportunity>> accountOppsMap = new Map<String, List<Opportunity>>();
        for(Opportunity o: allOtherOpps){
            List<Opportunity> accountopps = new List<Opportunity>();
            if(accountOppsMap.containsKey(o.Accountid)){
                accountopps = accountOppsMap.get(o.AccountId);
            }
            accountopps.add(o);
            accountOppsMap.put(o.AccountId, accountOpps);    
        }
        for(Opportunity opp: oppList){
            
        	if(accounts.get(opp.AccountId)?.ownerId!=null &&  accounts.get(opp.AccountId).ownerId != opp.OwnerId){
                    if(!accountOppsMap.containsKey(opp.AccountId)){
						scheduleBatchUpdate(opp);
                    } else {
                        Boolean runOwnerUpdate = true;
                        for(Opportunity o: accountOppsMap.get(opp.AccountId)){
                            if(o.closeDate>opp.CloseDate) {
                                runOwnerUpdate = false;
                            }
                        }
                        if(runOwnerUpdate){
                            scheduleBatchUpdate(opp);
                        }
                    }
        	}	
        }

    
    }
    
    public static void afterUpdate(List<Opportunity> oppLIst, Map<Id, Opportunity> oldMap){
        List<String> accountIds = new List<String>();
        
        for(Opportunity opp: oppList){
            system.debug(opp.ownerId + ':' + oldMap.get(opp.Id).OwnerId );
            accountIds.add(opp.AccountId);
        }
        
        Map<String, Account> accounts = new Map<String, Account>([SELECT Id, OwnerId FROM Account WHERE Id IN :accountIds]);
        List<Opportunity> allOtherOpps = [SELECT Id, CloseDate, AccountId FROM Opportunity WHERE AccountID IN :accountIds and Id NOT IN :oldMap.keySet() AND IsClosed = false];

		Map<String, List<Opportunity>> accountOppsMap = new Map<String, List<Opportunity>>();
        for(Opportunity o: allOtherOpps){
            List<Opportunity> accountopps = new List<Opportunity>();
            if(accountOppsMap.containsKey(o.Accountid)){
                accountopps = accountOppsMap.get(o.AccountId);
            }
            accountopps.add(o);
            accountOppsMap.put(o.AccountId, accountOpps);    
        }
        
        for(Opportunity opp: oppList){
        	if(opp.OwnerId != oldMap.get(opp.Id).OwnerId && opp.OwnerId != null){
                if(accounts.get(opp.AccountId).ownerId != opp.OwnerId){
                    if(!accountOppsMap.containsKey(opp.AccountId)){
						scheduleBatchUpdate(opp);
                    } else {
                        Boolean runOwnerUpdate = true;
                        for(Opportunity o: accountOppsMap.get(opp.AccountId)){
                            if(o.closeDate>opp.CloseDate) {
                                runOwnerUpdate = false;
                            }
                        }
                        if(runOwnerUpdate){
                            scheduleBatchUpdate(opp);
                        }
                    }
                }
            
        	}
        }
        
    }
    
    public static void scheduleBatchUpdate(Opportunity o){
       loanOwnerUpdate__e event = new loanOwnerUpdate__e();
        event.AccountId__c = o.AccountId;
        event.OwnerId__c = o.ownerId;
        eventBus.publish(event);
    }
    
}