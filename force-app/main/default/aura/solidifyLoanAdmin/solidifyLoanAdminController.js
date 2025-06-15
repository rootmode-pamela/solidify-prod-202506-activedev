({
	recordUpdate : function(component, event, helper) {
         $A.get("e.force:refreshView").fire();
	},
    
    handleSaveRecord: function(component, event, helper) {
        console.log("saving record...");
        component.find("adminEditForm").submit();
 	},
    
    handleSuccess: function(component,event,helper){
        
         var toastEvent = $A.get("e.force:showToast");
    toastEvent.setParams({
        "type": "success",
        "title": "Success!",
        "message": "Record has been updated."
    });
    toastEvent.fire();
    }
})