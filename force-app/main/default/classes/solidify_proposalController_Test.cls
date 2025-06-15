@isTest
public class solidify_proposalController_Test {
	
    @testSetup
    public static void testData(){
        Account a = new Account(Name = 'Test1');
        insert a;
        insert new Contact(AccountId = a.id, FirstName='Test', LastName= 'Contact1');
        Properties__c p = new Properties__c(Name = '123 4th Street Prop', Household__c = a.Id);
        insert p;
        Opportunity o = new Opportunity(Name = 'Test Opp', CloseDate = Date.today().addDays(-45), StageName = 'ClosedWon', Subject_Property_Name__c = p.id, AccountId = a.id);
        insert o;
        
        
    }
    
   /*
    public static List<LookupSearchResult> searchBorrower(String searchTerm, List<String> selectedIds)
        public static List<Properties__c> getPropertyList(Id contactId)
         public static Opportunity getLoanForProperty(String propertyId){ */
    
    @isTest
    public static void testAll(){
        list<String> ids = new list<String>();
        list<Contact> cs = [SELECT Id FROM Contact];
        for(Contact c:cs){
            ids.add(c.id);}
        List<LookupSearchResult> lsr = solidify_proposalController.searchBorrower('Test', ids);
        List<Properties__c> pr = [SELECT Id FROM Properties__c];
        List<Properties__c> p = solidify_proposalController.getPropertyList(cs[0].id);
        Opportunity o = solidify_proposalController.getLoanForProperty(pr[0].id);
        Contact c = solidify_proposalController.getContactForProperty(pr[0].id);
        Properties__c p1 =  solidify_proposalController.getPropertyInfo(pr[0].id);
        Contact c1 = solidify_proposalController.getContactById(c.id);
        decimal bal =  solidify_proposalController.getLoanBalance(100000, 2.25, 30, 2050.00 );
        
    }
    
}