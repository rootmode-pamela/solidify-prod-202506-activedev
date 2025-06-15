({
    loadContactRecord : function(component) {
        var action = component.get("c.loadContactRecord");
        action.setParams({
            "recordId": component.get('v.recordId')
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadContactRecord: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue loadContactRecord: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.isSpinner', false);
                component.set('v.contactRecord', response.getReturnValue());
                
                
                if(component.get('v.contactRecord.Type__c') == null || component.get('v.contactRecord.Type__c') == ''){
                    component.set('v.contactRecord.Type__c', '')
                }
                
            }
        });
        $A.enqueueAction(action);
    },

    saveContactRecord : function(component) {
        var action = component.get("c.updateContactRecord");
        action.setParams({
            "contactRecord": component.get('v.contactRecord')
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error saveContactRecord: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue saveContactRecord: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.isSpinner', false);

                if(response.getReturnValue() == 'Success'){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : 'Success Message',
                        message: 'Successfully Saved Contact record.',
                        duration:' 5000',
                        key: 'info_alt',
                        type: 'success'
                    });
                    toastEvent.fire();
                    $A.get('e.force:refreshView').fire();

                    component.set('v.isReadOnly', true);
                    this.loadContactRecord(component);
                }
                else{
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : 'Error Message',
                        message: response.getReturnValue(),
                        duration:' 5000',
                        key: 'info_alt',
                        type: 'error'
                    });
                    toastEvent.fire();
                }
            }
            else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error Message',
                    message: 'Unexpected erorr occured when Saving Contact record.',
                    duration:' 5000',
                    key: 'info_alt',
                    type: 'error'
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
    },

    loadIncomeSource: function(component) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "picklistField": 'Income_Sources__c'
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadIncomeSource: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue loadIncomeSource: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.incomeSourcePicklist', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
})