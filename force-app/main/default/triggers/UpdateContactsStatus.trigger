trigger UpdateContactsStatus on Account (after insert , After Update) 
{
    Set<Id> accountIds = new Set<Id>();
    
    for (Account acc : Trigger.new) 
    {
        if (acc.Household_Status__c == 'Fired' && Trigger.oldMap.get(acc.Id).Household_Status__c != 'Fired')
        {
            accountIds.add(acc.Id);   
        }        
    }
    
    System.debug(' List Of Account :: ' + accountIds);
    System.debug(' List Of Account Size :: ' + accountIds.Size());
    List<Contact> conListToUpd = new List<Contact>();
    
    if (!accountIds.isEmpty()) {
        List<Contact> relatedContacts = [SELECT Id, AccountId, Contact_Status__c FROM Contact WHERE AccountId IN :accountIds];
        
        System.debug(' List related Contacts :: ' + relatedContacts);
        System.debug(' List related Contacts Size :: ' + relatedContacts.size());
        
        for (Contact con : relatedContacts) 
        {
            con.Id = con.Id;
            con.Contact_Status__c = 'Fired';
            conListToUpd.add(con);
        }
        
        if (!conListToUpd.isEmpty()) 
        {
            update conListToUpd;
            System.debug(' conListToUpd ::: ' + conListToUpd);
        }
    }
}