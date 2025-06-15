trigger ConRelatedAccountUpdate on Contact (after insert, after update) 
{    
    if (contactTriggerHelper.isTriggerRunning) 
    {
        return;
    }
    
    contactTriggerHelper.isTriggerRunning = true;
    
    try 
    {        
        Set<Id> accountIds = new Set<Id>();
        List<Account> accListToUpdate = new List<Account>();
        List<Contact> conListToUpdate = new List<Contact>();
        
        if (Trigger.isUpdate) 
        {
            for (Contact contact : Trigger.new) 
            {
                if (contact.AccountId != null && contact.Contact_Status__c == 'Fired') 
                { 
                    accountIds.add(contact.AccountId);
                    system.debug('Account Id ::'+accountIds);
                }
            }
        }
        
        if (!accountIds.isEmpty()) 
        {
            // Query the Accounts
            List<Account> accountsToUpdate = [SELECT Id, Household_Status__c FROM Account WHERE Id IN :accountIds];
            system.debug('Query Account ::'+accountsToUpdate);
            
            for (Account acc : accountsToUpdate) 
            {
                acc.Household_Status__c = 'Fired';
                accListToUpdate.add(acc);
            }
            
            if (!accListToUpdate.isEmpty()) 
            {
                update accListToUpdate;
                system.debug('Account to update ::'+accListToUpdate);
            }
            
            List<Contact> relatedContacts = [SELECT Id, AccountId, Contact_Status__c FROM Contact WHERE AccountId IN :accountIds];
            system.debug('relatedContacts ::'+relatedContacts);
            
            for (Contact con : relatedContacts) 
            {
                con.Contact_Status__c = 'Fired';
                conListToUpdate.add(con);
            }
            
            if (!conListToUpdate.isEmpty())
            {
                update conListToUpdate;
            }
        }
    } 
    catch (Exception e) 
    {        
        system.debug('Exception: ' + e.getMessage());
    } 
    finally 
    {        
        contactTriggerHelper.isTriggerRunning = false;
    }
}