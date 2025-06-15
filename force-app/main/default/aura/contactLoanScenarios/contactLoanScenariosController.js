({
    
    doInit : function(component, event, helper){
        var action=component.get("c.hasActiveLoans");
        action.setParams({
            "recordId" : component.get("v.recordId")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var props = response.getReturnValue();
                if(props == null){
                    component.set("v.hasLoans", false);
                    component.set("v.showInputs", true);
                }
                else{
                    component.set("v.hasLoans", true);
                    component.set("v.properties", props);
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    handleChange : function(component, event, helper){
        var action=component.get("c.updateLoanDetails");
        var propId = component.find('props').get("v.value");
        console.log("propid: " + propId);
        action.setParams({
            "contactId" : component.get("v.recordId"),
            "propId" : propId
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                 component.set("v.showInputs", true);
               $A.get('e.force:refreshView').fire();
             
                }
        });
        $A.enqueueAction(action);
    },
    
    
    handleSaveRecord: function(component, event, helper) {
        console.log("saving record...");
        component.find("contactLoanScenarioForm").submit();
 	},
    
    handleSuccess : function(component, event, helper) {
		console.log('record updated successfully');
        

	},
        
})