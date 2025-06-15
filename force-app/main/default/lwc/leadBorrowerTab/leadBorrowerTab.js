import { LightningElement, track,api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';

import PURPOSE_FIELD from '@salesforce/schema/Lead.Purpose__c';
import CITY_FIELD from '@salesforce/schema/Lead.City';

const SUCCESS_TITLE = 'Lead Information Saved!';
const SUCCESS_VARIANT = 'success';

const FIELDS = [
    'Lead.Purpose__c',
    'Lead.Street',
    'Lead.City',
    'Lead.State',
    'Lead.PostalCode'
];
const fields2 = [CITY_FIELD];


export default class LeadBorrowerTab extends LightningElement {

    @api recordId;
    @api objectApiName;
    strStreet;
    strCity;
    strState;
    strCountry;
    strPostalCode;
    @track editable = false;
    @track isRefinance = true;
    
    @track isLoading = false;

    @track borrowerFields = [
        {"label": "First Name", "fieldname": "FirstName"},
        {"label": "Last Name", "fieldname": "LastName"},
        {"label": "Nickname", "fieldname": "Nickname__c"},
        {"label": "Mobile Phone", "fieldname": "MobilePhone"},
        {"label": "Email", "fieldname": "Email"},
        {"label": "Income Type", "fieldname": "Income_Sources__c"},
        {"label": "Mo. Income", "fieldname": "Estimated_Income__c"},
        {"label": "FICO", "fieldname": "Fico__c"}
    ];
    @track borrowerExpandedFields = [
        {"label": "Age", "fieldname": "Borrower_Age__c"},
        {"label": "Home Phone", "fieldname": "Home_Phone__c"},
        {"label": "Business Phone", "fieldname": "Business_Phone__c"},
        {"label": "Employer", "fieldname": "Employer__c"},
        {"label": "PMOC", "fieldname": "Borrower_PMOC__c"}
    ];

    @track coBorrowerFields = [
        {"label": "First Name", "fieldname": "CoBorrower_FirstName__c"},
        {"label": "Last Name", "fieldname": "CoBorrower_LastName__c"},
        {"label": "Nickname", "fieldname": "CoBorrower_Nickname__c"},
        {"label": "Mobile Phone", "fieldname": "CoBorrower_Mobile__c"},
        {"label": "Email", "fieldname": "Email_2__c"},
        {"label": "Income Type", "fieldname": "CoBorrower_Income_Source_New__c"},
        {"label": "Mo. Income", "fieldname": "CoBorrower_Est_Income__c"},
        {"label": "FICO", "fieldname": "CoBorrower_Fico__c"}
    ];
    @track coBorrowerExpandedFields = [
        {"label": "Age", "fieldname": "CoBorrower_Age__c"},
        {"label": "Home Phone", "fieldname": "CoBorrower_Home_Phone__c"},
        {"label": "Business Phone", "fieldname": "CoBorrower_Business_Phone__c"},
        {"label": "Employer", "fieldname": "CoBorrower_Employer__c"},
        {"label": "PMOC", "fieldname": "CoBorrower_PMOC__c"}
    ];

    @track declarationsFields = [
        {"label": "Credit Profile", "fieldname": "Self_Reported_Credit__c"},
        {"label": "Household Income Range", "fieldname": "Household_Income_Range__c"},
        {"label": "Veteran", "fieldname": "Veteran__c"},
        {"label": "First Time Homebuyer", "fieldname": "First_Time_Homebuyer__c"},
        {"label": "BK or Foreclosure", "fieldname": "BK_Foreclosure_Past_7yrs__c"}
    ];
    @track sourceFields = [
        {"label": "Lead Source", "fieldname": "LeadSource"},
        {"label": "Referred By", "fieldname": "Referred_By__c"}
    ];
    @track miscFields = [
        {"label": "Timeline", "fieldname": "Timeline__c"},
        {"label": "Realtor Established", "fieldname": "Realtor_Established__c"},
        {"label": "Consumer Comments", "fieldname": "ConsumerComments__c"},
        {"label": "Current Program, Rate, Balance", "fieldname": "CurrentProgramRateBalance__c"},
        {"label": "RCA Lead Note", "fieldname": "LeadNote__c"},
        {"label": "Price Range", "fieldname": "Price_Value_Range__c"},
        {"label": "Update RC Status", "fieldname": "UpdateStatus__c"}
    ];

    SPStreet = ' ';
    SPCity = ' ';
    SPState = ' ';
    SPZip = ' ';

    @wire(getRecord, { recordId: '$recordId', fields2 })
    lead;

    get city() {
        return getFieldValue(this.lead.data, CITY_FIELD);
    }

    //CoBorrower Active
    @track CoBorrowerActive = false;
    value1 = '';
    get options1() {
        return [
            { label: 'Is there a Co-Borrower?', value: 'Yes1' },
        ];
    }
    BorrowerChange(event) {
        const selectedOption = event.detail.value;
        if (selectedOption== 'Yes1') {
            this.CoBorrowerActive = true;
            this.template.querySelector('[data-id="wrappercollapsed"]').classList.remove('slds-size_1-of-4');
            this.template.querySelector('[data-id="wrappercollapsed"]').classList.add('slds-size_1-of-1');
            
            this.template.querySelector('[data-id="collapsed1"]').classList.remove('slds-size_1-of-1');
            this.template.querySelector('[data-id="collapsed1"]').classList.add('slds-size_1-of-4');
            
            this.template.querySelector('[data-id="collapsed2"]').classList.remove('slds-size_1-of-1');
            this.template.querySelector('[data-id="collapsed2"]').classList.add('slds-size_1-of-4');
            
            this.template.querySelector('[data-id="collapsed3"]').classList.remove('slds-size_1-of-1');
            this.template.querySelector('[data-id="collapsed3"]').classList.add('slds-size_1-of-4');
        } else {
            this.CoBorrowerActive = false;

            this.template.querySelector('[data-id="wrappercollapsed"]').classList.remove('slds-size_1-of-1');
            this.template.querySelector('[data-id="wrappercollapsed"]').classList.add('slds-size_1-of-4');
            
            this.template.querySelector('[data-id="collapsed1"]').classList.remove('slds-size_1-of-4');
            this.template.querySelector('[data-id="collapsed1"]').classList.add('slds-size_1-of-1');
            
            this.template.querySelector('[data-id="collapsed2"]').classList.remove('slds-size_1-of-4');
            this.template.querySelector('[data-id="collapsed2"]').classList.add('slds-size_1-of-1');
            
            this.template.querySelector('[data-id="collapsed3"]').classList.remove('slds-size_1-of-4');
            this.template.querySelector('[data-id="collapsed3"]').classList.add('slds-size_1-of-1');
        }
    }

    //2nd Loan Active
    @track Active2ndLoan = false;
    value2 = '';
    get options2() {
        return [
            { label: 'Is there a Second Loan?', value: 'Yes2' },
        ];
    }
    LoanChange(event) {
        const selectedOption = event.detail.value;
        if (selectedOption== 'Yes2') {
            this.Active2ndLoan = true;
        } else {
            this.Active2ndLoan = false;
        }
    }

    handleEditClick() {
        this.editable=true;
    }

    handleCancelClick() {
        this.editable=false;
    }

    handleSubmit(event) {
        this.isLoading = true;
        event.preventDefault();
        let fields = event.detail.fields;
        console.log( 'Fields are ' +  JSON.stringify( fields ) );
        console.log("Lead ID = " + this.recordId);
        fields.Street = this.strStreet;
        fields.City = this.strCity;
        fields.State = this.strState;
        fields.Country = this.strCountry;
        fields.PostalCode = this.strPostalCode;
        fields.Lead = this.recordId;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
        this.editable=false;
    }
    handleValueSearch(){
        let windowOrigin = window.location.origin;
        console.log('--windowOrigin:    ' + windowOrigin);
        let generatedUrl = 'https://www.google.com/search?q=' + this.SPStreet + ' ' + this.SPCity + ' ' + this.SPState + ' ' + this.SPZip
        window.open(generatedUrl);
    }

    handleSuccess() {
        // TODO: dispatch the custom event and show the success message
        this.dispatchEvent(new ShowToastEvent({
            title: SUCCESS_TITLE,
            variant: SUCCESS_VARIANT
        }))
        this.dispatchEvent(new CustomEvent('createreview', { detail: {} }));
        this.isLoading = false;
    }
    handleToggleSection(event) {
        this.activeSectionMessage =
            'Open section name:  ' + event.detail.openSections;
    }

    addressInputChange( event ) {

        this.strStreet = event.target.street;
        this.strCity =  event.target.city;
        this.strState = event.target.province;
        this.strCountry = event.target.country;
        this.strPostalCode = event.target.postalCode;

    }

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS }) 
    record({ error, data }) {
        if (error) {
            console.log('***error = ' + error);
        } else if (data) {
            console.log('***objectApiName = ' + this.objectApiName);
            console.log('***data = ' + data.fields.Purpose__c.value);
            this.SPStreet =  data.fields.Street.value;
            this.SPCity =  data.fields.City.value;
            this.SPState =  data.fields.State.value;
            this.SPZip =  data.fields.PostalCode.value;
            if(this.objectApiName == 'Lead'){
                console.log('@@@ data.fields.Purpose__c.value: ' + data.fields.Purpose__c.value);
                this.isRefinance = true;
                if(data.fields.Purpose__c.value !== null){
                    if(data.fields.Purpose__c.value.includes("Purch")){
                        this.isRefinance = false;
                    }}
            }
        }
    }
}