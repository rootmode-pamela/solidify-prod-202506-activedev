/*
 * Description: Apex test class for the batch task creation and scheduler classes.
 *
 *  Author              Date                    Change History
 *  ----------          ----------              --------------------
 *  P.S.                2017-12-11              Created
 *  P.S.                2017-12-15              Added support for WhoId on Properties__c tasks
 *  P.S.                2018-01-06              Added support for Last Activity Date and necessary tests
 * */
@isTest
public class DateBatchTaskCreation_Test {

    //This method will stage all appropriate test data including custom settings and needed records
    @testSetup
    static void stageTestData() {
        
        List<Task_Creation__c> taskSettings = new List<Task_Creation__c>();
        
       
        Integer taskDueDate;
        DateTime testDateTime = System.now();
        String dueDayOfWeek = String.valueOf(testDateTime.format('EEE', 'America/Los_Angeles'));
        system.debug ('day of Week:' + dueDayofWeek);
        if (dueDayOfWeek=='Sun') {taskDueDate = -1;}
        if (dueDayOfWeek=='Mon') {taskDueDate = 5;}
        if (dueDayOfWeek=='Tue') {taskDueDate = 4;}
        if (dueDayOfWeek=='Wed') {taskDueDate = 3;}
        if (dueDayOfWeek=='Thu') {taskDueDate = 2;}
        if (dueDayOfWeek=='Fri') {taskDueDate = 1;}
        if (dueDayOfWeek=='Sat') {taskDueDate = 0;}
        
        Task_Creation__c tc6 = new Task_Creation__c(Name='Opp MC Sat Due Date Close Today',Object_API_Name__c='Opportunity',
                                                  Field_API_Name__c='CloseDate',Task_Name__c='O6',
                                                  Date_Filter_Operator__c='=',Date_Range_Filter__c=0,
                                                  Due_In__c=taskDueDate);
        taskSettings.add(tc6);
        
               Task_Creation__c tc9 = new Task_Creation__c(Name='Property task',Object_API_Name__c='Properties__c',
                                                  Field_API_Name__c='CreatedDate',Task_Name__c='P2',
                                                  Date_Filter_Operator__c='=',Date_Range_Filter__c=0,
                                                  Due_In__c=0);
        taskSettings.add(tc9);
        
        Task_Creation__c tc10 = new Task_Creation__c(Name='Contact Task',Object_API_Name__c='Contact',
                                                  Field_API_Name__c='Next_Birthdate__c',Task_Name__c='C1',
                                                  Date_Filter_Operator__c='=',Date_Range_Filter__c=0,
                                                  Due_In__c=0);
        taskSettings.add(tc10);


        insert taskSettings;
        
        User OwnerUser = new User(Firstname='Test',lastname='Owner', Email = 'test@test.com', Username = 'testowner@solidfy.com.dev', alias = 'town', profileid = '00ef4000001B3XBAA0', TimeZoneSidKey = 'America/Los_Angeles', LocaleSidKey = 'en_US', EmailEncodingKey = 'ISO-8859-1', LanguageLocaleKey = 'en_US');
        insert OwnerUser;
        User ProcessorUser = new User(Firstname='Test',lastname='Processor', Email = 'test@test.com', Username = 'testprocessor@solidfy.com.dev', alias = 'tproc', profileid = '00ef4000001B3XBAA0', TimeZoneSidKey = 'America/Los_Angeles', LocaleSidKey = 'en_US', EmailEncodingKey = 'ISO-8859-1', LanguageLocaleKey = 'en_US');
        insert ProcessorUser;
        User LOUser = new User(Firstname='Test',lastname='LO', Email = 'test@test.com', Username = 'testloanofficer@solidfy.com.dev', alias = 'tloff', profileid = '00ef4000001B3XBAA0', TimeZoneSidKey = 'America/Los_Angeles', LocaleSidKey = 'en_US', EmailEncodingKey = 'ISO-8859-1', LanguageLocaleKey = 'en_US');
        insert LOUser;
        
        Account newAcct = new Account(Name='Test', Ownerid = OwnerUser.Id, Loan_Originator_User__c = LOUser.Id);
        insert newAcct;
        
        Date currentDate = Date.today();
        Date bDate = Date.newInstance(1962, currentDate.Month(), currentDate.Day());
        system.debug('birthdate: ' + bDate);
        
        Contact cont = new Contact(FirstName='Test',LastName='Tester', AccountId=newAcct.Id, Birthdate = bDate);
        insert cont;
        
        List<Opportunity> testOpps = new List<Opportunity>();
        
        Opportunity testOpp1 = new Opportunity(Name='Open, Close Date Today',StageName='Analysis / TBD',CloseDate=System.Today(),AccountId=newAcct.Id, OwnerId=OwnerUser.Id, Loan_Originator_User__c = LOUser.id, Loan_Processor_User__c=ProcessorUser.Id);
        testOpps.add(testOpp1);
        Opportunity testOpp2 = new Opportunity(Name='Open, Close Date Future',StageName='Analysis / TBD',CloseDate=System.Today().addDays(15),AccountId=newAcct.Id, OwnerId=OwnerUser.Id, Loan_Originator_User__c = LOUser.id, Loan_Processor_User__c=ProcessorUser.Id);
        testOpps.add(testOpp2);
        Opportunity testOpp3 = new Opportunity(Name='Closed, Close Date Future',StageName='Closed Won',CloseDate=System.Today().addDays(11),AccountId=newAcct.Id, OwnerId=OwnerUser.Id, Loan_Originator_User__c = LOUser.id, Loan_Processor_User__c=ProcessorUser.Id);
        testOpps.add(testOpp3);
        Opportunity testOpp4 = new Opportunity(Name='Closed, Close Date Past',StageName='Closed Won',CloseDate=System.Today().addDays(-10),AccountId=newAcct.Id, OwnerId=OwnerUser.Id, Loan_Originator_User__c = LOUser.id, Loan_Processor_User__c=ProcessorUser.Id);
        testOpps.add(testOpp4);
        Opportunity testOpp5 = new Opportunity(Name='Closed Lost, No Future Task',StageName='Closed Lost',CloseDate=System.Today(),AccountId=newAcct.Id, OwnerId=OwnerUser.Id, Loan_Originator_User__c = LOUser.id, Loan_Processor_User__c=ProcessorUser.Id);
        testOpps.add(testOpp5);
        Opportunity testOpp6 = new Opportunity(Name='Closed Lost, Future Task',StageName='Closed Lost',CloseDate=System.Today(),AccountId=newAcct.Id, OwnerId=OwnerUser.Id, Loan_Originator_User__c = LOUser.id, Loan_Processor_User__c=ProcessorUser.Id, type = 'Client');
        testOpps.add(testOpp6);   
        Opportunity testOpp7 = new Opportunity(Name='Open, Close Date Today',StageName='Analysis / TBD',CloseDate=System.Today(),AccountId=newAcct.Id, OwnerId=OwnerUser.Id, Loan_Originator_User__c = LOUser.id, Loan_Processor_User__c=ProcessorUser.Id, Type = 'Client');
        testOpps.add(testOpp7);
        Opportunity testOpp9 = new Opportunity(Name='Closed Won, Future Task',StageName='Closed Won',CloseDate=System.Today(),AccountId=newAcct.Id, OwnerId=OwnerUser.Id, Loan_Originator_User__c = LOUser.id, Loan_Processor_User__c=ProcessorUser.Id, type = 'Client');
        testOpps.add(testOpp9);   
        
        
        //anniversary date for loan = today.  don't run test on a leap day 
        Date cDate = Date.newInstance((Date.Today().Year() - 1), Date.Today().Month(), Date.Today().Day());
        system.debug ('loan anniversary date:' + cDate);
          
        Opportunity testOpp8 = new Opportunity(Name='Loan Anniversary Today',StageName='Closed Won',CloseDate=cDate,AccountId=newAcct.Id, OwnerId=OwnerUser.Id, Loan_Originator_User__c = LOUser.id, Loan_Processor_User__c=ProcessorUser.Id);
        testOpps.add(testOpp8);
        insert testOpps;
        
        //damn workflow rules change my opp close dates and fail the freaking tests
        testOpp1.CloseDate = System.today();
        update testOpp1;
        testOpp8.CloseDate = cDate;
        update testOpp8;
        //set future task on Opp6
        testOpp6.Future_Activities__c = 1;
        update testOpp6;

        List<Opportunity> newlist = [Select Id, Name, StageName, CloseDate, Future_Activities__c, Loan_Anniversary_Date__c, Loan_Processor_User__c, IsClosed from Opportunity];
        system.debug(newlist);
        
        OpportunityContactRole testOCR1 = new OpportunityContactRole(ContactId=cont.Id,OpportunityId=testOpp3.Id,Role='Borrower');
        insert testOCR1;   
		OpportunityContactRole testOCR2 = new OpportunityContactRole(ContactId=cont.Id,OpportunityId=testOpp7.Id,Role='Borrower');
        insert testOCR2;   

        Properties__c newProperty = new Properties__c(Name='Test Property',Property_Street__c='123 Test',Property_City__c='Test',Property_State__c='MI',
          Property_Zip__c='48187',Property_County__c='Wayne',Property_Type__c='Detached',Most_Recent_Closed_Opportunity__c=testOpp7.Id, OwnerId=OwnerUser.Id);

        insert newProperty;
    }
    
    
    //confirm behavior for scheduler
    testMethod static void testScheduler() {
        
        test.startTest();
        
        new DateBatchTaskScheduler();
        
        test.stopTest();
        
    }
    
    //Confirm behavior for contact or lead task creation
    testMethod static void testCreatePersonTask() {
        Contact testCont = [Select Id from Contact];
        
        test.startTest();
        
        new DateBatchTaskCreation('Contact');
        
        test.stopTest();
        
   
    }

 

}