({
    doInit : function(component, event, helper) {
        component.set('v.isSpinner', true);
        helper.loadLoanRecord(component);
    },

    sendGiftChange : function(component, event, helper) {
        var sendGiftId = component.find("sendGiftId");
        component.set('v.loanRecord.Send_Gift__c', sendGiftId.get('v.value'));

        console.log('@@@ sendGiftId: ' + component.get('v.loanRecord.Send_Gift__c'));
    }, 

    editMethod : function(component, event, helper) {
        component.set('v.isReadOnly', false);
 
    },

    cancelButton : function(component, event, helper) {
        component.set('v.isReadOnly', true);
    },

    saveButton : function(component, event, helper) {
        component.set('v.isSpinner', true);
        helper.saveLoanRecord(component);
    },
})