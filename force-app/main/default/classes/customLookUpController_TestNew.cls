@isTest
public class customLookUpController_TestNew {
    @isTest 
    public static void testQueries(){
    
        String searchKeyWord = 'Test';
        Account acc = new Account(Name='Test Account');
        insert acc;
        
        Properties__c prop = new Properties__c(Name='Test Prop');
        insert prop;
        String propId = prop.Id;
        
        Contact con = new Contact(AccountId=acc.Id,LastName='Test Contact');
        insert con;
        String contactId = con.Id;
        
        Lead l = new Lead(LastName='Test Lead',Status='New',Company='Test Company');
        insert l;
        
        Opportunity opp = new Opportunity(Name='Test Opp',StageName='New',CloseDate=Date.today(),ContactId=contactId, Subject_Property_Name__c = prop.Id);
        insert opp;
        

        
        test.startTest();
            
            List<Opportunity> oppList = customLookUpControllerNew.getLoanList(propId);
            System.assertEquals(1, oppList.Size());
            
            List<sObject> borrowers = customLookUpControllerNew.getBorrowerList(searchKeyWord);
            System.assertEquals(2, borrowers.size());
            
            List<Properties__c> props = customLookupControllerNew.getPropList(con.Id);

            List<Properties__c> propsFromLoan = customLookupControllerNew.getPropListFromLoanOpp(opp.Id);

            List<String> selectedIds = new List<String>();
            selectedIds.add('123456');
            List<LookupSearchResult> r = customLookupControllerNew.searchUser2(searchKeyword, selectedIds );

            Proposal__c newProposal = new Proposal__c(Account__c = acc.id, Borrower__c = con.id, Most_Recent_Loan__c = opp.id );
            String proposalId = customLookupControllerNew.saveProposalRecord(newProposal);

            customLookupControllerNew.LoanWrapper lw = customLookupControllerNew.getLoanDetails(opp.id);

		test.stopTest();        
    }
}