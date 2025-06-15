public class LoanSetupComponentController {

    @AuraEnabled
    public static Opportunity loadLoanRecord(String recordId){
        return [SELECT Id, Name, COE__c, Co_Loan_Originator__c, Initial_Docs_In_By__c, LE_Acknowledged_By__c, Loan_Status_Update__c, Appraisal_Contingency__c, Loan_Contingency__c, Approval_Expected__c, Final_Conditions_In_By__c,
        CD_Out_By__c, Sign_Final_Docs_By__c, Loan_Originator__c, Loan_Processor__c, LeadSource, Lender__c, Lender_AE__c, Lender_AE__r.FirstName, Lender_AE__r.LastName, Escrow_Contact__c, 
        Escrow_Contact__r.FirstName, Escrow_Contact__r.LastName, Buyers_Agent__c, Buyers_Agent__r.FirstName, Buyers_Agent__r.LastName, Sellers_Agent__c, Sellers_Agent__r.FirstName, Sellers_Agent__r.LastName,
        Primary_Goal__c, Appraisal__c, Escrows__c, Admin_Fee__c,Fee_Structure__c, Other_Liens_New__c, Full_VOE__c, IncomeType__c, Vesting__c, Closing_Funds__c, Referred_By__c, Referred_By__r.FirstName, Referred_By__r.LastName, 
        Purpose__c, Subject_Property_Name__r.Property_State__c, Lock_Expiration__c
        FROM Opportunity WHERE Id =: recordId];
    }

    @AuraEnabled
    public static String updateLoanRecord(Opportunity loanRecord){
        try {
            update loanRecord;

            return 'Success';
        } catch (Exception e) {
            return 'Error: ' + e.getMessage();
        }
    }

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