@isTest
private class insertAssetRecordTest {
    
    @isTest
    static void testSaveAsset_Opportunity() 
    {
        // Create test Opportunity
        Opportunity testOpportunity = new Opportunity(Name='Test Opportunity', StageName='Prospecting', CloseDate=Date.today());
        insert testOpportunity;
                
        List<Asset__c> testAssets = new List<Asset__c>();
        for(Integer i=0; i<5; i++) 
        {
            Asset__c asset = new Asset__c(Name='Test Asset ' + i, AssetOrLiability__c='Asset');
            testAssets.add(asset);
        }                                
                
        // Create test Lead
        Lead testLead = new Lead(FirstName='Test', LastName='Lead', Company='Test Company');
        insert testLead;
                
        List<Asset__c> testAssets1 = new List<Asset__c>();
        for(Integer i=0; i<5; i++) 
        {
            Asset__c asset = new Asset__c(Name='Test Asset ' + i, AssetOrLiability__c='Asset');
            testAssets1.add(asset);
        }
                
        Test.startTest();
        List<Asset__c> savedAssets = insertAssetRecord.saveAsset(testAssets, testOpportunity.Id);
        List<Asset__c> savedAssets1 = insertAssetRecord.saveAsset(testAssets1, testLead.Id);
        Test.stopTest();
    }    
}