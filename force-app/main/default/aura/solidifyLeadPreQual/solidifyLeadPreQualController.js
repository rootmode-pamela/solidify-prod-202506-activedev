({
	recordUpdate : function(component, event, helper) {
         $A.get("e.force:refreshView").fire();
	},
    
    handleSaveRecord: function(component, event, helper) {
        console.log("saving record...");
        component.find("leadLoanPreQualForm").submit();
 	}
    
})