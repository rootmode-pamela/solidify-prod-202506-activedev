public class solidify_searchController {

    private final static Integer MAX_RESULTS = 5;

    @AuraEnabled(cacheable=true)
    public static List<LookupSearchResult> search(String searchTerm, List<String> selectedIds) {
        system.debug(selectedIds);
        // Prepare query paramters
        searchTerm += '*';

        system.debug(searchTerm);
        // Execute search query
        system.debug([SELECT Id, Name, BillingCity FROM Account WHERE Name like 'Test%']);
        system.debug([SELECT Id, Name, StageName FROM Opportunity WHERE Name like 'Test%']);
        List<List<SObject>> searchResults = [FIND :searchTerm IN ALL FIELDS RETURNING
            Account (Id, Name, BillingCity WHERE id NOT IN :selectedIds),
            Opportunity (Id, Name, StageName WHERE id NOT IN :selectedIds)
            LIMIT :MAX_RESULTS];

        system.debug(searchResults);
        // Prepare results
        List<LookupSearchResult> results = new List<LookupSearchResult>();

        // Extract Accounts & convert them into LookupSearchResult
        String accountIcon = 'standard:account';
        Account [] accounts = ((List<Account>) searchResults[0]);
        for (Account account : accounts) {
            results.add(new LookupSearchResult(account.Id, 'Account', accountIcon, account.Name, 'Account • '+ account.BillingCity));
        }

        // Extract Opportunities & convert them into LookupSearchResult
        String opptyIcon = 'standard:opportunity';
        Opportunity [] opptys = ((List<Opportunity>) searchResults[1]);
        for (Opportunity oppty : opptys) {
            results.add(new LookupSearchResult(oppty.Id, 'Opportunity', opptyIcon, oppty.Name, 'Opportunity • '+ oppty.StageName));
        }

        return results;
    }
}