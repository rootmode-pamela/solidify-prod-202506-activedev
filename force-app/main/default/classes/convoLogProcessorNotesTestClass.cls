@isTest
public class convoLogProcessorNotesTestClass 
{    
    public static testmethod void InsertRecord() 
    {
        // Create a test user
        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User' LIMIT 1];
        User testUser = new User(
            Alias = 'testuser',
            Email = 'testuser@example.com',
            EmailEncodingKey = 'UTF-8',
            LastName = 'Utest456',
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US',
            ProfileId = p.Id,
            TimeZoneSidKey = 'America/Los_Angeles',
            UserName = 'testuser148@example.com'
        );
        insert testUser;
        
        // Create a test opportunity
        Opportunity testOpp = new Opportunity(
            Name = 'Test Opportunity1212123',
            StageName = 'Prospecting',
            CloseDate = Date.today(),
            Conversation_Log__c = 'Test 1234'
        );
        insert testOpp;
        
        Test.startTest();
        String processorNote = 'This is a test note.';
        convoLogProcessorNotes.processorNote(testOpp.Id, processorNote, false);
        convoLogProcessorNotes.getConvoLog(testOpp.Id);
        Test.stopTest();
    }        
}