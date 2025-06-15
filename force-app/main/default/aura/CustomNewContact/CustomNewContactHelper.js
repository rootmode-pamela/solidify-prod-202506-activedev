({
    saveContactOtherHelper : function(component) {
        var action = component.get("c.saveContactOtherHelper");
        component.set('v.contactRec.Type__c', '');
        action.setParams({
            "contactRec": component.get('v.contactRec'),
            "companyName": component.get('v.companyName')
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error saveContactOtherHelper: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue saveContactOtherHelper: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.isSpinner', false);

                if(response.getReturnValue() != null && response.getReturnValue().startsWith('003')){
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

                    var navEvt = $A.get("e.force:navigateToSObject");
                        navEvt.setParams({
                        "recordId": response.getReturnValue(),
                        "slideDevName": "detail"
                        });
                    navEvt.fire();
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

    saveContactClientHelper: function(component, redirectToNewLoan) {
        var action = component.get("c.saveContactClientHelper");
        console.log(component.get('v.contact2Rec'));
        action.setParams({
            "contactRec": component.get('v.contactRec'),
            "contact2Rec" : component.get('v.contact2Rec')
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error saveContactClientHelper: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                let returnValue = response.getReturnValue();
                console.log('@@@ returnValue saveContactClientHelper: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.isSpinner', false);

                if(returnValue){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : 'Success Message',
                        message: 'Successfully Saved Contact record.',
                        duration:' 5000',
                        key: 'info_alt',
                        type: 'success'
                    });
                    toastEvent.fire();

                    if (component.get('v.isNewContactFromNewLoan') || redirectToNewLoan) {
                        var event = component.getEvent('onContactCreated');
                        event.setParams({
                            data: JSON.stringify(returnValue)
                        });
                        if (event) {
                            event.fire();
                        }
                        return;
                    }

                    component.set('v.showConfirmModal', true);

                    /*if(confirm('Do you want to create new scenario?')){
                        component.set('v.openPopup', false);
                        component.set('v.isError', false);
                        component.set('v.errorMessage', '');

                        component.set('v.isFirstSection', true);
                        component.set('v.isSecondSectionOther', false);
                        component.set('v.isSecondSectionClient', false);
                        component.set('v.isThirdSectionClient', false);

                        component.set('v.contactType', 'Client');
                        component.set('v.isThereCoBorrower', 'Yes');

                        component.set('v.createNewLoanSec', true);
                    }
                    else{
                        $A.get('e.force:refreshView').fire();
                    }*/
                    //$A.get('e.force:refreshView').fire();

                    /*
                    var navEvt = $A.get("e.force:navigateToSObject");
                        navEvt.setParams({
                        "recordId": response.getReturnValue(),
                        "slideDevName": "detail"
                        });
                    navEvt.fire();
                    */
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
                    message: 'Unexpected error occured when Saving Contact record.',
                    duration:' 5000',
                    key: 'info_alt',
                    type: 'error'
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
    },

    loadExistingUser: function(component) {
        var action = component.get("c.loadExistingUser2");
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadExistingUser: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue loadExistingUser: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.selectionUser', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
})