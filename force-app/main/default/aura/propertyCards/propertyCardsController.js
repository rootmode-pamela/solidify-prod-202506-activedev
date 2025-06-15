({
    openModal : function(component, event, helper){
        component.set("v.isOpen", true);
    
	},
    
    closeModal : function(component, event, helper){
        component.set("v.isOpen", false);
    
	},
    
    onsuccess : function(component, event, helper){
        
        component.set("v.showSpinner", false);
        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type": "success",
            "title": "Success!",
            "message": "Record has been updated successfully."
        });
        toastEvent.fire();
        
        component.set("v.isOpen", false);
        
    },
    
    goToProp : function(component, event, helper){
        var record = component.get("v.Opportunity.Subject_Property_Name__c");
        var navEvt = $A.get("e.force:navigateToSObject");
    		navEvt.setParams({
      		"recordId": record
    });
    navEvt.fire();
    }
})