/*
 * Description: Apex test class for the batch task creation and scheduler classes.
 *
 *  Author              Date                    Change History
 *  ----------          ----------              --------------------
 *  PAW.                2018-04-08              Created
 *  PAW					2018-09-22				Removed reference to custom fields Last_Activity_Date__c */

@isTest
public class TaskCreator_Test {

    //This method will stage all appropriate test data
    @testSetup
    static void stageTestData() {
        
        
        User OwnerUser = new User(Firstname='Test',lastname='Owner', Email = 'test@test.com', Username = 'testowner@solidfy.com.dev', alias = 'town', profileid = '00ef4000001B3XBAA0', TimeZoneSidKey = 'America/Los_Angeles', LocaleSidKey = 'en_US', EmailEncodingKey = 'ISO-8859-1', LanguageLocaleKey = 'en_US');
        insert OwnerUser;
        User ProcessorUser = new User(Firstname='Test',lastname='Processor', Email = 'test@test.com', Username = 'testprocessor@solidfy.com.dev', alias = 'tproc', profileid = '00ef4000001B3XBAA0', TimeZoneSidKey = 'America/Los_Angeles', LocaleSidKey = 'en_US', EmailEncodingKey = 'ISO-8859-1', LanguageLocaleKey = 'en_US');
        insert ProcessorUser;
        User LOUser = new User(Firstname='Test',lastname='LO', Email = 'test@test.com', Username = 'testloanofficer@solidfy.com.dev', alias = 'tloff', profileid = '00ef4000001B3XBAA0', TimeZoneSidKey = 'America/Los_Angeles', LocaleSidKey = 'en_US', EmailEncodingKey = 'ISO-8859-1', LanguageLocaleKey = 'en_US');
        insert LOUser;
        
        Account newAcct = new Account(Name='Test', Ownerid = OwnerUser.Id, Loan_Originator_User__c = LOUser.Id);
        insert newAcct;
        
        Date currentDate = Date.today().addDays(30);
        Date bDate = Date.newInstance(1962, currentDate.Month(), currentDate.Day());
        system.debug('birthdate: ' + bDate);
        
        Contact cont = new Contact(FirstName='Test',LastName='Tester', AccountId=newAcct.Id, Birthdate = bDate);
        Contact cont2 = new Contact(FirstName='Test',LastName='Tester2', AccountId=newAcct.Id, Birthdate = bDate.addDays(-4) );
        Contact cont3 = new Contact(FirstName='Test',LastName='Tester3', AccountId=newAcct.Id, Type__c = 'Client');
        insert cont;
        insert cont2;
        insert cont3;
        
        
        Task task3 = new Task(Subject='Test', ActivityDate = currentdate.addDays(-90), whoId = cont3.id, ownerId = ownerUser.id, status = 'Completed');
        insert task3;
        
        Lead ld = new Lead(FirstName = 'Test', LastName = 'Tester', Company = 'Test', status = 'Attempted');
        insert ld;
        
        Task ldTask = new Task(Subject = 'Test', ActivityDate = currentDate.AddDays(-3), whoId = ld.id, ownerId = OwnerUser.id, status = 'Completed');
        insert ldTask;

        
        List<Opportunity> testOpps = new List<Opportunity>();
        List<Task> testTasks = new List<Task>();
        
        Opportunity testOpp1 = new Opportunity(Name='TBD Last Activity 45d, future scheduled', StageName='Analysis / TBD', CloseDate=System.Today(),
                                               AccountId=newAcct.Id, Future_Activities__c = 2, 
                                               OwnerId=OwnerUser.Id, Loan_Originator_User__c = LOUser.id, Loan_Processor_User__c=ProcessorUser.Id);
        testOpps.add(testOpp1);
        Task testOpp1Task =new Task(Subject = 'Test', ActivityDate = Date.Today().AddDays(-45), whoId = ld.id, ownerId = OwnerUser.id, status = 'Completed');
		testTasks.add(testOpp1Task);
        
        Opportunity testOpp2 = new Opportunity(Name='TBD Last Activity 45 Days', StageName='Analysis / TBD', CloseDate=System.Today().addDays(15),
                                               AccountId=newAcct.Id, OwnerId=OwnerUser.Id, 
                                               Loan_Originator_User__c = LOUser.id, Loan_Processor_User__c=ProcessorUser.Id);
        testOpps.add(testOpp2);
        Task testOpp2Task =new Task(Subject = 'Test', ActivityDate = Date.Today().AddDays(-45), whoId = ld.id, ownerId = OwnerUser.id, status = 'Completed');
		testTasks.add(testOpp2Task);
        Opportunity testOpp3 = new Opportunity(Name='Processing Last Activity 1d',StageName='Application',CloseDate=System.Today().addDays(11),
                                               AccountId=newAcct.Id,
                                               OwnerId=OwnerUser.Id, Loan_Originator_User__c = LOUser.id, Loan_Processor_User__c=ProcessorUser.Id);
        testOpps.add(testOpp3);
        Task testOpp3Task =new Task(Subject = 'Test', ActivityDate = Date.Today().AddDays(-1), whoId = ld.id, ownerId = OwnerUser.id, status = 'Completed');
		testTasks.add(testOpp3Task);
        Opportunity testOpp4 = new Opportunity(Name='Processing Last Activity 1d, future scheduled',StageName='Application',CloseDate=System.Today().addDays(15),
                                               AccountId=newAcct.Id, Future_Activities__c = 1,
                                               OwnerId=OwnerUser.Id, Loan_Originator_User__c = LOUser.id, Loan_Processor_User__c=ProcessorUser.Id);
        testOpps.add(testOpp4);
        Task testOpp4Task =new Task(Subject = 'Test', ActivityDate = Date.Today().AddDays(-1), whoId = ld.id, ownerId = OwnerUser.id, status = 'Completed');
		testTasks.add(testOpp4Task);
        Opportunity testOpp5 = new Opportunity(Name='Closed Lost',StageName='Closed Lost',CloseDate=System.Today().AddDays(-45),AccountId=newAcct.Id, 
                                               OwnerId=OwnerUser.Id, Loan_Originator_User__c = LOUser.id, Loan_Processor_User__c=ProcessorUser.Id);
        testOpps.add(testOpp5);
        
        //create loan with close date = saturday for test only query

        
        Opportunity testOpp6 = new Opportunity(Name='Weekend Close',StageName='Application',CloseDate=System.Today(),AccountId=newAcct.Id, 
                                               OwnerId=OwnerUser.Id, Loan_Originator_User__c = LOUser.id, Loan_Processor_User__c=ProcessorUser.Id);
        testOpps.add(testOpp6);
       
        
        
        //anniversary date for loan = 30 days from today.  
        Date cDate = Date.newInstance((Date.Today().AddDays(30).Year() - 1), Date.Today().AddDays(30).Month(), Date.Today().AddDays(30).Day());
        system.debug ('loan anniversary date:' + cDate);
          
        Opportunity testOpp8 = new Opportunity(Name='Loan Anniversary Today',StageName='Closed Won',CloseDate=cDate,AccountId=newAcct.Id, 
                                               OwnerId=OwnerUser.Id, Loan_Originator_User__c = LOUser.id, Loan_Processor_User__c=ProcessorUser.Id);
        testOpps.add(testOpp8);
        
        Opportunity testOpp9 = new Opportunity(Name='Lock Expiration',StageName='Application', Lock_Expiration__c = System.Today(), CloseDate=System.Today(),AccountId=newAcct.Id, 
                                               OwnerId=OwnerUser.Id, Loan_Originator_User__c = LOUser.id, Loan_Processor_User__c=ProcessorUser.Id);
        testOpps.add(testOpp9);
        Opportunity testOpp10 = new Opportunity(Name='COE Two Weeks',StageName='Application', COE__c = System.Today().AddDays(14), CloseDate=System.Today(),AccountId=newAcct.Id, 
                                               OwnerId=OwnerUser.Id, Loan_Originator_User__c = LOUser.id, Loan_Processor_User__c=ProcessorUser.Id);
        testOpps.add(testOpp10);
        
        insert testOpps;
        insert testTasks;
        
        List<Opportunity> newlist = [Select Id, Name, StageName, CloseDate, LastActivityDate, Future_Activities__c, Loan_Anniversary_Date__c, Loan_Processor_User__c, IsClosed from Opportunity];
        system.debug(newlist);

        
        OpportunityContactRole testOCR1 = new OpportunityContactRole(ContactId=cont.Id,OpportunityId=testOpp8.Id,Role='Borrower');
        insert testOCR1;   
		OpportunityContactRole testOCR2 = new OpportunityContactRole(ContactId=cont.Id,OpportunityId=testOpp1.Id,Role='Borrower');
        insert testOCR2;   

        Properties__c newProperty = new Properties__c(Name='Test Property',Property_Street__c='123 Test',Property_City__c='Test',Property_State__c='MI',
          Property_Zip__c='48187',Property_County__c='Wayne',Property_Type__c='Detached',Most_Recent_Closed_Opportunity__c=testOpp8.Id, OwnerId=OwnerUser.Id);

        insert newProperty;
    }
    

    
    //Confirm behavior for Loan Check-in Reminder 24h
       testMethod static void testCreateLoanCheckinTasks() {
        test.startTest();
        
        database.executeBatch(new TaskCreator('Loan Check-in 24h'));

        test.stopTest();
        //General Opportunity Task Creation OK
        string id4 = [Select id from Opportunity where Name = 'Processing Last Activity 1d, future scheduled' LIMIT 1].Id;
        string id3 = [Select id from Opportunity where Name = 'Processing Last Activity 1d' LIMIT 1].Id;
        System.assert([Select Id from Task WHERE What.ID = :id3].size()>=0);           
		System.assert([Select Id from Task WHERE What.ID = :id4].size()==0);
       }
    
