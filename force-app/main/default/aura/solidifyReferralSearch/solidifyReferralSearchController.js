({

	doInit : function(component, event, helper) {
		let today = new Date();
		component.set('v.toDate', today.toISOString());
        let yearAgo = new Date(today.getFullYear()-1, today.getMonth(), today.getDate() );
        component.set('v.fromDate', yearAgo.toISOString());
	},
    
    
    //on change of Contact Lookup, set
    handleChange : function(component, event, helper) {	
        var selectedOptionValue = event.getParam("value");
	},

	//on click of Search button, create query and get data tables   
    handleClick : function(component, event, helper) {
        
        helper.fillComponents(component,event,helper);
    },
        
    showSpinner: function(component, event, helper) {
        // make Spinner attribute true for displaying loading spinner 
        component.set("v.showSpinner", true); 
    },
     
    // function automatic called by aura:doneWaiting event 
    	hideSpinner : function(component,event,helper){
        // make Spinner attribute to false for hiding loading spinner    
        component.set("v.showSpinner", false);

    }

})