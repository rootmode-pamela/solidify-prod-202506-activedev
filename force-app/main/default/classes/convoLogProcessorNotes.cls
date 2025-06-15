public class convoLogProcessorNotes {
    
    @AuraEnabled
    public static String getConvoLog(Id recordId) {
        System.debug('Record ID :: ' + recordId);
        Opportunity record = [SELECT Conversation_Log__c FROM Opportunity WHERE Id = :recordId LIMIT 1];
        return record.Conversation_Log__c;
    }
    
    @AuraEnabled
    public static String processorNote(Id recordId, String processorNote, Boolean notifyProcessor) {
        System.debug('Updated input value: ' + processorNote + ' RecordId: ' + recordId + ' Notify processor:' + notifyProcessor);
        
        DateTime currentDate = DateTime.now();
        String formattedcurrentDate = currentDate.format('MM/dd/yyyy HH:mm');
        System.debug(':: formattedcurrentDate :: ' + formattedcurrentDate);
        
        User currentUser = [SELECT Alias FROM User WHERE Id = :UserInfo.getUserId()];
        String Alias = currentUser.Alias;
        System.debug(':: Alias :: ' + Alias);
        
        String newLogEntry = formattedcurrentDate + ' ' + Alias + ' - ' + processorNote;
        System.debug(':: newLogEntry :: ' + newLogEntry);
        
        Opportunity existingOpp = [SELECT Conversation_Log__c FROM Opportunity WHERE Id = :recordId LIMIT 1];
        String existingLog = existingOpp.Conversation_Log__c != null ? existingOpp.Conversation_Log__c : '';
        
        String updatedConvoLog = newLogEntry + '\n' + existingLog;
        
        Opportunity upOpp = new Opportunity();
        upOpp.Id = recordId;
        upOpp.Conversation_Log__c = updatedConvoLog;
        upOpp.Notify_Processor_Convo__c = notifyProcessor;
        
        update upOpp;
        
        Opportunity record = [SELECT Conversation_Log__c FROM Opportunity WHERE Id = :recordId LIMIT 1];
        System.debug(':: record.Conversation_Log__c :: ' + record.Conversation_Log__c);
        return record.Conversation_Log__c;                
    }
}