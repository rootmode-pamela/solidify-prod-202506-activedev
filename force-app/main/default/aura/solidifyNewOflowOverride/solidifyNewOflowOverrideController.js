({
    doInit : function(component, event, helper){
        component.find("newLeadForm").getNewRecord(
        "Lead",
        null,
        false,
        $A.getCallback(function() {
            var rec = component.get("v.newLead");
            var error = component.get("v.recordError");
            if (error || (rec === null)) {
                console.log("Error initializing record template: " + error);
                return;
            }
        })
      );
    },
    
    handleSubmit : function(component, event, helper){
        component.set("v.newLead.LastName", component.find('lName').get("v.value"));    
		component.set("v.newLead.FirstName", component.find('fName').get("v.value"));
        component.set("v.newLead.CoBorrower_FirstName__c", component.find('coFName').get("v.value"));
        component.set("v.newLead.CoBorrower_LastName__c", component.find('coLName').get("v.value"));
		component.set("v.newLead.Status", component.find('leadStatus').get("v.value"));
	var tempRec = component.find("newLeadForm");
	tempRec.saveRecord($A.getCallback(function(result) {
    	console.log(result.state);
    	var resultsToast = $A.get("e.force:showToast");
    	if (result.state === "SUCCESS") {
        	resultsToast.setParams({
            	"title": "Saved",
            	"message": "The record was saved."
        	});
        	resultsToast.fire();   
        	var recId = result.recordId;
			helper.navigateTo(component, recId);
    	} else if (result.state === "ERROR") {
        	console.log('Error: ' + JSON.stringify(result.error));
        	resultsToast.setParams({
            	"title": "Error",
            	"message": "There was an error saving the record: " + JSON.stringify(result.error)
        	});
            resultsToast.fire();
    	} else {
        	console.log('Unknown problem, state: ' + result.state + ', error: ' + JSON.stringify(result.error));
    	}
	}));
        
    },

	handleCancel : function(component, event, helper) {
      // Navigate back to the record view
		var homeEvt = $A.get("e.force:navigateToObjectHome");
		homeEvt.setParams({
    		"scope": "Case"
		});
		homeEvt.fire();
	}
})