public class customLookUpControllerNew {
    @AuraEnabled
    public static List < sObject > getBorrowerList(String searchKeyWord) {

        List < sObject > borrowerList = new List < sObject > ();
        String searchKey = searchKeyWord + '%';
            
        String sQuery1 =  'select id, Name from Contact where LastName LIKE: searchKey  limit 10';
        List < sObject > lstOfRecords1 = Database.query(sQuery1);
        
        for (sObject obj1: lstOfRecords1) {
            borrowerList.add(obj1);
        }
        
        String sQuery2 =  'select id, Name from Contact where FirstName LIKE: searchKey  limit 5';
        List < sObject > lstOfRecords2 = Database.query(sQuery2);
        
        for (sObject obj2: lstOfRecords2) {
            borrowerList.add(obj2);
        }
        
        String sQuery3 =  'select id, Name from Contact where Name LIKE: searchKey  limit 5';
        List < sObject > lstOfRecords3 = Database.query(sQuery3);
        
        for (sObject obj3: lstOfRecords3) {
            borrowerList.add(obj3);
        }
 
		String sQuery4 =  'SELECT Id,Name,Status FROM Lead WHERE Status != \'Active Loan\' AND Status != \'Archived\' and LastName LIKE: searchKey  limit 10';
        List < sObject > lstOfRecords4 = Database.query(sQuery4);
        for (sObject obj4: lstOfRecords4) {
            borrowerList.add(obj4);
        }
        
        		String sQuery5 =  'SELECT Id,Name,Status FROM Lead WHERE Status != \'Active Loan\' AND Status != \'Archived\' and FirstName LIKE: searchKey  limit 5';
        List < sObject > lstOfRecords5 = Database.query(sQuery5);
        for (sObject obj5: lstOfRecords5) {
            borrowerList.add(obj5);
        }
        
        		String sQuery6 =  'SELECT Id,Name,Status FROM Lead WHERE Status != \'Active Loan\' AND Status != \'Archived\' and LastName LIKE: searchKey limit 5';
        List < sObject > lstOfRecords6 = Database.query(sQuery6);
        for (sObject obj6: lstOfRecords6) {
            borrowerList.add(obj6);
        }
     Set <sObject> recordSet = new Set <sObject>();
        recordSet.addAll(borrowerList);
        borrowerList.clear();
        borrowerList.addAll(recordSet);
    return borrowerList;
}
    
    @AuraEnabled
    public static List<Opportunity> getLoanList(String propId){
        List < Opportunity> loanList = new List < Opportunity > ();
          String sQuery =  'select id, Name,Purpose__c,Loan_Amount__c,Qual_FICO__c,Loan_Program__c,Loan_Type__c,Purchase_Price__c FROM Opportunity where Subject_Property_Name__c =: propId';
 
        List<Opportunity> opps = Database.query(sQuery);
        
       for (Opportunity opp : opps){
            	loanList.add(opp);
        }
  
        return loanList; 
    
    }
    
    @AuraEnabled
    public static List<Properties__c> getPropList(String contactId){
         List<Properties__c> propListAdd = new List<Properties__c>();

        Contact con = [SELECT Id, AccountId from Contact WHERE Id =: contactId];
        String acctId = con.AccountId;
        String sQuery = 'select id, Name from Properties__c where Household__c =: acctId';
        List<Properties__c> propList = Database.query(sQuery);
        for (Properties__c props : propList){
            	propListAdd.add(props);        
        }
        return propListAdd;
    }

    @AuraEnabled
    public static List<Properties__c> getPropListFromLoanOpp(String propertyId){
         List<Properties__c> propListAdd = new List<Properties__c>();

        String sQuery = 'select id, Name from Properties__c where Id =: propertyId';
        List<Properties__c> propList = Database.query(sQuery);
        for (Properties__c props : propList){
            	propListAdd.add(props);        
        }
        return propListAdd;
    }

    private final static Integer MAX_RESULTS = 5;
    @AuraEnabled(cacheable=true)
    public static List<LookupSearchResult> searchUser2(String searchTerm, List<String> selectedIds) {
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
    public static String saveProposalRecord(Proposal__c newProposal){
        insert newProposal;
        return newProposal.Id;
    }

    @AuraEnabled
    public static LoanWrapper getLoanDetails(Id recordId){
        LoanWrapper loanWrap = new LoanWrapper();
        Opportunity opp = [
                SELECT Id,Name,Subject_Property_Name__c,Subject_Property_Name__r.Name,Loan_Amount__c,Purpose__c,
                        Qual_FICO__c,Loan_Program__c,Loan_Type__c,Purchase_Price__c, ContactId,
                        Due_In_Months__c, OwnerId, Owner.Name, Amount, Property_Value__c,encompass_By_EM__Amortization_Term_Months__c,
                        MIP_FF__c, Down_Payment__c,encompass_By_EM__Estimated_Real_Estate_Taxes_Amount__c,
                        encompass_By_EM__Estimated_Hazard_Insurance_Amount__c, Grid_Title_Escrow_Rec__c,
                        Grid_Lender_Fees__c, Grid_Appraisal_Credit_VOE__c
                FROM Opportunity
                WHERE Id=:recordId
        ];
        List<OpportunityContactRole> r = [SELECT Id,ContactId,Contact.Name FROM OpportunityContactRole WHERE Role = 'Borrower' AND OpportunityId = :opp.Id LIMIT 1];
        loanWrap.oppRecord = opp;        
        if(r?.size() >0){
            loanWrap.borrowerContact = r[0];
        } else if (opp.ContactId!=null){
            loanWrap.borrowerContact = [SELECT Id, ContactId, Contact.Name FROM OpportunityContactRole WHERE ContactId = :opp.ContactId AND OpportunityId = :opp.Id];
        } else {
            loanWrap.borrowerContact = new OpportunityContactRole();
        }
        String userIcon = 'standard:user';
        loanWrap.solidifyContact = new LookupSearchResult(opp.OwnerId, 'User', userIcon, opp?.Owner?.Name, 'User • '+ opp?.Owner?.Name);

        return loanWrap;
    }

    @AuraEnabled
    public static Map<String, List<String>> getLoanPicklistValues() {
        Map<String, List<String>> nameToList = new Map<String, List<String>>();

        nameToList.put('loanPrograms', getPicklistValues(Opportunity.Loan_Program__c.getDescribe()));
        nameToList.put('transactionType', getPicklistValues(Opportunity.Purpose__c.getDescribe()));

        return nameToList;
    }

    @AuraEnabled
    public static Lead getLeadDetails(Id recordId){
        return [SELECT Id, Loan_Amount__c, Purpose__c, Qualifying_Fico__c, Loan_Program__c, Loan_Type__c, Purchase_Price__c FROM Lead WHERE Id =: recordId];
    }
    
    public class LoanWrapper{
        @AuraEnabled
        public Opportunity oppRecord;
        @AuraEnabled
        public OpportunityContactRole borrowerContact;
        @AuraEnabled
        public LookupSearchResult solidifyContact;
    }

    private static List<String> getPicklistValues(Schema.DescribeFieldResult fieldResult) {
        List<String> loanProgramsList= new List<String>();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for( Schema.PicklistEntry pickListVal : ple){
            loanProgramsList.add(pickListVal.getLabel());
        }
        return loanProgramsList;
    }
}