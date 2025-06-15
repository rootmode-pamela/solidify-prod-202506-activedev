({
   openModal: function(component, event, helper) {
      // for Display Model,set the "isOpen" attribute to "true"
      component.set("v.isOpen", true);
   },
 
   closeModal: function(component, event, helper) {
      // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
      component.set("v.isOpen", false);
   },
 
   saveRecord: function(component, event, helper) {
       
		var currAmt = component.find("currAmt").get("v.value");
        component.set("v.propRecord.Current_Loan_Amount__c", currAmt);
       
       var currInt = component.find("currInt").get("v.value");
       component.set("v.propRecord.Current_Interest_Rate__c", currInt);

       var currTerm = component.find("currTerm").get("v.value");
       component.set("v.propRecord.Current_Loan_term__c", currTerm);
       
       var currFP = component.find("currFP").get("v.value");
       component.set("v.propRecord.Current_Loan_First_Payment__c", currFP);
       
       var currLP = component.find("currLP").get("v.value");
       component.set("v.propRecord.Current_Loan_Last_Payment_Made__c", currLP);

       var currBalRem = component.find("currBalRem").get("v.value");
       component.set("v.propRecord.Current_Loan_Balance_Remaining__c", currBalRem);
       
        var newAmt = component.find("newAmt").get("v.value");
       component.set("v.propRecord.New_Loan_Amount__c", newAmt);
       
       var newInt = component.find("newInt").get("v.value");
       component.set("v.propRecord.New_Loan_Interest_Rate__c", newInt);
       
       var newTerm = component.find("newTerm").get("v.value");
       component.set("v.propRecord.New_Loan_Term__c", newTerm);
       
       var treasury = component.find("treasury").get("v.value");
       component.set("v.propRecord.X10_Yr_Treasury_Yield__c", treasury);


		var tempRec = component.find("recordLoader");
        tempRec.saveRecord($A.getCallback(function(result){          
        console.log(result.state);
            
        var resultsToast = $A.get("e.force:showToast");       
            if (result.state === "SUCCESS") {               
                resultsToast.setParams({
                    "title": "Saved",
                    "message": "The record was saved."});               
                resultsToast.fire();  
                
                component.set('v.isOpen', false);
                location.reload();
                
                
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
    	
   },
})