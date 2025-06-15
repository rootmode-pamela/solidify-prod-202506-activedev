({
    doInit : function(component, event, helper) {
        component.set('v.isSpinner', true);
        helper.loadOFlowRecord(component);
    },

    editMethod : function(component, event, helper) {
        component.set('v.isReadOnly', false);

        if(component.get('v.oFlowRecord.Status') != null){
            var statusId = component.find("statusId");
            statusId.set('v.value', component.get('v.oFlowRecord.Status'));
        }
        else{
            var statusId = component.find("statusId");
            statusId.set('v.value', '');
        }

        if(component.get('v.oFlowRecord.Priority') != null){
            var priorityId = component.find("priorityId");
            priorityId.set('v.value', component.get('v.oFlowRecord.Priority'));
        }
        else{
            var priorityId = component.find("priorityId");
            priorityId.set('v.value', '');
        }

        if(component.get('v.oFlowRecord.Purpose__c') != null){
            var purposeId = component.find("purposeId");
            purposeId.set('v.value', component.get('v.oFlowRecord.Purpose__c'));
        }
        else{
            var purposeId = component.find("purposeId");
            purposeId.set('v.value', '');
        }

        if(component.get('v.oFlowRecord.Next_Followup__c') != null){
            var nextFollowUpId = component.find("nextFollowUpId");
            nextFollowUpId.set('v.value', component.get('v.oFlowRecord.Next_Followup__c'));
        }
        else{
            var nextFollowUpId = component.find("nextFollowUpId");
            nextFollowUpId.set('v.value', '');
        }

        if(component.get('v.oFlowRecord.Waiting_Reason__c') != null){
            var waitingReasonId = component.find("waitingReasonId");
            waitingReasonId.set('v.value', component.get('v.oFlowRecord.Waiting_Reason__c'));
        }
        else{
            var waitingReasonId = component.find("waitingReasonId");
            waitingReasonId.set('v.value', '');
        }

        

        if(component.get('v.oFlowRecord.ContactId') != null){
            var strExample = '[';
            strExample = strExample + '{"icon":"standard:contact","id":"' + component.get('v.oFlowRecord.ContactId')  + '","sObjectType":"Contact","subtitle":"Contact • ' + component.get('v.oFlowRecord.Contact.FirstName') + ' ' + component.get('v.oFlowRecord.Contact.LastName') + '","title":"' + component.get('v.oFlowRecord.Contact.FirstName') + ' ' + component.get('v.oFlowRecord.Contact.LastName') +'"}';
            strExample = strExample + ']';
            var strObj = JSON.parse(strExample);
            component.set("v.selectionContact", strObj);
        }

        if(component.get('v.oFlowRecord.Lead__c') != null){
            var strExample = '[';
            strExample = strExample + '{"icon":"standard:lead","id":"' + component.get('v.oFlowRecord.Lead__c')  + '","sObjectType":"Lead","subtitle":"Lead • ' + component.get('v.oFlowRecord.Lead__r.FirstName') + ' ' + component.get('v.oFlowRecord.Lead__r.LastName') + '","title":"' + component.get('v.oFlowRecord.Lead__r.FirstName') + ' ' + component.get('v.oFlowRecord.Lead__r.LastName') +'"}';
            strExample = strExample + ']';
            var strObj = JSON.parse(strExample);
            component.set("v.selectionLead", strObj);
        }

        if(component.get('v.oFlowRecord.Loan__c') != null){
            var strExample = '[';
            strExample = strExample + '{"icon":"standard:opportunity","id":"' + component.get('v.oFlowRecord.Loan__c')  + '","sObjectType":"Opportunity","subtitle":"Loan • ' + component.get('v.oFlowRecord.Loan__r.Name') + '","title":"' + component.get('v.oFlowRecord.Loan__r.Name') +'"}';
            strExample = strExample + ']';
            var strObj = JSON.parse(strExample);
            component.set("v.selectionLoan", strObj);
        }

        if(component.get('v.oFlowRecord.AccountId') != null){
            var strExample = '[';
            strExample = strExample + '{"icon":"standard:account","id":"' + component.get('v.oFlowRecord.AccountId')  + '","sObjectType":"Account","subtitle":"Account • ' + component.get('v.oFlowRecord.Account.Name') + '","title":"' + component.get('v.oFlowRecord.Account.Name') +'"}';
            strExample = strExample + ']';
            var strObj = JSON.parse(strExample);
            component.set("v.selectionAccount", strObj);
        }

        if(component.get('v.oFlowRecord.OwnerId') != null){
            var strExample = '[';
            strExample = strExample + '{"icon":"standard:user","id":"' + component.get('v.oFlowRecord.OwnerId')  + '","sObjectType":"User","subtitle":"Owner • ' + component.get('v.oFlowRecord.Owner.FirstName') + ' ' + component.get('v.oFlowRecord.Owner.LastName') + '","title":"' + component.get('v.oFlowRecord.Owner.FirstName') + ' ' + component.get('v.oFlowRecord.Owner.LastName') +'"}';
            strExample = strExample + ']';
            var strObj = JSON.parse(strExample);
            component.set("v.selectionOwner", strObj);
        }

    },

    cancelButton : function(component, event, helper) {
        component.set('v.isReadOnly', true);
    },

    saveButton : function(component, event, helper) {
        var selectionObj = component.get('v.selectionContact');
        component.set("v.oFlowRecord.ContactId", null);
        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.oFlowRecord.ContactId", sObjRec.id);
		}

        var selectionObj2 = component.get('v.selectionLead');
        component.set("v.oFlowRecord.Lead__c", null);
        for (var i=0; i< selectionObj2.length; i++) {
            var sObjRec = selectionObj2[i];
            component.set("v.oFlowRecord.Lead__c", sObjRec.id);
		}

        var selectionObj3 = component.get('v.selectionLoan');
        component.set("v.oFlowRecord.Loan__c", null);
        for (var i=0; i< selectionObj3.length; i++) {
            var sObjRec = selectionObj3[i];
            component.set("v.oFlowRecord.Loan__c", sObjRec.id);
		}

        var selectionObj4 = component.get('v.selectionAccount');
        component.set("v.oFlowRecord.AccountId", null);
        for (var i=0; i< selectionObj4.length; i++) {
            var sObjRec = selectionObj4[i];
            component.set("v.oFlowRecord.AccountId", sObjRec.id);
		}

        var selectionObj5 = component.get('v.selectionOwner');
        component.set("v.oFlowRecord.OwnerId", null);
        for (var i=0; i< selectionObj5.length; i++) {
            var sObjRec = selectionObj5[i];
            component.set("v.oFlowRecord.OwnerId", sObjRec.id);
		}

        component.set('v.isSpinner', true);
        helper.saveOFlowRecord(component);
    },

    statusChange : function(component, event, helper) {
        var statusId = component.find("statusId");
        component.set('v.oFlowRecord.Status', statusId.get('v.value'));

        console.log('@@@ statusId: ' + component.get('v.oFlowRecord.Status'));
    },
    
    priorityChange : function(component, event, helper) {
        var priorityId = component.find("priorityId");
        component.set('v.oFlowRecord.Priority', priorityId.get('v.value'));

        console.log('@@@ priorityId: ' + component.get('v.oFlowRecord.Priority'));
    },
    
    purposeChange : function(component, event, helper) {
        var purposeId = component.find("purposeId");
        component.set('v.oFlowRecord.Purpose__c', purposeId.get('v.value'));

        console.log('@@@ purposeId: ' + component.get('v.oFlowRecord.Purpose__c'));
    },
    
    nextFollowUpChange : function(component, event, helper) {
        var nextFollowUpId = component.find("nextFollowUpId");
        component.set('v.oFlowRecord.Next_Followup__c', nextFollowUpId.get('v.value'));

        console.log('@@@ nextFollowUpId: ' + component.get('v.oFlowRecord.Next_Followup__c'));
    },
    
    waitingReasonChange : function(component, event, helper) {
        var waitingReasonId = component.find("waitingReasonId");
        component.set('v.oFlowRecord.Waiting_Reason__c', waitingReasonId.get('v.value'));

        console.log('@@@ waitingReasonId: ' + component.get('v.oFlowRecord.Waiting_Reason__c'));
    },
    
    


    
    lookupSearchContact : function(component, event, helper) {
        console.log('@@@ lookupSearchContact ');
        const lookupComponent = event.getSource();
        const serverSearchAction = component.get('c.searchContact');
        serverSearchAction.setParam('anOptionalParam', 'not used');
        lookupComponent.search(serverSearchAction);
    },

    clearErrorsOnChange: function(component, event, helper) {
        const selection = component.get('v.selectionContact');
        const errors = component.get('v.errors');
        const lookupComponent = event.getSource();
        var selectionObj = component.get('v.selectionContact');
        component.set("v.oFlowRecord.ContactId", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.oFlowRecord.ContactId", sObjRec.id);
		}

	},

    lookupSearchLead : function(component, event, helper) {
        console.log('@@@ lookupSearchLead ');
        const lookupComponent = event.getSource();
        const serverSearchAction = component.get('c.seachLead');
        serverSearchAction.setParam('anOptionalParam', 'not used');
        lookupComponent.search(serverSearchAction);
    },

    clearErrorsOnChangeLead: function(component, event, helper) {
        const selection = component.get('v.selectionLead');
        const errors = component.get('v.errors');
        const lookupComponent = event.getSource();
        var selectionObj = component.get('v.selectionLead');
        component.set("v.oFlowRecord.Lead__c", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.oFlowRecord.Lead__c", sObjRec.id);
		}

	},

    lookupSearchLoan : function(component, event, helper) {
        console.log('@@@ lookupSearchLoan ');
        const lookupComponent = event.getSource();
        const serverSearchAction = component.get('c.searchLoan');
        serverSearchAction.setParam('anOptionalParam', 'not used');
        lookupComponent.search(serverSearchAction);
    },

    clearErrorsOnChangeLoan: function(component, event, helper) {
        const selection = component.get('v.selectionLoan');
        const errors = component.get('v.errors');
        const lookupComponent = event.getSource();
        var selectionObj = component.get('v.selectionLoan');
        component.set("v.oFlowRecord.Loan__c", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.oFlowRecord.Loan__c", sObjRec.id);
		}

	},

    lookupSearchAccount : function(component, event, helper) {
        console.log('@@@ lookupSearchAccount ');
        const lookupComponent = event.getSource();
        const serverSearchAction = component.get('c.searchAccount');
        serverSearchAction.setParam('anOptionalParam', 'not used');
        lookupComponent.search(serverSearchAction);
    },

    clearErrorsOnChangeAccount: function(component, event, helper) {
        const selection = component.get('v.selectionAccount');
        const errors = component.get('v.errors');
        const lookupComponent = event.getSource();
        var selectionObj = component.get('v.selectionAccount');
        component.set("v.oFlowRecord.AccountId", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.oFlowRecord.AccountId", sObjRec.id);
		}

	},

    lookupSearchOwner : function(component, event, helper) {
        console.log('@@@ lookupSearchOwner ');
        const lookupComponent = event.getSource();
        const serverSearchAction = component.get('c.searchOwner');
        serverSearchAction.setParam('anOptionalParam', 'not used');
        lookupComponent.search(serverSearchAction);
    },

    clearErrorsOnChangeOwner: function(component, event, helper) {
        const selection = component.get('v.selectionOwner');
        const errors = component.get('v.errors');
        const lookupComponent = event.getSource();
        var selectionObj = component.get('v.selectionOwner');
        component.set("v.oFlowRecord.OwnerId", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.oFlowRecord.OwnerId", sObjRec.id);
		}

	},

    
})