/**
 * Test class for LoanNextDeadlineUpdate
 */
@isTest
private class LoanNextDeadlineUpdateTest {
    
    @testSetup
    public static void testData(){
                // Create test data
        List<Opportunity> testLoans = new List<Opportunity>();
        
        // Create 5 loans with mismatched deadline fields
        for (Integer i = 0; i < 5; i++) {
            Date nextDeadline = Date.today().addDays(i + 1);
            Date encompassDeadline = Date.today().addDays(i + 10); // Different value
            
            Opportunity loan = new Opportunity(
                Name = 'Test Loan ' + i,
                StageName = 'Prospecting',
                CloseDate = Date.today().addMonths(1),
                COE__c = nextDeadline
            );
            testLoans.add(loan);
        }
        
        // Create 2 loans with matching deadline fields (these shouldn't be processed)
        for (Integer i = 0; i < 2; i++) {
            Date sameDeadline = Date.today().addDays(i + 20);
            
            Opportunity loan = new Opportunity(
                Name = 'Matching Loan ' + i,
                StageName = 'Prospecting',
                CloseDate = Date.today().addMonths(1),
                COE__c = sameDeadline,
                Encompass_Next_Deadline__c = sameDeadline
            );
            testLoans.add(loan);
        }
        
        // Create 2 loans with null values
        Opportunity loanWithNullNext = new Opportunity(
            Name = 'Null Next Deadline',
            StageName = 'Prospecting',
            CloseDate = Date.today().addMonths(1),
            COE__c= null,
            Encompass_Next_Deadline__c= Date.today().addDays(30)
        );
        testLoans.add(loanWithNullNext);
        
        Opportunity loanWithNullEncompass = new Opportunity(
            Name = 'Null Encompass Deadline',
            StageName = 'Prospecting',
            CloseDate = Date.today().addMonths(1),
            COE__c = Date.today().addDays(45),
            Encompass_Next_Deadline__c = null
        );
        testLoans.add(loanWithNullEncompass);
        
        // Insert test data
        insert testLoans;
        
    }
    
    @isTest
    static void testBatchProcess() {

        // Start test execution
        Test.startTest();
        
        // Execute the batch
        LoanNextDeadlineUpdate batchJob = new LoanNextDeadlineUpdate();
        Database.executeBatch(batchJob);
        
        // Execute as scheduled job
        String jobId = System.schedule(
            'Test Loan Next Deadline Update', 
            '0 0 0 15 3 ? 2030', 
            new LoanNextDeadlineUpdate()
        );
        
        // End test execution
        Test.stopTest();
        
        // Verify results
        List<Opportunity> updatedLoans = [SELECT Id, Next_Deadline__c, Encompass_Next_Deadline__c 
                                        FROM Opportunity];
        
        // Check that all loans now have matching deadline fields
        for (Opportunity loan : updatedLoans) {
            System.assertEquals(loan.Next_Deadline__c, loan.Encompass_Next_Deadline__c, 
                              'Deadline fields should match after batch execution');
        }
        
        // Verify scheduled job
        List<CronTrigger> jobs = [SELECT Id, CronExpression, TimesTriggered, 
                                 NextFireTime 
                                 FROM CronTrigger 
                                 WHERE Id = :jobId];
        System.assertEquals(1, jobs.size(), 'Scheduled job should exist');
        System.assertEquals('0 0 0 15 3 ? 2030', jobs[0].CronExpression, 'Cron expression should match');
    }
}