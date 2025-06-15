({

	getDataTable : function(component, event, helper) {
		console.log('getDataTable');
        helper.getDataHelper(component, event);
	},
    
    resetDataTable : function(component,event,helper){
        console.log('resetDataTable');
        helper.resetDataHelper(component,event);
    }
    
  

})