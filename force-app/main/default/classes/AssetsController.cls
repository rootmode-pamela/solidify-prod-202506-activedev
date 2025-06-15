public with sharing class AssetsController 
{    
    @AuraEnabled(cacheable=true)
    public static List<Asset__c> getAssetsList(Id LoanId, String Type) 
    {
        System.debug('recordId :: ' + LoanId);
        Id r = LoanId;
        String objectAPIName = r.getSObjectType().getDescribe().getName();
        System.debug('objectAPIName :: ' + objectAPIName);
        if(objectAPIName == 'Opportunity')
        {
            return getAssetListLoan(LoanId, type);
        } 
        else if (objectAPIName == 'Lead')
        {
            return getAssetListLead(LoanId, type);
        } 
        else 
        {
            return null;
        }                    
    }
    
    /*@AuraEnabled(cacheable=true)
    public static Lead getLeadInfo(Id LoanId) 
    {
        System.debug('recordId :: ' + LoanId);
        Id r = LoanId;
        String objectAPIName = r.getSObjectType().getDescribe().getName();
        System.debug('objectAPIName :: ' + objectAPIName);
        
        if (objectAPIName == 'Lead')
        {
            return getLeadRec(LoanId);
        } 
        else 
        {
            return null;
        }                    
    }
    
    @AuraEnabled(cacheable=true)
    public static Lead getLeadRec(Id LoanId) 
    {
        System.debug('AssetListLoan :: ' + LoanId);        
        //return [SELECT Id, Name, Amount__c, AssetOrLiability__c, Lead__c, Type__c, Loan__c, Interest_Rate__c, Payment__c,Planned_Payment__c FROM Asset__c Where Loan__c = :LoanId];
        return null;
    }*/
    
    @AuraEnabled(cacheable=true)
    public static List<Asset__c> getAssetListLoan(Id LoanId, String Type) 
    {
        System.debug('AssetListLoan :: ' + LoanId);
        System.debug('AssetListLoan Type :: ' + Type);
        return [SELECT Id, Name, Amount__c, AssetOrLiability__c, 
                Lead__c, Type__c, Loan__c, Interest_Rate__c, Payment__c, 
                Planned_Payment__c FROM Asset__c Where Loan__c = :LoanId AND AssetOrLiability__c = :type ];
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Asset__c> getAssetListLead(String LeadId, String Type) 
    {
        System.debug('AssetListLead :: ' + LeadId);
        System.debug('AssetListLead Type :: ' + Type);
        return [SELECT Id, Name, Amount__c, AssetOrLiability__c, Lead__c, Type__c, Loan__c, Interest_Rate__c,Payment__c,Planned_Payment__c FROM Asset__c 
                Where Lead__c = :LeadId AND AssetOrLiability__c = :type ];
    }
    
    @AuraEnabled(cacheable=true)
    public static void saveLiability(Asset__c record) 
    {
        record.AssetOrLiability__c = 'Liability';
        upsert record;
    }
    
    @AuraEnabled(cacheable=true)
    public static Asset__c getSingleAsset(string AssetId) 
    {
        return [
            SELECT Id, Name, Amount__c, AssetOrLiability__c, Lead__c, Type__c, Loan__c, Interest_Rate__c
            FROM Asset__c
            WHERE Id = :AssetId
            LIMIT 1
        ];
    }
    
    @AuraEnabled
    public static void updateAssets(List<Asset__c> assetsForUpdate) 
    {
        // Make sure we can update the database before trying to update
        if (!Schema.sObjectType.Asset__c.isUpdateable()) 
        {
            throw new SecurityException(
                'Insufficient permissions to update assets'
            );
        }
        update assetsForUpdate;
    }
    
    public class AssetUpdateException extends Exception 
    {
        
    }    
}