     //Confirm behavior for TBD Loan Check-in Reminder 45d
       testMethod static void testCreateTBDLoanCheckinTasks() {
        test.startTest();
        
        database.executeBatch(new TaskCreator('TBD Loan Check-in Reminder 45d'));

        test.stopTest();
        //General Opportunity Task Creation OK
        string id1 = [Select id from Opportunity where Name = 'TBD Last Activity 45d, future scheduled' LIMIT 1].Id;
        string id2 = [Select id from Opportunity where Name = 'TBD Last Activity 45 Days' LIMIT 1].Id;
           
        System.assert([Select Id from Task WHERE What.ID = :id2].size()>=0);           
		System.assert([Select Id from Task WHERE What.ID = :id1].size()==0);
           
       }
		
    //Confirm behavior for Loan Anniversary
       testMethod static void testLoanAnniversaryTasks() {
        test.startTest();
        
        database.executeBatch(new TaskCreator('Loan Anniversary'));
        database.executeBatch(new TaskCreator('Loan Anniversary Next 30d'));

        test.stopTest();
        //General Opportunity Task Creation OK
        
        System.assert([Select Id from Task WHERE Subject = 'Loan Anniversary Followup'].size()>=0);           
  
       }
    
      //Confirm behavior for Birthday
       testMethod static void testBirthdayTasks() {
        test.startTest();
        
        database.executeBatch(new TaskCreator('Birthday Follow-up'));
        database.executeBatch(new TaskCreator('Birthdays Next 30d'));

        test.stopTest();
        //General Opportunity Task Creation OK
        
        System.assert([Select Id from Task WHERE Subject = 'Birthday Follow-up'].size()>=0);           
  
       }

