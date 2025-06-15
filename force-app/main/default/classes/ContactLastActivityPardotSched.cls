global class ContactLastActivityPardotSched implements Database.Batchable<sObject>, Schedulable {

    String query = 'SELECT Id, Days_Since_Last_Activity__c, Days_Since_Last_Activity_Pardot__c FROM Contact WHERE Days_Since_Last_Activity__c>0 Order By AccountId';

    global ContactLastActivityPardotSched() {
    }

    global Database.QueryLocator start(Database.BatchableContext BC) {
		return Database.getQueryLocator(query);
    }

    global void execute(Database.BatchableContext BC, List<sObject> scope) {

        For(Contact c: (List<Contact>) scope){
            c.Days_Since_Last_Activity_Pardot__c = c.Days_Since_Last_Activity__c;
        }
		update scope;
        
    }

    global void finish(Database.BatchableContext BC) {
	// finish code
    }

    global void execute(SchedulableContext SC) {
 		database.executebatch(new ContactLastActivityPardotSched());
    }
    
}