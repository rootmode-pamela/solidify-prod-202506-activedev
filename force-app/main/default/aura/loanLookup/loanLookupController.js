({
   onfocus : function(component,event,helper){
       $A.util.addClass(component.find("mySpinner"), "slds-show");
        var forOpen = component.find("searchRes");
            $A.util.addClass(forOpen, 'slds-is-open');
            $A.util.removeClass(forOpen, 'slds-is-close');
   
       	 var getInputkeyWord = '';
         var contactId = component.get("v.contactId");
         helper.searchLoanList(component,event,getInputkeyWord,contactId);

    },
    onblur : function(component,event,helper){       
        component.set("v.listOfLoanRecords", null );
        var forclose = component.find("searchRes");
        $A.util.addClass(forclose, 'slds-is-close');
        $A.util.removeClass(forclose, 'slds-is-open');
    },
    keyPressController : function(component, event, helper) {
       // get the search Input keyword   
         var getInputkeyWord = component.get("v.loanSearchKeyWord");

        if( getInputkeyWord.length > 0 ){
             var forOpen = component.find("searchRes");
            var contactId = component.get("v.contactId");
               $A.util.addClass(forOpen, 'slds-is-open');
               $A.util.removeClass(forOpen, 'slds-is-close');
            helper.searchLoanList(component,event,getInputkeyWord,contactId);
        }
        else{  
             component.set("v.listOfLoanRecords", null ); 
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
      
         component.set("v.loanSearchKeyWord",null);

    },
    
    
    handleComponentEvent : function(component, event, helper) {
    // get the selected record from event 	 
       var selectedLoan = event.getParam("recordByEvent");
        console.log("----------record status: " + selectedLoan);
        component.set("v.selectedLoan" , selectedLoan);
        component.set("v.showDetails", true);
        component.set("v.loanId", selectedLoan.Id);
        component.set("v.loanAmount", selectedLoan.Loan_Amount__c);
        component.set("v.transactionType", selectedLoan.Purpose__c);
 
        component.set("v.loanProgram", selectedLoan.Loan_Program__c);
        component.set("v.loanType", selectedLoan.Loan_Type__c);
        component.set("v.purchasePrice", selectedLoan.Purchase_Price__c);
        component.set("v.appraisedVal", selectedLoan.Appraised_Value__c);
        component.set("v.loanSelected", true);
       
        var fico = selectedLoan.Qual_FICO__c;
        if (fico != null){
        var ficoText = fico.toString();
            component.set("v.qualFico", ficoText);}
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