public class OflowLeadDeleteHandler {
    public static void onConvert(List<Lead> leads) {
        List<Id> leadId = new List<Id>();
        for (Lead lead : leads) {
            if (lead.isConverted == TRUE) {
                leadId.add(lead.Id);
            }
        }
        List<Case> OFlowList = [SELECT Id FROM Case WHERE Lead__c in :leadId];
        if (OFlowList.size() > 0) {
            delete OFlowList;
        }
    }
    
    public static void onDelete(List<Lead> leads) {
        List<Id> leadId = new List<Id>();
        for (Lead lead : leads) {
            leadId.add(lead.Id);
            
        }
        List<Case> OFlowList = [SELECT Id FROM Case WHERE Lead__c in :leadId];
        if (OFlowList.size() > 0) {
            delete OFlowList;
        }
    }
}