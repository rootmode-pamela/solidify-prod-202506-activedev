({
    doInit : function(component, event, helper) {
        helper.loadExistingUser(component);
    },

    openNewContactButton: function(component, event, helper) {
        component.set('v.openPopup', true);
    },

    cancelContact : function(component, event, helper) {
        var homeEvt = $A.get("e.force:navigateToObjectHome");
			homeEvt.setParams({
    		"scope": "Contact"
		});
		homeEvt.fire();
        component.set('v.openPopup', false);
        component.set('v.isError', false);
        component.set('v.errorMessage', '');

        component.set('v.isFirstSection', true);
        component.set('v.isSecondSectionOther', false);
        component.set('v.isSecondSectionClient', false);
        component.set('v.isThirdSectionClient', false);

        component.set('v.contactType', 'Client');
        component.set('v.isThereCoBorrower', 'Yes');
    },

    nextContact: function(component, event, helper) {
        if(component.get('v.isFirstSection')){
            if(component.get('v.contactType') == 'Other'){
                component.set('v.isFirstSection', false);
                component.set('v.isSecondSectionClient', false);
                component.set('v.isThirdSectionClient', false);
                component.set('v.isSecondSectionOther', true);
            }
            else if(component.get('v.contactType') == 'Client'){
                component.set('v.isFirstSection', false);
                component.set('v.isSecondSectionOther', false);
                component.set('v.isThirdSectionClient', false);
                component.set('v.isSecondSectionClient', true);
            }
            
        }
        else if(component.get('v.isSecondSectionClient')){
            console.log(!component.get("v.isThereHousehold"));
            if ((component.get("v.isThereHousehold") && component.get('v.companyHouseholdName') != null) || !component.get("v.isThereHousehold")) {
                component.set('v.isFirstSection', false);
                component.set('v.isSecondSectionOther', false);
                component.set('v.isSecondSectionClient', false);
                component.set('v.isThirdSectionClient', true);
                component.set('v.isError', false);
                component.set('v.errorMessage', '');
            } else {
                component.set('v.isError', true);
                component.set('v.errorMessage', 'Household is required.');
            }
        }
    },

    backContact: function(component, event, helper) {
        component.set('v.isError', false);
        component.set('v.errorMessage', '');
        component.set('v.contactType', 'Client');
        component.set('v.isThereCoBorrower', 'Yes');
        component.set('v.isThereHousehold', false);

        if(component.get('v.isSecondSectionOther')){
            component.set('v.isFirstSection', true);

            component.set('v.isSecondSectionOther', false);
            component.set('v.isSecondSectionClient', false);
            component.set('v.isThirdSectionClient', false);
        }

        if(component.get('v.isSecondSectionClient')){
            component.set('v.isFirstSection', true);

            component.set('v.isSecondSectionOther', false);
            component.set('v.isSecondSectionClient', false);
            component.set('v.isThirdSectionClient', false);
        }

        if(component.get('v.isThirdSectionClient')){
            component.set('v.isSecondSectionClient', true);

            component.set('v.isFirstSection', false);
            component.set('v.isSecondSectionOther', false);
            component.set('v.isThirdSectionClient', false);
        }

    },
    
    typeOfContactChange: function(component, event, helper) {
        var typeOfContactId = component.find("typeOfContactId");
        component.set('v.contactType', typeOfContactId.get('v.value'));

        console.log('@@@ typeOfContactId: ' + component.get('v.contactType'));
    },

    isThereCoBorrowerChange: function(component, event, helper) {
        var isThereCoBorrowerId = component.find("isThereCoBorrowerId");
        component.set('v.isThereCoBorrower', isThereCoBorrowerId.get('v.value'));

        console.log('@@@ isThereCoBorrowerId: ' + component.get('v.isThereCoBorrower'));
    },

    isThereHouseholdChange: function(component, event, helper) {
        let isThereHouseholdEl = component.find("isThereHouseholdId");
        component.set('v.isThereHousehold', isThereHouseholdEl.get('v.value') === 'Yes');

        console.log('@@@ isThereHouseHoldId: ' + component.get('v.isThereHousehold'));
    },
    
    saveContactOther: function(component, event, helper) {
        var selectionObj = component.get('v.selectionAccount');
        component.set("v.companyName", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.companyName", sObjRec.id);
		}

        var selectionObj5 = component.get('v.selectionUser');
        component.set("v.contactRec.OwnerId", null);

        for (var i=0; i< selectionObj5.length; i++) {
            var sObjRec = selectionObj5[i];
            component.set("v.contactRec.OwnerId", sObjRec.id);
		}
        
        if(component.get('v.companyName') == '' || component.get('v.companyName') == null){
            component.set('v.isError', true);
            component.set('v.errorMessage', 'Company Name is required.');
        }
        else if(component.get('v.contactRec.FirstName') == '' || component.get('v.contactRec.FirstName') == null){
            component.set('v.isError', true);
            component.set('v.errorMessage', 'First Name is required.');
        }
        else if(component.get('v.contactRec.LastName') == '' || component.get('v.contactRec.LastName') == null){
            component.set('v.isError', true);
            component.set('v.errorMessage', 'Last Name is required.');
        }
        else{
            component.set('v.isError', false);
            component.set('v.errorMessage', '');

            component.set('v.isSpinner', true);
            helper.saveContactOtherHelper(component);
        }
    },

    saveContactClient: function(component, event, helper) {
        const isThereHousehold = component.get("v.isThereHousehold");
        const householdId = component.get("v.companyHouseholdName");
        var selectionObj5 = component.get('v.selectionUser');
        component.set("v.contactRec.OwnerId", null);

        for (var i=0; i< selectionObj5.length; i++) {
            var sObjRec = selectionObj5[i];
            component.set("v.contactRec.OwnerId", sObjRec.id);
		}
        if (isThereHousehold && householdId != null) {
            component.set("v.contactRec.AccountId", householdId)
        }

        if(component.get('v.contactRec.FirstName') == '' || component.get('v.contactRec.FirstName') == null){
            component.set('v.isError', true);
            component.set('v.errorMessage', 'First Name is required.');
        }
        else if(component.get('v.contactRec.LastName') == '' || component.get('v.contactRec.LastName') == null){
            component.set('v.isError', true);
            component.set('v.errorMessage', 'Last Name is required.');
        }
        else{
            component.set('v.isError', false);
            component.set('v.errorMessage', '');
            component.set('v.isSpinner', true);

            let redirectToNewLoan = event.getSource().getLocalId() === 'saveContactClientWithNewLoanBtn';
            helper.saveContactClientHelper(component, redirectToNewLoan);
        }
    },

    declineNewScenarioFromModal:function (component, event, helper) {
        component.set('v.showConfirmModal', false);
        $A.get('e.force:refreshView').fire();
    },

    confirmNewScenarioFromModal:function (component, event, helper) {
        component.set('v.openPopup', false);
        component.set('v.isError', false);
        component.set('v.errorMessage', '');

        component.set('v.isFirstSection', true);
        component.set('v.isSecondSectionOther', false);
        component.set('v.isSecondSectionClient', false);
        component.set('v.isThirdSectionClient', false);

        component.set('v.contactType', 'Client');
        component.set('v.isThereCoBorrower', 'Yes');

        component.set('v.createNewLoanSec', true);

        component.set('v.showConfirmModal', false);

    },
    
    lookupSearchAccount : function(component, event, helper) {
        console.log('lookupSearchAccount');
        const lookupComponent = event.getSource();
        const serverSearchAction = component.get('c.searchAccount');
        serverSearchAction.setParam('anOptionalParam', 'not used');
        lookupComponent.search(serverSearchAction);
    },


    setVariables : function(component, event, helper) {
        const referredById = event.getParam('arguments').referredById;
        const leadSource = event.getParam('arguments').leadSource;
        component.set('v.contactRec.Referred_by__c', referredById);
        component.set('v.contactRec.LeadSource', leadSource);
        console.log('setVariables', component.get('v.contactRec.Referred_by__c'), component.get('v.contactRec.LeadSource'));
    },

    clearErrorsOnChangeAccount: function(component, event, helper) {
        const selection = component.get('v.selectionAccount');
        const errors = component.get('v.errors');
        const lookupComponent = event.getSource();
        var selectionObj = component.get('v.selectionAccount');
        component.set("v.companyName", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.companyName", sObjRec.id);
		}
	},

    clearErrorsOnChangeHousehold: function(component, event, helper) {
        console.log('clearErrorsOnChangeHousehold');
        const selection = component.get('v.selectionHousehold');
        const errors = component.get('v.errors');
        const lookupComponent = event.getSource();
        var selectionObj = component.get('v.selectionHousehold');
        component.set("v.companyHouseholdName", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.companyHouseholdName", sObjRec.id);
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
        component.set("v.contactRec.OwnerId", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.contactRec.OwnerId", sObjRec.id);
		}
	},
})