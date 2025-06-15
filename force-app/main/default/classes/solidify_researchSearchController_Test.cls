@isTest
public class solidify_researchSearchController_Test {

    @testSetup
    public static void testData(){
        Account a1 = new Account(Name='Test1', BillingCity = 'Portland');
        insert a1;
        Account a2 = new Account(Name = 'Test2', BillingCity = 'Toronto');
        insert a2;
        Opportunity o = new Opportunity(Name = 'Test1', CloseDate = Date.today().AddDays(-380), StageName = 'Closed Won', AccountId=a1.id, Loan_Originator__c = 'Dusty Broderick');
        insert o;
        Properties__c p = new Properties__c(Name = '123 Test', Most_Recent_Closed_Opportunity__c = o.id);
        insert p;
        Contact c = new Contact(FirstName = 'Test', LastName = 'Contact');
        insert c;
        Contact c2 = new Contact(FirstName = 'Test2', LastName = 'Contact');
        insert c2;
        Lead l = new Lead(FirstName = 'Test2', LastName = 'Lead', Company = 'Test Company A');
        insert l;
    }
    
    @isTest
    public static void testAll(){
        Test.startTest();
        list<Properties__c> p = ResearchSearchController.getPropertyLoans('', '', '', '', '','', '', '', '', '', '', '','','','');
        list<string> types = ResearchSearchController.getLoanTypes();
        list<string> purps = ResearchSearchController.getLoanPurposes();
        list<String> PrRecType = ResearchSearchController.getProposalTypes();
        list<String> Occs = ResearchSearchController.getLoanOccupancies();
        list<String> LOs = ResearchSearchController.getLoanOriginators();
        list<String> LPs = ResearchSearchController.getLoanPrograms();
        //String LoanType, LoanProg, InterestRate, MinFico, MaxFico, MinSchedBal, MaxSchedBal, LoanPurpose, LoanOccupancy, LoanOriginator, EarliestDate, LatestDate, MinDaysClosed, String sortby, String sortOrder
        list<Properties__c> p2 = ResearchSearchController.getPropertyLoans(types[0],'', '2.4', '', '', '', '' ,purps[2], '','', '2015-01-01', '2019-06-01','90','','');
        Account a2 = [SELECT Id FROM Account WHERE Name = 'Test2'];
        List<String> selected = new list<String>();
        selected.add(a2.Id);
        system.debug(selected);
        List<LookupSearchResult> r = solidify_SearchController.search('Test', selected);
        Opportunity o = [SELECT Id FROM Opportunity];
        LookupSearchResult lsr1 = new LookupSearchResult(o.id , 'Opportunity', 'standard:Opportunity', 'Title', 'Subtitle');
        r.add(lsr1);
        Id a = r[0].getId();
        String s = r[0].getSObjectType();
        String i = r[0].getIcon();
        String t = r[0].getTitle();
        String st = r[0].getSubtitle();
        Test.stopTest();
    }
    
}