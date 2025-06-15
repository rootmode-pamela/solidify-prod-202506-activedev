import { LightningElement, api, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import SCENARIO_OBJECT from '@salesforce/schema/Scenario__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';

import ScenarioId_Field from '@salesforce/schema/Scenario__c.Id';
import Occupancy_Field from '@salesforce/schema/Scenario__c.Occupancy__c';
import Subject_Property_Type_Field from '@salesforce/schema/Scenario__c.Subject_Property_Type__c';
import Number_of_Units_Field from '@salesforce/schema/Scenario__c.Number_of_Units__c';
import Estimated_Value_Field from '@salesforce/schema/Scenario__c.Estimated_Value__c';
import Current_Program_Field from '@salesforce/schema/Scenario__c.Current_Program__c';
import Current_Balance_Field from '@salesforce/schema/Scenario__c.Current_Balance__c';
import Current_Rate_Field from '@salesforce/schema/Scenario__c.Current_Rate__c';
import Current_Payment_Field from '@salesforce/schema/Scenario__c.Current_Payment__c';
import Years_Remaining_on_Current_Loan_Field from '@salesforce/schema/Scenario__c.Years_Remaining_on_Current_Loan__c';
import Total_Interest_Remaining_on_Current_Loan_Field from '@salesforce/schema/Scenario__c.Total_Interest_Remaining_on_Current_Loan__c';

import PURPOSE_FIELD from '@salesforce/schema/Scenario__c.Purpose__c';

import Purpose_S1 from '@salesforce/schema/Scenario__c.Purpose_Scenario_1__c';
import Purpose_S2 from '@salesforce/schema/Scenario__c.Purpose_Scenario_2__c';
import Purpose_S3 from '@salesforce/schema/Scenario__c.Purpose_Scenario_3__c';

import DownPaymentScenario1 from '@salesforce/schema/Scenario__c.DownpaymentScenario1__c';
import DownPaymentScenario2 from '@salesforce/schema/Scenario__c.DownpaymentScenario2__c';
import DownPaymentScenario3 from '@salesforce/schema/Scenario__c.DownpaymentScenario3__c';

import Loan_Program_S1 from '@salesforce/schema/Scenario__c.Loan_Program_Scenario_1__c';
import Loan_Program_S2 from '@salesforce/schema/Scenario__c.Loan_Program_Scenario_2__c';
import Loan_Program_S3 from '@salesforce/schema/Scenario__c.Loan_Program_Scenario_3__c';

import TermDue_S1 from '@salesforce/schema/Scenario__c.Term_Due__c';
import TermDue_S2 from '@salesforce/schema/Scenario__c.Term_Due_Scenario_2__c';
import TermDue_S3 from '@salesforce/schema/Scenario__c.Term_Due_Scenario_3__c';

import Fees_S1 from '@salesforce/schema/Scenario__c.TotalFeesS1__c';
import Fees_S2 from '@salesforce/schema/Scenario__c.TotalFeesS2__c';
import Fees_S3 from '@salesforce/schema/Scenario__c.TotalFeesS3__c';

import LoamAmt_S1 from '@salesforce/schema/Scenario__c.First_Loan_Amount_Scenario_1__c';
import LoamAmt_S2 from '@salesforce/schema/Scenario__c.First_Loan_Amount_Scenario_2__c';
import LoamAmt_S3 from '@salesforce/schema/Scenario__c.First_Loan_Amount_Scenario_3__c';

import RateScenario_S1 from '@salesforce/schema/Scenario__c.Rate_Scenario_1__c';
import RateScenario_S2 from '@salesforce/schema/Scenario__c.Rate_Scenario_2__c';
import RateScenario_S3 from '@salesforce/schema/Scenario__c.Rate_Scenario_3__c';

import LTV_S1 from '@salesforce/schema/Scenario__c.LTV_Scenario_1__c';
import LTV_S2 from '@salesforce/schema/Scenario__c.LTV_Scenario_2__c';
import LTV_S3 from '@salesforce/schema/Scenario__c.LTV_Scenario_3__c';

import CLTV_S1 from '@salesforce/schema/Scenario__c.CLTV_Scenario_1__c';
import CLTV_S2 from '@salesforce/schema/Scenario__c.CLTV_Scenario_2__c';
import CLTV_S3 from '@salesforce/schema/Scenario__c.CLTV_Scenario_3__c';

import MonthlyPayment_S1 from '@salesforce/schema/Scenario__c.Monthly_Payment_Scenario_1__c';
import MonthlyPayment_S2 from '@salesforce/schema/Scenario__c.Monthly_Payment_Scenario_2__c';
import MonthlyPayment_S3 from '@salesforce/schema/Scenario__c.Monthly_Payment_Scenario_3__c';

import EstTaxesS1 from '@salesforce/schema/Scenario__c.EstimatedTaxesScenario1__c';
import EstTaxesS2 from '@salesforce/schema/Scenario__c.EstimatedTaxesScenario2__c';
import EstTaxesS3 from '@salesforce/schema/Scenario__c.EstimatedTaxesScenario3__c';

import EstInsuranceS1 from '@salesforce/schema/Scenario__c.EstimatedInsuranceScenario1__c';
import EstInsuranceS2 from '@salesforce/schema/Scenario__c.EstimatedInsuranceScenario2__c';
import EstInsuranceS3 from '@salesforce/schema/Scenario__c.EstimatedInsuranceScenario3__c';

import EstMtgInsuranceS1 from '@salesforce/schema/Scenario__c.EstimatedMortgageInsuranceScenario1__c';
import EstMtgInsuranceS2 from '@salesforce/schema/Scenario__c.EstimatedMortgageInsuranceScenario2__c';
import EstMtgInsuranceS3 from '@salesforce/schema/Scenario__c.EstimatedMortgageInsuranceScenario3__c';

import EstHoaS1 from '@salesforce/schema/Scenario__c.EstimatedHOAScenario1__c';
import EstHoaS2 from '@salesforce/schema/Scenario__c.EstimatedHOAScenario2__c';
import EstHoaS3 from '@salesforce/schema/Scenario__c.EstimatedHOAScenario3__c';

import TotalMonthlyPaymentS1 from '@salesforce/schema/Scenario__c.TotalMonthlyPaymentScenario1__c';
import TotalMonthlyPaymentS2 from '@salesforce/schema/Scenario__c.TotalMonthlyPaymentScenario2__c';
import TotalMonthlyPaymentS3 from '@salesforce/schema/Scenario__c.TotalMonthlyPaymentScenario3__c';

import TotalInterest_S1 from '@salesforce/schema/Scenario__c.Total_Interest_Scenario_1__c';
import TotalInterest_S2 from '@salesforce/schema/Scenario__c.Total_Interest_Scenario_2__c';
import TotalInterest_S3 from '@salesforce/schema/Scenario__c.Total_Interest_Scenario_3__c';

import EstimatedFundstoCloseScenario1 from '@salesforce/schema/Scenario__c.EstimatedFundsToCloseScenario1__c';
import EstimatedFundstoCloseScenario2 from '@salesforce/schema/Scenario__c.EstimatedFundsToCloseScenario2__c';
import EstimatedFundstoCloseScenario3 from '@salesforce/schema/Scenario__c.EstimatedFundsToCloseScenario3__c';

import MonthlySavings_S1 from '@salesforce/schema/Scenario__c.Monthly_Payment_Savings_Scenario_1__c';
import MonthlySavings_S2 from '@salesforce/schema/Scenario__c.Monthly_Payment_Savings_Scenario_2__c';
import MonthlySavings_S3 from '@salesforce/schema/Scenario__c.Monthly_Payment_Savings_Scenario_3__c';

import InterestSavings_S1 from '@salesforce/schema/Scenario__c.Daily_Interest_Savings_Scenario_1__c';
import InterestSavings_S2 from '@salesforce/schema/Scenario__c.Daily_Interest_Savings_Scenario_2__c';
import InterestSavings_S3 from '@salesforce/schema/Scenario__c.Daily_Interest_Savings_Scenario_3__c';

import OnPacePayment_S1 from '@salesforce/schema/Scenario__c.On_Pace_Payment_Scenario_1__c';
import OnPacePayment_S2 from '@salesforce/schema/Scenario__c.On_Pace_Payment_Scenario_2__c';
import OnPacePayment_S3 from '@salesforce/schema/Scenario__c.On_Pace_Payment_Scenario_3__c';

import OnPaceSavings_S1 from '@salesforce/schema/Scenario__c.On_Pace_Savings_Scenario_1__c';
import OnPaceSavings_S2 from '@salesforce/schema/Scenario__c.On_Pace_Savings_Scenario_2__c';
import OnPaceSavings_S3 from '@salesforce/schema/Scenario__c.On_Pace_Savings_Scenario_3__c';

import MaturityReduction_S1 from '@salesforce/schema/Scenario__c.Maturity_Reduction_Scenario_1__c';
import MaturityReduction_S2 from '@salesforce/schema/Scenario__c.Maturity_Reduction_Scenario_2__c';
import MaturityReduction_S3 from '@salesforce/schema/Scenario__c.Maturity_Reduction_Scenario_3__c';

import LifetimeSavings_S1 from '@salesforce/schema/Scenario__c.Lifetime_Savings_Scenario_1__c';
import LifetimeSavings_S2 from '@salesforce/schema/Scenario__c.Lifetime_Savings_Scenario_2__c';
import LifetimeSavings_S3 from '@salesforce/schema/Scenario__c.Lifetime_Savings_Scenario_3__c';

import DiscountCreditS1 from '@salesforce/schema/Scenario__c.DiscountCreditS1__c';
import LenderFeeS1 from '@salesforce/schema/Scenario__c.LenderFeeS1__c';
import AppraisalFeeS1 from '@salesforce/schema/Scenario__c.AppraisalFeeS1__c';
import CreditReportFeeS1 from '@salesforce/schema/Scenario__c.CreditReportFeeS1__c';
import EscrowFeesS1 from '@salesforce/schema/Scenario__c.EscrowFeesS1__c';
import TitleFeeS1 from '@salesforce/schema/Scenario__c.TitleFeeS1__c';
import RecordingFeeS1 from '@salesforce/schema/Scenario__c.RecordingFeeS1__c';

import DiscountCreditS2 from '@salesforce/schema/Scenario__c.DiscountCreditS2__c';
import LenderFeeS2 from '@salesforce/schema/Scenario__c.LenderFeeS2__c';
import AppraisalFeeS2 from '@salesforce/schema/Scenario__c.AppraisalFeeS2__c';
import CreditReportFeeS2 from '@salesforce/schema/Scenario__c.CreditReportFeeS2__c';
import EscrowFeesS2 from '@salesforce/schema/Scenario__c.EscrowFeesS2__c';
import TitleFeeS2 from '@salesforce/schema/Scenario__c.TitleFeeS2__c';
import RecordingFeeS2 from '@salesforce/schema/Scenario__c.RecordingFeeS2__c';

import DiscountCreditS3 from '@salesforce/schema/Scenario__c.DiscountCreditS3__c';
import LenderFeeS3 from '@salesforce/schema/Scenario__c.LenderFeeS3__c';
import AppraisalFeeS3 from '@salesforce/schema/Scenario__c.AppraisalFeeS3__c';
import CreditReportFeeS3 from '@salesforce/schema/Scenario__c.CreditReportFeeS3__c';
import EscrowFeesS3 from '@salesforce/schema/Scenario__c.EscrowFeesS3__c';
import TitleFeeS3 from '@salesforce/schema/Scenario__c.TitleFeeS3__c';
import RecordingFeeS3 from '@salesforce/schema/Scenario__c.RecordingFeeS3__c';

import UFMIPFFS1 from '@salesforce/schema/Scenario__c.UFMIPFFS1__c';
import UFMIPFFS2 from '@salesforce/schema/Scenario__c.UFMIPFFS2__c';
import UFMIPFFS3 from '@salesforce/schema/Scenario__c.UFMIPFFS3__c';

import CancelMIAtS1 from '@salesforce/schema/Scenario__c.CancelMIAtS1__c';
import CancelMIAtS2 from '@salesforce/schema/Scenario__c.CancelMIAtS2__c';
import CancelMIAtS3 from '@salesforce/schema/Scenario__c.CancelMIAtS3__c';

import Select_Scenario1 from '@salesforce/schema/Scenario__c.Select_Scenario1__c';
import Select_Scenario2 from '@salesforce/schema/Scenario__c.Select_Scenario2__c';
import Select_Scenario3 from '@salesforce/schema/Scenario__c.Select_Scenario3__c';

import SolidifyContact from '@salesforce/schema/Scenario__c.SolidifyContact__c';
import CopytoS1And2 from '@salesforce/schema/Scenario__c.CopyToScenarios2And3__c';

import createProposalButtonMethod from '@salesforce/apex/scenario.createProposalButtonMethod';

const SUCCESS_TITLE = 'Information Saved!';
const SUCCESS_VARIANT = 'success';
const FIELDS = [
    'Scenario__c.Purpose__c',
    'Scenario__c.Loan_Program_Scenario_1__c',
    'Scenario__c.Loan_Program_Scenario_2__c',
    'Scenario__c.Loan_Program_Scenario_3__c',
    'Scenario__c.LTV_Scenario_1__c',
    'Scenario__c.LTV_Scenario_2__c',
    'Scenario__c.LTV_Scenario_3__c'
];


export default class scenario extends NavigationMixin(LightningElement) {

    SolidifyContact = SolidifyContact;
    CopytoS1And2 = CopytoS1And2;

    UFMIPFFS1 = UFMIPFFS1;
    UFMIPFFS2 = UFMIPFFS2;
    UFMIPFFS3 = UFMIPFFS3;
    CancelMIAtS1 = CancelMIAtS1;
    CancelMIAtS2 = CancelMIAtS2;
    CancelMIAtS3 = CancelMIAtS3;
    
    DiscountCreditS1 = DiscountCreditS1;
    LenderFeeS1 = LenderFeeS1;
    AppraisalFeeS1 = AppraisalFeeS1;
    CreditReportFeeS1 = CreditReportFeeS1;
    EscrowFeesS1 = EscrowFeesS1;
    TitleFeeS1 = TitleFeeS1;
    RecordingFeeS1 = RecordingFeeS1;

    DiscountCreditS2 = DiscountCreditS2;
    LenderFeeS2 = LenderFeeS2;
    AppraisalFeeS2 = AppraisalFeeS2;
    CreditReportFeeS2 = CreditReportFeeS2;
    EscrowFeesS2 = EscrowFeesS2;
    TitleFeeS2 = TitleFeeS2;
    RecordingFeeS2 = RecordingFeeS2;

    DiscountCreditS3 = DiscountCreditS3;
    LenderFeeS3 = LenderFeeS3;
    AppraisalFeeS3 = AppraisalFeeS3;
    CreditReportFeeS3 = CreditReportFeeS3;
    EscrowFeesS3 = EscrowFeesS3;
    TitleFeeS3 = TitleFeeS3;
    RecordingFeeS3 = RecordingFeeS3;
    
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
    
    DwnPaymentS1 = DownPaymentScenario1;
    DwnPaymentS2 = DownPaymentScenario2;
    DwnPaymentS3 = DownPaymentScenario3;
    PurposeS1 = Purpose_S1;
    PurposeS2 = Purpose_S2;
    PurposeS3 = Purpose_S3;
    LoanProgramS1 = Loan_Program_S1;
    LoanProgramS2 = Loan_Program_S2;
    LoanProgramS3 = Loan_Program_S3;
    TermDueS1 = TermDue_S1;
    TermDueS2 = TermDue_S2;
    TermDueS3 = TermDue_S3;
    FeesS1 = Fees_S1;
    FeesS2 = Fees_S2;
    FeesS3 = Fees_S3;
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
    EstimatedTaxS1 = EstTaxesS1;
    EstimatedTaxS2 = EstTaxesS2;
    EstimatedTaxS3 = EstTaxesS3;
    EstimatedInsuranceS1 = EstInsuranceS1;
    EstimatedInsuranceS2 = EstInsuranceS2;
    EstimatedInsuranceS3 = EstInsuranceS3;
    EstMortgageInsuranceS1 = EstMtgInsuranceS1;
    EstMortgageInsuranceS2 = EstMtgInsuranceS2;
    EstMortgageInsuranceS3 = EstMtgInsuranceS3;
    EstimatedHoaS1 = EstHoaS1;
    EstimatedHoaS2 = EstHoaS2;
    EstimatedHoaS3 = EstHoaS3;
    TotalMonthPayS1 = TotalMonthlyPaymentS1;
    TotalMonthPayS2 = TotalMonthlyPaymentS2;
    TotalMonthPayS3 = TotalMonthlyPaymentS3;
    TotalInterestS1 = TotalInterest_S1;
    TotalInterestS2 = TotalInterest_S2;
    TotalInterestS3 = TotalInterest_S3;
    EstFunds2CloseS1 = EstimatedFundstoCloseScenario1;
    EstFunds2CloseS2 = EstimatedFundstoCloseScenario2;
    EstFunds2CloseS3 = EstimatedFundstoCloseScenario3;
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
    Select_Scenario1 = Select_Scenario1;
    Select_Scenario2 = Select_Scenario2;
    Select_Scenario3 = Select_Scenario3;
    
    
    scenarioId;
    leadId;
    ScenarioObject = SCENARIO_OBJECT;
    @api objectApiName;
    
    @api
    get recordId() {
        return this.scenarioId;
    }
    
    set recordId(value) {
        //sets scenarioId attribute
        this.setAttribute('scenarioId', value);
        //sets scenarioId assignment
        this.scenarioId = value;
    }
    
    @track isRefinance = true;
    @track isUFMIP1 = true;
    @track isCancel1 = true;
    @track isUFMIP2 = true;
    @track isCancel2 = true;
    @track isUFMIP3 = true;
    @track isCancel3 = true;
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS }) 
    record({ error, data }) {
        if (error) {
            console.log('***error = ' + error);
        } else if (data) {
            console.log('***objectApiName = ' + this.objectApiName);
            console.log('***data = ' + data.fields.Purpose__c.value);
            if(this.objectApiName == 'Scenario__c'){
                console.log('@@@ data.fields.Purpose__c.value: ' + data.fields.Purpose__c.value);
                this.isRefinance = false;
                this.isUFMIP1 = false;
                this.isCancel1 = false;
                this.isUFMIP2 = false;
                this.isCancel2 = false;
                this.isUFMIP3 = false;
                this.isCancel3 = false;
                if(data.fields.Purpose__c.value !== null){
                    if(data.fields.Purpose__c.value == 'Refinance' || data.fields.Purpose__c.value == 'Refinance - No Cash Out' || data.fields.Purpose__c.value == 'Refinance - Cash Out'){
                        this.isRefinance = true;
                    }}
                if(data.fields.Loan_Program_Scenario_1__c.value !== null){
                    if(data.fields.Loan_Program_Scenario_1__c.value.includes("FHA") || data.fields.Loan_Program_Scenario_1__c.value.includes("VA")){
                        this.isUFMIP1 = true;
                    }}
                if(data.fields.Loan_Program_Scenario_2__c.value !== null){
                    if(data.fields.Loan_Program_Scenario_2__c.value.includes("FHA") || data.fields.Loan_Program_Scenario_2__c.value.includes("VA")){
                        this.isUFMIP2 = true;
                    }}
                if(data.fields.Loan_Program_Scenario_3__c.value !== null){
                    if(data.fields.Loan_Program_Scenario_3__c.value.includes("FHA") || data.fields.Loan_Program_Scenario_3__c.value.includes("VA")){
                        this.isUFMIP3 = true;
                    }}
                if(data.fields.LTV_Scenario_1__c.value > 80){
                    this.isCancel1 = true;
                }
                if(data.fields.LTV_Scenario_2__c.value > 80){
                    this.isCancel2 = true;
                }
                if(data.fields.LTV_Scenario_3__c.value > 80){
                    this.isCancel3 = true;
                }
            }
        }
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const fields = event.detail.fields;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
        
    }
    handleSuccess(event) {
        // TODO: dispatch the custom event and show the success message
        this.scenarioId = event.detail.id;
        this.dispatchEvent(new ShowToastEvent({
            title: SUCCESS_TITLE,
            variant: SUCCESS_VARIANT
        }))
        this.dispatchEvent(new CustomEvent('createreview', { detail: {} }));
    }
    
    @api
    get purpose() {
        return getFieldValue(this.scenarioId, PURPOSE_FIELD);
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
        let generatedUrl = 'https://solidify.secure.force.com/ComparisonCalculator?id=' + this.scenarioId //FOR PROD
        //let generatedUrl = 'https://lightning-solidify.cs191.force.com/ComparisonCalculator?id=' + this.scenarioId //FOR DEV
        window.open(generatedUrl);
        /*&this[NavigationMixin.GenerateUrl]({
            type: 'standard__webPage',
            attributes: {
                //url: 'https://lightning-solidify.cs191.force.com/ComparisonCalculator?id=' + this.scenarioId
                url: 'https://lightning-solidify.cs191.force.com/Solidify_Comparison_Calculator?id=' + this.scenarioId
            }
        }).then(generatedUrl => {
            console.log('--generatedUrl:    '+generatedUrl);
            window.open(generatedUrl);
        });*/
    }

    createProp() {
        console.log('@@@ createProp: ' + this.scenarioId);
        createProposalButtonMethod({ leadId: this.scenarioId })
            .then(result => {
                console.log('@@@ result proposalId: ' + result);
                let newProposalURL = '/' + result;
                window.open(newProposalURL);
            })
            .catch(error => {
                this.error = error;
            });
    }

}