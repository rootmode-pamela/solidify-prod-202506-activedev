({
    search : function(component, event, helper) {
        component.set('v.displayNewRecord', false);
        const action = event.getParam('arguments').serverAction;
        helper.toggleSearchSpinner(component);

        // Using setParam instead of setParams in order not to override params passed by parent
        action.setParam('searchTerm', component.get('v.cleanSearchTerm'));
        action.setParam('selectedIds', helper.getSelectedIds(component));

        action.setCallback(this, function(response) {
            const state = response.getState();
            if (state === 'SUCCESS') {
                helper.toggleSearchSpinner(component);
                // Process server success response
                const returnValue = response.getReturnValue();
                component.set('v.searchResults', returnValue);

                console.log('@@@ searchresult size: ' + component.get('v.searchResults').length);
                if(component.get('v.searchResults').length == 0){
                    component.set('v.displayNewRecord', true);
                }
                else{
                    component.set('v.displayNewRecord', true);
                }

                console.log('@@@ displaynewrecord: ' + component.get('v.displayNewRecord'));
            }
            else if (state === 'ERROR') {
                helper.toggleSearchSpinner(component);
                // Retrieve the error message sent by the server
                const errors = response.getError();
                let message = 'Unknown error'; // Default error message
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    const error = errors[0];
                    if (typeof error.message != 'undefined') {
                        message = error.message;
                    } else if (typeof error.pageErrors != 'undefined' && Array.isArray(error.pageErrors) && error.pageErrors.length > 0) {
                        const pageError = error.pageErrors[0];
                        if (typeof pageError.message != 'undefined') {
                            message = pageError.message;
                        }
                    }
                }
                // Display error in console
                console.error('Error: '+ message);
                console.error(JSON.stringify(errors));
                // Fire error toast if available (LEX only)
                const toastEvent = $A.get('e.force:showToast');
                if (typeof toastEvent !== 'undefined') {
                    toastEvent.setParams({
                        title : 'Server Error',
                        message : message,
                        type : 'error',
                        mode: 'sticky'
                    });
                    toastEvent.fire();
                }
            }
        });

        action.setStorable(); // Enables client-side cache & makes action abortable
        $A.enqueueAction(action);
    },

    onInput : function(component, event, helper) {
        // Prevent action if selection is not allowed
        if (!helper.isSelectionAllowed(component)) {
            return;
        }
        const newSearchTerm = event.target.value;
        helper.updateSearchTerm(component, newSearchTerm);
    },

    onResultClick : function(component, event, helper) {
        const recordId = event.currentTarget.id;
        helper.selectResult(component, recordId);

        // additional user defined event on result click
        // for optional error handling / clearing in consumer
        var event = component.getEvent('onSelection');

        if (event) {
            event.fire();
        }
    },

    onComboboxClick : function(component, event, helper) {
        // Hide combobox immediatly
        const blurTimeout = component.get('v.blurTimeout');
        if (blurTimeout) {
            clearTimeout(blurTimeout);
        }
        component.set('v.hasFocus', false);
    },

    onFocus : function(component, event, helper) {
        // Prevent action if selection is not allowed
        if (!helper.isSelectionAllowed(component)) {
            return;
        }
        component.set('v.hasFocus', true);
        component.set('v.displayNewRecord', true);
    },

    onBlur : function(component, event, helper) {
        // Prevent action if selection is not allowed
        if (!helper.isSelectionAllowed(component)) {
            return;
        }
        // Delay hiding combobox so that we can capture selected result
        const blurTimeout = window.setTimeout(
            $A.getCallback(function() {
                component.set('v.hasFocus', false);
                component.set('v.blurTimeout', null);
            }),
            300
        );
        component.set('v.blurTimeout', blurTimeout);
    },

    onRemoveSelectedItem : function(component, event, helper) {
        const itemId = event.getSource().get('v.name');
        helper.removeSelectedItem(component, itemId);
    },

    onClearSelection : function(component, event, helper) {
        helper.clearSelection(component);
    },

    createNewRecord : function(component, event, helper) { 
        var createRecordEvent = $A.get("e.force:createRecord");
        const referredById = component.get("v.referredById");
        console.log('createNewRecord', referredById);
        createRecordEvent.setParams({
            "entityApiName": "Account",
            "navigationLocation" : "LOOKUP", 
            "recordTypeId": "012f4000000d7obAAA",
            "defaultFieldValues": {
                "Referred_By__c": referredById,
            },
            "panelOnDestroyCallback": function(event) {
                console.log('@@@ panelOnDestroyCallback');

                var action = component.get("c.getRecentlyCreatedAccount");
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    var errors = response.getError();  
                    console.log('@@@ error getRecentlyCreatedAccount: ' + JSON.stringify(errors));
        
                    if (state === "SUCCESS") {
                        console.log('@@@ returnValue getRecentlyCreatedAccount: ' + JSON.stringify(response.getReturnValue()));
                        
                        const selection = component.get('v.selection');
                        selection.push(response.getReturnValue());
                        component.set('v.selection', selection);
    
                        component.set('v.searchTerm', '');
                        component.set('v.searchResults', []);
    
                      
                    }
                });
                $A.enqueueAction(action);
            }
        });
        createRecordEvent.fire();
    }, 

    cancelProperty : function(component, event, helper) { 
        component.set('v.openNewProperty', false);
    }, 

    propertyTypeChange: function(component, event, helper) {
        var propertyTypeId = component.find("propertyTypeId");
        component.set('v.propertyRec.Property_Type__c', propertyTypeId.get('v.value'));

        console.log('@@@ propertyTypeId: ' + component.get('v.propertyRec.Property_Type__c'));
    },

    unitsChange: function(component, event, helper) {
        var unitsId = component.find("unitsId");
        component.set('v.propertyRec.Number_of_Units__c', unitsId.get('v.value'));

        console.log('@@@ unitsId: ' + component.get('v.propertyRec.Number_of_Units__c'));
    },

    saveProperty: function(component, event, helper) {
        component.set('v.isError', false);
        component.set('v.errorMessage', '');

        if(component.get('v.propertyRec.Property_Street__c') == null || component.get('v.propertyRec.Property_Street__c') == ''){
            component.set('v.isError', true);
            component.set('v.errorMessage', 'Street is required.');
        }

        if(!component.get('v.isError')){
            component.set('v.isSpinnerProperty', true);
            helper.savePropertyRecord(component);
        }
    },
    
})