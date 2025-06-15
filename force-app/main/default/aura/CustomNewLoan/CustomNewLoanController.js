({
    openNewLeadButton : function(component, event, helper) {
        component.set('v.isDisplayPopupLead', true);
    },
    
    openNewProposalButton : function(component, event, helper) {
        component.set('v.isDisplayPopupProp', true);
    },
    
    doInit : function(component, event, helper) {
        helper.loadStagePicklist(component);
        helper.loadPurposePicklist(component);
        helper.loadLeadSourcePicklist(component);
        helper.loadOccupancyPicklist(component);
        helper.loadLoanTypePicklist(component);
        helper.loadLoanProgramPicklist(component);
        helper.loadImpoundPicklist(component);
        helper.loadLenderPicklist(component);
        helper.loadExistingUser(component);


        let contactRecord = component.get('v.contactRecord');
        if(contactRecord) {
            component.set('v.selectionBorrower', [contactRecord]);
        }
    },

    openNewLoanButton : function(component, event, helper) {
        component.set('v.openPopup', true);
    },
    
    cancelLoan : function(component, event, helper) {
        component.set('v.openPopup', false);
        component.set('v.isError', false);
        component.set('v.errorMessage', '');
        var homeEvt = $A.get("e.force:navigateToObjectHome");
			homeEvt.setParams({
    		"scope": "Opportunity"
		});
		homeEvt.fire();
    },

    stageChange: function(component, event, helper) {
        var stageId = component.find("stageId");
        component.set('v.loanRec.StageName', stageId.get('v.value'));

        console.log('@@@ stageId: ' + component.get('v.loanRec.StageName'));
    },

    purposeChange: function(component, event, helper) {
        var purposeId = component.find("purposeId");
        component.set('v.loanRec.Purpose__c', purposeId.get('v.value'));

        if(purposeId.get('v.value') == 'Purchase' || purposeId.get('v.value') == 'Purch'){
            component.set('v.isPurchaseorPurch', true);
        } else {
            component.set('v.isPurchaseorPurch', false);
        }

        console.log('@@@ purposeId: ' + component.get('v.loanRec.Purpose__c'));
    },

    leadSourceChange: function(component, event, helper) {
        var leadSourceId = component.find("leadSourceId");
        component.set('v.loanRec.LeadSource', leadSourceId.get('v.value'));

        console.log('@@@ leadSourceId: ' + component.get('v.loanRec.LeadSource'));
    },

    occupancyChange: function(component, event, helper) {
        var occupancyId = component.find("occupancyId");
        component.set('v.loanRec.Occupancy__c', occupancyId.get('v.value'));

        console.log('@@@ occupancyId: ' + component.get('v.loanRec.Occupancy__c'));
    },

    loanTypeChange: function(component, event, helper) {
        var loanTypeId = component.find("loanTypeId");
        component.set('v.loanRec.Loan_Type__c', loanTypeId.get('v.value'));

        console.log('@@@ loanTypeId: ' + component.get('v.loanRec.Loan_Type__c'));
    },
    
    loanProgramChange: function(component, event, helper) {
        var loanProgramId = component.find("loanProgramId");
        component.set('v.loanRec.Loan_Program__c', loanProgramId.get('v.value'));

        console.log('@@@ loanProgramId: ' + component.get('v.loanRec.Loan_Program__c'));
    },

    lookupSearchContact : function(component, event, helper) {
        const lookupComponent = event.getSource();
        const serverSearchAction = component.get('c.searchContact');
        serverSearchAction.setParam('anOptionalParam', 'not used');
        lookupComponent.search(serverSearchAction);
    },

    clearErrorsOnChangeBorrower: function(component, event, helper) {
        const selection = component.get('v.selectionBorrower');
        const errors = component.get('v.errors');
        const lookupComponent = event.getSource();
        var selectionObj = component.get('v.selectionBorrower');
        console.log('JSON.stringify(selectionObj)');
        console.log(JSON.stringify(selectionObj));
        if(!selectionObj){
            var event = component.getEvent('onNewContact');
            const referredBy = component.get("v.loanRec.Referred_By__c");
            const leadSource = component.get("v.loanRec.LeadSource");
            event.setParams({'data': {"referredBy":referredBy, "leadSource":leadSource}});
            if (event) {
                event.fire();
            }
            return;
        }
        component.set("v.loanRec.Borrower_Record__c", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.loanRec.Borrower_Record__c", sObjRec.id);
            component.set("v.loanRecBorrowerName", sObjRec.additionalInfo);
		}
	},

    clearErrorsOnChangeCoBorrower: function(component, event, helper) {
        const selection = component.get('v.selectionCoBorrower');
        const errors = component.get('v.errors');
        const lookupComponent = event.getSource();
        var selectionObj = component.get('v.selectionCoBorrower');
        component.set("v.loanRec.CoBorrower_Record__c", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.loanRec.CoBorrower_Record__c", sObjRec.id);
		}
	},

    clearErrorsOnChangeReferredBy: function(component, event, helper) {
        const selection = component.get('v.selectionReferredBy');
        const errors = component.get('v.errors');
        const lookupComponent = event.getSource();
        var selectionObj = component.get('v.selectionReferredBy');
        component.set("v.loanRec.Referred_By__c", null);
        console.log("clearErrorsOnChangeReferredBy", JSON.parse(JSON.stringify(selectionObj)), selection);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.loanRec.Referred_By__c", sObjRec.id);
		}
        console.log("ReferredBy",component.get("v.loanRec.Referred_By__c"));
	},
    
    lookupSearchProperty : function(component, event, helper) {
        const lookupComponent = event.getSource();
        const serverSearchAction = component.get('c.searchProperty');
        serverSearchAction.setParam('anOptionalParam', 'not used');
        lookupComponent.search(serverSearchAction);
    },

    clearErrorsOnChangeProperty: function(component, event, helper) {
        const selection = component.get('v.selectionProperty');
        const errors = component.get('v.errors');
        const lookupComponent = event.getSource();
        var selectionObj = component.get('v.selectionProperty');
        //
        component.set("v.loanRec.Subject_Property_Name__c", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            console.log('clearErrorsOnChangeProperty selectionObj', sObjRec)
            component.set("v.loanRec.Subject_Property_Name__c", sObjRec.id);
            component.set("v.subjectPropertyAddress", sObjRec.additionalInfo);
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
        component.set("v.loanRec.OwnerId", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.loanRec.OwnerId", sObjRec.id);
		}
	},
    

    saveLoan: function(component, event, helper) {
        component.set('v.isError', false);
        component.set('v.errorMessage', '');

        component.set('v.loanRec.StageName', 'New');

        var selectionObj2 = component.get('v.selectionBorrower');
        component.set("v.loanRec.Borrower_Record__c", null);
        for (var i=0; i< selectionObj2.length; i++) {
            var sObjRec = selectionObj2[i];
            component.set("v.loanRec.Borrower_Record__c", sObjRec.id);
		}

        var selectionObj3 = component.get('v.selectionCoBorrower');
        component.set("v.loanRec.CoBorrower_Record__c", null);
        for (var i=0; i< selectionObj3.length; i++) {
            var sObjRec = selectionObj3[i];
            component.set("v.loanRec.CoBorrower_Record__c", sObjRec.id);
		}

        var selectionObj4 = component.get('v.selectionProperty');
        component.set("v.loanRec.Subject_Property_Name__c", null);
        for (var i=0; i< selectionObj4.length; i++) {
            var sObjRec = selectionObj4[i];
            component.set("v.loanRec.Subject_Property_Name__c", sObjRec.id);
		}

        var selectionObj5 = component.get('v.selectionUser');
        component.set("v.loanRec.OwnerId", null);

        if (component.get('v.isPurchaseorPurch')) {
            component.set("v.loanRec.Property_Value__c", null);
        } else {
            component.set("v.loanRec.Purchase_Price__c", null);
            component.set("v.loanRec.Down_Payment__c", null);
        }

        for (var i=0; i< selectionObj5.length; i++) {
            var sObjRec = selectionObj5[i];
            component.set("v.loanRec.OwnerId", sObjRec.id);
		}

        component.set("v.loanRec.StageName", 'New');

        if(component.get('v.loanRec.Subject_Property_Name__c') == null){
            component.set('v.isError', true);
            component.set('v.errorMessage', 'Subject Property Name is required.');
        }

        if(component.get('v.loanRec.Borrower_Record__c') == null){
            component.set('v.isError', true);
            component.set('v.errorMessage', 'Borrower is required.');
        }

        if(component.get('v.loanRec.Name') == null || component.get('v.loanRec.Name') == ''){
            /*component.set('v.isError', true);
            component.set('v.errorMessage', 'Loan File Name is required.');*/
            let name = component.get('v.loanRecBorrowerName') + ' ' + component.get('v.subjectPropertyAddress') + ' ' + component.get('v.loanRec.Purpose__c')
            component.set('v.loanRec.Name', name)
            console.log(name);
        }

        if(!component.get('v.isError')){
            component.set('v.isSpinner', true);
            helper.saveLoanRecord(component);
        }
    },

    onContactRecordChange: function(component){
        let contactRecord = component.get('v.contactRecord');
        component.set('v.selectionBorrower', [contactRecord]);
    },

})