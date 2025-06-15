({
   onfocus : function(component,event,helper){
       $A.util.addClass(component.find("mySpinner"), "slds-show");
        var forOpen = component.find("searchRes");
            $A.util.addClass(forOpen, 'slds-is-open');
            $A.util.removeClass(forOpen, 'slds-is-close');
   
       	 var getInputkeyWord = '';
         var contactId = component.get("v.contactId");
         helper.searchPropList(component,event,getInputkeyWord,contactId);

    },
    onblur : function(component,event,helper){       
        component.set("v.listOfPropRecords", null );
        var forclose = component.find("searchRes");
        $A.util.addClass(forclose, 'slds-is-close');
        $A.util.removeClass(forclose, 'slds-is-open');
    },
    keyPressController : function(component, event, helper) {
       // get the search Input keyword   
         var getInputkeyWord = component.get("v.propSearchKeyWord");

        if( getInputkeyWord.length > 0 ){
             var forOpen = component.find("searchRes");
            var contactId = component.get("v.contactId");
               $A.util.addClass(forOpen, 'slds-is-open');
               $A.util.removeClass(forOpen, 'slds-is-close');
            helper.searchPropList(component,event,getInputkeyWord,contactId);
        }
        else{  
             component.set("v.listOfPropRecords", null ); 
             var forclose = component.find("searchRes");
               $A.util.addClass(forclose, 'slds-is-close');
               $A.util.removeClass(forclose, 'slds-is-open');
          }
	},
    
  // function for clear the Record Selaction 
    clear :function(component,event,helper){
         var pillTarget = component.find("lookup-pill");
         var lookUpTarget = component.find("lookupField"); 
        
         $A.util.addClass(pillTarget, 'slds-hide');
         $A.util.removeClass(pillTarget, 'slds-show');
        
         $A.util.addClass(lookUpTarget, 'slds-show');
         $A.util.removeClass(lookUpTarget, 'slds-hide');
      
         component.set("v.propSearchKeyWord",null);
         component.set("v.listOfPropRecords", null );
         component.set("v.selectedProp", {} );  
        component.set("v.showDetails", false);
        component.set("v.showLoanInput", false);
        component.set("v.message", null);

    },
    
    
    handleComponentEvent : function(component, event, helper) {
    // get the selected record from event 	 
       var selectedProp = event.getParam("recordByEvent");
        console.log("----------record status: " + JSON.stringify(selectedProp));
        component.set("v.selectedProp" , selectedProp);
        component.set("v.propId", selectedProp.Id);   
        var propId = selectedProp.Id;
        console.log("-------propId: " + selectedProp.Id);
        component.set("v.propSelected", true);
        component.set("v.showLoanInput", true);
        helper.searchLoanList(component,event,propId);
  

                              
        var forclose = component.find("lookup-pill");
          $A.util.addClass(forclose, 'slds-show');
          $A.util.removeClass(forclose, 'slds-hide');
  
        var forclose = component.find("searchRes");
           $A.util.addClass(forclose, 'slds-is-close');
           $A.util.removeClass(forclose, 'slds-is-open');
        
        var lookUpTarget = component.find("lookupField");
            $A.util.addClass(lookUpTarget, 'slds-hide');
            $A.util.removeClass(lookUpTarget, 'slds-show');  
      
	},
})