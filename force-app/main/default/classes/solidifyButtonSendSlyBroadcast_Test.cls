@isTest
public class solidifyButtonSendSlyBroadcast_Test {


    @testSetup
    static void stageTestData() {
        
    List<Lead> testLeads = new List<Lead>();
    
    Lead tL1 = new Lead(firstname='Adam', Lastname= 'Arch', mobilephone='855-555-1212', company='A' );
       	testLeads.add(tL1);
    Lead tL2 = new Lead(firstname='Bonnie', lastname='Bishop', mobilephone='966-555-1212', company='B');
    	testLeads.add(tL2);
        
        insert testLeads;
        
    }

	testMethod static void testButtonSendSlyBroadcast() {
        
	Test.startTest();
        List<Lead> leadList = [Select name, mobilePhone from Lead];
        Test.setCurrentPage(Page.solidifyButtonSendSlyBroadcast);
        
        ApexPages.StandardSetController stdSC = new ApexPages.StandardSetController(leadList);
        stdSC.setSelected(leadList);
        solidifyButtonSendSlyBroadcast Send = new solidifyButtonSendSlyBroadcast(stdSC);
        
        Send.audioFile = 'Test';
        Send.callerId = 'Test;';
               
        Integer i = Send.getMySelectedSize();
        
        Test.setMock(HttpCalloutMock.class, new solidifySendSlybroadcastMock());
        solidifySendSlyBroadcast sendComp = new solidifySendSlyBroadcast();
        
        solidifySendSlybroadcast.sendSlyMessage('phones', '1234567', 'Test');
        
        
        Test.stopTest();
        
        
    
	}
}