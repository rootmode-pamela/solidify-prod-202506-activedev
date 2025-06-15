public class AssetTriggerHandler {
    
    public static void handleAfterInsert(list<Asset__c> newAssets){
        Set<String> leadIds = new Set<String>();
        for(Asset__c a: newAssets){
            leadIds.add(a.Lead__c);
        }
        
        if(leadIds.size()>0){
            recalcLeadTotals(leadIds);
        }
        
    }
    
    public static void handleAfterUpdate(list<Asset__c> newAssets, Map<Id, Asset__c> oldMap){
        Set<String> leadIds = new Set<String>();
        for(Asset__c a: newAssets){
            if(a.Payment__c != oldMap.get(a.id).Payment__c){
	            leadIds.add(a.Lead__c);            
            }
            
        }
        
        if(leadIds.size()>0){
            recalcLeadTotals(leadIds);
        }
        
    }
    
    public static void recalcLeadTotals(Set<String> LeadIds){
        List<Lead> leads = [SELECT Id FROM Lead WHERE Id IN :leadIds];
        
        List<AggregateResult> results = [SELECT Count(Id) ct, Sum(Payment__c) pmt, Sum(Amount__c) amt, Lead__c, AssetOrLiability__c 
                                         FROM Asset__c WHERE Lead__c IN :leadIds
                                         GROUP BY Lead__c, AssetOrLiability__c];
		Map<String, AggregateResult> resultMap = new Map<String, AggregateResult>();
        for(AggregateResult r: results){
            String keyfields = r.get('Lead__c') + '-' + r.get('AssetOrLiability__c');
            resultMap.put(keyfields, r); 
        }     
        
        for(Lead l: leads){
            l.SubjectPropertyNegativeNetCashFlow__c = (Decimal)resultMap.get(l.id + '-Liability').get('pmt');
        }
        
        update leads;
        
    }

}