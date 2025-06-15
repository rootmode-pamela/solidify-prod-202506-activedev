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
        component.set("v.openTransact", false);
        component.set("v.openClosingCosts", false);
        component.set("v.openLoanDetails", false);
        component.set('v.openRatios', false);
        component.set('v.openPayments', false);
        component.set('v.openProperty', false);
        
    },
    
    goToProp : function(component, event, helper){
        var record = component.get("v.Opportunity.Subject_Property_Name__c");
        var navEvt = $A.get("e.force:navigateToSObject");
    		navEvt.setParams({
      		"recordId": record
    });
    navEvt.fire();
    },

    openProperty: function(component, event, helper){
        component.set('v.openProperty', true);
    },

    openTransact : function(component, event, helper){
       component.set('v.openTransact', true);
    },
    closeModals : function(component, event, helper){
        component.set('v.openTransact', false);
        component.set('v.openLoanDetails', false);
        component.set('v.openClosingCosts', false);
        component.set('v.openRatios', false);
        component.set('v.openPayments', false);
        component.set('v.openSubmissionNotes', false);
        component.set('v.openProperty', false);
    },
    openLoanDetails : function(component, event, helper){
        component.set('v.openLoanDetails', true);
     },
    openClosingCosts : function(component, event, helper){
        component.set('v.openClosingCosts', true);
     },
     openRatios : function(component, event, helper){
        component.set('v.openRatios', true);
     },
     openPayments : function(component, event, helper){
        component.set('v.openPayments', true);
     },
     openSubmissionNotes : function(component, event, helper){
        component.set('v.openSubmissionNotes', true);
     },
    handleValueSearch : function(component,event,helper){
        let windowOrigin = window.location.origin;
        let SPStreet = component.get('v.Opportunity.Subject_Property_Name__r.Property_Street__c');
        let SPCity = component.get('v.Opportunity.Subject_Property_Name__r.Property_City__c');
        let SPState = component.get('v.Opportunity.Subject_Property_Name__r.Property_State__c');
        let SPZip = component.get('v.Opportunity.Subject_Property_Name__r.Property_Zip__c');
        console.log('--windowOrigin:    ' + windowOrigin);
        let generatedUrl = 'https://www.google.com/search?q=' + SPStreet + ' ' + SPCity + ' ' + SPState + ' ' + SPZip;
        window.open(generatedUrl);
    },

 
})