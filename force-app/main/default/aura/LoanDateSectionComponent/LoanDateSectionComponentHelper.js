({
    loadLoanRecord : function(component) {
        var action = component.get("c.loadLoanRecord");
        action.setParams({
            "recordId": component.get('v.recordId')
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadLoanRecord: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue loadLoanRecord: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.isSpinner', false);
                component.set('v.loanRecord', response.getReturnValue()); 
            }
        });
        $A.enqueueAction(action);
    },

    saveLoanRecord : function(component) {
        var action = component.get("c.updateLoanRecord");
        action.setParams({
            "loanRecord": component.get('v.loanRecord')
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error saveLoanRecord: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue saveLoanRecord: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.isSpinner', false);

                if(response.getReturnValue() == 'Success'){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : 'Success Message',
                        message: 'Successfully Saved Loan record.',
                        duration:' 5000',
                        key: 'info_alt',
                        type: 'success'
                    });
                    toastEvent.fire();
                    $A.get('e.force:refreshView').fire();

                    component.set('v.isReadOnly', true);
                    this.loadLoanRecord(component);
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
                    message: 'Unexpected erorr occured when Saving Loan record.',
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