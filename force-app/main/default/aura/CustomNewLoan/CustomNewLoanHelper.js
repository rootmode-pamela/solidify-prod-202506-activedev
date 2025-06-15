({
    loadStagePicklist: function(component) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "picklistField": 'StageName'
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadStagePicklist: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue loadStagePicklist: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.stageNamePicklist', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    loadPurposePicklist: function(component) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "picklistField": 'Purpose__c'
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadPurposePicklist: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                let pickList = response.getReturnValue();
                console.log('@@@ returnValue loadPurposePicklist: ' + JSON.stringify(pickList));
                component.set('v.purposePicklist', pickList);
                component.set('v.loanRec.Purpose__c', pickList[0].label);

                if(pickList[0].label == 'Purchase' || pickList[0].label == 'Purch'){
                    component.set('v.isPurchaseorPurch', true);
                } else {
                    component.set('v.isPurchaseorPurch', false);
                }
            }
        });
        $A.enqueueAction(action);
    },

    loadLeadSourcePicklist: function(component) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "picklistField": 'LeadSource'
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();
            console.log('@@@ error loadLeadSourcePicklist: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                let pickList = response.getReturnValue();
                console.log('@@@ returnValue loadLeadSourcePicklist: ' + JSON.stringify(pickList));
                component.set('v.leadSourcePicklist', pickList);
                component.set('v.loanRec.LeadSource', pickList[0].label);
            }
        });
        $A.enqueueAction(action);
    },
    
    loadOccupancyPicklist: function(component) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "picklistField": 'Occupancy__c'
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadOccupancyPicklist: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                let pickList = response.getReturnValue();
                console.log('@@@ returnValue loadOccupancyPicklist: ' + JSON.stringify(pickList));
                component.set('v.occupancyPicklist', pickList);
                component.set('v.loanRec.Occupancy__c',pickList[0].label);
            }
        });
        $A.enqueueAction(action);
    },
    
    loadLoanTypePicklist: function(component) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "picklistField": 'Loan_Type__c'
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadLoanTypePicklist: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue loadLoanTypePicklist: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.loanTypePicklist', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
    loadLoanProgramPicklist: function(component) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "picklistField": 'Loan_Program__c'
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadLoanProgramPicklist: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue loadLoanProgramPicklist: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.loanProgramPicklist', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
    loadImpoundPicklist: function(component) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "picklistField": 'Impounds__c'
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadImpoundPicklist: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue loadImpoundPicklist: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.impoundPicklist', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
    loadLenderPicklist: function(component) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "picklistField": 'Lender__c'
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadLenderPicklist: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue loadLenderPicklist: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.lenderPicklist', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    loadExistingUser: function(component) {
        var action = component.get("c.loadExistingUser");
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
    

    saveLoanRecord: function(component) {
        console.log('@@@ loanRec: ' + component.get('v.loanRec'));
        var action = component.get("c.saveLoanRecord");
        action.setParams({
            "loanRecord": component.get('v.loanRec')
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error saveLoanRecord: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue saveLoanRecord: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.isSpinner', false);

                if(response.getReturnValue() != null && response.getReturnValue().startsWith('006')){
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

                    var newLoan = "{ 'sobjectType': 'Opportunity'}";
                    component.set('v.loanRec', newLoan);

                    var selectionDef = [];
                    component.set('v.selectionAccount', selectionDef);
                    component.set('v.selectionBorrower', selectionDef);
                    component.set('v.selectionCoBorrower', selectionDef);
                    component.set('v.selectionProperty', selectionDef);

                    component.set('v.openPopup', false);
                    component.set('v.isError', false);
                    component.set('v.errorMessage', '');

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