({
    goToRefi : function(component, event, helper) {
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:solidify_newProposal"
        });
        
        evt.fire();                           
	},
    
    goToScenario : function(component, event, helper){
        var evt = $A.get("e.force:navigateToURL");
        evt.setParams({
            "url" : "/lightning/n/Scenario_Analysis_Proposal"
        });
        
        evt.fire();   
    },
    
    goToRateNew : function(component, event, helper){
        var evt = $A.get("e.force:navigateToURL");
        evt.setParams({
            "url" : "/lightning/n/Rate_Analysis_Input"
        });
        
        evt.fire();   

    },
    
    cancelDialog : function(component, event, helper){
        var homeEvt = $A.get("e.force:navigateToObjectHome");
			homeEvt.setParams({
    		"scope": "Proposal__c"
		});
		homeEvt.fire();

    }
})