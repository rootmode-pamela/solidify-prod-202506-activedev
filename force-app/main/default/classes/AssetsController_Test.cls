@isTest
public with sharing class AssetsController_Test {
    
    @TestSetup
    static void makeData(){
        Lead l = new Lead(LastName = 'Test Lead');
        insert l;

        Opportunity o = new Opportunity(Name = 'Test Opportunity', StageName = 'New', CloseDate = Date.today());
        insert o;

        Asset__c lAsset = new Asset__c();
        lAsset.Lead__c = l.id;
        lAsset.AssetOrLiability__c = 'Liability';
        insert lAsset;

        Asset__c oAsset = new Asset__c();
        oAsset.Loan__c = o.id;
        oAsset.AssetOrLiability__c = 'Liability';
        insert oAsset;

    }

    @isTest
    public static void testAll() {
        Opportunity o = [SELECT Id FROM Opportunity LIMIT 1];
        Lead l = [SELECT Id FROM Lead LIMIT 1];

        List<Asset__c> oppAssets = AssetsController.getAssetsList(o.Id, 'Liability'); 
        List<Asset__c> leadAssets = AssetsController.getAssetsList(l.Id, 'Liability');

        System.assertEquals(1, oppAssets.size(), 'Error retrieving opp assets');
        System.assertEquals(1, leadAssets.size(), 'Error retrieving lead assets');

        Asset__c a = new Asset__c();
        a.Lead__c = l.id;
        a.Amount__c = 2222;
        a.Name = 'New Liability';
        AssetsController.saveLiability(a);

        Asset__c newAsset = [SELECT id FROM Asset__c WHERE Name = 'New Liability' AND AssetOrLiability__c = 'Liability' ];
        System.assert(newAsset!=null, 'Error in saveLiability');

        Asset__c getAsset = AssetsController.getSingleAsset(newAsset.Id);
        system.assertEquals('New Liability', getAsset.Name, 'Error in getSingleAsset');

        List<Asset__c> allAssets = [SELECT Id, Name, Payment__c FROM Asset__c];

        for(Asset__c a1: allAssets){
            a1.Payment__c = 500;
        }

        AssetsController.updateAssets(allAssets);

        List<Asset__c> paymentAssets = [SELECT Id from Asset__c WHERE Payment__c = 500];
        System.assertEquals(allAssets.size(), paymentAssets.size(), 'Error in updateAssets');


    }
}