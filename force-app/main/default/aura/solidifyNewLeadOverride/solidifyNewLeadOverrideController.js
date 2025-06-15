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

	  helper.loadExistingUser(component);
    },
	lookupSearchContact : function(component, event, helper) {
		const lookupComponent = event.getSource();
		const serverSearchAction = component.get('c.searchContact');
		serverSearchAction.setParam('anOptionalParam', 'not used');
		lookupComponent.search(serverSearchAction);
	},

	clearErrorsOnChangeReferredBy: function(component, event, helper) {
		const selection = component.get('v.selectionReferredBy');
		const errors = component.get('v.errors');
		const lookupComponent = event.getSource();
		var selectionObj = component.get('v.selectionReferredBy');
		// component.set("v.loanRec.Referred_By__c", null);
		console.log("clearErrorsOnChangeReferredBy", JSON.parse(JSON.stringify(selectionObj)), selection);

		for (var i=0; i< selectionObj.length; i++) {
			var sObjRec = selectionObj[i];
			component.set("v.newLead.Referred_By__c", sObjRec.id);
			console.log("ReferredBy", sObjRec.id);
		}
		console.log("ReferredBy",component.get("v.newLead.Referred_By__c"));
	},
    
    handleSubmit : function(component, event, helper){
		var selectionObj = component.get('v.selectionUser');
        component.set("v.newLead.OwnerId", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.newLead.OwnerId", sObjRec.id);
		}
		/*var selectionObj = component.get('v.selectionReferredBy');
        component.set("v.newLead.Referred_By__c", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.newLead.Referred_By__c", sObjRec.id);
		}*/
		
        component.set("v.newLead.LastName", component.find('lName').get("v.value"));    
		component.set("v.newLead.FirstName", component.find('fName').get("v.value"));
        component.set("v.newLead.CoBorrower_FirstName__c", component.find('coFName').get("v.value"));
        component.set("v.newLead.CoBorrower_LastName__c", component.find('coLName').get("v.value"));
		component.set("v.newLead.Status", component.find('leadStatus').get("v.value"));
		component.set("v.newLead.LeadSource", component.find('leadSource').get("v.value"));
        component.set("v.newLead.Purpose__c", component.find('purpose').get("v.value"));
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
    		"scope": "Lead"
		});
		homeEvt.fire();
	},

	lookupSearchUser : function(component, event, helper) {
        const lookupComponent = event.getSource();
        const serverSearchAction = component.get('c.searchUser2');
        serverSearchAction.setParam('anOptionalParam', 'not used');
        lookupComponent.search(serverSearchAction);
    },

    clearErrorsOnChangeUser: function(component, event, helper) {
        const selection = component.get('v.selectionUser');
        const errors = component.get('v.errors');
        const lookupComponent = event.getSource();
        var selectionObj = component.get('v.selectionUser');
        component.set("v.newLead.OwnerId", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.newLead.OwnerId", sObjRec.id);
		}
	},
})