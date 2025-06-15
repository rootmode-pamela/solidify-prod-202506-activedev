({
	recordUpdate : function(component, event, helper) {
         $A.get("e.force:refreshView").fire();
	},
    
    handleSaveRecord: function(component, event, helper) {
        console.log("saving record...");
        component.find("leadPropertyForm").submit();
 	},
          
    getAddress : function(component, event, helper){	 
		var params = {
	  		"input" : component.get('v.location')	
		} 
 
		helper.callServer(component,"c.getSuggestions",function(response){
			var resp = JSON.parse(response);	
			console.log(resp.predictions);
			component.set('v.predictions',resp.predictions);	
		},params);	
 
	},
    
        getAddressDetails : function(component, event, helper){		 
		var selectedItem = event.currentTarget;
        var placeid = selectedItem.dataset.placeid;
 
		var params = {
	   	"placeId" : placeid  	
		} 
 
		helper.callServer(component,"c.getPlaceDetails",function(response){
			var placeDetails = JSON.parse(response); 	
            var Lead = component.get("v.Lead");
			component.set('v.location',placeDetails.result.name);	
			component.set('v.predictions',[]); 
            
			
            component.find("Street").set("v.fieldName", "Subject_Property_Street__c");
            component.find("Street").set("v.value", helper.extractAddressComponent(placeDetails.result.address_components, "street_number") + ' ' + helper.extractAddressComponent(placeDetails.result.address_components, "route"));
            
            component.find("City").set("v.fieldName", "Subject_Property_City__c");
            component.find("City").set("v.value", helper.extractAddressComponent(placeDetails.result.address_components, "locality"));
            console.log('state');
            component.find("State").set("v.fieldName", "Subject_Property_State__c");
            component.find("State").set("v.value",  helper.extractAddressComponent(placeDetails.result.address_components, "administrative_area_level_1", "short"));
            console.log(helper.extractAddressComponent(placeDetails.result.address_components, "administrative_area_level_1", "short"));
            component.find("Zip").set("v.fieldName", "Subject_Property_Zip__c");
            component.find("Zip").set("v.value",   helper.extractAddressComponent(placeDetails.result.address_components, "postal_code"));
 
            component.find("leadPropertyForm").submit();              
             $A.get("e.force:refreshView").fire(); 
			},params);	
        }
 
    
})