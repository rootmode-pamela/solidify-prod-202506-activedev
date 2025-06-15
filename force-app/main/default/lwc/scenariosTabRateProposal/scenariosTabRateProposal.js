import { LightningElement, api, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import PROPOSAL_OBJECT from '@salesforce/schema/Proposal__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';


import Override_Comp from '@salesforce/schema/Proposal__c.Override_Comp__c';
import Simple_Breakeven from '@salesforce/schema/Proposal__c.Simple_Breakeven__c';
import Total_Loan_Amount1__c from '@salesforce/schema/Proposal__c.Total_Loan_Amount1__c';

const SUCCESS_TITLE = 'Loan Information Saved!';
const SUCCESS_VARIANT = 'success';
const FIELDS = [
    'Proposal__c.Purpose__c',
    'Proposal__c.Borrower__c',
    'Proposal__c.Borrower_Lead__c',
    'Proposal__c.Most_Recent_Loan__c',
    'Proposal__c.Override_Comp__c',
    'Proposal__c.Simple_Breakeven__c'
];
const FIELDS2 = [
    'Proposal__c.RecordTypeId'
];


export default class ScenariosTabRateProposal extends NavigationMixin(LightningElement) {
    
    Override_Comp = Override_Comp;
    Simple_Breakeven = Simple_Breakeven;
    Total_Loan_Amount1__c = Total_Loan_Amount1__c;

    ProposalId;
    ProposalObject = PROPOSAL_OBJECT;
    @api objectApiName;
    
    @api
    get recordId() {
        return this.ProposalId;
    }
    
    set recordId(value) {
        //sets ProposalId attribute
        this.setAttribute('ProposalId', value);
        //sets ProposalId assignment
        this.ProposalId = value;
    }
    
    @track isRefinance = true;
    @track isContact = false;
    @track isLead = false;
    @track isLoan = false;
    @track OverrideComp = false;
    @track Simple_Breakeven = false;
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS }) 
    record({ error, data }) {
        if (error) {
            console.log('***error = ' + error);
        } else if (data) {
            console.log('***objectApiName = ' + this.objectApiName);
            console.log('***data = ' + data.fields.Purpose__c.value);
            if(this.objectApiName == 'Proposal__c'){
                console.log('@@@ data.fields.Purpose__c.value: ' + data.fields.Purpose__c.value);
                this.isRefinance = false;
                if(data.fields.Purpose__c.value == 'Refinance' || data.fields.Purpose__c.value == 'Refi_No_Cashout' || data.fields.Purpose__c.value == 'Refi_Cashout'){
                    this.isRefinance = true;
                }
                if(data.fields.Borrower__c.value !== null){
                    this.isContact = true;
                }else if(data.fields.Borrower_Lead__c.value !== null){
                    this.isLead = true;
                }
                if(data.fields.Most_Recent_Loan__c.value !== null){
                    this.isLoan = true;
                }
                if(data.fields.Override_Comp__c.value == true){
                    this.OverrideComp = true;
                }
                if(data.fields.Simple_Breakeven__c.value == true){
                    this.Simple_Breakeven = true;
                }
            }

        }
    }

    @track isRefiAnalysis = false;
    @track isRateAnalysis = false;
    @track isComparisonAnalysis = false;
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS2 }) 
    record({ error, data }) {
        if (error) {
            console.log('***error = ' + error);
        }
        else if (data) {
            console.log('***objectApiName = ' + this.objectApiName);
            console.log('***data = ' + data.fields.RecordTypeId.value);
            if(this.objectApiName == 'Proposal__c'){
                console.log('@@@ data.fields.RecordTypeId.value: ' + data.fields.RecordTypeId.value);
                this.isRefinance = false;
                if(data.fields.RecordTypeId.value == '012f4000000OatvAAC'){
                    this.isRefiAnalysis = true;
                    console.log('isRefiAnalysis = true');
                } else if(data.fields.RecordTypeId.value == '012f4000000ObpJAAS'){
                    this.isRateAnalysis = true;
                    console.log('isRateAnalysis = true');
                } else if(data.fields.RecordTypeId.value == '0127c0000000tYQAAY'){
                    this.isComparisonAnalysis = true;
                    console.log('isComparisonAnalysis = true');
                }
            }

        }
    }

    HandleOverrideComp(event){
        const selected = event.target.value;
        if(selected == true){
            this.OverrideComp = true;
        }else{
            this.OverrideComp = false;
        }
    }

    HandleSimpleBreakeven(event){
        const selected = event.target.value;
        if(selected == true){
            this.Simple_Breakeven = true;
        }else{
            this.Simple_Breakeven = false;
        }
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const fields = event.detail.fields;
        fields.Proposal__c = this.ProposalId;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
        
    }
    handleSuccess() {
        // TODO: dispatch the custom event and show the success message
        this.dispatchEvent(new ShowToastEvent({
            title: SUCCESS_TITLE,
            variant: SUCCESS_VARIANT
        }))
        this.dispatchEvent(new CustomEvent('createreview', { detail: {} }));
    }
    
    @api
    get purpose() {
        return getFieldValue(this.ProposalId, PURPOSE_FIELD);
    }
    
    get isRefi() {
        console.log('@@@ this.purpose: ' + this.purpose);
    }
    
    //Navigate to visualforce page
    navigateToVFPage() {
        let windowOrigin = window.location.origin;
        console.log('--windowOrigin:    '+windowOrigin);
        let generatedUrl = 'https://solidify.secure.force.com/RateProposal/?id=' + this.ProposalId
        window.open(generatedUrl);
    }
    
}