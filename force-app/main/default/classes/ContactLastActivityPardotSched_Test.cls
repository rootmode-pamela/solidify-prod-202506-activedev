@isTest
public class ContactLastActivityPardotSched_Test {

    @testSetup
    public static void testData(){
        List<Account> accounts = new List<Account>();
        List<Contact> contacts = new List<Contact>();
        List<Task> tasks = new List<Task>();
        For(Integer i=0; i<200; i++){
            Account a = new Account(
            	Name = 'TestAccount' + i
            );
            accounts.add(a);
        }
        insert accounts;
        
        For(Account a: accounts){
            Contact c = new Contact(
            	AccountId = a.Id,
                FirstName = 'Test',
                LastName = a.Name
            );
            contacts.add(c);
        }
        insert contacts;
        
        for(Contact c: contacts){
            Task t = new Task(
            Subject = 'Test Task',
            WhoId = c.Id,
            WhatId = c.AccountId,
            ActivityDate = Date.Today().AddDays(-15),
            Status = 'Completed');
            Tasks.add(t);
        }
		insert Tasks;
        
        List<Contact> cons = [SELECT Id, LastActivityDate FROM Contact WHERE LastActivityDate !=null];
        System.assertEquals(cons.size(), 200);
        
    }   
    
    @isTest
    public static void testBatch(){
        Test.startTest();
        ContactLastActivityPardotSched s = new ContactLastActivityPardotSched();
        Database.executeBatch(s);
        Test.stopTest();
        
        List<Contact> contacts = [SELECT id FROM Contact WHERE Days_Since_Last_Activity_Pardot__c >0];
        System.assertEquals(contacts.size(), 200);
    }
    
    @isTest
    public static void testSchedule(){
        
        contactLastActivityPardotSched s = new contactLastActivityPardotSched();
        string cron = '0 0 0 * * ?';
        system.schedule('PardotDaysSince', cron, s);
        
    }
    
}