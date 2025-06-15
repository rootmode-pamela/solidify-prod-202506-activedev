@isTest
public class solidifySendSlybroadcast_test {


	@testSetup
    static void stageTestData() {
        
    List<Lead> testLeads = new List<Lead>();
    
    Lead tL1 = new Lead(firstname='Adam', Lastname= 'Arch', mobilephone='855-555-1212', company='A', Lead_Time_Zone__c = 'Pacific' );
    	testLeads.add(tL1);
    Lead tL2 = new Lead(firstname='Bonnie', lastname='Bishop', mobilephone='966-555-1212', company='B', Lead_Time_Zone__c = 'Mountain');
    	testLeads.add(tL2);
    Lead tL3 = new Lead(firstname='Chris', Lastname= 'Cash', mobilephone='929-555-1212', company='C', Lead_Time_Zone__c = 'Central' );
    	testLeads.add(tL3);
    Lead tL4 = new Lead(firstname='David', Lastname= 'Deacon', mobilephone='208-555-1212', company='D', Lead_Time_Zone__c = 'Eastern' );
    	testLeads.add(tL4);
    Lead tL5 = new Lead(firstname='Adam', Lastname= 'Arch', mobilephone='855-555-1212', company='A' );
    	testLeads.add(tL5);
        
    insert testLeads;
        
    }
    
	testMethod static void testSendSlyBroadcast() {
        
        test.startTest();
        
        Test.setMock(HttpCalloutMock.class, new solidifySendSlybroadcastMock());
        
        // Call method to test.
        // This causes a fake response to be sent
        // from the class that implements HttpCalloutMock. 
        
        solidifySendSlybroadcast.slyMessageParameters[] parameters = new List<solidifySendSlybroadcast.slyMessageParameters>();
        
        solidifySendSlybroadcast.slyMessageParameters p = new solidifySendSlybroadcast.slyMessageParameters();
        p.audioFile = 'Test by Adam';
        p.callerId = '6195551212';
        p.phone = '6197943023';
        parameters.add(p);
        
        solidifySendSlybroadcast.sendSlyMessage(parameters);
        
        // Verify response received contains fake values
  //      String contentType = res.getHeader('Content-Type');
  //      System.assert(contentType == 'application/json');
  //      String actualValue = res.getBody();
  //      String expectedValue = '{"example":"test"}';
  //      System.assertEquals(actualValue, expectedValue);
  //      System.assertEquals(200, res.getStatusCode());
        
    }

    testMethod static void testTimeAdjustment() {
        
        test.startTest();
    
    //get current offset from GMT Pacific time 
    	string strOffset = System.now().format('Z');  
		string strOffsetHours = strOffset.substring(0,3); 

    /* requirement is that if a message initiates in off-business hours, the actual send time should be within business hours 
     * in the time zone of the user.  So any message that initiates after 5pm should send at 9am the next day. Any initiating before 
     * 9am should send at 9am that same day.  Additionally, the time sent to Sly must be in Eastern Time (they say EST, but 
     * actually it seems to be Eastern time in whichever current configuration (standard or daylight).     
     
    There definitely may be easier ways of testing this, but here's what I came up with: Create a mockCurrentDateTime for testing
	purposes that replaces current Datetime when isTest.  Pick a few datetimes and timezones to simulate and calculate 
	what the send time should be in ET, then use assertEquals to compare.  Was having a lot of trouble sorting this out until I 
	converted first to GMT for the mockCurrent, so then you have to account for the current offset.  Don't run this test unless 
	you're in the Pacific Timezone!

	*/
	string ET;    
	//simulate current Time for different timezones to check conversion to ET. 
        //Pacific Time, current Time 10/10/18 10pm (10/11/18 5(4)am GMT)  --> SendDateTime = +1 Day noon Eastern
        if (strOffsetHours == '-7'){
            solidifySendSlybroadcast.mockCurrentDT = datetime.newInstanceGMT(2018,10,11,5,0,0);
        	ET = '2018-10-11 12:00:00';
        	} else {
            solidifySendSlybroadcast.mockCurrentDT = datetime.newInstanceGMT(2018,10,11,6,0,0);
            ET = '2018-10-11 13:00:00';
            }
        Datetime currentDT = solidifySendSlybroadcast.getCurrentDT();
        system.debug('CurrentDT: ' + currentDT);
        String ESTSend = solidifySendSlybroadcast.getSendDateTimeStr('Pacific', currentDT);
        system.debug('ESTSend: ' + ESTSend);
        
         
        system.assertEquals(ET, ESTSend, 'Pacific Time after hours');
        
        
    //Mountain Time, current Time 10/10/18 1am (10/10/18 7am GMT) --> SendDateTime = 10/10/18 11am Eastern
    	if (strOffsetHours == '-7'){
            solidifySendSlybroadcast.mockCurrentDT = datetime.newInstanceGMT(2018,10,10,7,0,0);
            ET = '2018-10-10 11:00:00';
        } else {
            solidifySendSlybroadcast.mockCurrentDT = datetime.newInstanceGMT(2018,10,10,8,0,0);
         ET = '2018-10-10 12:00:00';
        }
        currentDT = solidifySendSlybroadcast.getCurrentDT();
        ESTSend = solidifySendSlybroadcast.getSendDateTimeStr('Mountain', currentDT);
        system.debug(ESTSend);
        
        system.assertEquals(ET, ESTSend, 'Mountain Time before business hours');
        
    //Central Time, current Time 10/10/18 11am (10/10/18 4pm GMT) --> SendDateTime = 10/10/18 noon Eastern
      	if (strOffsetHours == '-7'){
            solidifySendSlybroadcast.mockCurrentDT = datetime.newInstanceGMT(2018,10,10,16,0,0);
            ET = '2018-10-10 12:00:00';
        } else {
                solidifySendSlybroadcast.mockCurrentDT = datetime.newInstanceGMT(2018,10,10,17,0,0);
            ET = '2018-10-10 13:00:00';
            }
        currentDT = solidifySendSlybroadcast.getCurrentDT();
        ESTSend = solidifySendSlybroadcast.getSendDateTimeStr('Central', currentDT);
        system.debug(ESTSend);
        
        system.assertEquals(ET, ESTSend, 'Central Time within business hours');
        
    
    //Eastern Time, current Time 10/10/18 2pm (10/10/18 6pm GMT) --> SendDateTime =  Today 2pm Eastern
        	if (strOffsetHours == '-7'){
                solidifySendSlybroadcast.mockCurrentDT = datetime.newInstanceGMT(2018,10,10,18,0,0);
                ET = '2018-10-10 14:00:00';
            } else {
                    solidifySendSlybroadcast.mockCurrentDT = datetime.newInstanceGMT(2018,10,10,19,0,0);
                ET = '2018-10-10 15:00:00';
                }
        currentDT = solidifySendSlybroadcast.getCurrentDT();
        ESTSend = solidifySendSlybroadcast.getSendDateTimeStr('Eastern', currentDT);
        system.debug(ESTSend);
        
        system.assertEquals(ET, ESTSend, 'Eastern Time within business hours');
    }

}