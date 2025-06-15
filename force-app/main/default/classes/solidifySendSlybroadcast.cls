public class solidifySendSlybroadcast {
 
    public String inputAudioFile {get;set;}
    public String inputPhones {get;set;} 
    public String inputCallerId {get;set;}
    public Boolean init{
        get{
            init();
            return false;
        }
    }

    
    public solidifySendSlybroadcast(){}
    public void init(){
        system.debug('init: ' + inputPhones);
        system.debug(inputCallerId);
        system.debug(inputAudioFile);
    }
  
    public class slyMessageParameters {
        @InvocableVariable(Label = 'Phone number' Required = true)
        public string phone;
        
        @InvocableVariable(Label = 'Caller ID number' Required = true)
        public String callerId;
        
        @InvocableVariable(Label = 'Audio File Name' Required = true)
        public String audioFile;
        
        @InvocableVariable(Label = 'Lead Time Zone (Pacific is default)' Required = False )
        public String leadTimeZone;
    }
      
    @InvocableMethod(Label = 'Send Slybroadcast Message')
    public static void sendSlyMessage(slyMessageParameters[] slyparameters){
		system.debug(slyparameters);
        Datetime currentDT = getCurrentDT();
        system.debug('Current Date:' + currentDT);
		Datetime sendDateTime;
        String sendDateTimeStr;      
        
        for (slyMessageParameters p: slyparameters){
            // convert timezone string to offset from GMT
			sendDateTimeStr = getSendDateTimeStr(p.leadTimeZone, currentDT);
            solidifySendSlybroadcast.doSlyCallout(p.phone, p.callerId, p.audioFile, sendDateTimeStr);
        }
    }
    
    @TestVisible 
    public static DateTime mockCurrentDT {get; set;}
    
    public static dateTime getCurrentDT(){
        
        if (Test.isRunningTest() && (mockCurrentDT!=null)){
            return mockCurrentDT;
        } else {
            return datetime.now();
        }
      }
    
    public static String getSendDateTimeStr(string easyTimeZone, datetime GMTDateTime ){
            Integer timezoneOffset;
            switch on easyTimeZone {
                when 'Pacific'{
                    timezoneOffset = getTzOffsetNow('America/Los_Angeles');
                }
                when 'Mountain'{
                    timezoneOffset = getTzOffsetNow('America/Denver');
                }
                when 'Central'{
                    timezoneOffset = getTzOffsetNow('America/Chicago');
                }
                when 'Eastern'{
                    timezoneOffset = getTzOffsetNow('America/New_York');
                }
                when else {
                    timezoneOffset = getTzOffsetNow('America/Los_Angeles');
                }
            }
        system.debug('Offset:' + timezoneOffset);
            // get current datetime in GMT, convert to user timezone using offset
            dateTime userDateTime = GMTDateTime.addHours(timezoneOffset);
            integer userHour = userDateTime.hourGMT();
        system.debug(userDateTime);	
        system.debug(userHour);
            integer waitTime = 0;
            // if user datetime is before 9am or after 5pm localtime, set sendtime within business hours,
            if (userHour < 9){
                //schedule send for same day, 9am local time (converted to string in Eastern Time) 
                waitTime = 9 - userHour;
            } 
            else if (userHour > 17 ){
                //schedule send for next day, 9am 
            	waitTime = 24 - userHour + 9;
                
            } else {
                //schedule send for now 
                waitTime = 0;
                
            }
        	system.debug('Wait hours:' + waitTime);
            return GMTDateTime.addHours(waitTime).format('YYYY-MM-dd HH:mm:ss', 'America/New_York');
    }
    
    public static integer getTzOffsetNow(string timeZoneName){
        return TimeZone.getTimeZone(timeZoneName).getOffset(datetime.now())/(1000*60*60);
        
    }
       
    public void buttonSendSlyMessage(){
        init();
        system.debug(inputPhones);
        solidifySendSlybroadcast.sendSlyMessage(inputPhones, inputCallerId, inputAudioFile);
    }
   
    //immediate call from VF page
    public static PageReference sendSlyMessage(string phone, string callerId, string audioFile){
        
        string message;
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setMethod('POST');
        req.setTimeout(120000);
        req.setHeader('Content-Type','application/x-www-form-urlencoded');
        
        string c_uid = 'dusty@solidify.com';
        string password = '3of%k5S78E8T';

        
        //	string mobile_only = '1';
        
        string url = 'https://www.mobile-sphere.com/gateway/vmb.php?' + 'c_uid=' + c_uid + 
                    '&c_password='+ password + 
                    '&c_callerID=' + callerId+ 
                    '&c_phone=' + phone +
                    '&c_date=now' +
                    '&c_record_audio='+ audioFile;
        url = url.replaceAll( ' ', '%20');
        req.setEndpoint(url);
        
        system.debug(url);
        system.debug(req.getBody());
        
        HttpResponse resp = new HttpResponse();
        system.debug(req.getBody());
        resp = h.send(req);
        system.debug(resp);
        // If the request is successful, log debug.
        if (resp.getStatusCode() == 200) {
            // Deserialize the JSON string into collections of primitive data types.
            system.debug(resp);
            System.debug('Success Response received from SlyBroadcast');
            message = 'The request has been submitted to SlyBroadcast. You may log in to the Slybroadcast website to see the status of the Campaign.  If no campaign was created, please check the name of the Audio File and resubmit.';
        }
        
        ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.Info, message));
        return null;
    }
    
    @future(callout=true)
    public static void doSlyCallout(string phone, string callerId, string audioFile, string sendDateTime){
        
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setMethod('POST');
        req.setTimeout(120000);
        req.setHeader('Content-Type','application/x-www-form-urlencoded');
        
        string c_uid = 'dusty@solidify.com';
        string password = '3of%k5S78E8T';

        
        //	string mobile_only = '1';
        
        string url = 'https://www.mobile-sphere.com/gateway/vmb.php?' + 'c_uid=' + c_uid + 
                    '&c_password='+ password + 
                    '&c_callerID=' + callerId+ 
                    '&c_phone=' + phone +
                    '&c_date=' + sendDateTime +
                    '&c_record_audio='+ audioFile;
        url = url.replaceAll( ' ', '%20');
        req.setEndpoint(url);
             
        system.debug(url);
        system.debug(req.getBody());
        
        HttpResponse resp = new HttpResponse();
        system.debug(req.getBody());
        resp = h.send(req);
        system.debug(resp);
        // If the request is successful, log debug.
        if (resp.getStatusCode() == 200) {
            // Deserialize the JSON string into collections of primitive data types.
            system.debug(resp);
            System.debug('Success Response received from SlyBroadcast');
           
        }
        
    }   
   
    
}