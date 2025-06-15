/*
 * Description: Apex batch class that creates Tasks based on criteria specified in class.  For each record returned by the query, 
 * a Task is created with the specified Assign To user (field lookup) with a due date determined by dueInDays and fromDate (Today if null).
 * Additionally, the code reschedules the task to the following Monday if it would otherwise fall on a weekend, and reschedules assignee 
 * to Missy under certain circumstances.  
 *
 *  Author              Date                    Change History
 *  ----------          ----------              --------------------
 *  PAW.                2018-04-05              Created
 *  PAW					2018-09-22				Removed references to custom field Last_Activity_Date__c
 * */

global class TaskCreator implements Database.Batchable<sObject> {  
  
    String query;
    String assignTo;
    global String taskType;
    global String taskName;
    global String objectAPIName;
    global String assignToField;
    global Integer dueInDays;
    global String fromDate;
    
   
    //Initialize method for batch class to prep settings used later on and query string
    global TaskCreator (String taskDesc) {

        //Opportunity Tasks
        //
        if(taskDesc == 'TBD Loan Check-in Reminder 45d'){
            String d2 = string.valueOf(Date.Today().addDays(-45));
            objectAPIName = 'Opportunity';
            query = 'Select Id, Name, LastActivityDate, OwnerId, Loan_Originator_User__c, Loan_Processor_User__c FROM Opportunity '+
                	'WHERE StageName = \'Analysis / TBD\' AND (Future_Activities__c=0 OR Future_Activities__c = null) ' + 
                    'AND (LastActivityDate=null OR LastActivityDate < ' + d2 + ')';
            taskType = 'Followup on Opp';
            assignToField = 'Loan_Originator_User__c';
            dueInDays = 0;
            taskName = taskDesc;
        } 

        if(taskDesc == 'Loan Check-in 24h'){
            system.debug('entered');
            String d1 = string.valueOf(Date.Today().addDays(-1));
            objectAPIName = 'Opportunity';
            query = 'Select Id, Name, LastActivityDate, OwnerId, Loan_Originator_User__c, Loan_Processor_User__c FROM Opportunity '+
                	'WHERE StageName <> \'Analysis / TBD\' AND IsClosed = FALSE AND (Future_Activities__c = 0 OR Future_Activities__c=null) ' +
                	'AND (LastActivityDate = null OR LastActivityDate < ' + d1 + ')';
            taskType = 'Followup on Opp';
            assignToField = 'Loan_Processor_User__c';
            dueInDays = 0;
            taskName = taskDesc;
        }
        
        if(taskDesc == 'Loan Two Weeks from COE - LO'){
            String d2 = string.valueOf(Date.Today().addDays(14));
            objectAPIName = 'Opportunity';
            query = 'Select Id, Name, LastActivityDate, OwnerId, Loan_Originator_User__c, Loan_Processor_User__c FROM Opportunity '+
                	'WHERE IsClosed = FALSE ' + 
                    'AND COE__c = ' + d2 ;
            taskType = 'Two Weeks from COE';
            assignToField = 'Loan_Originator_User__c';
            dueInDays = 0;
            taskName = taskDesc;
        } 
        
        if(taskDesc == 'Loan Two Weeks from COE - Processor'){
            String d2 = string.valueOf(Date.Today());
            objectAPIName = 'Opportunity';
            query = 'Select Id, Name, LastActivityDate, OwnerId, Loan_Originator_User__c, Loan_Processor_User__c FROM Opportunity '+
                	'WHERE IsClosed = FALSE ' + 
                    'AND COE__c = ' + d2 ;
            taskType = 'Two Weeks from COE';
            assignToField = 'Loan_Processor_User__c';
            dueInDays = 0;
            taskName = taskDesc;
        } 
        
        if(taskDesc == 'Loan Lock Expires - LO'){
            String d2 = string.valueOf(Date.Today());
            objectAPIName = 'Opportunity';
            query = 'Select Id, Name, LastActivityDate, OwnerId, Loan_Originator_User__c, Loan_Processor_User__c FROM Opportunity '+
                	'WHERE IsClosed = FALSE ' + 
                    'AND  Lock_Expiration__c =' + d2 ;
            taskType = 'Lock Expires Today';
            assignToField = 'Loan_Originator_User__c';
            dueInDays = 0;
            taskName = taskType;
        } 
        
       if(taskDesc == 'Loan Lock Expires - Processor'){
            String d2 = string.valueOf(Date.Today());
            objectAPIName = 'Opportunity';
            query = 'Select Id, Name, LastActivityDate, OwnerId, Loan_Originator_User__c, Loan_Processor_User__c FROM Opportunity '+
                	'WHERE IsClosed = FALSE ' + 
                    'AND  Lock_Expiration__c =' + d2 ;
            taskType = 'Lock Expires Today';
            assignToField = 'Loan_Processor_User__c';
            dueInDays = 0;
            taskName = taskType;
        } 
       
        //Property Tasks   
        if (taskDesc == 'Loan Anniversary') {
            //Find Properties where Loan Anniversary is 30days from now and scheduled a task for the Loan Anniversary Date.  
            //The 30 day advance prevents other check-in tasks from being scheduled when an 
            //Anniversary Date is coming up soon.
            String d1 = string.valueOf(Date.Today().addDays(30));
            objectAPIName = 'Properties__c';
            query = 'Select Id, Household__r.OwnerId, Most_Recent_Closed_Opportunity__r.Loan_Originator_User__c, Loan_Anniversary_Date__c, Most_Recent_Closed_Opportunity__c from Properties__c '+
                'WHERE Most_Recent_Closed_Opportunity__c != null AND Most_Recent_Closed_Opportunity__r.IsWon = TRUE AND ' +
                ' Loan_Anniversary_Date__c = ' + d1; 
            taskType = 'Loan Anniversary Followup';
            assignToField = 'Most_Recent_Closed_Opportunity__r.Loan_Originator_User__c';
            dueInDays = 30;
            taskName = 'Loan Anniversary Today';
        }
       
            if (taskDesc == 'Loan Anniversary Next 30d') {
            //Run one-time to add tasks for the next 30d  
            //The 30 day advance prevents other check-in tasks from being scheduled when an 
            //Anniversary Date is coming up soon.
            String d1 = string.valueOf(Date.Today().addDays(29));
            String d2 = string.valueOf(Date.Today());
            objectAPIName = 'Properties__c';
            query = 'Select Id, Household__r.OwnerId, Most_Recent_Closed_Opportunity__r.Loan_Originator_User__c, Loan_Anniversary_Date__c, Most_Recent_Closed_Opportunity__c from Properties__c '+
                'WHERE Most_Recent_Closed_Opportunity__c != null AND Most_Recent_Closed_Opportunity__r.IsWon = TRUE AND ' +
                ' Loan_Anniversary_Date__c <= ' + d1 + 'AND Loan_Anniversary_Date__c >= ' + d2; 
            taskType = 'Loan Anniversary Followup';
            assignToField = 'Most_Recent_Closed_Opportunity__r.Loan_Originator_User__c';
            dueInDays = 0;
            fromDate = 'Loan_Anniversary_Date__c';
            taskName = 'Loan Anniversary Today';
        }
        
        //Contact Tasks 
        if (taskDesc == 'Birthday Follow-up'){
            //Find Contacts where Birthdate is 30days from now and scheduled a task for the birthday date.  
            //The 30 day advance prevents other check-in tasks from being scheduled when an 
            //Anniversary Date is coming up soon.
            String d1 = string.valueOf(Date.Today().addDays(30));
            objectAPIName = 'Contact';
            query = 'Select Id, OwnerId, Loan_Originator_User__c,FirstName, LastName, Next_Birthdate__c from Contact ' +
					'WHERE Next_Birthdate__c = ' + d1 ;  
            taskType = 'Birthday Followup';
            AssignToField = 'OwnerId';
            dueInDays = 0;
            fromDate = 'Next_Birthdate__c';
            taskName = 'Birthday Today';
        }

        if (taskDesc == 'Birthdays Next 30d'){
            //Run one-time to add tasks for Birthdys next 30days  
            //The 30 day advance prevents other check-in tasks from being scheduled when an 
            //Anniversary Date is coming up soon.
            String d2 = string.valueOf(Date.Today().addDays(29));
            String d1 = string.valueOf(Date.Today());
            objectAPIName = 'Contact';
            query = 'Select Id, OwnerId, Loan_Originator_User__c, FirstName, LastName, Next_Birthdate__c from Contact ' +
					'WHERE Next_Birthdate__c >= ' + d1 + 'AND Next_Birthdate__c <= ' + d2;  
            taskType = 'Birthday Followup';
            AssignToField = 'OwnerId';
            dueInDays = 0;
            fromDate = 'Next_Birthdate__c';
            taskName = 'Birthday Today';
        }
        
        if (taskDesc == 'No Client Contact 6mo'){
            //Find Contacts where there has been no contact in 6 months and no future activities are scheduled 
            //and scheduled a Followup task for the account owner.
            String d2 = string.valueOf(Date.Today().addDays(-180));
            ObjectAPIName = 'Contact';
            query = 'Select Id, OwnerId, Loan_Originator_User__c, FirstName, LastName, LastActivityDate from Contact ' +
                	'WHERE Type__c = \'Client\' AND (Future_Activities__c=0 OR Future_Activities__c=null) ' +
                	'AND LastActivityDate <' + d2;
            taskType = 'Client Followup';
            dueInDays = 0;
            assignToField = 'Loan_Originator_User__c';
            taskName = taskDesc;
        }
        
         //Lead Tasks 
        if (taskDesc == 'Lead Followup Task'){
            String d2 = string.valueOf(Date.Today().addDays(-1));
            objectAPIName = 'Lead';
            query = 'Select Id, OwnerId, FirstName, LastName, Loan_Originator_User__c from Lead ' +
					'WHERE (Future_Activities__c = 0 OR Future_Activities__c = null) AND ISConverted = FALSE AND (Status = \'Attempted\' OR Status = \'Engaged\') ' +
                	'AND LastActivityDate <' +d2;  
            taskType = 'Lead Followup';
            assignToField = 'OwnerId';
            dueInDays = 0;
            taskName = taskDesc;
        }
        
        
        //Test Only Task
        //
        if(taskDesc == 'Test Only'){
            String d2 = string.valueOf(Date.Today().addDays(-45));
            objectAPIName = 'Opportunity';
            query = 'Select Id, Name, LastActivityDate, OwnerId, Loan_Originator_User__c, Loan_Processor_User__c FROM Opportunity '+
                	'WHERE StageName = \'Analysis / TBD\' AND (Future_Activities__c=0 OR Future_Activities__c = null) ' + 
                    'AND (LastActivityDate__c=null OR LastActivityDate < ' + d2 + ')';
            taskType = 'Followup on Opp';
            assignToField = 'Loan_Originator_User__c';
            dueInDays = 0;
            taskName = taskDesc;
        } 
		//For task testing Weekend shift
        Integer daysToWeekend; 
        Datetime tdate = system.now();
        String weekday = tdate.format('EEE');
        system.debug(weekday);
        If(tdate.format('EEE')=='Sat'){daysToweekend = 0;} else{
            If(tdate.format('EEE')=='Sun'){daysToweekend = 0;} else {
                If(tdate.format('EEE')=='Mon'){daysToweekend = 5;} else {
                    If(tdate.format('EEE')=='Tue'){daysToweekend = 4;} else {
                        If(tdate.format('EEE')=='Wed'){daysToweekend = 3;} else {
                            If(tdate.format('EEE')=='Thurs'){daysToweekend = 2;} else {
                                daysToweekend = 1;
                            }
                        }
                    }
                }
            }
        }
        system.debug(daysToWeekend);
        If(taskDesc == 'TestOnly'){
        	query = 'Select Id, OwnerId from Opportunity WHERE Name = \'Weekend Close\'';
            objectAPIName = 'Opportunity';
            taskType = 'Closedate Weekend';
            assignToField = 'OwnerId';
            dueInDays = daysToWeekend;
            taskName = taskDesc;
    	} 
    
        system.debug('QUERY: ' + query);
        system.debug('assignToField:' + assignToField);
    }    
    
    //Execute query string
    global Database.QueryLocator start(Database.BatchableContext BC) {
        return Database.getQueryLocator(query);
    }

    //Batch processing to create task records
    global void execute(Database.BatchableContext BC, List<sObject> scope) {
        if (scope == null) {system.debug('no records retrieved');} else {	       
        system.debug(scope);
            system.debug(objectAPIname);
            system.debug(assignToField);
            List<Task> tasksToCreate = new List<Task>();

        //Set the default user to Dusty's account, lookup Dusty & Missy's userIds
        User defaultUser = [Select Id from User where isActive = True and FirstName = 'Dusty' and LastName = 'Broderick' Limit 1];
        User missyUser = [Select Id from User where isActive = True and FirstName = 'Missy' and LastName = 'Broderick' Limit 1];
        User dustyUser = [Select Id from User where isActive = True and FirstName = 'Dusty' and LastName = 'Broderick' Limit 1];

        //Find related opportunity contacts if tasks will be created on a Properties__c record
        Map<Id, OpportunityContactRole> relatedOCRs = new Map<Id, OpportunityContactRole>();
        Set<Id> oppIds = new Set<Id>();
        if(objectAPIname=='Properties__c') {
            For(sObject o : scope) {
                system.debug(o);
                if(o.get('Most_Recent_Closed_Opportunity__c')!=null) {
                    oppIds.add(String.valueOf(o.get('Most_Recent_Closed_Opportunity__c')));
                }
            }

            For(OpportunityContactRole ocr : [Select ContactId, OpportunityId, Id from OpportunityContactRole where OpportunityId in: oppIds and Role='Borrower']) {
                if(!relatedOCRs.containsKey(ocr.OpportunityId)) {
                    relatedOCRs.put(ocr.OpportunityId,ocr);
                }
            }
        }
		system.debug(relatedOCRs);
        //For each record, create the task
        for(sObject p : scope) {
				system.debug(p);
            	system.debug(assignToField);
			//Get AssignTo field name and find the value	
            If(assignToField.contains('.')){
                    string relObject = assignToField.left(assignToField.IndexOf('.'));
                    string childField = assignToField.right(assignToField.length() - assignToField.IndexOf('.') - 1);
                system.debug(relObject);
                system.debug(childField);
                    assignTo = String.valueOf(p.getSobject(relObject).get(childField));
                    system.debug(assignTo);
            } else { 
                    assignTo = String.valueOf(p.get(assignToField));}
            
            //Set assignTo default user if requested field is null
            If (assignTo == null) {
                If (p.get('Loan_Originator_User__c') !=null){
                    	assignTo = String.valueOf(p.get('Loan_Originator_User__c'));
               	} else {
               		If (p.get('OwnerId') !=null){
               			assignTo =String.valueOf(p.get('OwnerId'));
                	} else {
                   		assignTo = defaultUser.Id;
               		}
                }
            }

            Date dueDate;    
            system.debug(fromDate);
            If (fromDate == null){
                dueDate = Date.today().addDays(integer.valueOf(dueInDays));
            } else {
                dueDate = Date.valueOf(p.get(fromDate)).addDays(integer.valueOf(dueInDays));
                system.debug(dueDate);
            }   

            
                Task tempTask = new Task(Subject=TaskName, ActivityDate=dueDate, Type=TaskType, OwnerId = assignTo);
                    
                //If the Due Date would fall on a Saturday or Sunday, advance the Due Date to Monday
                DateTime dueDateTime = Datetime.newInstance(tempTask.ActivityDate, Time.newInstance(12,0,0,0));
                String dueDayOfWeek = String.valueOf(dueDateTime.format('EEE'));
                system.debug(dueDayOfWeek);
                if(dueDayOfWeek == 'Sat'){
                   tempTask.ActivityDate = tempTask.ActivityDate.addDays(2);
                } else if (dueDayOfWeek == 'Sun') {
                   tempTask.ActivityDate = tempTask.ActivityDate.addDays(1);
                }
					system.debug(tempTask.ActivityDate);
                //If the batch is for Leads or Contacts, set the WhoId.  If it is for any other object, set the WhatId
                if(objectAPIname=='Lead'||objectAPIname=='Contact') {
                    tempTask.WhoId = p.Id;
                    // Also add the First Name, Last name to the task subject
                    tempTask.Subject = TaskName + ' - ' + String.valueOf(p.get('FirstName')) + ' ' +  String.valueOf(p.get('LastName'));
                } else {
                    system.debug('non-person');

                    //For Properties__c specifically, set the WhoId based on the related Opportunity Contact Roles
                    if(objectAPIname=='Properties__c') {
                        system.debug('properties');
                        system.debug('relatedOCRs: ' + relatedOCRs);
                        if(relatedOCRs.containsKey(String.valueOf(p.get('Most_Recent_Closed_Opportunity__c')))) {
                            system.debug('related OCR found');
                            tempTask.WhoId = relatedOCRs.get(String.valueOf(p.get('Most_Recent_Closed_Opportunity__c'))).ContactId;
                        }
                        Properties__c prop = (Properties__c)p;
                    }
                    tempTask.WhatId = p.Id;
                }
            //Reassign Dusty's Loan Anniversary and Birthday Tasks to Missy
            If ((TaskType == 'Loan Anniversary Followup' || TaskType == 'Birthday Followup') && tempTask.ownerId == dustyUser.Id){
                tempTask.ownerId = missyUser.Id;
            }
            
				system.debug(tempTask);
                tasksToCreate.add(tempTask);
        }
           
                

        //Insert tasks
        if(taskstoCreate.size()>0) {
            insert tasksToCreate;
        }        
    } 
    }
    
    //Finish method, not currently used for anything
    global void finish(Database.BatchableContext BC) {
        
    } 
    
}