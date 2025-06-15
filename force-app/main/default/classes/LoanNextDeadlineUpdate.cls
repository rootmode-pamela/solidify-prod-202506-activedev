/**
 * Batch and schedulable class to sync Encompass_Next_Deadline__c field with Next_Deadline__c on Loan (Opportunity) records
 * 
 * This class can be scheduled to run at regular intervals using the system scheduler
 * Example scheduling: System.schedule('Loan Next Deadline Update - Daily', '0 0 1 * * ?', new LoanNextDeadlineUpdate());
 */
global class LoanNextDeadlineUpdate implements Database.Batchable<sObject>, Schedulable {
    
    // The query to fetch all active loans
    private String query;
    
    /**
     * Default constructor
     */
    global LoanNextDeadlineUpdate() {
        // Query all loans with Next_Deadline__c to evaluate in the execute method
        this.query = 'SELECT Id, Next_Deadline__c, Encompass_Next_Deadline__c ' +
                    'FROM Opportunity';
    }
    
    /**
     * Constructor with custom query
     */
    global LoanNextDeadlineUpdate(String customQuery) {
        this.query = customQuery;
    }
    
    /**
     * Schedulable execute method - executes the batch job
     */
    global void execute(SchedulableContext sc) {
        Database.executeBatch(this);
    }
    
    /**
     * Batchable start method - returns the query locator
     */
    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator(query);
    }
    
    /**
     * Batchable execute method - processes each batch of records
     */
    global void execute(Database.BatchableContext bc, List<Opportunity> scope) {
        List<Opportunity> loansToUpdate = new List<Opportunity>();
        
        for (Opportunity loan : scope) {
            // Check if the fields don't match by comparing them in Apex code
            Boolean fieldsAreDifferent = false;
            
            // Handle all possible comparison scenarios including null values
            if (loan.Next_Deadline__c != null && loan.Encompass_Next_Deadline__c != null) {
                // Compare date values if both are not null
                if (loan.Next_Deadline__c != loan.Encompass_Next_Deadline__c) {
                    fieldsAreDifferent = true;
                }
            } else if (loan.Next_Deadline__c == null && loan.Encompass_Next_Deadline__c != null) {
                // Next_Deadline__c is null but Encompass_Next_Deadline__c is not
                fieldsAreDifferent = true;
            } else if (loan.Next_Deadline__c != null && loan.Encompass_Next_Deadline__c == null) {
                // Next_Deadline__c is not null but Encompass_Next_Deadline__c is
                fieldsAreDifferent = true;
            }
            
            // Only update records where the fields don't match
            if (fieldsAreDifferent) {
                loan.Encompass_Next_Deadline__c = loan.Next_Deadline__c;
                loansToUpdate.add(loan);
            }
        }
        
        // Update the records
        if (!loansToUpdate.isEmpty()) {
            try {
                update loansToUpdate;
                System.debug('Updated ' + loansToUpdate.size() + ' loans');
            } catch (Exception e) {
                System.debug('Error updating loans: ' + e.getMessage());
                // Consider implementing error handling or notification here
            }
        }
    }
    
    /**
     * Batchable finish method - called after all batches are processed
     */
    global void finish(Database.BatchableContext bc) {
        // Optional: Add any post-processing logic here
        // For example, sending an email notification that the job is complete
        AsyncApexJob job = [SELECT Id, Status, NumberOfErrors, 
                            JobItemsProcessed, TotalJobItems, CreatedBy.Email
                            FROM AsyncApexJob 
                            WHERE Id = :bc.getJobId()];
        
        System.debug('Job completed with status: ' + job.Status + 
                    ', Items processed: ' + job.JobItemsProcessed + 
                    ', Number of errors: ' + job.NumberOfErrors);
    }
}