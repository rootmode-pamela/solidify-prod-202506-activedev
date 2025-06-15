({
	onFormSubmit : function(component, event, helper) {
        console.log('Research onFormSubmit');
		//get params from event on searchForm
		var p = event.getParam('formData');
        console.log('formData' + p);
		//run method on searchResults
		var comp = component.find('ResearchLoanResults');
		comp.search(p);
	}
})