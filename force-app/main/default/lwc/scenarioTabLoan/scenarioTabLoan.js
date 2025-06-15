import { LightningElement, api, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';


//import fields used in calculations
import PURPOSE_FIELD from '@salesforce/schema/Opportunity.Purpose__c';
import SCENARIO_ID from '@salesforce/schema/Opportunity.Scenario__c';
import LoanAmtS1 from '@salesforce/schema/Proposal__c.First_Loan_Amount_Scenario_1__c';
import LoanAmtS2 from '@salesforce/schema/Proposal__c.First_Loan_Amount_Scenario_2__c';
import LoanAmtS3 from '@salesforce/schema/Proposal__c.First_Loan_Amount_Scenario_3__c';  

import TaxPercent from '@salesforce/schema/Proposal__c.Scenarios_Tax_Percent__c';
import InsPercent from '@salesforce/schema/Proposal__c.Scenarios_Insurance__c'; 
import MIPercent from '@salesforce/schema/Proposal__c.MI_Percent__c';

import EstHoaS1 from '@salesforce/schema/Proposal__c.EstimatedHOAScenario1__c';
import EstHoaS2 from '@salesforce/schema/Proposal__c.EstimatedHOAScenario2__c';
import EstHoaS3 from '@salesforce/schema/Proposal__c.EstimatedHOAScenario3__c';

import EstInsuranceS1 from '@salesforce/schema/Proposal__c.EstimatedInsuranceScenario1__c';
import EstInsuranceS2 from '@salesforce/schema/Proposal__c.EstimatedInsuranceScenario2__c';
import EstInsuranceS3 from '@salesforce/schema/Proposal__c.EstimatedInsuranceScenario3__c';

import EstMtgInsuranceS1 from '@salesforce/schema/Proposal__c.EstimatedMortgageInsuranceScenario1__c';
import EstMtgInsuranceS2 from '@salesforce/schema/Proposal__c.EstimatedMortgageInsuranceScenario2__c';
import EstMtgInsuranceS3 from '@salesforce/schema/Proposal__c.EstimatedMortgageInsuranceScenario3__c';

const fields = [SCENARIO_ID, PURPOSE_FIELD];

export default class ScenarioTabLoan extends LightningElement {
    proposalId;
    @api recordId;
    @api objectApiName;

    @wire(getRecord, {recordId: '$recordId', fields})
    opportunity;

    @track isRefinance = true;
    @track editable = false;    
    
    LoanAmtS1 = LoanAmtS1;
    LoanAmtS2 = LoanAmtS2;
    LoanAmtS3 = LoanAmtS3;
    TaxPercent = TaxPercent;
    InsPercent = InsPercent;
    MIPercent = MIPercent;
    EstHoaS1 = EstHoaS1;
    EstHoaS2 = EstHoaS2;
    EstHoaS3 = EstHoaS3;
    EstInsuranceS1 = EstInsuranceS1;
    EstInsuranceS2 = EstInsuranceS2;
    EstInsuranceS3 = EstInsuranceS3;
    EstMtgInsuranceS1 = EstMtgInsuranceS1;
    EstMtgInsuranceS2 = EstMtgInsuranceS2;
    EstMtgInsuranceS3 = EstMtgInsuranceS3;
    



    handleLoad(event){
        console.log('handleLoad');
 /*       var record = event.detail.records;
        var fields = record[this.recordId].fields;
        this.proposalId = fields.Scenario__c.value;  */
        this.proposalId = getFieldValue(this.opportunity.data, SCENARIO_ID); 
        console.log(this.proposalId);
    }

    handleEditClick() {
        this.editable=true;
    }

    handleCancelClick() {
        this.editable=false;
    }

   /* handleSubmit(event){
        console.log('handle submit');
        event.preventDefault();
        const fields = event.detail.fields;
        console.log(fields);
        fields.Lead = this.leadId;
        fields.EstHoaS2 = this.EstHoaS1;
        fields.EstHoaS3 = this.EstHoaS1;
        fields.EstTaxesS1 = this.EstTaxesS1Calc;
        fields.EstTaxesS2 = this.LoanAmtS2 * this.TaxPercent;
        fields.EstTaxesS3 = this.LoanAmtS3 * this.TaxPercent;
        fields.EstMtgInsuranceS1 = this.LoanAmtS1 * this.MIPercent;
        fields.EstMtgInsuranceS2 = this.LoanAmtS2 * this.MIPercent;
        fields.EstMtgInsuranceS3 = this.LoanAmtS3 * this.MIPercent;
        fields.EstInsuranceS1 = this.LoanAmtS1 * this.InsPercent;
        fields.EstInsuranceS2 = this.LoanAmtS2 * this.InsPercent;
        fields.EstInsuranceS3 = this.LoanAmtS3 * this.InsPercent;

        this.template.querySelector('lightning-record-edit-form').submit(fields);
        this.editable=false;
        
    } */

    handleSuccess(event) {
        // TODO: dispatch the custom event and show the success message
     /*   const toastEvent = this.dispatchEvent(new ShowToastEvent({
            title: 'saved',
            variant: 'success'
        }));
        this.dispatchEvent(toastEvent);  */
        this.editable = false;
    }

    handleSectionToggle(event) {
        const openSections = event.detail.openSections;

        if (openSections.length === 0) {
            this.activeSectionsMessage = 'All sections are closed';
        } else {
            this.activeSectionsMessage =
                'Open sections: ' + openSections.join(', ');
        }
    }
    
    @api
    get purpose() {
        return getFieldValue(this.loanId, PURPOSE_FIELD);
    }
    
    get isRefi() {
        console.log('@@@ this.purpose: ' + this.purpose);
        
        if(this.purpose == "Refinance")
        return true;

    }



}