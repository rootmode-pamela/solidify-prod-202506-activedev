import { LightningElement, api, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import PROPOSAL_OBJECT from '@salesforce/schema/Proposal__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';

import ProposalId_Field from '@salesforce/schema/Proposal__c.Id';
import Occupancy_Field from '@salesforce/schema/Proposal__c.Occupancy__c';
import Subject_Property_Type_Field from '@salesforce/schema/Proposal__c.Subject_Property_Type__c';
import Number_of_Units_Field from '@salesforce/schema/Proposal__c.Number_of_Units__c';
import Estimated_Value_Field from '@salesforce/schema/Proposal__c.Estimated_Value__c';
import Current_Program_Field from '@salesforce/schema/Proposal__c.Current_Program__c';
import Current_Balance_Field from '@salesforce/schema/Proposal__c.Current_Balance__c';
import Current_Rate_Field from '@salesforce/schema/Proposal__c.Current_Rate__c';
import Current_Payment_Field from '@salesforce/schema/Proposal__c.Current_Payment__c';
import Years_Remaining_on_Current_Loan_Field from '@salesforce/schema/Proposal__c.Years_Remaining_on_Current_Loan__c';
import Total_Interest_Remaining_on_Current_Loan_Field from '@salesforce/schema/Proposal__c.Total_Interest_Remaining_on_Current_Loan__c';

import PURPOSE_FIELD from '@salesforce/schema/Proposal__c.Purpose__c';

import SolidifyContact from '@salesforce/schema/Proposal__c.SolidifyContact__c';
import Borrower_Name_Text from '@salesforce/schema/Proposal__c.Borrower_Name_Text__c';
import X10_Yr_Treasury_Yield from '@salesforce/schema/Proposal__c.X10_Yr_Treasury_Yield__c';

import Current_Loan_Amount from '@salesforce/schema/Proposal__c.Current_Loan_Amount__c';
import Current_Interest_Rate from '@salesforce/schema/Proposal__c.Current_Interest_Rate__c';
import Current_Loan_Term from '@salesforce/schema/Proposal__c.Current_Loan_Term__c';
import Current_Loan_Monthly_Payment from '@salesforce/schema/Proposal__c.Current_Loan_Monthly_Payment__c';
import Current_Loan_First_Payment from '@salesforce/schema/Proposal__c.Current_Loan_First_Payment__c';
import Current_Loan_Last_Payment_Made from '@salesforce/schema/Proposal__c.Current_Loan_Last_Payment_Made__c';
import Current_Loan_Number_Payments_Made from '@salesforce/schema/Proposal__c.Current_Loan_Number_Payments_Made__c';
import Current_Loan_Payments_Remaining from '@salesforce/schema/Proposal__c.Current_Loan_Payments_Remaining__c';
import Current_Loan_Balance_Remaining from '@salesforce/schema/Proposal__c.Current_Loan_Balance_Remaining__c';
import New_Loan_Amount from '@salesforce/schema/Proposal__c.New_Loan_Amount__c';
import New_Loan_Interest_Rate from '@salesforce/schema/Proposal__c.New_Loan_Interest_Rate__c';
import New_Loan_Term from '@salesforce/schema/Proposal__c.New_Loan_Term__c';
import New_Loan_Monthly_Payment from '@salesforce/schema/Proposal__c.New_Loan_Monthly_Payment__c';
import Monthly_Payment_Savings from '@salesforce/schema/Proposal__c.Monthly_Payment_Savings_Scenario_1__c';
import Same_Payment_Term_Reduction from '@salesforce/schema/Proposal__c.Same_Payment_Term_Reduction__c';
import Early_Payoff_Savings from '@salesforce/schema/Proposal__c.Early_Payoff_Savings__c';
import New_Loan_Payment_To_Keep_Term from '@salesforce/schema/Proposal__c.New_Loan_Payment_To_Keep_Term__c';
import Stay_On_Pace_Monthly_Savings from '@salesforce/schema/Proposal__c.Stay_On_Pace_Monthly_Savings__c';
import NewMonthsPaidifcurrentpayment from '@salesforce/schema/Proposal__c.NewMonthsPaidifcurrentpayment__c';



const SUCCESS_TITLE = 'Loan Information Saved!';
const SUCCESS_VARIANT = 'success';
const FIELDS = [
    'Proposal__c.Purpose__c'
];
const FIELDS2 = [
    'Proposal__c.RecordTypeId'
];


export default class ScenariosTabRefiProposal extends NavigationMixin(LightningElement) {
    
    Occupancy = Occupancy_Field;
    SubjectPropertyType = Subject_Property_Type_Field;
    NumberOfUnits = Number_of_Units_Field;
    EstimatedValue = Estimated_Value_Field;
    CurrentProgram = Current_Program_Field;
    CurrentBalance = Current_Balance_Field;
    CurrentRate = Current_Rate_Field;
    CurrentPayment = Current_Payment_Field;
    YearsRemainingOnCurrentLoan = Years_Remaining_on_Current_Loan_Field;
    TotalInterestRemainingOnCurrentLoanField = Total_Interest_Remaining_on_Current_Loan_Field;
    
    Purpose = PURPOSE_FIELD;

    SolidifyContact = SolidifyContact;
    Borrower_Name_Text = Borrower_Name_Text;
    X10_Yr_Treasury_Yield = X10_Yr_Treasury_Yield;

    Current_Loan_Amount = Current_Loan_Amount;
    Current_Interest_Rate = Current_Interest_Rate;
    Current_Loan_Term = Current_Loan_Term;
    Current_Loan_Monthly_Payment = Current_Loan_Monthly_Payment;
    Current_Loan_First_Payment = Current_Loan_First_Payment;
    Current_Loan_Last_Payment_Made = Current_Loan_Last_Payment_Made;
    Current_Loan_Number_Payments_Made = Current_Loan_Number_Payments_Made;
    Current_Loan_Payments_Remaining = Current_Loan_Payments_Remaining;
    Current_Loan_Balance_Remaining = Current_Loan_Balance_Remaining;
    New_Loan_Amount = New_Loan_Amount;
    New_Loan_Interest_Rate = New_Loan_Interest_Rate;
    New_Loan_Term = New_Loan_Term;
    New_Loan_Monthly_Payment = New_Loan_Monthly_Payment;
    Monthly_Payment_Savings = Monthly_Payment_Savings;
    Same_Payment_Term_Reduction = Same_Payment_Term_Reduction;
    Early_Payoff_Savings = Early_Payoff_Savings;
    New_Loan_Payment_To_Keep_Term = New_Loan_Payment_To_Keep_Term;
    Stay_On_Pace_Monthly_Savings = Stay_On_Pace_Monthly_Savings;
    NewMonthsPaidifcurrentpayment = NewMonthsPaidifcurrentpayment;

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
        /*
        if(this.purpose == "Refinance")
        return true;
        return false;
        /apex/ScenariosPDFPage?id=
        */
    }
    
    //Navigate to visualforce page
    navigateToVFPage() {
        let windowOrigin = window.location.origin;
        console.log('--windowOrigin:    '+windowOrigin);
        let generatedUrl = 'https://solidify.secure.force.com/RefinanceProposal?id=' + this.ProposalId
        window.open(generatedUrl);
    }
    
}