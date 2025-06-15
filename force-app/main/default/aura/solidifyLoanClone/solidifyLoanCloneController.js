({
	 init : function (component) {
        var flow = component.find("loanClone");
         console.log(component.get("v.recordId"));
        var inputVariables = [
          { name : "OldLoanId", type : "String", value: component.get("v.recordId") }
       ];
       flow.startFlow("solidifyLoanClone", inputVariables);
    },
    
    handleStatusChange : function (component, event) {
    	if(event.getParam("status") === "FINISHED") {
    		var outputVariables = event.getParam("outputVariables");
      		var outputVar;
      		for(var i = 0; i < outputVariables.length; i++) {
         		outputVar = outputVariables[i];
         		if(outputVar.name === "redirect") {
            		var urlEvent = $A.get("e.force:navigateToSObject");
            		urlEvent.setParams({
               		"recordId": outputVar.value,
               		"isredirect": "true"
            		});
            		urlEvent.fire();
         		}
      		}
   		}
	},
    
    doCancel: function(component, event) {
        $A.get("e.force:closeQuickAction").fire();
    },
    
    doNext: function(component, event) {
      var navigate = component.get("v.navigateFlow");
        console.log(navigate);
        navigate('FINISH');
      
    },
    
    
})