({
    doInit : function(component, event, helper) {
        
        var myPageRef = component.get("v.pageReference");
        console.log('@@@ myPageRef: ' + JSON.stringify(myPageRef));

        if(myPageRef){
            console.log('set components from url params');
	        component.set("v.sObjectFromButton", myPageRef.state.c__sObjectFromButton);
	        component.set("v.contactId", myPageRef.state.c__contactId);
	        component.set("v.propertyId", myPageRef.state.c__propertyId);
    	    component.set("v.loanId", myPageRef.state.c__loanId);
	        component.set("v.recordIdFromButton", myPageRef.state.c__recordIdFromButton);
            component.set("v.recordName", myPageRef.state.c__nameFromButton);
            component.set("v.leadId", myPageRef.state.c__leadId);
        }
	    console.log('@@@ recordIdFromButton: ' + component.get("v.recordIdFromButton"));
        
        var formType = component.get("v.sObjectFromButton");
        var contactId = component.get("v.contactId");
        var propId = component.get("v.propertyId");
        var loanId = component.get("v.loanId");
        var recordName = component.get("v.nameFromButton");
        
        console.log('formType: ' + formType + ' contact:'+contactId + ' prop:'+propId+ ' loan:' + loanId + ' recordName:' + recordName);
        console.log('version 6');
        
        if(formType == 'Contact'){
            console.log('Contact form type setup');
            if (contactId !== undefined && contactId != null) {
            	console.log('contactId set:'+contactId)
            	helper.getContactInfoFromId(component, event, contactId);
                console.log('return from contact');
            	helper.getPropertyDropdownWithContact(component, event, contactId);
            } else {
            	contactId = recordIdFromButton;
            	helper.getContactInfoFromId(component, event, contactId);
                console.log('return from contact');
            	helper.getPropertyDropdownWithContact(component, event, contactId);
        	}
        	var strExample = '';
           	var icon = 'standard:contact';
            var subTitle = '';
            strExample = '[{"icon":"' + icon + '","id":"' + component.get('v.recordIdFromButton')  + '","sObjectType":"' + formType + '","subtitle":"' + formType + ' • ' + recordName + '","title":"' + recordName + '"}]';
            var strObj = JSON.parse(strExample);
            if(recordName && !component.get("v.contactName")){
	            component.set("v.contactName", recordName);    
            }		
           	component.set("v.borrowerSelection", strObj); 	 
            component.set('v.displayContact', 'true');
            const selection = component.get('v.borrowerSelection');
            console.log('selected:	'+ JSON.stringify(selection));
            console.log('selection[0]:  '+ JSON.stringify(selection[0].id));
            component.set('v.simpleNewProposal.Account__c', selection[0].AccountId);
            
        }

        if(formType == 'Opportunity'){
            console.log('Opportunity type setup');
            helper.getPropName(component, event, propId);
            helper.getContactInfoFromId(component, event, contactId);
            helper.getLoanInfo(component, event, propId);
            component.set('v.showLoanInput', 'true');
            component.set('v.displayLoan', 'true');
            component.set('v.displayProp',  'true');
            component.set('v.displayContact', 'true');
        }
        
        if(formType == 'Property'){
            component.set('v.showLoanInput', 'true');
         if(propId != null){
            console.log('propId found');
            helper.getPropName(component, event, propId);
             if(!contactId){
            	helper.getContactInfoFromProp(component, event, propId);    
         } else {
             helper.getContactInfoFromId(component, event, contactId);
         }      
            helper.getLoanInfo(component, event, propId);
        
        	}
        }
        
        if(formType == 'Lead'){
            //set showLoanInput = true if selection is Lead
            component.set('v.showLoanInput', 'true');
            var dateString = new Date().toISOString();
            var dS = $A.localizationService.formatDate(dateString);
            component.set('v.proposalName', selection[0].title + ' refi ' + dS);
         
        }
        
        if(!formType){
            
        }
        
        
        var rec = component.get("v.newProposal");
        var error = component.get("v.newProposalError");
        
        if (error || (rec === null)) {
            console.log("Error initializing record template: " + error);
            return;
        }
        console.log("Record template initialized: " + rec.apiName);

    },
    
    lookupBorrowerSearch : function(component, event, helper) {
        // Get the lookup component that fired the search event
        const lookupComponent = event.getSource();
        // Get the SampleLookupController.search server side action
        const serverSearchAction = component.get('c.searchBorrower');
        
        // Pass the action to the lookup component by calling the search method
        lookupComponent.search(serverSearchAction);
    },
    
    borrowerSelected: function(component, event, helper) {
        const selection = component.get('v.borrowerSelection');
        
        console.log('selected');
        
        if(selection.length != 0){
            if(selection[0].sObjectType == 'Contact'){
                helper.getPropertyDropdown(component, event, selection[0].id);
                component.set('v.showPropInput', 'true');
                component.set('v.simpleNewProposal.Account__c', selection[0].AccountId);
                console.log('propInput:' + component.get('v.showPropInput'));            
            } 
            
            //set showLoanInput = true if selection is Lead
            
            if(selection[0].sObjectType == 'Lead'){
                component.set('v.showLoanInput', 'true');
                console.log(component.get('v.showLoanInput'));
                var dateString = new Date().toISOString();
                var dS = $A.localizationService.formatDate(dateString);
                component.set('v.proposalName', selection[0].title + ' refi ' + dS);
            }
        }
        
    },
    
    clearSelection: function(component, event, helper) {
        component.set('v.borrowerSelection', []);
    },
    
    
    propertySelected: function(component, event, helper) {
        component.set('v.noLoans', 'false');
        console.log('selected');
        const propSelection = component.get('v.simpleNewProposal.Property__c'); 
        console.log('property selected: ' + propSelection);
        
        helper.getLoanInfo(component, helper, propSelection);    
        component.set('v.showLoanInput', 'true');
        component.set('v.propertyId', propSelection);
        
    },    
    
    
    
    handleSubmit : function(component, event, helper) {
        
        console.log('handleSubmit');
        var valid = helper.validateForm( component, event, helper)
        if (valid){
        helper.getProposalName(component, event, helper);
        var propertyId = component.get('v.propertyId');
        component.set("v.simpleNewProposal.Property__c", propertyId);
        console.log('property: ' + component.get('v.simpleNewProposal.Property__c'));
        console.log('handleSubmit');
        var borrower = component.get('v.borrowerSelection');
        console.log(borrower.length);
        if(borrower.length != 0){
            if(component.get('v.borrowerSelection')){
                var sel = component.get('v.borrowerSelection');
                var borrowerType = sel[0].sObjectType;
                var borrowerId = sel[0].id;
                var accountId = sel[0].accountId;
                console.log(borrowerId);
                console.log(borrowerType);
                if(borrowerType == 'Lead'){
                    console.log('saving Lead info');
                    component.set("v.simpleNewProposal.Borrower_Lead__c", borrowerId);
                }else if(borrowerType == 'Contact'){
                    console.log('saving Contact info');
                    component.set("v.simpleNewProposal.Borrower__c", borrowerId);
                    component.set("v.simpleNewProposal.Account__c", accountId);
                }else if(borrowerType == 'Opportunity'){
                    console.log('saving Opportunity Loan info');
                    component.set("v.simpleNewProposal.Most_Recent_Loan__c", borrowerId);
                } 
            }
        }
        console.log('proposal:' + component.get('v.simpleNewProposal.Property__c'));

        var action = component.get("c.saveProposalRecord");
        action.setParams({"newProposal": component.get("v.simpleNewProposal")});
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(component.isValid() && state == "SUCCESS"){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Success',
                    message: 'The record was saved.',
                    duration:'20000',
                    key: 'info_alt',
                    type: 'success',
                    mode: 'pester'
                });
                toastEvent.fire();
                
                component.find("navService").navigate({
                    "type": "standard__recordPage",
                    "attributes": {
                        "recordId": response.getReturnValue(),
                        "objectApiName": "Proposal__c",
                        "actionName": "view"
                    }
                });
                
            } else {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error',
                    message:'There was a problem : '+ JSON.stringify(response.getError()),
                    duration:'10000',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'pester'
                });
                toastEvent.fire();
                $A.get('e.force:closeQuickAction').fire();
                $A.get('e.force:refreshView').fire();
            }
        });
        $A.enqueueAction(action);
        } 
    }
    
})