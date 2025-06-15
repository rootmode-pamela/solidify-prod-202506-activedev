public class solidifyGoogleMaps { 

    
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
		string key = 'AIzaSyD8e-yOyBMPivW-HtNr0wv6JCwKfhQjp2k';
		string output = '&key=' + key;	 
		return output;
	}
}