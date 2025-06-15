({
    navigateTo: function(component, recId) {
		var navLink = component.find("nav");
    	var pageRef = {
            type: 'standard__recordPage',
            attributes: {
                actionName: 'view',
                objectApiName: 'Lead',
                recordId: recId,
            },
        };
        navLink.navigate(pageRef, true);
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