public class OFlowComponentDetailsController {
    
    @AuraEnabled
    public static Case loadOFlowRecord(String recordId){
        return [SELECT Id, Subject, ContactId, Contact.FirstName, Contact.LastName, Lead__c, Lead__r.FirstName, Lead__r.LastName, Lead_Status__c, Status, 
        Followup_Date__c, Priority, Purpose__c, Loan_Amount__c, Loan__c, Loan__r.Name, AccountId, Account.Name, Loan_Stage__c, 
        Loan_Lock_Expiration__c, Loan_COE__c, Loan_Originator__c, Revenue__c, Net_Profit__c, Loan_Amount_f__c, Next_Followup__c, Followup_Overdue__c, 
        Waiting_Reason__c, OwnerId, Owner.FirstName, Owner.LastName, Comments, CaseNumber FROM Case WHERE Id =: recordId];
    }

    @AuraEnabled
    public static String updateOFlowRecord(Case oFlowRecord){
        try {
            update oFlowRecord;

            return 'Success';
        } catch (Exception e) {
            return 'Error: ' + e.getMessage();
        }
    }

    @AuraEnabled
    public static List<PicklistWrapper> getPicklistValues(String picklistField){
        List<PicklistWrapper> plValues = new List<PicklistWrapper>();
        Schema.SObjectType objType = Schema.getGlobalDescribe().get('Case');
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
        Contact (Id, Name WHERE id NOT IN :selectedIds)
            LIMIT :MAX_RESULTS];

        List<LookupSearchResult> results = new List<LookupSearchResult>();

        String contactIcon = 'standard:contact';
        Contact [] contacts = ((List<Contact>) searchResults[0]);
        System.debug('@@@ contacts: ' + contacts);
        for (Contact contact : contacts) {
            results.add(new LookupSearchResult(contact.Id, 'Contact', contactIcon, contact.Name, 'Contact • '+ contact.Name));
        }

        return results;
    }

    @AuraEnabled(cacheable=true)
    public static List<LookupSearchResult> seachLead(String searchTerm, List<String> selectedIds, String anOptionalParam) {
        searchTerm += '*';

        List<List<SObject>> searchResults = [FIND :searchTerm IN ALL FIELDS RETURNING
        Lead (Id, Name WHERE id NOT IN :selectedIds)
            LIMIT :MAX_RESULTS];

        List<LookupSearchResult> results = new List<LookupSearchResult>();

        String leadIcon = 'standard:lead';
        Lead [] leads = ((List<Lead>) searchResults[0]);
        for (Lead lead : leads) {
            results.add(new LookupSearchResult(lead.Id, 'Lead', leadIcon, lead.Name, 'Lead • '+ lead.Name));
        }

        return results;
    }

    @AuraEnabled(cacheable=true)
    public static List<LookupSearchResult> searchLoan(String searchTerm, List<String> selectedIds, String anOptionalParam) {
        searchTerm += '*';

        List<List<SObject>> searchResults = [FIND :searchTerm IN ALL FIELDS RETURNING
        Opportunity (Id, Name WHERE id NOT IN :selectedIds)
            LIMIT :MAX_RESULTS];

        List<LookupSearchResult> results = new List<LookupSearchResult>();

        String opportunityIcon = 'standard:opportunity';
        Opportunity [] opportunities = ((List<Opportunity>) searchResults[0]);
        for (Opportunity opportunity : opportunities) {
            results.add(new LookupSearchResult(opportunity.Id, 'Opportunity', opportunityIcon, opportunity.Name, 'Loan • '+ opportunity.Name));
        }

        return results;
    }

    @AuraEnabled(cacheable=true)
    public static List<LookupSearchResult> searchAccount(String searchTerm, List<String> selectedIds, String anOptionalParam) {
        searchTerm += '*';

        List<List<SObject>> searchResults = [FIND :searchTerm IN ALL FIELDS RETURNING
        Account (Id, Name WHERE id NOT IN :selectedIds)
            LIMIT :MAX_RESULTS];

        List<LookupSearchResult> results = new List<LookupSearchResult>();

        String accountIcon = 'standard:account';
        Account [] accounts = ((List<Account>) searchResults[0]);
        for (Account account : accounts) {
            results.add(new LookupSearchResult(account.Id, 'Account', accountIcon, account.Name, 'Account • '+ account.Name));
        }

        return results;
    }

    @AuraEnabled(cacheable=true)
    public static List<LookupSearchResult> searchOwner(String searchTerm, List<String> selectedIds, String anOptionalParam) {
        searchTerm += '*';

        List<List<SObject>> searchResults = [FIND :searchTerm IN ALL FIELDS RETURNING
        User (Id, Name WHERE id NOT IN :selectedIds)
            LIMIT :MAX_RESULTS];

        List<LookupSearchResult> results = new List<LookupSearchResult>();

        String userIcon = 'standard:user';
        User [] users = ((List<User>) searchResults[0]);
        for (User user : users) {
            results.add(new LookupSearchResult(user.Id, 'User', userIcon, user.Name, 'Owner • '+ user.Name));
        }

        return results;
    }

    public class PicklistWrapper{
        @AuraEnabled public String label;
        @AuraEnabled public String text;
        @AuraEnabled public Boolean isDefault;
    }
}