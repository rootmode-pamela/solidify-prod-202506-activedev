@isTest
public class LookupSearchResultTest {
    @isTest static void testMethod1(){
        LookupSearchResult testLookup = new LookupSearchResult('', '', '', '', '');
        testLookup.getId();
        testLookup.getSObjectType();
        testLookup.getIcon();
        testLookup.getTitle();
        testLookup.getSubtitle();

    }
}