public class solidifyReferralSearchController {
    @AuraEnabled
    public static String getReferredContacts(String referredById){                
       	
        //Form an SOQL to fetch the ids
            String query = 'SELECT AccountId FROM Contact WHERE Referred_By__c = \'' + referredById + '\'';
            System.debug(query);
        	List<contact> contactList;    
        contactList = Database.query(query);
        system.debug(contactList);
        string accountIds;
        accountIds = '';
        For (Contact c : contactList){
            accountIds =  accountIds + '\'' + c.AccountId + '\', ';
            system.debug('building account ids:' + accountIds);
        }
        accountIds = accountIds.trim();
        accountIds = accountIds.left(accountIds.length()-1);
        system.debug(accountIds);
		return accountIds;

    }

}