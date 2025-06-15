public class CustomNewLoanCont {
    

    @AuraEnabled
    public static List<PicklistWrapper> getPicklistValues(String picklistField){
        List<PicklistWrapper> plValues = new List<PicklistWrapper>();
        Schema.SObjectType objType = Schema.getGlobalDescribe().get('Opportunity');
        Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
        Schema.DescribeFieldResult objFieldInfo = objDescribe.fields.getMap().get(picklistField).getDescribe();
        List<Schema.PicklistEntry> picklistvalues = objFieldInfo.getPicklistValues();
        for(Schema.PicklistEntry plv: picklistvalues) {
            PicklistWrapper plWrap = new PicklistWrapper();
            plWrap.label = plv.getLabel();
            plWrap.text = plv.getValue();
            plWrap.isDefault = plv.isDefaultValue();
            plValues.add(plWrap);
        }
        return plValues;
    }

    private final static Integer MAX_RESULTS = 5;
    @AuraEnabled(cacheable=true)
    public static List<LookupSearchResult> searchContact(String searchTerm, List<String> selectedIds, String anOptionalParam) {
        System.debug('@@@ searchContact');
        searchTerm += '*';

        List<List<SObject>> searchResults = [FIND :searchTerm IN ALL FIELDS RETURNING
        Contact (Id, Name, LastName WHERE id NOT IN :selectedIds)
            LIMIT :MAX_RESULTS];

        List<LookupSearchResult> results = new List<LookupSearchResult>();

        String contactIcon = 'standard:contact';
        Contact [] contacts = ((List<Contact>) searchResults[0]);
        System.debug('@@@ contacts: ' + contacts);
        for (Contact contact : contacts) {
            results.add(new LookupSearchResult(contact.Id, 'Contact', contactIcon, contact.Name, 'Contact • '+ contact.Name, contact.LastName));
        }
        System.debug('@@@ results: ' + results);

        return results;
    }

    @AuraEnabled(cacheable=true)
    public static List<LookupSearchResult> searchAccount(String searchTerm, List<String> selectedIds, String anOptionalParam) {
        System.debug('@@@ searchAccount');
        searchTerm += '*';

        List<List<SObject>> searchResults = [FIND :searchTerm IN ALL FIELDS RETURNING
        Account (Id, Name WHERE id NOT IN :selectedIds)
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
    public static List<LookupSearchResult> searchProperty(String searchTerm, List<String> selectedIds, String anOptionalParam) {
        System.debug('@@@ searchProperty');
        searchTerm += '*';

        List<List<SObject>> searchResults = [FIND :searchTerm IN ALL FIELDS RETURNING
        Properties__c (Id, Name, Property_Street__c, Property_State__c WHERE id NOT IN :selectedIds)
            LIMIT :MAX_RESULTS];

        List<LookupSearchResult> results = new List<LookupSearchResult>();

        String propertyIcon = 'custom:custom64';
        Properties__c [] properties = ((List<Properties__c>) searchResults[0]);
        System.debug('@@@ properties: ' + properties);
        for (Properties__c property : properties) {
            String additionalInfo = String.join(new String[]{property.Property_Street__c, property.Property_State__c}, ' ');
            results.add(new LookupSearchResult(property.Id, 'Properties__c', propertyIcon, property.Name, 'Property • '+ property.Name, additionalInfo));
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
    public static LookupSearchResult getRecentlyCreatedRecords(String objectName){
        List<Id> recentIds = new List<Id>();  
        for(RecentlyViewed recent : [SELECT Id FROM RecentlyViewed WHERE Type = :ObjectName ORDER BY LastViewedDate DESC LIMIT 1]) {  
            recentIds.add(recent.Id);  
        }  
        String sQUERY = 'SELECT Id, Name'; 
        sQuery += ' FROM ' + ObjectName + ' WHERE Id IN :recentIds';  
        List<sObject> searchResult = Database.query(sQuery);  
        String propertyIcon = 'custom:custom64';
        for (sObject searchRes : searchResult) {
            LookupSearchResult lookupToReturn = new LookupSearchResult(searchRes.Id, 'Properties__c', propertyIcon, (String)searchRes.get('Name'), 'Property • '+ (String) searchRes.get('Name'));
            return lookupToReturn;  
        }
        return null;
    }

    @AuraEnabled
    public static LookupSearchResult loadExistingUser(){
        String userIcon = 'standard:user';
        User user = [SELECT Id, Name FROM User WHERE Id =: UserInfo.getUserId()];
        LookupSearchResult lookupToReturn = new LookupSearchResult(user.Id, 'User', userIcon, user.Name, 'User • '+ user.Name);
        return lookupToReturn;  
    }
    
    public class PicklistWrapper{
        @AuraEnabled public String label;
        @AuraEnabled public String text;
        @AuraEnabled public Boolean isDefault;
    }

    @AuraEnabled
    public static String saveLoanRecord(Opportunity loanRecord){
        try {
            Contact borrower = [SELECT Id, AccountId, Name FROM Contact WHERE Id = :loanRecord.Borrower_Record__c];

            loanRecord.Scenario_Household__c = borrower.AccountId;
            loanRecord.AccountId = borrower.AccountId;
            Id prospectingRecTypeId = Schema.SObjectType.Opportunity.getRecordTypeInfosByDeveloperName().get('Scenario').getRecordTypeId();
            loanRecord.RecordTypeId = prospectingRecTypeId;
            loanRecord.CloseDate = Date.today().addYears(1);
            System.debug('saveLoanRecord loanRecord.OwnerId');
            System.debug(loanRecord.OwnerId);
            System.debug(loanRecord.Loan_Originator__c);
            System.debug(loanRecord.Co_Loan_Originator__c);
            insert loanRecord;
            System.debug(loanRecord.OwnerId);


            return loanRecord.Id;
        } catch (Exception e) {
            return 'Error: ' + e.getMessage();
        }
    }

    @AuraEnabled
    public static LookupSearchResult savePropertyRecord(Properties__c propertyRec, String contactId, String accountId){
        system.debug('@@@ contact: ' + contactId + ' account: ' + accountId);
        String lastName = '';
        Contact c;
        if(String.IsNotBlank(contactId)){
            c = [SELECT Id, LastName, AccountId FROM Contact WHERE Id =: contactId];
            lastName = c.LastName;
        }

        if(lastName != ''){
            propertyRec.Name = lastName + ' - ' + propertyRec.Property_Street__c;
        }
        else{
            propertyRec.Name = propertyRec.Property_Street__c;
        }

        if(String.IsNotBlank(accountId)){
            propertyRec.Household__c = accountId;
        } else {
            propertyRec.Household__c = c?.AccountId;
        }
        insert propertyRec;

        String propertyIcon = 'custom:custom64';
        LookupSearchResult lookupToReturn = new LookupSearchResult(propertyRec.Id, 'Properties__c', propertyIcon, propertyRec.Name, 'Property • '+ propertyRec.Name);
        return lookupToReturn;  
    }
    


}