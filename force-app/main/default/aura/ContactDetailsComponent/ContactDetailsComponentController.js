({
    doInit : function(component, event, helper) {
        component.set('v.isSpinner', true);
        helper.loadContactRecord(component);
        helper.loadIncomeSource(component);
        //helper.loadLoanOriginator(component);
    },

    editMethod : function(component, event, helper) {
        console.log('@@@ editMethod');
        
        component.set('v.isReadOnly', false);
		
        
        if(component.get('v.contactRecord.Gender__c') != null){
            var genderId = component.find("genderId");
            genderId.set('v.value', component.get('v.contactRecord.Gender__c'));
        }
        else{
            var genderId = component.find("genderId");
            genderId.set('v.value', '');
        }    

        if(component.get('v.contactRecord.Ethnicity__c') != null){
            var ethnicityId = component.find("ethnicityId");
            ethnicityId.set('v.value', component.get('v.contactRecord.Ethnicity__c'));
        }
        else{
            var ethnicityId = component.find("ethnicityId");
            ethnicityId.set('v.value', '');
        }    

        if(component.get('v.contactRecord.Race__c') != null){
            var raceId = component.find("raceId");
            raceId.set('v.value', component.get('v.contactRecord.Race__c'));
        }
        else{
            var raceId = component.find("raceId");
            raceId.set('v.value', '');
        }    

        if(component.get('v.contactRecord.Veteran__c') != null){
            var veteranId = component.find("veteranId");
            veteranId.set('v.value', component.get('v.contactRecord.Veteran__c'));
        }
        else{
            var veteranId = component.find("veteranId");
            veteranId.set('v.value', '');
        }    

        if(component.get('v.contactRecord.Contact_Status__c') != null){
            var contactStatusId = component.find("contactStatusId");
            contactStatusId.set('v.value', component.get('v.contactRecord.Contact_Status__c'));
        }
        else{
            var contactStatusId = component.find("contactStatusId");
            contactStatusId.set('v.value', '');
        }    

        if(component.get('v.contactRecord.Income_Sources__c') != null){
            var incomeSourcesId = component.find("incomeSourcesId");
            incomeSourcesId.set('v.value', component.get('v.contactRecord.Income_Sources__c'));
        }
        else{
            var incomeSourcesId = component.find("incomeSourcesId");
            incomeSourcesId.set('v.value', '');
        }    

        if(component.get('v.contactRecord.LeadSource') != null){
            var leadSourceId = component.find("leadSourceId");
            leadSourceId.set('v.value', component.get('v.contactRecord.LeadSource'));
        }
        else{
            var leadSourceId = component.find("leadSourceId");
            leadSourceId.set('v.value', '');
        }    

        if(component.get('v.contactRecord.Loan_Originator__c') != null){
            var loanOriginatorId = component.find("loanOriginatorId");
            loanOriginatorId.set('v.value', component.get('v.contactRecord.Loan_Originator__c'));
        }
        else{
            var loanOriginatorId = component.find("loanOriginatorId");
            loanOriginatorId.set('v.value', '');
        }    

        if(component.get('v.contactRecord.Referred_by__c') != null){
            var strExample = '[';
            strExample = strExample + '{"icon":"standard:contact","id":"' + component.get('v.contactRecord.Referred_by__c')  + '","sObjectType":"Contact","subtitle":"Contact • ' + component.get('v.contactRecord.Referred_by__r.FirstName') + ' ' + component.get('v.contactRecord.Referred_by__r.LastName') + '","title":"' + component.get('v.contactRecord.Referred_by__r.FirstName') + ' ' + component.get('v.contactRecord.Referred_by__r.LastName') +'"}';
            strExample = strExample + ']';
            var strObj = JSON.parse(strExample);
            component.set("v.selectionContact", strObj);
        }
        
    },

    cancelButton : function(component, event, helper) {
        component.set('v.isReadOnly', true);
    },

    saveButton : function(component, event, helper) {
        var selectionObj = component.get('v.selectionContact');
        component.set("v.contactRecord.Referred_by__c", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.contactRecord.Referred_by__c", sObjRec.id);
		}

        component.set('v.isSpinner', true);
        helper.saveContactRecord(component);
    },

    genderChange : function(component, event, helper) {
        var genderId = component.find("genderId");
        component.set('v.contactRecord.Gender__c', genderId.get('v.value'));

        console.log('@@@ genderId: ' + component.get('v.contactRecord.Gender__c'));
    },

    ethnicityChange : function(component, event, helper) {
        var ethnicityId = component.find("ethnicityId");
        component.set('v.contactRecord.Ethnicity__c', ethnicityId.get('v.value'));

        console.log('@@@ ethnicityId: ' + component.get('v.contactRecord.Ethnicity__c'));
    },

    raceChange : function(component, event, helper) {
        var raceId = component.find("raceId");
        component.set('v.contactRecord.Race__c', raceId.get('v.value'));

        console.log('@@@ raceId: ' + component.get('v.contactRecord.Race__c'));
    },

    veteranChange : function(component, event, helper) {
        var veteranId = component.find("veteranId");
        component.set('v.contactRecord.Veteran__c', veteranId.get('v.value'));

        console.log('@@@ veteranId: ' + component.get('v.contactRecord.Veteran__c'));
    },

    contactStatusChange : function(component, event, helper) {
        var contactStatusId = component.find("contactStatusId");
        component.set('v.contactRecord.Contact_Status__c', contactStatusId.get('v.value'));

        console.log('@@@ contactStatusId: ' + component.get('v.contactRecord.Contact_Status__c'));
    },

    incomeSourcesChange : function(component, event, helper) {
        var incomeSourcesId = component.find("incomeSourcesId");
        component.set('v.contactRecord.Income_Sources__c', incomeSourcesId.get('v.value'));

        console.log('@@@ incomeSourcesId: ' + component.get('v.contactRecord.Income_Sources__c'));
    },

    leadSourceChange : function(component, event, helper) {
        var leadSourceId = component.find("leadSourceId");
        component.set('v.contactRecord.LeadSource', leadSourceId.get('v.value'));

        console.log('@@@ leadSourceId: ' + component.get('v.contactRecord.LeadSource'));
    },

    loanOriginatorChange : function(component, event, helper) {
        var loanOriginatorId = component.find("loanOriginatorId");
        component.set('v.contactRecord.Loan_Originator__c', loanOriginatorId.get('v.value'));

        console.log('@@@ loanOriginatorId: ' + component.get('v.contactRecord.Loan_Originator__c'));
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
        component.set("v.contactRecord.Referred_by__c", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.contactRecord.Referred_by__c", sObjRec.id);
		}

	},

    handleChange: function (component, event) {
        console.log('@@@ selectedvalue: ' + event.getParam('value'));
        /*
        var newValue = JSON.stringify(event.getParam('value'));
        if(newValue != null || newValue != ''){
            newValue = newValue.replace(/,/g, ";");
            component.set('v.contactRecord.Type__c', newValue);
        }
        */
    }

})