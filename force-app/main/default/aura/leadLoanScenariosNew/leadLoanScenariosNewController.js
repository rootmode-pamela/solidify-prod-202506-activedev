({
	handleLoad : function(component, event, helper) {
		console.log('handle handleLoad');
        component.set("v.showSpinner", false);
	},
    
    handleSaveRecord: function(component, event, helper) {
        console.log("saving record...");
        component.find("leadLoanScenarioForm").submit();
 	},
    
    handleSuccess : function(component, event, helper) {
		console.log('record updated successfully');
        
        
        component.set("v.showSpinner", false);
	},
        
})