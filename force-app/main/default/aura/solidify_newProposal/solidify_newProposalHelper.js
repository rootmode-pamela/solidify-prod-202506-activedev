({
	getLoanInfo: function(component, helper, propId){
            console.log('helper getLoan ' + propId);
        //get most recent Loan, populate Loan Input

        var action = component.get('c.getLoanForProperty');
             action.setParams({ propertyId : propId });
             action.setCallback(this, function(response){
                 var state = response.getState();
		        if (component.isValid() && state === "SUCCESS") {
                    console.log('success Loan retrieval:');
                    console.log( response.getReturnValue());
                    var loan = response.getReturnValue();
                   
                    if(response.getReturnValue() == null){
                 		component.set('v.showLoanInput', 'true');
                 		component.set('v.noLoans', 'true' );
                 
             		} else {
                        var today = new Date().toISOString();
                        var firstPayment = loan.First_Payment__c;
                        if (firstPayment == null){firstPayment = loan.CloseDate;}
                        
                        component.set('v.simpleNewProposal.Current_Loan_Amount__c', loan.Loan_Amount__c );
                        component.set('v.simpleNewProposal.Current_Interest_Rate__c', loan.Interest_Rate__c );                   	
                        component.set('v.simpleNewProposal.Current_Loan_Term__c', loan.Due_In_Months__c );                   	
      					component.set('v.simpleNewProposal.Current_Loan_First_Payment__c', firstPayment );
                        component.set('v.simpleNewProposal.Current_Loan_Last_Payment_Made__c', today );
      					component.set('v.simpleNewProposal.Current_Loan_Monthly_Payment__c', loan.Payment_Amount__c );
                        component.set('v.showLoanInput', 'true');
                        
                        this.getloanBalance(component, helper, loan.Loan_Amount__c, loan.Interest_Rate__c, loan.Payment_Amount__c, firstPayment, today);
                    }               
                    
		        }
		        else {
	            console.log("Failed with state: " + state);
             	}
             });
            $A.enqueueAction(action);      
    },
    
    getContactInfoFromProp: function(component, event, propId){
     console.log('helper getContact ' + propId);
        //get most recent Loan, populate Loan Input

        var action = component.get('c.getContactForProperty');
             action.setParams({ propertyId : propId });
             action.setCallback(this, function(response){
                 var state = response.getState();
		        if (component.isValid() && state === "SUCCESS") {
                    console.log('success Contact retrieval:');
                    console.log( response.getReturnValue());
                    var con = response.getReturnValue();
                   
                    if(response.getReturnValue() != null){
                        component.set('v.displayContact', 'true')
                        component.set('v.contactName', con.FirstName + ' ' + con.LastName);
                        component.set("v.simpleNewProposal.Borrower__c", con.Id);
                        component.set("v.simpleNewProposal.Account__c", con.AccountId);
                    }               
                    
		        }
		        else {
	            console.log("Failed with state: " + state);
             	}
             });
            $A.enqueueAction(action);
   
	}, 
    
    getPropName: function(component, event, propId){
        console.log('helper getPropName ' + propId);
        //get most recent Loan, populate Loan Input

        var action = component.get('c.getPropertyInfo');
             action.setParams({ propertyId : propId });
             action.setCallback(this, function(response){
                 var state = response.getState();
		        if (component.isValid() && state === "SUCCESS") {
                    console.log('success Prop retrieval:');
                    console.log( response.getReturnValue());
                    var prop = response.getReturnValue();
                   
                    if(response.getReturnValue() != null){
                        component.set('v.displayProp', 'true')
                        component.set('v.propName', prop.Name);
                        var dateString = new Date().toISOString();
                        var dS = $A.localizationService.formatDate(dateString);
                        component.set('v.proposalName', prop.Name + ' refi ' + dS);
                       
                        component.set('v.simpleNewProposal.Property__c', prop.Id);
                        
                    }               
                    
		        }
		        else {
	            console.log("Failed with state: " + state);
             	}
             });
            $A.enqueueAction(action);
   
    }, 
    
    getContactInfoFromId: function(component, event, contactId){
	 console.log('helper getContactFromId ' + contactId);

        var action = component.get('c.getContact');
             action.setParams({ contactId : contactId });
             action.setCallback(this, function(response){
                 var state = response.getState();
		        if (component.isValid() && state === "SUCCESS") {
                    console.log('success Contact retrieval:');
                    console.log( response.getReturnValue());
                    var con = response.getReturnValue();
                   
                    if(response.getReturnValue() != null){
                        component.set('v.displayContact', 'true');
                        component.set('v.contactName', con.FirstName + ' ' + con.LastName);
                        component.set("v.simpleNewProposal.Borrower__c", con.Id);
                        component.set("v.simpleNewProposal.Account__c", con.AccountId);
                    }               
                    
		        }
		        else {
	            console.log("Failed with state: " + state);
             	}
             });
            $A.enqueueAction(action);
   
    }, 
    
    
    getPropertyDropdownWithContact: function(component, event, contactId){
         //get property dropdown if selection is Contact
            console.log('getPropertyDropdown contactId: '+contactId);

            var action = component.get('c.getPropertyList');
             action.setParams({ contactId : contactId});
             action.setCallback(this, function(response){
                 var state = response.getState();
		        if (component.isValid() && state === "SUCCESS") {
                    console.log('success Prop retrieval:');
                    var prop = response.getReturnValue();
                    var ctProps = 0;
                    var firstprop;
                    var propId;

                    if(prop != null && prop.length > 0){
                        var firstprop = response.getReturnValue()[0];
                        ctProps = response.getReturnValue().length;
                        propId = prop.Id;
                    }
                    console.log('firstprop: '+firstprop);
                    console.log('ctProps: '+ctProps);
                    console.log('propId: '+propId);

                    if(ctProps == 0){
                        console.log('Count 0');
                 		component.set('v.showLoanInput', 'true');
                 		component.set('v.noProps', 'true' );
                 
             		}else if(ctProps == 1){
                        console.log('Count 1');
                        component.set('v.propList', response.getReturnValue());
                 		component.set('v.propertySelection', response.getReturnValue()); 
                        component.set('v.propertyId', response.getReturnValue()[0].id); 
                        console.log(component.get('v.propertyId'));
                        this.getLoanInfo(component, this, propId);
                        
                        component.set('v.showLoanInput', 'true');
                        component.set('v.displayProp', 'true');
                        component.set('v.showPropInput', 'false');
                        
                    } else {
                        console.log('Count > 2');
                        component.set('v.multipleProps', 'true');
                    	component.set('v.propList', response.getReturnValue());
                        component.set('v.displayProp', 'false');
                        component.set('v.showPropInput', 'true');
                    }
		        }
		        else {
	            console.log("Failed with state: " + state);
             	}
             });
             $A.enqueueAction(action);
      
    },
    
    getProposalName: function(component, event, helper){
        var newName = component.get('v.proposalName');        
        component.set("v.simpleNewProposal.Name", newName);
    },
    
    getloanBalance: function (component, helper, loanAmt, interestRate, payment, firstPayment, lastPayment){
        var first = new Date(firstPayment);
        var last = new Date(lastPayment);
        var months = Math.abs(last.getFullYear() - first.getFullYear()) * 12;
		months += last.getMonth() - first.getMonth();

// Subtract one month if b's date is less that a's.
if (last.getDate() < first.getDate())
{
    months--;
}
        
        console.log(months);
        console.log(payment);
        var action = component.get('c.getLoanBalance');
             action.setParams({ loanAmt : loanAmt,
                               interestRate : interestRate,
                               numberPayments : months,
                               payment : payment
                              });
             action.setCallback(this, function(response){
                 var state = response.getState();
		        if (component.isValid() && state === "SUCCESS") {
                    console.log('success Balance retrieval');
                    console.log( response.getReturnValue());
                    var bal = response.getReturnValue();
                   
                    if(response.getReturnValue() != null){
                        component.set('v.simpleNewProposal.Current_Loan_Balance_Remaining__c', bal);
                       // component.set('v.simpleNewProposal.New_Loan_Amount__c' ,bal);
                    }               
                    
		        }
		        else {
	            console.log("Failed with state: " + state);
             	}
             });
            $A.enqueueAction(action);
   
    }, 
    validateForm: function(component, event, helper){
        var allValid = component.find('reqField').reduce(function (validSoFar, inputCmp) {
            console.log(validSoFar + ':' + inputCmp.get('v.name'));
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && !inputCmp.get('v.validity').valueMissing;
        }, true);
        return allValid;        
    }
})