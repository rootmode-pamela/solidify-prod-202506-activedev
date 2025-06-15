public class ScenarioTabLeadCont {

    @AuraEnabled
    public static String createProposalButtonMethod(Id leadId) {
        System.debug('@@@ createProposalButton: ' + leadId);

        Map<String, Object> myMap = new Map<String, Object>();
        myMap.put('Recordid', leadId);
        
        Flow.Interview.Lead_Contact_create_Proposal createProposalFlow = new Flow.Interview.Lead_Contact_create_Proposal(myMap);
        createProposalFlow.start();

        List<Proposal__c> proposalList = [SELECT Id FROM Proposal__c ORDER BY CreatedDate DESC LIMIT 1];

        System.debug('@@@ proposalId: ' + proposalList.get(0).Id);

        return proposalList.get(0).Id;
    }
}