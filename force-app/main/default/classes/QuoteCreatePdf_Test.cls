@Istest
public class QuoteCreatePdf_Test {
	
    @testSetup
    public static void testData(){
        Account a= new Account(Name = 'Test Account');
        insert a;
        Opportunity o = new Opportunity(AccountId = a.Id, Name = 'Test Opp', CloseDate = Date.Today(), StageName = 'New');
        insert o;
        Quote q = new Quote(OpportunityId = o.Id, Name = 'Test Quote' );
        insert q;
    }
    
    @Istest
    public static void testAll(){
        List<Id> quoteIds = new List<Id>();
        for(Quote q: [SELECT Id FROM Quote]){
            quoteIds.add(q.Id);
        }
        system.debug(quoteIds);
        QuoteCreatePdf.createQuoteDoc(quoteIds);
        
    }
    
}