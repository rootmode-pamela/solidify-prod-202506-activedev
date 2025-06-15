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

    loadLoanOriginator: function(component) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "picklistField": 'Loan_Originator__c'
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadLoanOriginator: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue loadLoanOriginator: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.loadOriginatorPicklist', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
    loadcoLoanOriginator: function(component) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "picklistField": 'Co_Loan_Originator__c'
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadcoLoanOriginator: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue loadcoLoanOriginator: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.loadcoOriginatorPicklist', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    loadLeadSource: function(component) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "picklistField": 'LeadSource'
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadLeadSource: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue loadLeadSource: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.leadSourcePicklist', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    loadLender: function(component) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "picklistField": 'Lender__c'
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadLender: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue loadLender: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.lenderPicklist', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    loadPrimaryGoal: function(component) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "picklistField": 'Primary_Goal__c'
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadPrimaryGoal: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue loadPrimaryGoal: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.primaryGoalPicklist', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    loadAppraisal: function(component) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "picklistField": 'Appraisal__c'
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadAppraisal: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue loadAppraisal: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.appraisalPicklist', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    loadEscrows: function(component) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "picklistField": 'Escrows__c'
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadEscrows: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue loadEscrows: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.escrowsPicklist', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    loadAdminFee: function(component) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "picklistField": 'Admin_Fee__c'
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadAdminFee: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue loadAdminFee: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.adminFeePicklist', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    loadOtherLens: function(component) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "picklistField": 'Other_Liens_New__c'
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadOtherLens: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue loadOtherLens: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.otherLensPicklist', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    loadIncomeType: function(component) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "picklistField": 'IncomeType__c'
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadIncomeType: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue loadIncomeType: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.incomeTypePicklist', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    loadVesting: function(component) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "picklistField": 'Vesting__c'
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadVesting: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue loadVesting: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.vestingPicklist', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    loadClosingFunds: function(component) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "picklistField": 'Closing_Funds__c'
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadClosingFunds: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue loadClosingFunds: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.closingFundsPicklist', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    loadfeeStructure: function(component) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "picklistField": 'Fee_Structure__c'
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadClosingFunds: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue loadClosingFunds: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.feeStructurePicklist', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    
})