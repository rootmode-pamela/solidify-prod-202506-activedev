({
    
    doInit: function (component, event, helper){
        console.log('===================== INIT')
        var myPageRef = component.get("v.pageReference");
        // console.log('@@@ myPageRef: ' + JSON.stringify(myPageRef));

        //initialize newProposal record
        component.find("proposalRecordCreator").getNewRecord(
            "Proposal__c", // sObject type (objectApiName)
            '012f4000000ObpJAAS',      // recordTypeId
            false,     // skip cache?
            $A.getCallback(function() {
                var rec = component.get("v.newRecord");
                var error = component.get("v.newProposalError");
                if(error || (rec === null)) {
                    // console.log("Error initializing record template: " + error);
                    return;
                }
                // console.log("Record template initialized: " + rec.apiName);
            })
        );
        console.log('===================== 1')
        if(myPageRef != null){
            console.log('===================== 1 null')
            var recordIdFromButton = myPageRef.state.c__recordIdFromButton;
            component.set("v.recordIdFromButton", recordIdFromButton);
            // console.log('@@@ recordIdFromButton # : ' + component.get('v.recordIdFromButton'));
    
            if(myPageRef.state.c__sObjectFromButton != 'Opportunity'){
                var selectedBorrower = component.get('v.selectedBorrower');
                selectedBorrower.Name = myPageRef.state.c__nameFromButton;
                selectedBorrower.Id = myPageRef.state.c__recordIdFromButton;
                selectedBorrower.Status = myPageRef.state.c__statusFromButton;
        
                component.set('v.leadId', myPageRef.state.c__recordIdFromButton);
                component.set('v.borrowerName', myPageRef.state.c__nameFromButton);
                component.set('v.selectedBorrower', selectedBorrower);

                
                var getSelectRecord = component.get('v.selectedBorrower');
                var applicationEvent = $A.get("e.c:selectedsObjectRecordEventApp");
                applicationEvent.setParams({"recordByEvent" : getSelectRecord})
                applicationEvent.fire();
                // console.log('@@@ event fired');
                
                if(myPageRef.state.c__sObjectFromButton == 'Lead'){
                    helper.getLeadInformation(component, myPageRef.state.c__recordIdFromButton);
                }
            }else if(myPageRef.state.c__sObjectFromButton == 'Opportunity'){
                console.log('===================== 2 Loan')

                // console.log('@@@ Loan record');
                helper.getLoanProgramsList(component);
                helper.getLoanInformation(component, myPageRef.state.c__recordIdFromButton);
                component.set("v.showPropInput", true);
            }
        }
      
    },
    
    updateOverride: function(component, event, helper){
        
        var override = component.find("override").get("v.checked");
        // console.log("overrideVal: " + override);
        component.set("v.overrideComp", override);
        if(override){
            component.set('v.newProposal.Override_Max__c', 9500);
            component.set('v.newProposal.Override_Min__c', 2500);
        } else {
            component.set('v.newProposal.Override_Max__c', null);
            component.set('v.newProposal.Override_Min__c', null);
        }
        helper.handleUpdateNew(component, event, helper);
        
    },

    updateMI: function(component, event, helper){
        var miVal = component.find("MI").get("v.checked");
        component.set("v.MI", miVal);
        component.set("v.newProposal.MI__c", miVal);
        if(!miVal){
            component.find("MI_Percent").set("v.value", null);
            component.find("Cancel_MI_At").set("v.value", null);
        } else {
            component.set("v.newProposal.MI_Percent__c", component.find("MI_Percent").get("v.value"));
            component.set("v.newProposal.MI_CancelAtPercent__c", component.find("Cancel_MI_At").get("v.value"));
        }


    },
	
    handleUpdate : function(component, event, helper){
        helper.handleUpdateNew(component, event, helper);
    }, 

    updateEscrowInsTotal: function(component, event, helper){
        // console.log('updateEscrowIns');
        var rate = component.find("EscrowInsRate").get("v.value");
        var count = component.find("EscrowInsMonths").get("v.value");
        component.find("EscrowInsTotal").set("v.value", rate*count);
        // console.log(rate + "*" + count +"=" + rate*count);
    },
  
    updateEscrowIntTotal: function(component, event, helper){
        var rate = component.find('EscrowIntRate').get('v.value');
        var count = component.find('EscrowIntDays').get("v.value");
        component.find('EscrowIntTotal').set('v.value', rate*count);
    },

    updateEscrowTaxTotal: function(component, event, helper){
        var rate = component.find('EscrowTaxRate').get('v.value');
        var count = component.find('EscrowTaxMonths').get("v.value");
        component.find('EscrowTaxTotal').set('v.value', rate*count);
    },
    
    saveRecord : function(component, event, helper){
        var loanAmount = component.find("loanAmount").get("v.value"); 
        var propId = component.get("v.propId");
        var leadId = component.get("v.leadId");
        // console.log('@@@ borrower lead: ' + leadId);
        component.set("v.newProposal.Borrower_Lead__c", leadId);
        component.set("v.newProposal.Property__c", propId);
		component.set("v.newProposal.New_Loan_Amount__c", loanAmount);
        if(helper.validateForm(component, event, helper)){
            helper.handleUpdateNew(component,event,helper);
            helper.submitRecord(component, event, helper);
        }

    },



    lookupSearchUser : function(component, event, helper) {
        const lookupComponent = event.getSource();
        const serverSearchAction = component.get('c.searchUser2');
        serverSearchAction.setParam('anOptionalParam', 'not used');
        lookupComponent.search(serverSearchAction);
    },

    clearErrorsOnChangeUser: function(component, event, helper) {
        const selection = component.get('v.selectionUser');
        const errors = component.get('v.errors');
        const lookupComponent = event.getSource();
        var selectionObj = component.get('v.selectionUser');
        component.set("v.newProposal.SolidifyContact__c", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.newProposal.SolidifyContact__c", sObjRec.id);
        }
    },
})