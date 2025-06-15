public class ContactDetailsComponentController {

    @AuraEnabled
    public static Contact loadContactRecord(String recordId){
        return [SELECT Id, FirstName, LastName, Nickname__c, Greeting_Name__c, Birthdate, Age__c, Gender__c, Ethnicity__c, Race__c, Veteran__c, FICO__c, Type__c, Contact_Status__c, Email,
            Email_2__c, Home_Phone__c, Business_Phone__c, MobilePhone, Income_Sources__c, Employer_Name__c, Title, Years_on_Job__c, Income__c, LeadSource, Referred_by__c, Referred_by__r.FirstName,
            Referred_by__r.LastName, Loan_Originator__c, MailingStreet, MailingCity, MailingState, MailingPostalCode, Present_Address__c, Present_Address_City__c, Present_Address_State__c, 
            Present_Address_Zip__c, HasOptedOutOfEmail, smagicinteract__SMSOptOut__c FROM Contact WHERE Id =: recordId];
    }

    @AuraEnabled
    public static String updateContactRecord(Contact contactRecord){
        try {
            update contactRecord;

            return 'Success';
        } catch (Exception e) {
            return 'Error: ' + e.getMessage();
        }
    }

    @AuraEnabled
    public static List<PicklistWrapper> getPicklistValues(String picklistField){
        List<PicklistWrapper> plValues = new List<PicklistWrapper>();
        Schema.SObjectType objType = Schema.getGlobalDescribe().get('Contact');
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

    public class PicklistWrapper{
        @AuraEnabled public String label;
        @AuraEnabled public String text;
        @AuraEnabled public Boolean isDefault;
    }
}