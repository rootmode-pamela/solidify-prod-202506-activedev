({
	recordUpdate : function(component, event, helper) {
        $A.get("e.force:refreshView").fire();
	},
    
    handleSaveRecord: function(component, event, helper) {
        console.log("saving record...");
        component.find("leadDetailForm").submit();
 	},
  
    
    highlightChangedField: function(component, event, helper){
        var field = event.getSource().getLocalId();
        var matchCount = 0;
        var dirtyFields = component.get('v.dirtyFields');
        let dirty = dirtyFields.map(function(a) { return a.value});
        console.log('current Field: ' + field);
		for(var i in dirty){
            if(dirty[i] == field){
                matchCount = matchCount + 1;
            }
        }
        if(matchCount === 0){
            dirtyFields.push( { value: field} );
        	component.set('v.dirtyFields', dirtyFields);
        	var target = component.find(field);
        	$A.util.addClass(target, 'changeHighlight');
        	var saveButton = component.find('submitButton');
            saveButton.set('v.disabled', false);
        	$A.util.addClass(saveButton, 'changeHighlight');
        }
    },
    
    handleSuccess : function(component, event, helper) {
		console.log('record updated successfully');    
        component.set("v.showSpinner", false);
        var dirtyFields = component.get('v.dirtyFields')
        let dirty = dirtyFields.map(function(a) { return a.value});
       // var dirty = component.get('v.dirtyFields');
        console.log(dirty);
        for(var i in dirty){
            console.log(dirty[i]);
            var d = component.find(dirty[i]);
            $A.util.removeClass(d, 'changeHighlight');
        };
      	//component.find('v.dirtyFields').set('v.value', '[]');
        	var saveButton = component.find('submitButton');
            saveButton.set('v.disabled', true);
        	$A.util.removeClass(saveButton, 'changeHighlight');
        
        var toastEvent = $A.get("e.force:showToast");
    	toastEvent.setParams({
        "type": "success",
        "title": "Success!",
        "message": "Lead record has been updated successfully."
    });
    toastEvent.fire();
        
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
            
			
            component.find("Street").set("v.fieldName", "Street");
            component.find("Street").set("v.value", helper.extractAddressComponent(placeDetails.result.address_components, "street_number") + ' ' + helper.extractAddressComponent(placeDetails.result.address_components, "route"));
            
            component.find("City").set("v.fieldName", "City");
            component.find("City").set("v.value", helper.extractAddressComponent(placeDetails.result.address_components, "locality"));
            
            component.find("State").set("v.fieldName", "State");
            component.find("State").set("v.value",  helper.extractAddressComponent(placeDetails.result.address_components, "administrative_area_level_1", "short"));
            
            component.find("Zip").set("v.fieldName", "PostalCode");
            component.find("Zip").set("v.value",   helper.extractAddressComponent(placeDetails.result.address_components, "postal_code"));
 
            component.find("leadDetailForm").submit();              
             $A.get("e.force:refreshView").fire(); 
			},params);	
        },
    
      getAddress2 : function(component, event, helper){	 
		var params = {
	  		"input" : component.get('v.location2')	
		} 
 
		helper.callServer(component,"c.getSuggestions",function(response){
			var resp = JSON.parse(response);	
			console.log(resp.predictions);
			component.set('v.predictions2',resp.predictions);	
		},params);	
 
	},
    
    getAddressDetails2 : function(component, event, helper){		 
		var selectedItem = event.currentTarget;
        var placeid = selectedItem.dataset.placeid;
 
		var params = {
	   	"placeId" : placeid  	
		} 
 
		helper.callServer(component,"c.getPlaceDetails",function(response){
			var placeDetails = JSON.parse(response); 	
            var Lead = component.get("v.Lead");
			component.set('v.location2',placeDetails.result.name);	
			component.set('v.predictions2',[]); 
            
			
            component.find("SP_Street").set("v.fieldName", "Subject_Property_Street__c");
            component.find("SP_Street").set("v.value", helper.extractAddressComponent(placeDetails.result.address_components, "street_number") + ' ' + helper.extractAddressComponent(placeDetails.result.address_components, "route"));
            
            component.find("SP_City").set("v.fieldName", "Subject_Property_City__c");
            component.find("SP_City").set("v.value", helper.extractAddressComponent(placeDetails.result.address_components, "locality"));
            
            console.log('state');
            console.log(component.find("SP_State").get("v.fieldName"));
            component.find("SP_State").set("v.fieldName", "Subject_Property_State__c");
            component.find("SP_State").set("v.value",  helper.extractAddressComponent(placeDetails.result.address_components, "administrative_area_level_1", "short"));
            console.log(helper.extractAddressComponent(placeDetails.result.address_components, "administrative_area_level_1", "short"));
            console.log(component.find("SP_State").get("v.value"));
            
            component.find("SP_Zip").set("v.fieldName", "Subject_Property_Zip__c");
            component.find("SP_Zip").set("v.value",   helper.extractAddressComponent(placeDetails.result.address_components, "postal_code"));
 
            component.find("leadDetailForm").submit();              
             $A.get("e.force:refreshView").fire(); 
			},params);	
        }
    
 
})