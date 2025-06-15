({
  onfocus : function(component,event,helper){
    $A.util.addClass(component.find("mySpinner"), "slds-show");
    var forOpen = component.find("searchRes");
    $A.util.addClass(forOpen, 'slds-is-open');
    $A.util.removeClass(forOpen, 'slds-is-close');
    
    var getInputkeyWord = '';      
    helper.searchBorrower(component,event,getInputkeyWord);
    
  },
  onblur : function(component,event,helper){       
    component.set("v.listOfBorrowerRecords", null );
    var forclose = component.find("searchRes");
    $A.util.addClass(forclose, 'slds-is-close');
    $A.util.removeClass(forclose, 'slds-is-open');
  },
  keyPressController : function(component, event, helper) {
    // get the search Input keyword   
    var getInputkeyWord = component.get("v.borrowerSearchKeyWord");
    
    if( getInputkeyWord.length > 0 ){
      var forOpen = component.find("searchRes");
      $A.util.addClass(forOpen, 'slds-is-open');
      $A.util.removeClass(forOpen, 'slds-is-close');
      helper.searchBorrower(component,event,getInputkeyWord);
    }
    else{  
      component.set("v.listOfBorrowerRecords", null ); 
      var forclose = component.find("searchRes");
      $A.util.addClass(forclose, 'slds-is-close');
      $A.util.removeClass(forclose, 'slds-is-open');
    }
  },
  
  // function for clear the Record Selaction 
  clear :function(component,event,heplper){
    var pillTarget = component.find("lookup-pill");
    var lookUpTarget = component.find("lookupField"); 
    
    $A.util.addClass(pillTarget, 'slds-hide');
    $A.util.removeClass(pillTarget, 'slds-show');
    
    $A.util.addClass(lookUpTarget, 'slds-show');
    $A.util.removeClass(lookUpTarget, 'slds-hide');
    
    component.set("v.borrowerSearchKeyWord",null);
    component.set("v.listOfBorrowerRecords", null );
    component.set("v.selectedBorrower", {} );  
    component.set("v.showDetails", false);
    component.set("v.showPropInput", false);
  },
  
  // This function call when the end User Select any record from the result list.   
  handleComponentEvent : function(component, event, helper) {
    console.log('@@@ handleComponentEvent');
    // get the selected record from event 	 
    var selectedBorrower = event.getParam("recordByEvent");
    console.log("----------record: " + JSON.stringify(selectedBorrower));
    console.log("----------record status: " + selectedBorrower.Status);
    component.set("v.selectedBorrower" , selectedBorrower);
    component.set("v.borrowerName", selectedBorrower.Name);
    
    if(!selectedBorrower.Status){
      var contactId = selectedBorrower.Id;
      component.set("v.showPropInput", true);
      component.set("v.contactId", selectedBorrower.Id)
      console.log("-------contactId: " + selectedBorrower.Id);

      //If the component is loaded through Loan/Opportunity record. The Property Id is Subject_Property_Name__c field
      if(selectedBorrower.PropertyId){
        console.log("-------propertyId: " + selectedBorrower.PropertyId);
        helper.searchPropListFromOpportunity(component,event,selectedBorrower.PropertyId);
      }else{
        helper.searchPropList(component,event,contactId);
      }
    } 
    else {
      component.set("v.showDetails", true);
      component.set("v.leadId", selectedBorrower.Id);
    }
    
    
    
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