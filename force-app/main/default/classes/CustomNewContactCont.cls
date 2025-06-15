public class CustomNewContactCont {

    @AuraEnabled
    public static String saveContactOtherHelper(Contact contactRec, String companyName){
        try {
//            Id companyRecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('Company').getRecordTypeId();
//            Account newAccount = new Account();
//            newAccount.Name = companyName;
//            newAccount.RecordTypeId = companyRecordTypeId;
//            insert newAccount;

            contactRec.AccountId = companyName;
            insert contactRec;

            return contactRec.Id;
        } catch (Exception e) {
            return 'Error: ' + e.getMessage();
        }
    }

    @AuraEnabled
    public static LookupSearchResult saveContactClientHelper(Contact contactRec, Contact contact2Rec) {
        system.debug(contactRec);
        system.debug(contact2Rec);
		string accountName;

		if(contact2Rec.FirstName != '' && contact2Rec.FirstName != null){
            if(contactRec.LastName == contact2Rec.LastName){
                accountName = contactRec.FirstName + ' & ' + contact2Rec.FirstName + ' ' + contactRec.LastName + ' Household';
            } else {
                accountName = contactRec.FirstName + ' ' + contactRec.LastName + ' & ' + contact2Rec.FirstName + ' ' + contact2Rec.LastName + ' Household';
            }
        } else {
        	accountName = contactRec.FirstName + ' ' + contactRec.LastName + ' Household' ;
        }        

        if (contactRec.AccountId == null) {
            Id companyRecordTypeId =
                    Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('Household').getRecordTypeId();
            Account newAccount = new Account();
            newAccount.Name = accountName;
            newAccount.RecordTypeId = companyRecordTypeId;
            insert newAccount;
            contactRec.AccountId = newAccount.Id;
        }
			

        system.debug(contactRec);
        insert contactRec;
        if(!String.IsBlank(contact2Rec.FirstName)){
            system.debug('Inserting Contact 2');
        contact2Rec.AccountId = contactRec.AccountId;
        insert contact2Rec;
        }
        contactRec = [SELECT Id, Name FROM Contact WHERE Id = :contactRec.Id];
        return new LookupSearchResult(contactRec.Id, 'Contact', 'standard:contact', contactRec.Name,
                        'Contact • ' + contactRec.Name);
    }

    private final static Integer MAX_RESULTS = 5;
    @AuraEnabled(cacheable=true)
    public static List<LookupSearchResult> searchAccount(String searchTerm, List<String> selectedIds, String anOptionalParam) {
        System.debug('@@@ searchAccount');
        searchTerm += '*';

        Id companyRecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('Company').getRecordTypeId();

        List<List<SObject>> searchResults = [FIND :searchTerm IN ALL FIELDS RETURNING
        Account (Id, Name WHERE id NOT IN :selectedIds AND RecordTypeId =: companyRecordTypeId)
            LIMIT :MAX_RESULTS];

        List<LookupSearchResult> results = new List<LookupSearchResult>();

        String accountIcon = 'standard:account';
        Account [] accounts = ((List<Account>) searchResults[0]);
        System.debug('@@@ accounts: ' + accounts);
        for (Account account : accounts) {
            results.add(new LookupSearchResult(account.Id, 'Account', accountIcon, account.Name, 'Account • '+ account.Name));
        }

        return results;
    }

    @AuraEnabled(cacheable=true)
    public static List<LookupSearchResult> searchUser2(String searchTerm, List<String> selectedIds, String anOptionalParam) {
        System.debug('@@@ seachUser');
        searchTerm += '*';

        List<List<SObject>> searchResults = [FIND :searchTerm IN ALL FIELDS RETURNING
        User (Id, Name WHERE id NOT IN :selectedIds)
            LIMIT :MAX_RESULTS];

        List<LookupSearchResult> results = new List<LookupSearchResult>();

        String userIcon = 'standard:user';
        User [] users = ((List<User>) searchResults[0]);
        System.debug('@@@ users: ' + users);
        for (User user : users) {
            results.add(new LookupSearchResult(user.Id, 'User', userIcon, user.Name, 'User • '+ user.Name));
        }

        return results;
    }

    @AuraEnabled
    public static LookupSearchResult loadExistingUser2(){
        String userIcon = 'standard:user';
        User user = [SELECT Id, Name FROM User WHERE Id =: UserInfo.getUserId()];
        LookupSearchResult lookupToReturn = new LookupSearchResult(user.Id, 'User', userIcon, user.Name, 'User • '+ user.Name);
        return lookupToReturn;  
    }

    @AuraEnabled
    public static LookupSearchResult getRecentlyCreatedAccount(){
        Account accountRec = [SELECT Id, Name FROM Account ORDER BY CreatedDate DESC LIMIT 1];

        String accountIcon = 'standard:account';
        LookupSearchResult lookupToReturn = new LookupSearchResult(accountRec.Id, 'Account', accountIcon, accountRec.Name, 'Account • '+ accountRec.Name);
        return lookupToReturn;  
    }

    @AuraEnabled(cacheable=true)
    public static List<LookupSearchResult> searchContact(String searchTerm, List<String> selectedIds, String anOptionalParam) {
        return CustomNewLoanCont.searchContact(searchTerm, selectedIds, anOptionalParam);
    }

}