({
    
    doInit: function (component, event, helper){
        component.find("propRecordCreator").getNewRecord(
        "Proposal__c",
        "012f4000000ObpJAAS",
        false,
        $A.getCallback(function() {
            var rec = component.get("v.proposalRecord");
            var error = component.get("v.recordError");
            if (error || (rec === null)) {
                console.log("Error initializing record template: " + error);
                return;
            }
            var myPageRef = component.get("v.pageReference");
            //var addFees = component.find("addFees").set("v.value", "Yes");
            //var gpa = component.find("gpa").set("v.value", 0.000);
            

        }))
    },
    
    updateOverride: function(component, event, helper){
        
        var override = component.find("override").get("v.checked");
        console.log("overrideVal: " + override);
        component.set("v.overrideComp", override);
        helper.handleUpdateNew(component, event, helper);
        
    },
	
         handleUpdate : function(component, event, helper){
        	helper.handleUpdateNew(component, event, helper);
        
         }, 
   
  
    
    saveRecord : function(component, event, helper){
         var loanAmount = component.find("loanAmount").get("v.value"); 
		 component.set("v.newProposal.New_Loan_Amount__c", loanAmount);
        helper.handleUpdateNew(component,event, helper);
        
        var tempRec = component.find("propRecordCreator");
        
        tempRec.saveRecord($A.getCallback(function(result){
            
        console.log(result.state);
            
        var resultsToast = $A.get("e.force:showToast");
        
            if (result.state === "SUCCESS") {
                
                resultsToast.setParams({
                    "title": "Saved",
                    "message": "The record was saved."});
                
                resultsToast.fire();  
                
                var recId = result.recordId;
                
                helper.navigateTo(component, recId);

                } else if (result.state === "ERROR") {
                    console.log('Error: ' + JSON.stringify(result.error));
                    
                    resultsToast.setParams({
                        "title": "Error",
                        "message": "There was an error saving the record: " + JSON.stringify(result.error)});
                    
                    resultsToast.fire();
                    
                } else {
                    console.log('Unknown problem, state: ' + result.state + ', error: ' + JSON.stringify(result.error));
                }
            }));
    	}    

    
})