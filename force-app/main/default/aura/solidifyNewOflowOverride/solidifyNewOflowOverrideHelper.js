({
    navigateTo: function(component, recId) {
		var navLink = component.find("nav");
    	var pageRef = {
            type: 'standard__recordPage',
            attributes: {
                actionName: 'view',
                objectApiName: 'Case',
                recordId: recId,
            },
        };
        navLink.navigate(pageRef, true);
    }
})