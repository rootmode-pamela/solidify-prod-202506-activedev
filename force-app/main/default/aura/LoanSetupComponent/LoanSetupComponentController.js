({
    doInit : function(component, event, helper) {
        component.set('v.isSpinner', true);
        helper.loadLoanRecord(component);
        helper.loadLoanOriginator(component);
        helper.loadcoLoanOriginator(component);
        helper.loadLeadSource(component);
        helper.loadLender(component);
        helper.loadPrimaryGoal(component);
        helper.loadAppraisal(component);
        helper.loadEscrows(component);
        helper.loadAdminFee(component);
        helper.loadOtherLens(component);
        helper.loadIncomeType(component);
        helper.loadVesting(component);
        helper.loadClosingFunds(component);
        helper.loadfeeStructure(component);
    },

    editMethod : function(component, event, helper) {
        component.set('v.isReadOnly', false);

        if(component.get('v.loanRecord.Loan_Originator__c') != null){
            var loanOriginatorId = component.find("loanOriginatorId");
            loanOriginatorId.set('v.value', component.get('v.loanRecord.Loan_Originator__c'));
        }
        else{
            var loanOriginatorId = component.find("loanOriginatorId");
            loanOriginatorId.set('v.value', '');
        }  
        
        if(component.get('v.loanRecord.Co_Loan_Originator__c') != null){
            var coloanOriginatorId = component.find("coloanOriginatorId");
            coloanOriginatorId.set('v.value', component.get('v.loanRecord.Co_Loan_Originator__c'));
        }
        else{
            var coloanOriginatorId = component.find("coloanOriginatorId");
            coloanOriginatorId.set('v.value', '');
        } 
        
        if(component.get('v.loanRecord.LeadSource') != null){
            var leadSourceId = component.find("leadSourceId");
            leadSourceId.set('v.value', component.get('v.loanRecord.LeadSource'));
        }
        else{
            var leadSourceId = component.find("leadSourceId");
            leadSourceId.set('v.value', '');
        }    
        
        
        if(component.get('v.loanRecord.Lender__c') != null){
            var lenderId = component.find("lenderId");
            lenderId.set('v.value', component.get('v.loanRecord.Lender__c'));
        }
        else{
            var lenderId = component.find("lenderId");
            lenderId.set('v.value', '');
        }    
	
        if(component.get('v.loanRecord.Purpose__c') != 'Purch' && component.get('v.loanRecord.Purpose__c') != 'Purchase'){
            if(component.get('v.loanRecord.Primary_Goal__c') != null){
                var primaryGoalId = component.find("primaryGoalId");
                primaryGoalId.set('v.value', component.get('v.loanRecord.Primary_Goal__c'));
            }
            else{
                var primaryGoalId = component.find("primaryGoalId");
                primaryGoalId.set('v.value', '');
            } 
            
            if(component.get('v.loanRecord.Closing_Funds__c') != null){
                var closingFundsId = component.find("closingFundsId");
                closingFundsId.set('v.value', component.get('v.loanRecord.Closing_Funds__c'));
            }
            else{
                var closingFundsId = component.find("closingFundsId");
                closingFundsId.set('v.value', '');
            } 
        }
        
        if(component.get('v.loanRecord.Appraisal__c') != null){
            var appraisalId = component.find("appraisalId");
            appraisalId.set('v.value', component.get('v.loanRecord.Appraisal__c'));
        }
        else{
            var appraisalId = component.find("appraisalId");
            appraisalId.set('v.value', '');
        }    

        if(component.get('v.loanRecord.Escrows__c') != null){
            var escrowsId = component.find("escrowsId");
            escrowsId.set('v.value', component.get('v.loanRecord.Escrows__c'));
        }
        else{
            var escrowsId = component.find("escrowsId");
            escrowsId.set('v.value', '');
        }    
          
        if(component.get('v.loanRecord.Admin_Fee__c') != null){
            var adminFeeId = component.find("adminFeeId");
            adminFeeId.set('v.value', component.get('v.loanRecord.Admin_Fee__c'));
        }
        else{
            var adminFeeId = component.find("adminFeeId");
            adminFeeId.set('v.value', '');
        }    

        if(component.get('v.loanRecord.Other_Liens_New__c') != null){
            var otherLiensId = component.find("otherLiensId");
            otherLiensId.set('v.value', component.get('v.loanRecord.Other_Liens_New__c'));
        }
        else{
            var otherLiensId = component.find("otherLiensId");
            otherLiensId.set('v.value', '');
        }    

        if(component.get('v.loanRecord.IncomeType__c') != null){
            var incomeTypeId = component.find("incomeTypeId");
            incomeTypeId.set('v.value', component.get('v.loanRecord.IncomeType__c'));
        }
        else{
            var incomeTypeId = component.find("incomeTypeId");
            incomeTypeId.set('v.value', '');
        }    
        
        
        
        if(component.get('v.loanRecord.Vesting__c') != null){
            var vestingId = component.find("vestingId");
            vestingId.set('v.value', component.get('v.loanRecord.Vesting__c'));
        }
        else{
            var vestingId = component.find("vestingId");
            vestingId.set('v.value', '');
        }    
        
        if(component.get('v.loanRecord.Fee_Structure__c') != null){
            var feeStructureId = component.find("feeStructureId");
            feeStructureId.set('v.value', component.get('v.loanRecord.Fee_Structure__c'));
        }
        else{
            var feeStructureId = component.find("feeStructureId");
            feeStructureId.set('v.value', '');
        } 
        
        if(component.get('v.loanRecord.Lender_AE__c') != null){
            var strExample = '[';
            strExample = strExample + '{"icon":"standard:contact","id":"' + component.get('v.loanRecord.Lender_AE__c')  + '","sObjectType":"Contact","subtitle":"Contact • ' + component.get('v.loanRecord.Lender_AE__r.FirstName') + ' ' + component.get('v.loanRecord.Lender_AE__r.LastName') + '","title":"' + component.get('v.loanRecord.Lender_AE__r.FirstName') + ' ' + component.get('v.loanRecord.Lender_AE__r.LastName') +'"}';
            strExample = strExample + ']';
            var strObj = JSON.parse(strExample);
            console.log('@@@ strObj: ' + JSON.stringify(strObj));
            component.set("v.selectionContactLenderAE", strObj);
        }

        if(component.get('v.loanRecord.Escrow_Contact__c') != null){
            var strExample = '[';
            strExample = strExample + '{"icon":"standard:contact","id":"' + component.get('v.loanRecord.Escrow_Contact__c')  + '","sObjectType":"Contact","subtitle":"Contact • ' + component.get('v.loanRecord.Escrow_Contact__r.FirstName') + ' ' + component.get('v.loanRecord.Escrow_Contact__r.LastName') + '","title":"' + component.get('v.loanRecord.Escrow_Contact__r.FirstName') + ' ' + component.get('v.loanRecord.Escrow_Contact__r.LastName') +'"}';
            strExample = strExample + ']';
            var strObj = JSON.parse(strExample);
            component.set("v.selectionContactEscrow", strObj);
        }

        if(component.get('v.loanRecord.Buyers_Agent__c') != null){
            var strExample = '[';
            strExample = strExample + '{"icon":"standard:contact","id":"' + component.get('v.loanRecord.Buyers_Agent__c')  + '","sObjectType":"Contact","subtitle":"Contact • ' + component.get('v.loanRecord.Buyers_Agent__r.FirstName') + ' ' + component.get('v.loanRecord.Buyers_Agent__r.LastName') + '","title":"' + component.get('v.loanRecord.Buyers_Agent__r.FirstName') + ' ' + component.get('v.loanRecord.Buyers_Agent__r.LastName') +'"}';
            strExample = strExample + ']';
            var strObj = JSON.parse(strExample);
            component.set("v.selectionContactBuyers", strObj);
        }

        if(component.get('v.loanRecord.Sellers_Agent__c') != null){
            var strExample = '[';
            strExample = strExample + '{"icon":"standard:contact","id":"' + component.get('v.loanRecord.Sellers_Agent__c')  + '","sObjectType":"Contact","subtitle":"Contact • ' + component.get('v.loanRecord.Sellers_Agent__r.FirstName') + ' ' + component.get('v.loanRecord.Sellers_Agent__r.LastName') + '","title":"' + component.get('v.loanRecord.Sellers_Agent__r.FirstName') + ' ' + component.get('v.loanRecord.Sellers_Agent__r.LastName') +'"}';
            strExample = strExample + ']';
            var strObj = JSON.parse(strExample);
            component.set("v.selectionContactSellers", strObj);
        }

        if(component.get('v.loanRecord.Referred_By__c') != null){
            var strExample = '[';
            strExample = strExample + '{"icon":"standard:contact","id":"' + component.get('v.loanRecord.Referred_By__c')  + '","sObjectType":"Contact","subtitle":"Contact • ' + component.get('v.loanRecord.Referred_By__r.FirstName') + ' ' + component.get('v.loanRecord.Referred_By__r.LastName') + '","title":"' + component.get('v.loanRecord.Referred_By__r.FirstName') + ' ' + component.get('v.loanRecord.Referred_By__r.LastName') +'"}';
            strExample = strExample + ']';
            var strObj = JSON.parse(strExample);
            component.set("v.selectionContactReferredBy", strObj);
        }
    },

    cancelButton : function(component, event, helper) {
        component.set('v.isReadOnly', true);
    },

    saveButton : function(component, event, helper) {
        var selectionObj = component.get('v.selectionContactLenderAE');
        component.set("v.loanRecord.Lender_AE__c", null);
        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.loanRecord.Lender_AE__c", sObjRec.id);
		}

        var selectionObj2 = component.get('v.selectionContactEscrow');
        component.set("v.loanRecord.Escrow_Contact__c", null);
        for (var i=0; i< selectionObj2.length; i++) {
            var sObjRec = selectionObj2[i];
            component.set("v.loanRecord.Escrow_Contact__c", sObjRec.id);
		}

        var selectionObj3 = component.get('v.selectionContactBuyers');
        component.set("v.loanRecord.Buyers_Agent__c", null);
        for (var i=0; i< selectionObj3.length; i++) {
            var sObjRec = selectionObj3[i];
            component.set("v.loanRecord.Buyers_Agent__c", sObjRec.id);
		}

        var selectionObj4 = component.get('v.selectionContactSellers');
        component.set("v.loanRecord.Sellers_Agent__c", null);
        for (var i=0; i< selectionObj4.length; i++) {
            var sObjRec = selectionObj4[i];
            component.set("v.loanRecord.Sellers_Agent__c", sObjRec.id);
		}

        var selectionObj5 = component.get('v.selectionContactReferredBy');
        component.set("v.loanRecord.Referred_By__c", null);
        for (var i=0; i< selectionObj5.length; i++) {
            var sObjRec = selectionObj5[i];
            component.set("v.loanRecord.Referred_By__c", sObjRec.id);
		}

        component.set('v.isSpinner', true);
        helper.saveLoanRecord(component);
    },

    loanOriginatorChange: function(component, event, helper) {
        var loanOriginatorId = component.find("loanOriginatorId");
        component.set('v.loanRecord.Loan_Originator__c', loanOriginatorId.get('v.value'));

        console.log('@@@ loanOriginatorId: ' + component.get('v.loanRecord.Loan_Originator__c'));
    },
    
    coloanOriginatorChange: function(component, event, helper) {
        var coloanOriginatorId = component.find("coloanOriginatorId");
        component.set('v.loanRecord.Co_Loan_Originator__c', coloanOriginatorId.get('v.value'));

        console.log('@@@ coloanOriginatorId: ' + component.get('v.loanRecord.Co_Loan_Originator__c'));
    },

    leadSourceChange: function(component, event, helper) {
        var leadSourceId = component.find("leadSourceId");
        component.set('v.loanRecord.LeadSource', leadSourceId.get('v.value'));

        console.log('@@@ leadSourceId: ' + component.get('v.loanRecord.LeadSource'));
    },

    lenderChange: function(component, event, helper) {
        var lenderId = component.find("lenderId");
        component.set('v.loanRecord.Lender__c', lenderId.get('v.value'));

        console.log('@@@ lenderId: ' + component.get('v.loanRecord.Lender__c'));
    },

    primaryGoalChange: function(component, event, helper) {
        var primaryGoalId = component.find("primaryGoalId");
        component.set('v.loanRecord.Primary_Goal__c', primaryGoalId.get('v.value'));

        console.log('@@@ primaryGoalId: ' + component.get('v.loanRecord.Primary_Goal__c'));
    },

    appraisalChange: function(component, event, helper) {
        var appraisalId = component.find("appraisalId");
        component.set('v.loanRecord.Appraisal__c', appraisalId.get('v.value'));

        console.log('@@@ appraisalId: ' + component.get('v.loanRecord.Appraisal__c'));
    },

    escrowsChange: function(component, event, helper) {
        var escrowsId = component.find("escrowsId");
        component.set('v.loanRecord.Escrows__c', escrowsId.get('v.value'));

        console.log('@@@ escrowsId: ' + component.get('v.loanRecord.Escrows__c'));
    },

    adminFeeChange: function(component, event, helper) {
        var adminFeeId = component.find("adminFeeId");
        component.set('v.loanRecord.Admin_Fee__c', adminFeeId.get('v.value'));

        console.log('@@@ adminFeeId: ' + component.get('v.loanRecord.Admin_Fee__c'));
    },

    otherLiensChange: function(component, event, helper) {
        var otherLiensId = component.find("otherLiensId");
        component.set('v.loanRecord.Other_Liens_New__c', otherLiensId.get('v.value'));

        console.log('@@@ otherLiensId: ' + component.get('v.loanRecord.Other_Liens_New__c'));
    },

    incomeTypeChange: function(component, event, helper) {
        var incomeTypeId = component.find("incomeTypeId");
        component.set('v.loanRecord.IncomeType__c', incomeTypeId.get('v.value'));

        console.log('@@@ incomeTypeId: ' + component.get('v.loanRecord.IncomeType__c'));
    },

    vestingChange: function(component, event, helper) {
        var vestingId = component.find("vestingId");
        component.set('v.loanRecord.Vesting__c', vestingId.get('v.value'));

        console.log('@@@ vestingId: ' + component.get('v.loanRecord.Vesting__c'));
    },

    closingFundsChange: function(component, event, helper) {
        var closingFundsId = component.find("closingFundsId");
        component.set('v.loanRecord.Closing_Funds__c', closingFundsId.get('v.value'));

        console.log('@@@ closingFundsId: ' + component.get('v.loanRecord.Closing_Funds__c'));
    },
    feeStructureChange: function(component, event, helper) {
        var closingFundsId = component.find("feeStructureId");
        component.set('v.loanRecord.Fee_Structure__c', closingFundsId.get('v.value'));

        console.log('@@@ closingFundsId: ' + component.get('v.loanRecord.Fee_Structure__c'));
    },

                  
    lookupSearchContactLenderAE : function(component, event, helper) {
        const lookupComponent = event.getSource();
        const serverSearchAction = component.get('c.searchContact');
        serverSearchAction.setParam('anOptionalParam', 'not used');
        lookupComponent.search(serverSearchAction);
    },

    clearErrorsOnChangeLenderAE: function(component, event, helper) {
        const selection = component.get('v.selectionContactLenderAE');
        const errors = component.get('v.errors');
        const lookupComponent = event.getSource();
        var selectionObj = component.get('v.selectionContactLenderAE');
        component.set("v.loanRecord.Lender_AE__c", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.loanRecord.Lender_AE__c", sObjRec.id);
		}
	},

    lookupSearchContactEscrow : function(component, event, helper) {
        const lookupComponent = event.getSource();
        const serverSearchAction = component.get('c.searchContact');
        serverSearchAction.setParam('anOptionalParam', 'not used');
        lookupComponent.search(serverSearchAction);
    },

    clearErrorsOnChangeEscrow: function(component, event, helper) {
        const selection = component.get('v.selectionContactEscrow');
        const errors = component.get('v.errors');
        const lookupComponent = event.getSource();
        var selectionObj = component.get('v.selectionContactEscrow');
        component.set("v.loanRecord.Escrow_Contact__c", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.loanRecord.Escrow_Contact__c", sObjRec.id);
		}
	},

    lookupSearchContactBuyers : function(component, event, helper) {
        const lookupComponent = event.getSource();
        const serverSearchAction = component.get('c.searchContact');
        serverSearchAction.setParam('anOptionalParam', 'not used');
        lookupComponent.search(serverSearchAction);
    },

    clearErrorsOnChangeBuyers: function(component, event, helper) {
        const selection = component.get('v.selectionContactBuyers');
        const errors = component.get('v.errors');
        const lookupComponent = event.getSource();
        var selectionObj = component.get('v.selectionContactBuyers');
        component.set("v.loanRecord.Buyers_Agent__c", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.loanRecord.Buyers_Agent__c", sObjRec.id);
		}
	},

    lookupSearchContactSellers : function(component, event, helper) {
        const lookupComponent = event.getSource();
        const serverSearchAction = component.get('c.searchContact');
        serverSearchAction.setParam('anOptionalParam', 'not used');
        lookupComponent.search(serverSearchAction);
    },

    clearErrorsOnChangeSellers: function(component, event, helper) {
        const selection = component.get('v.selectionContactSellers');
        const errors = component.get('v.errors');
        const lookupComponent = event.getSource();
        var selectionObj = component.get('v.selectionContactSellers');
        component.set("v.loanRecord.Sellers_Agent__c", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.loanRecord.Sellers_Agent__c", sObjRec.id);
		}
	},

    lookupSearchContactReferredBy : function(component, event, helper) {
        const lookupComponent = event.getSource();
        const serverSearchAction = component.get('c.searchContact');
        serverSearchAction.setParam('anOptionalParam', 'not used');
        lookupComponent.search(serverSearchAction);
    },

    clearErrorsOnChangeReferredBy: function(component, event, helper) {
        const selection = component.get('v.selectionContactReferredBy');
        const errors = component.get('v.errors');
        const lookupComponent = event.getSource();
        var selectionObj = component.get('v.selectionContactReferredBy');
        component.set("v.loanRecord.Referred_By__c", null);

        for (var i=0; i< selectionObj.length; i++) {
            var sObjRec = selectionObj[i];
            component.set("v.loanRecord.Referred_By__c", sObjRec.id);
		}
	},
})