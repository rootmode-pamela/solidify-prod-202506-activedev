global class AccountOwnerUpdate implements Database.Batchable<sObject>{

    global class accountOwnerUpdateInputs {
        @invocableVariable (required = true)
        global string accountId;
        @invocableVariable (required = true)
        global string ownerId;
    }
    
    @invocableMethod
    global static void updateAccountRelatedRecordOwner(List<accountOwnerUpdateInputs> inputs){
        if (!System.IsBatch()){
            Map<string, string> accountToOwnerMap = new Map<String, string>();
            for(accountOwnerUpdateInputs i: inputs){
                accountToOwnerMap.put(i.accountId, i.ownerId);
            }
            
            AccountOwnerUpdate b = new AccountOwnerUpdate();
            b.accountToOwnerIds = accountToOwnerMap;
        	Database.executeBatch(b, 1);
        }    
        
    }
    
    
    public Boolean firstRun = true;
	public Map<String, String> accountToOwnerIds;

	public Database.QueryLocator start(Database.BatchableContext context){
    	return Database.getQueryLocator([SELECT Id FROM Account WHERE Id IN :accountToOwnerIds.keyset()]);
	}
    
	public void execute(Database.BatchableContext bc, List<Account> scope){
        for (Account a: scope){
            updateAccountRelatedRecordOwner(a.id, accountToOwnerIds.get(a.id));
        }
    
	}

	public void finish(Database.BatchableContext context){
    
	}

    public void updateAccountRelatedRecordOwner(String accountId, String ownerId){
        if(firstRun){
            Account a = [SELECT Id, OwnerId FROM Account WHERE Id = :accountId];
            a.ownerId = ownerId;
            Map<String, Opportunity> allOpps = new Map<String, Opportunity>([SELECT Id FROM Opportunity WHERE AccountId = :accountId]);
            Map<String, Contact> allContacts = new Map<String, Contact>([SELECT Id FROM Contact WHERE AccountId = :accountId]);
     
            List<Task> tasksToUpdate = [SELECT Id, OwnerId FROM Task 
                                        WHERE IsClosed = false AND 
                                        (WhatId IN :allOpps.keySet() OR WhatId = :accountId OR WhoId IN :allContacts.keySet()) ];
         
            List<Properties__c> propertiesToUpdate = [SELECT Id, OwnerId FROM Properties__c WHERE Household__c = :accountId AND OwnerId != :ownerId];
            List<Contact> contactsToUPdate = [SELECT Id, OwnerId FROM Contact WHERE AccountId = :accountId AND OwnerId != :ownerId];
            
            for(Properties__c p: propertiesToUpdate){
                p.OwnerId = ownerId;
            }
            for(Contact c: contactsToUpdate){
                c.OwnerId = ownerId;
            }
            for(Task t: tasksToUpdate){
                t.OwnerId = ownerId;
            }
            
            encompass_By_EM__Error_Log__c log = new encompass_By_EM__Error_Log__c();
            log.encompass_By_EM__Type__c = 'account Owner Update';
            log.encompass_By_EM__Error_Message__c = 'Error during owner change for account ' + accountId + ' :';
            log.encompass_By_EM__Dump__c = '';
            Boolean saveLog = false;
            
            try{
                Database.saveResult accountResult = Database.update(a, false);
                List<Database.saveResult> contactResults = Database.update(contactsToUpdate, false);
                List<Database.saveResult> propertyResults = Database.update(propertiesToUpdate, false);
            }   
            catch (exception e){
                savelog = true;
                log.encompass_By_EM__Dump__c = log.encompass_By_EM__Dump__c + e.getMessage();
            }
            
         firstRun = false;    
            if(saveLog){
                insert log;
            }
        }
    } 
    
}