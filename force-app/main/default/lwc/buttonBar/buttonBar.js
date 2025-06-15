import { LightningElement, track, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord } from 'lightning/uiRecordApi';
import { loadStyle } from 'lightning/platformResourceLoader';
import { NavigationMixin } from 'lightning/navigation';
import EXIT_BUTTON_STYLE from '@salesforce/resourceUrl/exitButtonStyle'
const SUCCESS_TITLE = 'Loan Information Saved!';
const SUCCESS_VARIANT = 'success';
const MORTGAGE_BUTTON_LIST = [ 'SubmitNotes', 'WhyWait', 'BlendedRate', 'Qualifying', 'MortgageCalculator', 'CreateProposal', 'Research', 'ConvoLogLoanProcessorNotes'];
const SCENARIO_BUTTON_LIST = [ 'SubmitNotes', 'WhyWait', 'BlendedRate', 'Qualifying', 'MortgageCalculator', 'CreateProposal', 'Research', 'ConvoLogLoanProcessorNotes'];
const LEAD_BUTTON_LIST = ['MortgageCalculator', 'WhyWait', 'Research'];
const OPPORTUNITY_FIELDS = [
    'Opportunity.Purpose__c',
    'Opportunity.Subject_Property_Name__c'
];
const LEAD_FIELDS = [
    'Lead.Purpose__c',
    'Lead.Property__c'
];

export default class buttonBar extends NavigationMixin(LightningElement) {
    @api recordId;
    @track fields;
    @api objectApiName;
    @api object;
    @api objectSetting;
    @api recordTypeName;
    @track buttons = SCENARIO_BUTTON_LIST;
    @track showWhyWait = true;
    @track isOpenQualifyingModal = false;
    @track isOpenBlendedRateModal = false;
    @track isOpenWhyWait = false;
    @track isOpenSubmitNotes = false;
    @track isOpenConvoLogLoanProcessorNotesModal = false;
    @track isOpenResearch = false;

    connectedCallback() {
        loadStyle(this, EXIT_BUTTON_STYLE + '/exitButtonStyle.css');
        if (this.objectApiName === 'Lead') {
            this.fields = LEAD_FIELDS;
        } else if (this.objectApiName === 'Opportunity') {
            this.fields = OPPORTUNITY_FIELDS;
        }
    }

    Purpose = '';
    subjectPropertyId = '';

    @wire(getRecord, { recordId: '$recordId', fields: '$fields' })
    record({ error, data }) {
        if (error) {

            console.log('*!*error = ' + JSON.stringify(error));
            console.log(this.objectApiName);
        } else if (data) {
            console.log('RecordTypeName:' + this.recordTypeName);
            console.log('fields:' + this.fields);
            console.log('ObjectApiName:' + this.objectApiName);
            console.log('Object:' + this.object);
            if (this.objectApiName === 'Opportunity') {
                this.subjectPropertyId = data.fields.Subject_Property_Name__c.value;
            }
            if (this.objectApiName === 'Lead') {
                this.buttons = LEAD_BUTTON_LIST;
                this.subjectPropertyId = data.fields.Property__c.value;
            } else if (this.recordTypeName == 'Mortgage') {
                this.buttons = MORTGAGE_BUTTON_LIST;
            }
            this.showWhyWait = true;
            if (this.buttons.includes('WhyWait')) {
                if (data.fields.Purpose__c.value.includes('Purch')) {
                    this.showWhyWait = false;
                    console.log('WhyWait purpose:' + data.fields.Purpose__c.value);
                }
            } else {
                this.showWhyWait = false;
            }

        }
    }

    get fields() {
        if (this.objectApiName === 'Lead') {
            return LEAD_FIELDS;
        } else if (this.objectApiName === 'Opportunity') {
            return OPPORTUNITY_FIELDS;
        }
    }

    get showLoanSetup() {
        return this.buttons.includes('LoanSetup');
    }

    get showShareSummary() {
        return this.buttons.includes('ShareSummary');
    }

    get showWhyWait(){
        return this.buttons.includes('WhyWait');
    }

    get showSubmitNotes() {
        return this.buttons.includes('SubmitNotes');
    }

    get showBlendedRate() {
        return this.buttons.includes('BlendedRate');
    }

    get showConvoLogLoanProcessorNotes() {
        return this.buttons.includes('ConvoLogLoanProcessorNotes');
    }

    get showQualifying() {
        return this.buttons.includes('Qualifying');
    }

    get showMortgageCalculator() {
        return this.buttons.includes('MortgageCalculator');

    }

    get showCreateProposal() {
        return this.buttons.includes('CreateProposal');

    }

    get showResearch() {
        return this.buttons.includes('Research');
    }


    get flowVariables() {
        return [
            {
                name: 'recordId',
                type: 'String',
                value: this.recordId
            }
        ];
    }


    handleValueSearch() {
        let windowOrigin = window.location.origin;
        console.log('--windowOrigin:    ' + windowOrigin);
        let generatedUrl = 'https://www.google.com/search?q=' + this.SPStreet + ' ' + this.SPCity + ' ' + this.SPState + ' ' + this.SPZip
        window.open(generatedUrl);
    }


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

    handleResearchButton() {
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

    handleCreateProposal(id) {
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

    openBlendedRateModal() {
        this.isOpenBlendedRateModal = true;
    }
    closeBlendedRateModal() {
        this.isOpenBlendedRateModal = false;
    }

    openWhyWaitModal() {
        console.log('open why wait');
        this.isOpenWhyWait = true;
    }

    closeWhyWaitModal() {
        this.isOpenWhyWait = false;
    }

    openResearchModal() {
        this.isOpenResearch = true;
    }

    closeResearchModal() {
        this.isOpenResearch = false;
    }

    openSubmitNotesModal() {
        this.isOpenSubmitNotes = true;
    }

    closeSubmitNotesModal() {
        this.isOpenSubmitNotes = false;
    }

    openConvoLogLoanProcessorNotesModal() {
        this.isOpenConvoLogLoanProcessorNotesModal = true;
    }

    closeConvoLogLoanProcessorNotesModal() {
        this.isOpenConvoLogLoanProcessorNotesModal = false;
    }
}