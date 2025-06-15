@isTest
public class solidifyGoogleMaps_test {


    @testSetup
    static void stageTestData() {
        
    }

	testMethod static void testAutoComplete() {
        
        test.startTest();
        
        Test.setMock(HttpCalloutMock.class, new solidifyGoogleMapsMock());
        
        // Call method to test.
        // This causes a fake response to be sent
        // from the class that implements HttpCalloutMock. 
        
        String url = '';
        HttpResponse res = solidifyGoogleMaps.fullResponse(url);
        
        // Verify response received contains fake values
        String contentType = res.getHeader('Content-Type');
        System.assert(contentType == 'application/json');
        String actualValue = res.getBody();
        String expectedValue = '{"example":"test"}';
        System.assertEquals(actualValue, expectedValue);
        System.assertEquals(200, res.getStatusCode());
        
        String input = '1234';
        String suggestion = solidifyGoogleMaps.getSuggestions(input);
        String place = solidifyGoogleMaps.getPlaceDetails(input);
    }


}