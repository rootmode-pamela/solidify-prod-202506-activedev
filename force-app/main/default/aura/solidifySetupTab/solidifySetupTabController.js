({

    editRecord : function(component, event, helper) {
        helper.showHide(component);
    },
    

        

handleSuccess : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The property's info has been updated.",
            "type": "success"
        });
        toastEvent.fire();

        helper.showHide(component);
    },

   
    
    handleCancel : function(component, event, helper) {
        helper.showHide(component);
        event.preventDefault();
    },
    


})