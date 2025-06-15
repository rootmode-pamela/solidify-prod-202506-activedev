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
    	
    searchPropList : function(component,event,contactId) {
     var action = component.get("c.getPropList");
      // set param to method  
        action.setParams({
            'contactId' : contactId
          });
 
        action.setCallback(this, function(response) {
          $A.util.removeClass(component.find("mySpinner"), "slds-show");
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                console.log('searchPropList:  '+ JSON.stringify(storeResponse));
              // if storeResponse size is equal 0 ,display No Result Found... message on screen.                }
                if (storeResponse.length == 0) {
                    component.set("v.Message", 'There are no Properties associated to this Contact');
                    component.set("v.showDetails", true);
                    component.set("v.showPropInput", false);
                    component.set("v.noProps", true);
                } else {
                    component.set("v.Message", '');
                }
                // set searchResult list with return value from server.
                component.set("v.listOfPropRecords", storeResponse);
            }
            
        });
      // enqueue the Action  
        $A.enqueueAction(action);
	}, 

  searchPropListFromOpportunity : function(component,event,propertyId) {
    var action = component.get("c.getPropListFromLoanOpp");
     // set param to method  
       action.setParams({
           'propertyId' : propertyId
         });

       action.setCallback(this, function(response) {
         $A.util.removeClass(component.find("mySpinner"), "slds-show");
           var state = response.getState();
           if (state === "SUCCESS") {
               var storeResponse = response.getReturnValue();
               console.log('searchPropList:  '+ JSON.stringify(storeResponse));
             // if storeResponse size is equal 0 ,display No Result Found... message on screen.                }
               if (storeResponse.length == 0) {
                   component.set("v.Message", 'There are no Properties associated to this Contact');
                   component.set("v.showDetails", true);
                   component.set("v.showPropInput", false);
                   component.set("v.noProps", true);
               } else {
                   component.set("v.Message", '');
               }
               // set searchResult list with return value from server.
               component.set("v.listOfPropRecords", storeResponse);
           }
           
       });
     // enqueue the Action  
       $A.enqueueAction(action);
   
 }, 
})