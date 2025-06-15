({
    openNewProposalButton : function(component, event, helper) {
        component.set('v.isDisplayPopupProp', true);
    },
    openNewLeadButton : function(component, event, helper) {
        component.set('v.isDisplayPopupLead', true);
    },
    openNewLoanButton : function(component, event, helper) {
        component.set('v.isDisplayPopupLoan', true);
    },
    openWhyWaitButton : function(component, event, helper) {
        component.set('v.isDisplayPopupWhyWait', true);
    },
    
    closeCrudeCalculatorModal : function(component, event, helper) {
        component.set('v.isDisplayPopupWhyWait', false);
    },
    
    openMortgageCalculatorButton : function(component, event, helper) {
        component.set('v.isDisplayPopupMortgageCalculator', true);
        var flow = component.find("mortgageCalculatorFlow");
        flow.startFlow("Solidify_Mortgage_Calculator");
        // flow.startFlow("Solidify_Mortgage_Calculator", { inputVariableName : 'inputValue' });
    },
    
    openQualifying : function(component, event, helper) {
        component.set('v.isDisplayPopupQualifying', true);
    },

    openScenario : function(component, event, helper) {
        component.set('v.isDisplayPopupScenario', true);
    },

    closePopupScenario : function(component, event, helper) {
        component.set('v.isDisplayPopupScenario', false);
    },
    
    handleMortagageCalculatorClose : function(component, event, helper) {
        component.set('v.isDisplayPopupMortgageCalculator', false);
    },
    
    openBlendedRateButton : function(component, event, helper)  {
        component.set('v.isDisplayPopupBlendedRate', true);
    },
    
    closeCrudeCalculatoeModal : function(component, event, helper)  {
        component.set('v.isDisplayPopupBlendedRate', false);
    },
    
    openNewContactButton : function(component, event, helper) {
        component.set('v.isNewContactFromNewLoan', false);
        component.set('v.isDisplayPopupContact', true);
    },
    
    newContactFromNewLoan: function(component, event){
        const referredById = event.getParam('data').referredBy;
        const leadSource = event.getParam('data').leadSource;
        console.log('newContactFromNewLoan', referredById, leadSource);
        component.set('v.isNewContactFromNewLoan', true);
        component.set('v.isDisplayPopupContact', true);
        const newCon = component.find("newCon:c");
        newCon.setVariables(referredById, leadSource);
    },
    onContactCreated: function(component, event){
        let contactRecord = event.getParam('data');
        component.set('v.contactRecord', JSON.parse(contactRecord));
        component.set('v.isDisplayPopupContact', false);
        component.set('v.isDisplayPopupLoan', true);
        component.set('v.isNewContactFromNewLoan', false);
    },
    closeQualifyingModal: function(component, event){
        component.set('v.isDisplayPopupQualifying', false);
    }
    
    
})