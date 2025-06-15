@isTest
public class propertyTriggerHandler_Test {

    @testSetup
    public static void createTestData(){
        Account a = new Account(Name = 'Test Account 1');
        insert a;
        Properties__c p = new Properties__c(Household__c = a.id, Property_Street__c = '123 4th Street');
        insert p;
        Opportunity o = new Opportunity(Name = 'Loan 1', AccountId = a.id, CloseDate = Date.Today(), StageName = 'New', Subject_Property_Name__c = p.id);
        insert o;
        
        
    }
    
    @isTest
    public static void testDupeProperty(){
        Account a = [SELECT Id FROM Account LIMIT 1];
        Properties__c origProp = [SELECT Id FROM Properties__c LIMIT 1];
       
        Properties__c newProp = new Properties__c(Household__c = a.id, Property_Street__c = '123 4th Street', Property_City__c = 'San Diego');
		insert newProp;
        
        Opportunity o = [SELECT Id, Subject_Property_Name__c FROM Opportunity LIMIT 1];
        system.assertEquals(o.Subject_Property_Name__c, newProp.id);
        
        List<Properties__c> props = [SELECT Id FROM Properties__c];
        system.assertEquals(props.size(), 1);
        
    }
    
    @isTest
    public static void testNewProperty(){
        Account a = [SELECT Id FROM Account LIMIT 1];
        Properties__c origProp = [SELECT Id FROM Properties__c LIMIT 1];
       
        Properties__c newProp = new Properties__c(Household__c = a.id, Property_Street__c = '1515 88th Street', Property_City__c = 'San Diego');
		insert newProp;
        
        Opportunity o = [SELECT Id, Subject_Property_Name__c FROM Opportunity LIMIT 1];
        system.assertEquals(o.Subject_Property_Name__c, origProp.id);
        
        List<Properties__c> props = [SELECT Id FROM Properties__c];
        system.assertEquals(props.size(), 2);
        
    }
       
    
}