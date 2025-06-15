({
    doInit: function(component, event, helper) {
        console.log('doInit');
        let action = component.get("c.getProperties");
        action.setParams({"recordId":component.get("v.recordId")});
        action.setCallback(this, function (response) {
            console.log('setCallback');
            let state = response.getState();
            if (state === 'SUCCESS') {
                let result = response.getReturnValue();
                component.set('v.propertiesRecordId', result.Subject_Property_Name__c); // setting attribute value with the fetched results.
                console.log('SUCCESS', result.Subject_Property_Name__c);
            } else if (state === 'INCOMPLETE') {
                // Code when Imcomplete
            } else if (state === 'ERROR') {
                let errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action); // Invoking the action
    },
    openModel: function(component, event, helper) {
        // Set isModalOpen attribute to true
        component.set("v.isModalOpen", true);
    },

    closeModel: function(component, event, helper) {
        // Set isModalOpen attribute to false
        component.set("v.isModalOpen", false);
    },
})