@isTest
public class AssetTriggerHandler_Test {
    
    @testSetup
    public static void testData(){
        Lead l = new Lead(LastName = 'Test', Company = 'Test');
        insert l;
        
    }
    
    @isTest
    public static void testAll(){
        Lead l = [SELECT Id FROM Lead LIMIT 1];
        Asset__c a = new Asset__c(Lead__c = l.id, Payment__c = 220, Amount__c = 5000, AssetOrLiability__c = 'Liability');
        insert a;
        
        a.Payment__c = 400;
        update a;
        
    }

}