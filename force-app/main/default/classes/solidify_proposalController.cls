public class solidify_proposalController {
private final static Integer MAX_RESULTS = 5;

    @AuraEnabled(cacheable=true)
    public static List<LookupSearchResult> searchBorrower(String searchTerm, List<String> selectedIds) {
        
        // Prepare query paramters
        searchTerm += '*';

        // Execute search query
        List<List<SObject>> searchResults = [FIND :searchTerm IN ALL FIELDS RETURNING
            Contact (Id, Name, Email WHERE id NOT IN :selectedIds),
            Lead (Id, Name, Email WHERE id NOT IN :selectedIds AND isConverted = false)
            LIMIT :MAX_RESULTS];

        // Prepare results
        List<LookupSearchResult> results = new List<LookupSearchResult>();

        // Extract Contacts & convert them into LookupSearchResult
        String contactIcon = 'standard:contact';
        Contact [] contacts = ((List<Contact>) searchResults[0]);
        for (Contact contact : contacts) {
            results.add(new LookupSearchResult(contact.Id, 'Contact', contactIcon, Contact.Name, 'Contact • '+ contact.Email));
            
        }
        
         // Extract Leads & convert them into LookupSearchResult
        String leadIcon = 'standard:lead';
        Lead [] leads = ((List<Lead>) searchResults[1]);
        for (Lead lead : leads) {
            results.add(new LookupSearchResult(lead.Id, 'Lead', leadIcon, Lead.Name, 'Lead • '+ lead.Email));
        }


        return results;
    }
    
    @auraEnabled
    public static List<Properties__c> getPropertyList(Id contactId){
        Contact c = [SELECT Id, AccountId FROM Contact WHERE Id=:contactId LIMIT 1];
        system.debug(c.AccountId);
        
        list<Properties__c> props = [SELECT Id, Name, Property_Disposition__c FROM Properties__c WHERE Household__c = :c.AccountId];
        system.debug(props);
        return props;
		        
    }
    
    @auraEnabled
    public static Contact getContact(Id contactId){
        Contact c = [SELECT id, FirstName, LastName, AccountId FROM Contact WHERE Id=:contactId LIMIT 1];
        return c;
    }
    
    @auraEnabled
    public static Opportunity getLoanForProperty(String propertyId){
        System.debug(propertyId);
        Properties__c prop = [SELECT Id, Most_Recent_Closed_Opportunity__c, Current_Opportunity__c FROM Properties__c WHERE Id = :propertyId LIMIT 1];
        
        Id oppId;
        
        If(prop.Most_Recent_Closed_Opportunity__c!=null){
            oppId = prop.Most_Recent_Closed_Opportunity__c;
        } else {
            return null;
        }
        
        return [SELECT Id, Loan_Amount__c, Amount, Payment_Amount__c, CloseDate, Loan_Type__c, Interest_Rate__c, Current_Schedule_Balance__c, Due_In_Months__c, First_Payment__c FROM Opportunity WHERE Id = :oppId];
    }
    
    @auraEnabled
    public static Contact getContactForProperty(String propertyId){
        Properties__c prop = [SELECT Id, Household__c FROM Properties__c WHERE Id = :propertyId];
        
        Contact c = [SELECT Id, FirstName, LastName, AccountId FROM Contact WHERE AccountId = :prop.Household__c LIMIT 1];
        return c;
        
    }
    
    @auraEnabled
    public static Properties__c getPropertyInfo(String propertyId){
    	Properties__c prop = [SELECT Id, Name FROM Properties__c WHERE Id = :propertyId];
        
        return prop;
    }
    
    @auraEnabled
    public static Contact getContactById(String contactId){
        return [SELECT FirstName, LastName, Id, AccountId FROM Contact WHERE Id = :contactId LIMIT 1];
    }
    
    @auraEnabled
    public static decimal getLoanBalance(decimal loanAmt, decimal interestRate, integer numberPayments, decimal payment ){
        system.debug('loanAmt: ' + loanAmt);
        system.debug('interestRate: ' + interestRate);
        system.debug('numberPayments: ' + numberPayments);
        system.debug('payment: ' + payment);
        return solidifyUtil.balance(loanAmt, interestRate, numberPayments, payment);
    }

    @AuraEnabled
    public static String saveProposalRecord(Proposal__c newProposal){
        insert newProposal;
        return newProposal.Id;
    }
}