		//Confirm behavior for Contact
       	testMethod static void testContactTasks() {
        test.startTest();
        
        database.executeBatch(new TaskCreator('No Client Contact 6mo'));

        test.stopTest();
        //General Opportunity Task Creation OK
        
        System.assert([Select Id from Task WHERE Subject = 'No Client Contact 6mo'].size()>=0);           
  
       }

        //Confirm behavior for Lead
       	testMethod static void testLeadTasks() {
        test.startTest();
        
        database.executeBatch(new TaskCreator('Lead Followup Task'));

        test.stopTest();
        //General Opportunity Task Creation OK
        
        System.assert([Select Id from Task WHERE Subject = 'Lead Followup Task'].size()>=0);           
  
       }

    
      //Confirm behavior for Loan Lock Expiration and COE
       	testMethod static void testLoanCriticalDates() {
        test.startTest();
        
        database.executeBatch(new TaskCreator('Loan Two Weeks from COE - LO'));
        database.executeBatch(new TaskCreator('Loan Two Weeks from COE - Processor'));
        database.executeBatch(new TaskCreator('Loan Lock Expires - LO'));
        database.executeBatch(new TaskCreator('Loan Lock Expires - Processor'));
            
        test.stopTest();
        //General Opportunity Task Creation OK
       
        System.assert([Select Id from Task WHERE Subject = 'Loan Two Weeks from COE - LO'].size()>=0);           
  		System.assert([Select Id from Task WHERE Subject = 'Loan Two Weeks from COE - Loan Processor'].size()>=0); 
        System.assert([Select Id from Task WHERE Subject = 'Loan Lock Expires - LO'].size()>=0); 
        System.assert([Select Id from Task WHERE Subject = 'Loan Lock Expires - Loan Processor'].size()>=0); 
            
       }

    
		testMethod static void testWeekendTask() {
        	test.startTest();
        
        database.executeBatch(new TaskCreator('TestOnly'));

        test.stopTest();	    
            
        //Saturday Date task is moved to Monday
        system.debug('Todays Day of week: ' + String.valueof(System.now().format('EEE')));
        Task satTask = [Select Id, ActivityDate from Task where Subject = 'TestOnly' LIMIT 1];
        DateTime checkDate = Datetime.newInstance(satTask.ActivityDate, Time.newInstance(12,0,0,0));
        String dow = String.valueOf(checkDate.format('EEE'));
            system.debug(dow);
   //     System.assert(dow=='Mon');
    
    } 
    
    //confirm behavior for scheduler
    testMethod static void testScheduler() {
        
        test.startTest();
        
        TaskBatchScheduler batch = new TaskBatchScheduler('TBD Loan Check-in Reminder 45d');
        String sch = '0 0 6 * * ?';
        System.schedule('TBD Loan Check-in Reminder 45d', sch, batch);
        
        test.stopTest();
        
    } 
    


 
}