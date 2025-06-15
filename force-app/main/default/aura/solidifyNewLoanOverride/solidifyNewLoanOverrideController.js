({

    callGlobalAction: function (cmp, event, helper) {
    var actionAPI = cmp.find("quickActionAPI");

    var args = { actionName: "NewOpportunity" };
    actionAPI.invokeAction(args);
	},
    
	handleCancel : function(component, event, helper) {
      // Navigate back to the record view
		var homeEvt = $A.get("e.force:navigateToObjectHome");
		homeEvt.setParams({
    		"scope": "Opportunity"
		});
        homeEvt.fire();
    }
})