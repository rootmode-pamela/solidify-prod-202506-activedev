public class LeadBorrowerDetailsController {
   
    @AuraEnabled
    public static Lead loadLeadRecord(String recordId){
        return [SELECT Id, FirstName, LastName, Nickname__c, Home_Phone__c, Business_Phone__c, MobilePhone, Email, Borrower_PMOC__c, Employer__c, Estimated_Income__c, Income_Sources__c,
            CoBorrower_FirstName__c, CoBorrower_LastName__c, CoBorrower_Nickname__c, CoBorrower_Home_Phone__c, CoBorrower_Business_Phone__c, CoBorrower_Mobile__c, Email_2__c, CoBorrower_PMOC__c,
            CoBorrower_Employer__c, CoBorrower_Est_Income__c, Purpose__c, Occupancy__c, Current_Program__c, Current_Balance__c, Current_Rate__c, Current_Payment__c, CoBorrower_Income_Source_New__c,
            Qualifying_Fico__c, First_Time_Homebuyer__c, Veteran__c, Subject_Property_Street__c, Subject_Property_City__c, Subject_Property_State__c, Subject_Property_Zip__c, LeadSource, Referred_By__c,
            Referred_By__r.FirstName, Referred_By__r.LastName, Subject_Property_Type__c, Number_of_Units__c, Estimated_Value__c, TBD__c, Purchase_Price__c, Down_Payment__c, Loan_Amount__c
            FROM Lead WHERE Id =: recordId];
    }

    @AuraEnabled
    public static String updateLeadRecord(Lead leadRecord){
        try {
            update leadRecord;

            return 'Success';
        } catch (Exception e) {
            return 'Error: ' + e.getMessage();
        }
    }

    private final static Integer MAX_RESULTS = 5;
    @AuraEnabled(cacheable=true)
    public static List<LookupSearchResult> searchContact(String searchTerm, List<String> selectedIds, String anOptionalParam) {
        System.debug('@@@ searchContact');
        searchTerm += '*';

        List<List<SObject>> searchResults = [FIND :searchTerm IN ALL FIELDS RETURNING
        Contact (Id, Name WHERE id NOT IN :selectedIds)
            LIMIT :MAX_RESULTS];

        List<LookupSearchResult> results = new List<LookupSearchResult>();

        String contactIcon = 'standard:contact';
        Contact [] contacts = ((List<Contact>) searchResults[0]);
        System.debug('@@@ contacts: ' + contacts);
        for (Contact contact : contacts) {
            results.add(new LookupSearchResult(contact.Id, 'Contact', contactIcon, contact.Name, 'Contact • '+ contact.Name));
        }

        return results;
    }


    @AuraEnabled
    public static List<PicklistWrapper> getPicklistValues(String picklistField){
        List<PicklistWrapper> plValues = new List<PicklistWrapper>();
        Schema.SObjectType objType = Schema.getGlobalDescribe().get('Lead');
        Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
        Schema.DescribeFieldResult objFieldInfo = objDescribe.fields.getMap().get(picklistField).getDescribe();
        List<Schema.PicklistEntry> picklistvalues = objFieldInfo.getPicklistValues();
        for(Schema.PicklistEntry plv: picklistvalues) {
            PicklistWrapper plWrap = new PicklistWrapper();
            plWrap.label = plv.getLabel();
            plWrap.value = plv.getValue();
            plValues.add(plWrap);
        }
        return plValues;
    }



    @AuraEnabled
	public static string getSuggestions(String input) {
        String url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?'
	            + 'input=' + EncodingUtil.urlEncode(input, 'UTF-8')
	            + '&types=address' 
            	+ '&location=33.1276035,-117.2936107&radius=1000' + getKey(); 
		system.debug(url);		        
	    String response = getResponse(url);
	    return response;
	}
    
    @AuraEnabled
	public static string getPlaceDetails(String placeId) {
     	String url = 'https://maps.googleapis.com/maps/api/place/details/json?'
	            + 'placeid=' + EncodingUtil.urlEncode(placeId, 'UTF-8')
	            + getKey(); 
	    String response = getResponse(url);
	    return response;
	}
 
	public static string getResponse(string strURL){
        HttpResponse res = new HttpResponse();
        res = fullResponse(strurl);
		String responseBody = res.getBody(); 
		return responseBody;
	}
    
    public static httpResponse fullResponse(string strURL){
        Http h = new Http();
		HttpRequest req = new HttpRequest();
		HttpResponse res = new HttpResponse();
		req.setMethod('GET');
		req.setEndpoint(strURL);
		req.setTimeout(120000);
		res = h.send(req); 
        return res;
    }
 
	public static string getKey(){
		string key = 'AIzaSyCmcGPbEA0svIjLFo5DsstJ5flthYknNGs';
		string output = '&key=' + key;	 
		return output;
	}

    public class PicklistWrapper{
        @AuraEnabled public String label;
        @AuraEnabled public String value;
    }
}