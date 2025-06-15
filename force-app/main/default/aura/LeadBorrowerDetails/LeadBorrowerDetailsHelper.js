({
    loadLeadRecord : function(component) {
        var action = component.get("c.loadLeadRecord");
        action.setParams({
            "recordId": component.get('v.recordId')
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error loadLeadRecord: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue loadLeadRecord: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.isSpinner', false);
                component.set('v.leadRecord', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    saveLeadRecord : function(component) {
        var action = component.get("c.updateLeadRecord");
        action.setParams({
            "leadRecord": component.get('v.leadRecord')
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            var errors = response.getError();  
            console.log('@@@ error saveLeadRecord: ' + JSON.stringify(errors));

            if (state === "SUCCESS") {
                console.log('@@@ returnValue saveLeadRecord: ' + JSON.stringify(response.getReturnValue()));
                component.set('v.isSpinner', false);

                if(response.getReturnValue() == 'Success'){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : 'Success Message',
                        message: 'Successfully Saved Lead record.',
                        duration:' 5000',
                        key: 'info_alt',
                        type: 'success'
                    });
                    toastEvent.fire();
                    //$A.get('e.force:refreshView').fire();

                    component.set('v.isReadOnly', true);
                    component.set('v.isDisplayAddressSearch', false);
                    this.loadLeadRecord(component);
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
                    message: 'Unexpected erorr occured when Saving Lead record.',
                    duration:' 5000',
                    key: 'info_alt',
                    type: 'error'
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
    },

    callServer : function(component,method,callback,params) {
        var action = component.get(method);
        if (params) {        
            action.setParams(params);
        }
        
        action.setCallback(this,function(response) {            
            var state = response.getState();
            if (state === "SUCCESS") { 
                // pass returned value to callback function
                callback.call(this,response.getReturnValue());   
            } else if (state === "ERROR") {
                // generic error handler
                var errors = response.getError();
                if (errors) {
                    console.log("Errors", errors);
                    if (errors[0] && errors[0].message) {
                        throw new Error("Error" + errors[0].message);
                    }
                } else {
                    throw new Error("Unknown Error");
                }
            }
        });
        
        $A.enqueueAction(action);
    },

    extractAddressComponent : function(components, type, short){
    	for (var i=0; i<components.length; i++)
        	for (var j=0; j<components[i].types.length; j++)
             //  console.log(components[i].types[j] + ":" + components[i].long_name + " / " +  components[i].short_name);
        		if (components[i].types[j]==type) {
            		if (short=="short"){
                		return components[i].short_name;}
            		else
            			{return components[i].long_name;}
        		} 
    	return "";
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