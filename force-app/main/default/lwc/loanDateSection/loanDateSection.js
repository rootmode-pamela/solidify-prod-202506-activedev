import { LightningElement, track,api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import {loadStyle} from 'lightning/platformResourceLoader';
import {NavigationMixin} from 'lightning/navigation';

import RUSHREQUESTED from '@salesforce/schema/Opportunity.Rush_Requested__c';
import HOLDUNTIL from '@salesforce/schema/Opportunity.Hold_Until__c';
import EXIT_BUTTON_STYLE from '@salesforce/resourceUrl/exitButtonStyle'
const SUCCESS_TITLE = 'Loan Information Saved!';
const SUCCESS_VARIANT = 'success';

const FIELDS2 = [
    'Opportunity.Subject_Prop_Street__c',
    'Opportunity.Subject_Prop_City__c',
    'Opportunity.Subject_Prop_St__c',
    'Opportunity.Subject_Prop_Zip__c'
];

export default class LoanDateSection extends NavigationMixin(LightningElement) {
    @api variant = 'Default';

    @api recordId;
    @api objectApiName;
    @track isOpenQualifyingModal = false;
    @track isOpenBlendedRateModal = false;

    get showFlowButton(){
        return this.variant === 'With Flow Button';
    }

    get isOldVariant(){
        return this.variant === 'Default';
    }

    get showForm(){
        return this.variant === 'Only Form';
    }

    get flowVariables(){
        return [
            {
                name: 'recordId',
                type: 'String',
                value: this.recordId
            }
        ];
    }

    SPStreet = ' ';
    SPCity = ' ';
    SPState = ' ';
    SPZip = ' ';

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS2 }) 
    record({ error, data }) {
        if (error) {
            console.log('***error = ' + error);
        } else if (data) {
            console.log('***objectApiName = ' + this.objectApiName);
            console.log('***data = ' + data.fields);
            this.SPStreet =  data.fields.Subject_Prop_Street__c.value;
            this.SPCity =  data.fields.Subject_Prop_City__c.value;
            this.SPState =  data.fields.Subject_Prop_St__c.value;
            this.SPZip =  data.fields.Subject_Prop_Zip__c.value;
        }
    }
    connectedCallback() {
        loadStyle(this, EXIT_BUTTON_STYLE + '/exitButtonStyle.css');
    }

    handleValueSearch(){
        let windowOrigin = window.location.origin;
        console.log('--windowOrigin:    ' + windowOrigin);
        let generatedUrl = 'https://www.google.com/search?q=' + this.SPStreet + ' ' + this.SPCity + ' ' + this.SPState + ' ' + this.SPZip
        window.open(generatedUrl);
    }

    fields = [RUSHREQUESTED, HOLDUNTIL];

    handleSubmit(event) {
        event.preventDefault(); // stop the form from submitting
        const fields = event.detail.fields;
        this.template.querySelector('lightning-record-form').submit(fields);
    }

    handleSuccess() {
        // TODO: dispatch the custom event and show the success message
        this.dispatchEvent(new ShowToastEvent({
            title: SUCCESS_TITLE,
            variant: SUCCESS_VARIANT
        }))
        this.dispatchEvent(new CustomEvent('createreview', { detail: {} }));
    }

    async handleResearchButton() {
        this.dispatchEvent(new CustomEvent('showresearchmodal', { detail: {} }));
    }

    handleSelectEvent(detail) {
        const { id, value } = detail;
        console.log(`select event fired elem with id ${id} and value: ${value}`);
        switch (value) {
            case 'show_details_household':
                this.handleShowHouseholdDetails(id);
                break;
            case 'show_details_loan':
                this.handleShowLoanDetails(id);
                break;
            case 'new_proposal':
                this.handleNewProposalRowAction(id);
                break;
        }
    }

    handleShowHouseholdDetails(id) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: id,
                actionName: "view"
            }
        });
    }

    handleShowLoanDetails(id) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                objectApiName: 'Opportunity',
                recordId: id,
                actionName: "view"
            }
        });
    }

    handleNewProposalRowAction(id) {
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: 'c__solidify_newProposal'
            },
            state: {
                "c__propertyId": id
            }
        });
    }

    openQualifyingModal() {
        this.isOpenQualifyingModal = true;
    }
    closeQualifyingModal() {
        this.isOpenQualifyingModal = false;
    }
    handleSuccessQualifying() {
        this.closeQualifyingModal();
        const evt = new ShowToastEvent({
            title: "Success!",
            message: "Record has been updated successfully.",
            variant: "success",
        });
        this.dispatchEvent(evt);
    }
    openBlendedRateModal(){
        this.isOpenBlendedRateModal = true;
    }
    closeBlendedRateModal(){
        this.isOpenBlendedRateModal = false;
    }

}