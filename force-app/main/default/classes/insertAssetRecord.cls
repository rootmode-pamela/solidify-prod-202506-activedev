public with sharing class insertAssetRecord 
{
    @AuraEnabled
    public static List<Asset__c> saveAsset(List<Asset__c> lstAsset, ID recordID) 
    {
        try 
        {
            system.debug('List Asset Before ::: ' + lstAsset);
            system.debug('List Asset Before ::: ' + lstAsset.size());
            
            String objectName = recordId.getSObjectType().getDescribe().getName();
            System.debug('Object Name: ' + objectName);
            
            for(Asset__c ast : lstAsset)
            {
                if(objectName.equalsIgnoreCase('Opportunity'))
                {
                    ast.Loan__c = recordID;
                    ast.AssetOrLiability__c = 'Liability';
                }
                else if(objectName.equalsIgnoreCase('Lead'))
                {
                    ast.Lead__c = recordID;
                    ast.AssetOrLiability__c = 'Liability';
                }
                System.debug('Asset ::: ' + ast);
            }
            
            system.debug('List Asset After ::: ' + lstAsset);
            system.debug('List Asset After ::: ' + lstAsset.size());
            
            if(!lstAsset.IsEmpty())
            {
                insert lstAsset;
            }
            return lstAsset;                  
        }
        catch(Exception ex) 
        {
            throw new AuraHandledException(ex.getMessage());
        }
    }
}