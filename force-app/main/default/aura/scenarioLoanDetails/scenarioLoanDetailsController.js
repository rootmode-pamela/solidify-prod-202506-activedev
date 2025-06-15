({
    doInit: function(component, event, helper) {
        helper.getPicklistValues(component, event);
        let propertyId = component.get("v.Opportunity");
        console.log('INIT:  ' + ' ' + JSON.stringify(propertyId));
    },

    openModal : function(component, event, helper){
        component.set("v.isOpen", true);

	},

    closeModal : function(component, event, helper){
        component.set("v.isOpen", false);
	},

    handlePurposeChange : function(component, event, helper){

        if(component.find("purpose")== 'Refinance' || component.find("purpose")== 'Refi-No Cashout' || component.find("purpose") == 'Refi-Cashout' ){
            component.set("v.refi", true);
        } else {
            component.set("v.refi", false);
        }

    },

    recordUpdate : function(component, event, helper){
        let opp = component.get("v.Opportunity");
        let purp = opp ? opp.Purpose__c:null;
        console.log(purp);
        if (purp == 'Refinance' || purp == 'Refi-No Cashout' || purp == 'Refi-Cashout'){
            console.log('setting refi true');
            component.set("v.refi", true);
        } else {
            component.set("v.refi", false);
        }
        console.log(component.get('v.refi'));
        console.log('UPDATED')
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

    },

    handleChangeSecondProgram : function(component, event, helper) {
        let program = event.getParam("value");
        console.log('handleChangeSecondProgram',program)
        component.set('v.isHelioc2nd', program === 'Heloc')
    },

    onsubmit : function(component, event, helper){
        component.set("v.showSpinner", true);
        let picklistValue = component.get("v.selectedPicklistValue");
        let propertyId = component.get("v.Opportunity.Subject_Property_Name__c");
        let action = component.get("c.updateProperties");
        action.setParams({
            opportunityId : component.get("v.recordId"),
            propertyId : propertyId,
            propertyTypeValue : picklistValue
        });
        $A.enqueueAction(action);
    },

    goToProp : function(component, event, helper){
        var record = component.get("v.Opportunity.Subject_Property_Name__c");
        var navEvt = $A.get("e.force:navigateToSObject");
    		navEvt.setParams({
      		"recordId": record
    });
    navEvt.fire();
    },

    openTransact : function(component, event, helper){
       component.set('v.openTransact', true);
       let propertyName = component.get('v.Opportunity.Subject_Property_Name__r.Property_Type__c')
       component.set('v.selectedPicklistValue', propertyName);
    },
    closeModals : function(component, event, helper){
        component.set('v.openTransact', false);
        component.set('v.openLoanDetails', false);
        component.set('v.openClosingCosts', false);
        component.set('v.openRatios', false);
        component.set('v.openPayments', false);
    },
    openLoanDetails : function(component, event, helper){
        component.set('v.openLoanDetails', true);
        let loanType = component.get('v.Opportunity.Loan_Type__c');
        if (loanType) {
            let program = loanType[0];
            component.set('v.isHelioc2nd', program === 'H')
        }
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

    handlePropertyTypeSelection : function(component, event, helper){
        component.set("v.selectedPicklistValue", component.find('propertyType').get('v.value'));
    },

    handleSubmit: function(component, event, helper) {
        event.preventDefault();
        let fields = event.getParam('fields');
        fields.Scenario_2nd_Max_Line__c = component.get('v.isHelioc2nd') ? fields.Scenario_2nd_Max_Line__c : null;
        component.find('loanDetailsEditForm').submit(fields);
    },
})