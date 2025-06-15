({
    loadOFlowRecord : function(component) {
        var action = component.get("c.loadOFlowRecord");
        action.setParams({
            "recordId": component.get('v.recordId')
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadOFlowRecord: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue loadOFlowRecord: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.isSpinner', false);
                component.set('v.oFlowRecord', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    saveOFlowRecord : function(component) {
        var action = component.get("c.updateOFlowRecord");
        action.setParams({
            "oFlowRecord": component.get('v.oFlowRecord')
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error saveOFlowRecord: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue saveOFlowRecord: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.isSpinner', false);

                if(response.getReturnValue() == 'Success'){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : 'Success Message',
                        message: 'Successfully Saved OFlow record.',
                        duration:' 5000',
                        key: 'info_alt',
                        type: 'success'
                    });
                    toastEvent.fire();
                    $A.get('e.force:refreshView').fire();

                    component.set('v.isReadOnly', true);
                    this.loadOFlowRecord(component);
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
                    message: 'Unexpected erorr occured when Saving OFlow record.',
                    duration:' 5000',
                    key: 'info_alt',
                    type: 'error'
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
    },
})