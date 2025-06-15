({
    doInit : function(component, event, helper) {
        component.set('v.isSpinner', true);
        helper.loadLeadRecord(component);
        helper.loadIncomeSource(component);
    },
    
    handleSectionToggle: function (cmp, event) {
        var openSections = event.getParam('openSections');
    },

    editMethod : function(component, event, helper) {
        component.set('v.isReadOnly', false);

        if(component.get('v.leadRecord.Borrower_PMOC__c') != null){
            var pmocId = component.find("pmocId");
            pmocId.set('v.value', component.get('v.leadRecord.Borrower_PMOC__c'));
        }
        else{
            var pmocId = component.find("pmocId");
            pmocId.set('v.value', '');
        }      

        /*
        if(component.get('v.leadRecord.Income_Sources__c') != null){
            var incomeSourceId = component.find("incomeSourceId");
            incomeSourceId.set('v.value', component.get('v.leadRecord.Income_Sources__c'));
        }
        else{
            var incomeSourceId = component.find("incomeSourceId");
            incomeSourceId.set('v.value', '');
        }    
        */  

        if(component.get('v.leadRecord.CoBorrower_PMOC__c') != null){
            var coBorrowerPMOCId = component.find("coBorrowerPMOCId");
            coBorrowerPMOCId.set('v.value', component.get('v.leadRecord.CoBorrower_PMOC__c'));
        }
        else{
            var coBorrowerPMOCId = component.find("coBorrowerPMOCId");
            coBorrowerPMOCId.set('v.value', '');
        }      

        /*
        if(component.get('v.leadRecord.CoBorrower_Income_Sources__c') != null){
            var coBorrowerIncomeSourceId = component.find("coBorrowerIncomeSourceId");
            coBorrowerIncomeSourceId.set('v.value', component.get('v.leadRecord.CoBorrower_Income_Sources__c'));
        }
        else{
            var coBorrowerIncomeSourceId = component.find("coBorrowerIncomeSourceId");
            coBorrowerIncomeSourceId.set('v.value', '');
        }     
        */

        if(component.get('v.leadRecord.Purpose__c') != null){
            var purposeId = component.find("purposeId");
            purposeId.set('v.value', component.get('v.leadRecord.Purpose__c'));
        }
        else{
            var purposeId = component.find("purposeId");
            purposeId.set('v.value', '');
        }      

        if(component.get('v.leadRecord.Occupancy__c') != null){
            var occupancyId = component.find("occupancyId");
            occupancyId.set('v.value', component.get('v.leadRecord.Occupancy__c'));
        }
        else{
            var occupancyId = component.find("occupancyId");
            occupancyId.set('v.value', '');
        }      

        if(component.get('v.leadRecord.First_Time_Homebuyer__c') != null){
            var firstimeHomebuyerId = component.find("firstimeHomebuyerId");
            firstimeHomebuyerId.set('v.value', component.get('v.leadRecord.First_Time_Homebuyer__c'));
        }
        else{
            var firstimeHomebuyerId = component.find("firstimeHomebuyerId");
            firstimeHomebuyerId.set('v.value', '');
        }      

        if(component.get('v.leadRecord.Veteran__c') != null){
            var veteranId = component.find("veteranId");
            veteranId.set('v.value', component.get('v.leadRecord.Veteran__c'));
        }
        else{
            var veteranId = component.find("veteranId");
            veteranId.set('v.value', '');
        }      

        if(component.get('v.leadRecord.LeadSource') != null){
            var leadSourceId = component.find("leadSourceId");
            leadSourceId.set('v.value', component.get('v.leadRecord.LeadSource'));
        }
        else{
            var leadSourceId = component.find("leadSourceId");
            leadSourceId.set('v.value', '');
        }      

        if(component.get('v.leadRecord.Subject_Property_Type__c') != null){
            var propertyTypeId = component.find("propertyTypeId");
            propertyTypeId.set('v.value', component.get('v.leadRecord.Subject_Property_Type__c'));
        }
        else{
            var propertyTypeId = component.find("propertyTypeId");
            propertyTypeId.set('v.value', '');
        }      

        if(component.get('v.leadRecord.Number_of_Units__c') != null){
            var numberOfUnitsId = component.find("numberOfUnitsId");
            numberOfUnitsId.set('v.value', component.get('v.leadRecord.Number_of_Units__c'));
        }
        else{
            var numberOfUnitsId = component.find("numberOfUnitsId");
            numberOfUnitsId.set('v.value', '');
        }      

        if(component.get('v.leadRecord.Income_Sources__c') != null){
            var incomeSource = component.get('v.leadRecord.Income_Sources__c');
            var incomeSourceList = incomeSource.split(';');
            var incomeSourceVal = [];
            for(var i = 0; i < incomeSourceList.length; i++) {
                incomeSourceVal.push(incomeSourceList[i]);
            }
            component.set('v.incomeSourceVal', incomeSourceVal);
        }

        if(component.get('v.leadRecord.CoBorrower_Income_Source_New__c') != null){
            var coBorrowerincomeSource = component.get('v.leadRecord.CoBorrower_Income_Source_New__c');
            var coBorrowerincomeSourceList = coBorrowerincomeSource.split(';');
            var coBorrowerIncomeSourceVal = [];
            for(var i = 0; i < coBorrowerincomeSourceList.length; i++) {
                coBorrowerIncomeSourceVal.push(coBorrowerincomeSourceList[i]);
            }
            component.set('v.coBorrowerIncomeSourceVal', coBorrowerIncomeSourceVal);
        }

        
        if(component.get('v.leadRecord.Referred_By__c') != null){
            var strExample = '[';
            strExample = strExample + '{"icon":"standard:contact","id":"' + component.get('v.leadRecord.Referred_By__c')  + '","sObjectType":"Contact","subtitle":"Contact • ' + component.get('v.leadRecord.Referred_By__r.FirstName') + ' ' + component.get('v.leadRecord.Referred_By__r.LastName') + '","title":"' + component.get('v.leadRecord.Referred_By__r.FirstName') + ' ' + component.get('v.leadRecord.Referred_By__r.LastName') +'"}';
            strExample = strExample + ']';
            var strObj = JSON.parse(strExample);
            component.set("v.selectionContact", strObj);
        }


        if((component.get('v.leadRecord.Subject_Property_Street__c') == null || component.get('v.leadRecord.Subject_Property_Street__c') == '') && 
           (component.get('v.leadRecord.Subject_Property_City__c') == null || component.get('v.leadRecord.Subject_Property_City__c') == '') &&
           (component.get('v.leadRecord.Subject_Property_State__c') == null || component.get('v.leadRecord.Subject_Property_State__c') == '') &&
           (component.get('v.leadRecord.Subject_Property_Zip__c') == null || component.get('v.leadRecord.Subject_Property_Zip__c') == '')){

            component.set('v.isDisplayAddressSearch', true);
        }
        else{
            component.set('v.isDisplayAddressSearch', false);
        }
    },

    cancelButton : function(component, event, helper) {
        component.set('v.isReadOnly', true);
        component.set('v.isDisplayAddressSearch', false);
    },

    saveButton : function(component, event, helper) {
        var selectionObj = component.get('v.selectionContact');
        component.set("v.leadRecord.Referred_By__c", null);
        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.leadRecord.Referred_By__c", sObjRec.id);
		}

        if(component.get('v.leadRecord.LastName') == null || component.get('v.leadRecord.LastName') == ''){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title : 'Error Message',
                message: 'Last Name is required.',
                duration:' 5000',
                key: 'info_alt',
                type: 'error'
            });
            toastEvent.fire();
        }
        else{
            component.set('v.isSpinner', true);
            helper.saveLeadRecord(component);
        }

    },

    onPMOCChange : function(component, event, helper) {
        var pmocId = component.find("pmocId");
        component.set('v.leadRecord.Borrower_PMOC__c', pmocId.get('v.value'));

        console.log('@@@ pmocId: ' + component.get('v.leadRecord.Borrower_PMOC__c'));
    },

    incomeSourceChange : function(component, event, helper) {
        var incomeSourceId = component.find("incomeSourceId");
        component.set('v.leadRecord.Income_Sources__c', incomeSourceId.get('v.value'));

        console.log('@@@ incomeSourceId: ' + component.get('v.leadRecord.Income_Sources__c'));
    },

    coBorrowerPMOCChange : function(component, event, helper) {
        var coBorrowerPMOCId = component.find("coBorrowerPMOCId");
        component.set('v.leadRecord.CoBorrower_PMOC__c', coBorrowerPMOCId.get('v.value'));

        console.log('@@@ coBorrowerPMOCId: ' + component.get('v.leadRecord.CoBorrower_PMOC__c'));
    },

    coBorrowerIncomeSourceChange : function(component, event, helper) {
        var coBorrowerIncomeSourceId = component.find("coBorrowerIncomeSourceId");
        component.set('v.leadRecord.CoBorrower_Income_Sources__c', coBorrowerIncomeSourceId.get('v.value'));

        console.log('@@@ coBorrowerIncomeSourceId: ' + component.get('v.leadRecord.CoBorrower_Income_Sources__c'));
    },

    purposeChange : function(component, event, helper) {
        var purposeId = component.find("purposeId");
        component.set('v.leadRecord.Purpose__c', purposeId.get('v.value'));

        console.log('@@@ purposeId: ' + component.get('v.leadRecord.Purpose__c'));
    },

    occupancyChange : function(component, event, helper) {
        var occupancyId = component.find("occupancyId");
        component.set('v.leadRecord.Occupancy__c', occupancyId.get('v.value'));

        console.log('@@@ occupancyId: ' + component.get('v.leadRecord.Occupancy__c'));
    },

    firstimeHomebuyerChange : function(component, event, helper) {
        var firstimeHomebuyerId = component.find("firstimeHomebuyerId");
        component.set('v.leadRecord.First_Time_Homebuyer__c', firstimeHomebuyerId.get('v.value'));

        console.log('@@@ firstimeHomebuyerId: ' + component.get('v.leadRecord.First_Time_Homebuyer__c'));
    },

    veteranChange : function(component, event, helper) {
        var veteranId = component.find("veteranId");
        component.set('v.leadRecord.Veteran__c', veteranId.get('v.value'));

        console.log('@@@ veteranId: ' + component.get('v.leadRecord.Veteran__c'));
    },

    leadSourceChange : function(component, event, helper) {
        var leadSourceId = component.find("leadSourceId");
        component.set('v.leadRecord.LeadSource', leadSourceId.get('v.value'));

        console.log('@@@ leadSourceId: ' + component.get('v.leadRecord.LeadSource'));
    },

    propertyTypeChange : function(component, event, helper) {
        var propertyTypeId = component.find("propertyTypeId");
        component.set('v.leadRecord.Subject_Property_Type__c', propertyTypeId.get('v.value'));

        console.log('@@@ propertyTypeId: ' + component.get('v.leadRecord.Subject_Property_Type__c'));
    },

    numberOfUnitsChange : function(component, event, helper) {
        var numberOfUnitsId = component.find("numberOfUnitsId");
        component.set('v.leadRecord.Number_of_Units__c', numberOfUnitsId.get('v.value'));

        console.log('@@@ numberOfUnitsId: ' + component.get('v.leadRecord.Number_of_Units__c'));
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
        component.set("v.leadRecord.Referred_By__c", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.leadRecord.Referred_By__c", sObjRec.id);
		}

	},


    getAddress2 : function(component, event, helper){	 
		var params = {
	  		"input" : component.get('v.location2')	
		} 
 
		helper.callServer(component,"c.getSuggestions",function(response){
			var resp = JSON.parse(response);	
			console.log(resp.predictions);
			component.set('v.predictions2',resp.predictions);	
		},params);	
 
	},

    getAddressDetails2 : function(component, event, helper){		 
		var selectedItem = event.currentTarget;
        var placeid = selectedItem.dataset.placeid;
 
		var params = {
	   	    "placeId" : placeid  	
		} 
 
		helper.callServer(component,"c.getPlaceDetails",function(response){
			var placeDetails = JSON.parse(response);
			component.set('v.location2',placeDetails.result.name);	
			component.set('v.predictions2',[]); 
            
            console.log('@@@ street: ' + helper.extractAddressComponent(placeDetails.result.address_components, "street_number") + ' ' + helper.extractAddressComponent(placeDetails.result.address_components, "route"));
            console.log('@@@ city: ' + helper.extractAddressComponent(placeDetails.result.address_components, "locality"));
            console.log('@@@ state: ' + helper.extractAddressComponent(placeDetails.result.address_components, "administrative_area_level_1", "short"));
            console.log('@@@ zip: ' + helper.extractAddressComponent(placeDetails.result.address_components, "postal_code"));

            component.set('v.leadRecord.Subject_Property_Street__c', helper.extractAddressComponent(placeDetails.result.address_components, "street_number") + ' ' + helper.extractAddressComponent(placeDetails.result.address_components, "route"));
            component.set('v.leadRecord.Subject_Property_City__c', helper.extractAddressComponent(placeDetails.result.address_components, "locality"));
            component.set('v.leadRecord.Subject_Property_State__c', helper.extractAddressComponent(placeDetails.result.address_components, "administrative_area_level_1", "short"));
            component.set('v.leadRecord.Subject_Property_Zip__c', helper.extractAddressComponent(placeDetails.result.address_components, "postal_code"));
            
        },params);	
    },

    checkIfDisplayAddressSearch: function(component, event, helper) {
        if((component.get('v.leadRecord.Subject_Property_Street__c') == null || component.get('v.leadRecord.Subject_Property_Street__c') == '') && 
           (component.get('v.leadRecord.Subject_Property_City__c') == null || component.get('v.leadRecord.Subject_Property_City__c') == '') &&
           (component.get('v.leadRecord.Subject_Property_State__c') == null || component.get('v.leadRecord.Subject_Property_State__c') == '') &&
           (component.get('v.leadRecord.Subject_Property_Zip__c') == null || component.get('v.leadRecord.Subject_Property_Zip__c') == '')){

            component.set('v.isDisplayAddressSearch', true);
        }
        else{
            component.set('v.isDisplayAddressSearch', false);
        }
	},

    handleChangeIncomeSource: function (component, event) {
        console.log('@@@ selectedvalue: ' + event.getParam('value'));
        component.set('v.leadRecord.Income_Sources__c', event.getParam('value'));
    },

    handleChangeCoBorrowerIncomeSource: function (component, event) {
        console.log('@@@ selectedvalue: ' + event.getParam('value'));
        component.set('v.leadRecord.CoBorrower_Income_Source_New__c', event.getParam('value'));
    },

    
})