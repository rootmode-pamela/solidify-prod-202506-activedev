import { LightningElement, api, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import LEAD_OBJECT from '@salesforce/schema/Lead';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';

import LeadId_Field from '@salesforce/schema/Lead.Id';
import Occupancy_Field from '@salesforce/schema/Lead.Occupancy__c';
import Subject_Property_Type_Field from '@salesforce/schema/Lead.Subject_Property_Type__c';
import Number_of_Units_Field from '@salesforce/schema/Lead.Number_of_Units__c';
import Estimated_Value_Field from '@salesforce/schema/Lead.Estimated_Value__c';
import Current_Program_Field from '@salesforce/schema/Lead.Current_Program__c';
import Current_Balance_Field from '@salesforce/schema/Lead.Current_Balance__c';
import Current_Rate_Field from '@salesforce/schema/Lead.Current_Rate__c';
import Current_Payment_Field from '@salesforce/schema/Lead.Current_Payment__c';
import Years_Remaining_on_Current_Loan_Field from '@salesforce/schema/Lead.Years_Remaining_on_Current_Loan__c';
import Total_Interest_Remaining_on_Current_Loan_Field from '@salesforce/schema/Lead.Total_Interest_Remaining_on_Current_Loan__c';

import Purpose_S1 from '@salesforce/schema/Lead.Purpose_Scenario_1__c';
import Purpose_S2 from '@salesforce/schema/Lead.Purpose_Scenario_2__c';
import Purpose_S3 from '@salesforce/schema/Lead.Purpose_Scenario_3__c';

import Loan_Program_S1 from '@salesforce/schema/Lead.Loan_Program_Scenario_1__c';
import Loan_Program_S2 from '@salesforce/schema/Lead.Loan_Program_Scenario_2__c';
import Loan_Program_S3 from '@salesforce/schema/Lead.Loan_Program_Scenario_3__c';

import TermDue_S1 from '@salesforce/schema/Lead.Term_Due__c';
import TermDue_S2 from '@salesforce/schema/Lead.Term_Due_Scenario_2__c';
import TermDue_S3 from '@salesforce/schema/Lead.Term_Due_Scenario_3__c';

import LoamAmt_S1 from '@salesforce/schema/Lead.First_Loan_Amount_Scenario_1__c';
import LoamAmt_S2 from '@salesforce/schema/Lead.First_Loan_Amount_Scenario_2__c';
import LoamAmt_S3 from '@salesforce/schema/Lead.First_Loan_Amount_Scenario_3__c';

import RateScenario_S1 from '@salesforce/schema/Lead.Rate_Scenario_1__c';
import RateScenario_S2 from '@salesforce/schema/Lead.Rate_Scenario_2__c';
import RateScenario_S3 from '@salesforce/schema/Lead.Rate_Scenario_3__c';

import LTV_S1 from '@salesforce/schema/Lead.LTV_Scenario_1__c';
import LTV_S2 from '@salesforce/schema/Lead.LTV_Scenario_2__c';
import LTV_S3 from '@salesforce/schema/Lead.LTV_Scenario_3__c';

import CLTV_S1 from '@salesforce/schema/Lead.CLTV_Scenario_1__c';
import CLTV_S2 from '@salesforce/schema/Lead.CLTV_Scenario_2__c';
import CLTV_S3 from '@salesforce/schema/Lead.CLTV_Scenario_3__c';

import MonthlyPayment_S1 from '@salesforce/schema/Lead.Monthly_Payment__c';
import MonthlyPayment_S2 from '@salesforce/schema/Lead.Monthly_Payment_Scenario_2__c';
import MonthlyPayment_S3 from '@salesforce/schema/Lead.Monthly_Payment_Scenario_3__c';

import TotalInterest_S1 from '@salesforce/schema/Lead.Total_Interest_Scenario_1__c';
import TotalInterest_S2 from '@salesforce/schema/Lead.Total_Interest_Scenario_2__c';
import TotalInterest_S3 from '@salesforce/schema/Lead.Total_Interest_Scenario_3__c';

import MonthlySavings_S1 from '@salesforce/schema/Lead.Monthly_Payment_Savings__c';
import MonthlySavings_S2 from '@salesforce/schema/Lead.Monthly_Payment_Savings_Scenario_2__c';
import MonthlySavings_S3 from '@salesforce/schema/Lead.Monthly_Payment_Savings_Scenario_3__c';

import InterestSavings_S1 from '@salesforce/schema/Lead.Daily_Interest_Savings__c';
import InterestSavings_S2 from '@salesforce/schema/Lead.Daily_Interest_Savings_Scenario_2__c';
import InterestSavings_S3 from '@salesforce/schema/Lead.Daily_Interest_Savings_Scenario_3__c';

import OnPacePayment_S1 from '@salesforce/schema/Lead.On_Pace_Payment_Scenario_1__c';
import OnPacePayment_S2 from '@salesforce/schema/Lead.On_Pace_Payment_Scenario_2__c';
import OnPacePayment_S3 from '@salesforce/schema/Lead.On_Pace_Payment_Scenario_3__c';

import OnPaceSavings_S1 from '@salesforce/schema/Lead.On_Pace_Savings_Scenario_1__c';
import OnPaceSavings_S2 from '@salesforce/schema/Lead.On_Pace_Savings_Scenario_2__c';
import OnPaceSavings_S3 from '@salesforce/schema/Lead.On_Pace_Savings_Scenario_3__c';

import MaturityReduction_S1 from '@salesforce/schema/Lead.Maturity_Reduction_Scenario_1__c';
import MaturityReduction_S2 from '@salesforce/schema/Lead.Maturity_Reduction_Scenario_2__c';
import MaturityReduction_S3 from '@salesforce/schema/Lead.Maturity_Reduction_Scenario_3__c';

import LifetimeSavings_S1 from '@salesforce/schema/Lead.Lifetime_Savings_Scenario_1__c';
import LifetimeSavings_S2 from '@salesforce/schema/Lead.Lifetime_Savings_Scenario_2__c';
import LifetimeSavings_S3 from '@salesforce/schema/Lead.Lifetime_Savings_Scenario_3__c';
import PURPOSE_FIELD from '@salesforce/schema/Lead.Purpose__c';


const SUCCESS_TITLE = 'Loan Information Saved!';
const SUCCESS_VARIANT = 'success';
const FIELDS = [
    'Lead.Purpose__c'
];


export default class ScenariosTab extends NavigationMixin(LightningElement) {
    
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
    PurposeS1 = Purpose_S1;
    PurposeS2 = Purpose_S2;
    PurposeS3 = Purpose_S3;
    LoanProgramS1 = Loan_Program_S1;
    LoanProgramS2 = Loan_Program_S2;
    LoanProgramS3 = Loan_Program_S3;
    TermDueS1 = TermDue_S1;
    TermDueS2 = TermDue_S2;
    TermDueS3 = TermDue_S3;
    LoamAmtS1 = LoamAmt_S1;
    LoamAmtS2 = LoamAmt_S2;
    LoamAmtS3 = LoamAmt_S3;
    RateScenarioS1 = RateScenario_S1;
    RateScenarioS2 = RateScenario_S2;
    RateScenarioS3 = RateScenario_S3;
    LTVS1 = LTV_S1;
    LTVS2 = LTV_S2;
    LTVS3 = LTV_S3;
    CLTVS1 = CLTV_S1;
    CLTVS2 = CLTV_S2;
    CLTVS3 = CLTV_S3;
    MonthlyPaymentS1 = MonthlyPayment_S1;
    MonthlyPaymentS2 = MonthlyPayment_S2;
    MonthlyPaymentS3 = MonthlyPayment_S3;
    TotalInterestS1 = TotalInterest_S1;
    TotalInterestS2 = TotalInterest_S2;
    TotalInterestS3 = TotalInterest_S3;
    MonthlySavingsS1 = MonthlySavings_S1;
    MonthlySavingsS2 = MonthlySavings_S2;
    MonthlySavingsS3 = MonthlySavings_S3;
    InterestSavingsS1 = InterestSavings_S1;
    InterestSavingsS2 = InterestSavings_S2;
    InterestSavingsS3 = InterestSavings_S3;
    OnPacePaymentS1 = OnPacePayment_S1;
    OnPacePaymentS2 = OnPacePayment_S2;
    OnPacePaymentS3 = OnPacePayment_S3;
    OnPaceSavingsS1 = OnPaceSavings_S1;
    OnPaceSavingsS2 = OnPaceSavings_S2;
    OnPaceSavingsS3 = OnPaceSavings_S3;
    MaturityReductionS1 = MaturityReduction_S1;
    MaturityReductionS2 = MaturityReduction_S2;
    MaturityReductionS3 = MaturityReduction_S3;
    LifetimeSavingsS1 = LifetimeSavings_S1;
    LifetimeSavingsS2 = LifetimeSavings_S2;
    LifetimeSavingsS3 = LifetimeSavings_S3;
    
    
    leadId;
    LeadObject = LEAD_OBJECT;
    @api objectApiName;
    
    @api
    get recordId() {
        return this.leadId;
    }
    
    set recordId(value) {
        //sets leadId attribute
        this.setAttribute('leadId', value);
        //sets leadId assignment
        this.leadId = value;
    }
    
    @track isRefinance = true;
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS }) 
    record({ error, data }) {
        if (error) {
            console.log('***error = ' + error);
        } else if (data) {
            console.log('***objectApiName = ' + this.objectApiName);
            console.log('***data = ' + data.fields.Purpose__c.value);
            if(this.objectApiName == 'Lead'){
                console.log('@@@ data.fields.Purpose__c.value: ' + data.fields.Purpose__c.value);
                this.isRefinance = false;
                if(data.fields.Purpose__c.value == 'Refinance' || data.fields.Purpose__c.value == 'Refi_No_Cashout' || data.fields.Purpose__c.value == 'Refi_Cashout'){
                    this.isRefinance = true;
                }
            }
        }
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const fields = event.detail.fields;
        fields.Lead = this.leadId;
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
        return getFieldValue(this.leadId, PURPOSE_FIELD);
    }
    
    get isRefi() {
        console.log('@@@ this.purpose: ' + this.purpose);
        /*
        if(this.purpose == "Refinance")
        return true;
        return false;
        */
    }
    
    //Navigate to visualforce page
    navigateToVFPage() {
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__webPage',
            attributes: {
                url: '/apex/ScenariosPDFPage?id=' + this.leadId
            }
        }).then(generatedUrl => {
            window.open(generatedUrl);
        });
    }
    
}