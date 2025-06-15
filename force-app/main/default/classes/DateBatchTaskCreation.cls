global class DateBatchTaskCreation  {
   
    
    String query;
    String fieldList;
    String objectAPIname;
    String assignTo;
    List<Task_Creation__c> taskSettings;
    
    //Initialize method for batch class to prep settings used later on and query string
    global DateBatchTaskCreation (String objectName) {
        

    }    
 /*   
    //Execute query string
    global Database.QueryLocator start(Database.BatchableContext BC) {
        return Database.getQueryLocator(query);
    }

    //Batch processing to create task records
    global void execute(Database.BatchableContext BC, List<sObject> scope) {
 
    } 
    

    
    
    //Finish method, not currently used for anythig
    global void finish(Database.BatchableContext BC) {
        
    } */
    
}