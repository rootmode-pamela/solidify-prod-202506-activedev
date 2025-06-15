import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import SUBMISSIONNOTES_FIELD from "@salesforce/schema/Opportunity.Submission_Notes__c";

const fields = [SUBMISSIONNOTES_FIELD];
const SUCCESS_TITLE = 'Loan Information Saved!';
const SUCCESS_VARIANT = 'success';


export default class SubmissionNotes extends LightningElement {
    @api recordId;
    isLoading; 
    editable = false;

    connectedCallback(){
        console.log('::: recordId ::: ' , this.recordId);
    }

    @wire(getRecord, { recordId: "$recordId", fields })
    opportunity;

    get notes() {
        return getFieldValue(this.opportunity.data, SUBMISSIONNOTES_FIELD);
    }

    contactFields = [
        {"label": "Loan Originator", "fieldname": "Loan_Originator__c"},
        {"label": "Co-Loan Originator", "fieldname": "Co_Loan_Originator__c"},
        {"label": "Loan Processor", "fieldname": "Loan_Processor__c"},
        {"label": "Lead Source", "fieldname": "LeadSource"},
        {"label": "Referred By", "fieldname": "Referred_By__c"},
        {"label": "Lender", "fieldname": "Lender__c"},
        {"label": "Lender AE", "fieldname": "Lender_AE__c"},
        {"label": "Escrow Officer", "fieldname": "Escrow_Contact__c"},
        {"label": "Buyers Agent", "fieldname": "Buyers_Agent__c"},
        {"label": "Sellers Agent", "fieldname": "Sellers_Agent__c"}
    ];

    timeLineFields = [
        {"label": "Initial Docs Due", "fieldname": "Initial_Docs_In_By__c"},
        {"label": "Acknowledge LE", "fieldname": "LE_Acknowledged_By__c"},
        {"label": "Appraisal Contingency", "fieldname": "Appraisal_Contingency__c"},
        {"label": "Loan Contingency", "fieldname": "Loan_Contingency__c"},
        {"label": "Approval Expected", "fieldname": "Approval_Expected__c"},
        {"label": "Conditions Due", "fieldname": "Final_Conditions_In_By__c"},
        {"label": "Acknowledge CD", "fieldname": "CD_Out_By__c"},
        {"label": "Sign Final Docs", "fieldname": "Sign_Final_Docs_By__c"},
        {"label": "COE", "fieldname": "COE__c"},
        {"label": "Lock Expiration", "fieldname": "Lock_Expiration__c"}
    ];

    sectionFirstFields = [
        {"label": "Submission Notes", "fieldname": "Submission_Notes__c"},
        {"label": "Credit", "fieldname": "Credit_Submission_Notes__c"},
        {"label": "Income", "fieldname": "Income_Submission_Notes__c"},
        {"label": "Assets", "fieldname": "Asset_Submission_Notes__c"},
        {"label": "Property & Title", "fieldname": "Property_Submission_Notes__c"}
    ];
    
    submissionNotes;
    
    handleSubmissionNotesChange(event){
        this.submissionNotes = event.target.value;
        console.log('submissionNotes :: ', this.submissionNotes);
    }

    handleEditClick() {
        this.editable=true;
    }

    handleSubmit(event){
        this.isLoading = true;
        event.preventDefault();
        console.log('submissionNotes :: ', this.submissionNotes);
        let fields = event.detail.fields;
        fields.Submission_Notes__c = this.submissionNotes;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
        this.editable=false;
    }

    closeModal(event) 
    {
        this.isLoading = false
        this.dispatchEvent(new CustomEvent('closemodal'));            
    }

    handleSuccess() {
       // TODO: dispatch the custom event and show the success message
        this.dispatchEvent(new ShowToastEvent({
            title: SUCCESS_TITLE,
            variant: SUCCESS_VARIANT
        }))
        this.dispatchEvent(new CustomEvent('closemodal'));  
        this.isLoading = false;
    }
}