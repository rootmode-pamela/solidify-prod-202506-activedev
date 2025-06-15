({
	searchBorrower : function(component,event,getInputkeyWord) {
     var action = component.get("c.getBorrowerList");
      // set param to method  
        action.setParams({
            'searchKeyWord': getInputkeyWord
          });
 
        action.setCallback(this, function(response) {
          $A.util.removeClass(component.find("mySpinner"), "slds-show");
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
              // if storeResponse size is equal 0 ,display No Result Found... message on screen.                }
                if (storeResponse.length == 0) {
                    component.set("v.Message", 'No Result Found...');
                } else {
                    component.set("v.Message", '');
                }
                // set searchResult list with return value from server.
                component.set("v.listOfBorrowerRecords", storeResponse);
            }
 
        });
      // enqueue the Action  
        $A.enqueueAction(action);
    
	},
    	
    searchLoanList : function(component,event,contactId) {
     var action = component.get("c.getLoanList");
      // set param to method  
        action.setParams({
            'contactId' : contactId
          });
 
        action.setCallback(this, function(response) {
          $A.util.removeClass(component.find("mySpinner"), "slds-show");
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
              // if storeResponse size is equal 0 ,display No Result Found... message on screen.                }
                if (storeResponse.length == 0) {
                    component.set("v.Message", 'There are no Active Loans associated to this Contact');
                    component.set("v.showDetails", true);
                    component.set("v.showLoanInput", false);
                    component.set("v.noLoans", true);
                } else {
                    component.set("v.Message", '');
                }
                // set searchResult list with return value from server.
                component.set("v.listOfLoanRecords", storeResponse);
            }
 
        });
      // enqueue the Action  
        $A.enqueueAction(action);
    
	},
})