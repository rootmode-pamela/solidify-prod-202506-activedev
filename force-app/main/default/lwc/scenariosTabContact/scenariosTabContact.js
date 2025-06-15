import { LightningElement, api, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';

import getPropertyList from '@salesforce/apex/ScenariosTabController.getPropertyList';
import getPropertyDetails from '@salesforce/apex/ScenariosTabController.getPropertyDetails';
import PROPERTY_OBJECT from '@salesforce/schema/Properties__c';

import Purpose from '@salesforce/schema/Contact.LoanComparison__c';

import Purpose_S1 from '@salesforce/schema/Contact.Purpose_Scenario_1__c';
import Purpose_S2 from '@salesforce/schema/Contact.Purpose_Scenario_2__c';
import Purpose_S3 from '@salesforce/schema/Contact.Purpose_Scenario_3__c';

import DownPaymentScenario1 from '@salesforce/schema/Contact.DownPaymentScenario1__c';
import DownPaymentScenario2 from '@salesforce/schema/Contact.DownPaymentScenario2__c';
import DownPaymentScenario3 from '@salesforce/schema/Contact.DownPaymentScenario3__c';

import Loan_Program_S1 from '@salesforce/schema/Contact.Loan_Program_Scenario_1__c';
import Loan_Program_S2 from '@salesforce/schema/Contact.Loan_Program_Scenario_2__c';
import Loan_Program_S3 from '@salesforce/schema/Contact.Loan_Program_Scenario_3__c';

import TermDue_S1 from '@salesforce/schema/Contact.Term_Due_Scenario_1__c';
import TermDue_S2 from '@salesforce/schema/Contact.Term_Due_Scenario_2__c';
import TermDue_S3 from '@salesforce/schema/Contact.Term_Due_Scenario_3__c';

import Fees_S1 from '@salesforce/schema/Contact.TotalFeesS1__c';
import Fees_S2 from '@salesforce/schema/Contact.TotalFeesS2__c';
import Fees_S3 from '@salesforce/schema/Contact.TotalFeesS3__c';

import LoamAmt_S1 from '@salesforce/schema/Contact.First_Loan_Amount_Scenario_1__c';
import LoamAmt_S2 from '@salesforce/schema/Contact.First_Loan_Amount_Scenario_2__c';
import LoamAmt_S3 from '@salesforce/schema/Contact.First_Loan_Amount_Scenario_3__c';

import RateScenario_S1 from '@salesforce/schema/Contact.Rate_Scenario_1__c';
import RateScenario_S2 from '@salesforce/schema/Contact.RateScenario2__c';
import RateScenario_S3 from '@salesforce/schema/Contact.RateScenario3__c';

import LTV_S1 from '@salesforce/schema/Contact.LTV_Scenario_1__c';
import LTV_S2 from '@salesforce/schema/Contact.LTV_Scenario_2__c';
import LTV_S3 from '@salesforce/schema/Contact.LTV_Scenario_3__c';

import CLTV_S1 from '@salesforce/schema/Contact.CLTV_Scenario_1__c';
import CLTV_S2 from '@salesforce/schema/Contact.CLTV_Scenario_2__c';
import CLTV_S3 from '@salesforce/schema/Contact.CLTV_Scenario_3__c';

import MonthlyPayment_S1 from '@salesforce/schema/Contact.Monthly_Payment_Scenario_1__c';
import MonthlyPayment_S2 from '@salesforce/schema/Contact.Monthly_Payment_Scenario_2__c';
import MonthlyPayment_S3 from '@salesforce/schema/Contact.Monthly_Payment_Scenario_3__c';

import EstTaxesS1 from '@salesforce/schema/Contact.EstimatedTaxesScenario1__c';
import EstTaxesS2 from '@salesforce/schema/Contact.EstimatedTaxesScenario2__c';
import EstTaxesS3 from '@salesforce/schema/Contact.EstimatedTaxesScenario3__c';

import EstInsuranceS1 from '@salesforce/schema/Contact.EstimatedInsuranceScenario1__c';
import EstInsuranceS2 from '@salesforce/schema/Contact.EstimatedInsuranceScenario2__c';
import EstInsuranceS3 from '@salesforce/schema/Contact.EstimatedInsuranceScenario3__c';

import EstMtgInsuranceS1 from '@salesforce/schema/Contact.EstimatedMortgageInsuranceScenario1__c';
import EstMtgInsuranceS2 from '@salesforce/schema/Contact.EstimatedMortgageInsuranceScenario2__c';
import EstMtgInsuranceS3 from '@salesforce/schema/Contact.EstimatedMortgageInsuranceScenario3__c';

import EstHoaS1 from '@salesforce/schema/Contact.EstimatedHOAScenario1__c';
import EstHoaS2 from '@salesforce/schema/Contact.EstimatedHOAScenario2__c';
import EstHoaS3 from '@salesforce/schema/Contact.EstimatedHOAScenario3__c';

import TotalMonthlyPaymentS1 from '@salesforce/schema/Contact.TotalMonthlyPaymentScenario1__c';
import TotalMonthlyPaymentS2 from '@salesforce/schema/Contact.TotalMonthlyPaymentScenario2__c';
import TotalMonthlyPaymentS3 from '@salesforce/schema/Contact.TotalMonthlyPaymentScenario3__c';

import TotalInterest_S1 from '@salesforce/schema/Contact.Total_Interest_Scenario_1__c';
import TotalInterest_S2 from '@salesforce/schema/Contact.Total_Interest_Scenario_2__c';
import TotalInterest_S3 from '@salesforce/schema/Contact.Total_Interest_Scenario_3__c';

import EstimatedFundstoCloseScenario1 from '@salesforce/schema/Contact.EstimatedFundstoCloseScenario1__c';
import EstimatedFundstoCloseScenario2 from '@salesforce/schema/Contact.EstimatedFundstoCloseScenario2__c';
import EstimatedFundstoCloseScenario3 from '@salesforce/schema/Contact.EstimatedFundstoCloseScenario3__c';

import MonthlySavings_S1 from '@salesforce/schema/Contact.Monthly_Payment_Savings_Scenario_1__c';
import MonthlySavings_S2 from '@salesforce/schema/Contact.Monthly_Payment_Savings_Scenario_2__c';
import MonthlySavings_S3 from '@salesforce/schema/Contact.Monthly_Payment_Savings_Scenario_3__c';

import InterestSavings_S1 from '@salesforce/schema/Contact.Daily_Interest_Savings_Scenario_1__c';
import InterestSavings_S2 from '@salesforce/schema/Contact.Daily_Interest_Savings_Scenario_2__c';
import InterestSavings_S3 from '@salesforce/schema/Contact.Daily_Interest_Savings_Scenario_3__c';

import OnPacePayment_S1 from '@salesforce/schema/Contact.On_Pace_Payment_Scenario_1__c';
import OnPacePayment_S2 from '@salesforce/schema/Contact.On_Pace_Payment_Scenario_2__c';
import OnPacePayment_S3 from '@salesforce/schema/Contact.On_Pace_Payment_Scenario_3__c';

import OnPaceSavings_S1 from '@salesforce/schema/Contact.On_Pace_Savings_Scenario_1__c';
import OnPaceSavings_S2 from '@salesforce/schema/Contact.On_Pace_Savings_Scenario_2__c';
import OnPaceSavings_S3 from '@salesforce/schema/Contact.On_Pace_Savings_Scenario_3__c';

import MaturityReduction_S1 from '@salesforce/schema/Contact.Maturity_Reduction_Scenario_1__c';
import MaturityReduction_S2 from '@salesforce/schema/Contact.Maturity_Reduction_Scenario_2__c';
import MaturityReduction_S3 from '@salesforce/schema/Contact.Maturity_Reduction_Scenario_3__c';

import LifetimeSavings_S1 from '@salesforce/schema/Contact.Lifetime_Savings_Scenario_1__c';
import LifetimeSavings_S2 from '@salesforce/schema/Contact.Lifetime_Savings_Scenario_2__c';
import LifetimeSavings_S3 from '@salesforce/schema/Contact.Lifetime_Savings_Scenario_3__c';

import PropertyField from '@salesforce/schema/Contact.SelectedProperty__c';
import PropertyOccupancy from '@salesforce/schema/Contact.PropertyOccupancy__c';
import PropertyType from '@salesforce/schema/Contact.PropertyType__c';
import PropertyNumberofUnits from '@salesforce/schema/Contact.PropertyNumberofUnits__c';
import PropertyEstimatedValue from '@salesforce/schema/Contact.PropertyEstimatedValue__c';
import PropertyPurpose from '@salesforce/schema/Contact.PropertyPurpose__c';
import PropertyPurchasePrice from '@salesforce/schema/Contact.PropertyPurchasePrice__c';
import PropertyAppraisedValue from '@salesforce/schema/Contact.PropertyAppraisedValue__c';
import PropertyLoanAmountwithMIP from '@salesforce/schema/Contact.PropertyLoanAmountwithMIP__c';
import PropertyLTV from '@salesforce/schema/Contact.PropertyLTV__c';
import PropertyMostRecentClosing from '@salesforce/schema/Contact.PropertyMostRecentClosing__c';
import PropertyDayssinceRecentClosing from '@salesforce/schema/Contact.PropertyDayssinceRecentClosing__c';
import PropertyLender from '@salesforce/schema/Contact.PropertyLender__c';
import PropertyLoanProgram from '@salesforce/schema/Contact.PropertyLoanProgram__c';
import PropertyRate from '@salesforce/schema/Contact.PropertyRate__c';
import PropertyScheduledBalance from '@salesforce/schema/Contact.PropertyScheduledBalance__c';
import PropertyPaymentAmount from '@salesforce/schema/Contact.PropertyPaymentAmount__c';
import DiscountCreditS1 from '@salesforce/schema/Contact.DiscountCreditS1__c';
import LenderFeeS1 from '@salesforce/schema/Contact.LenderFeeS1__c';
import AppraisalFeeS1 from '@salesforce/schema/Contact.AppraisalFeeS1__c';
import CreditReportFeeS1 from '@salesforce/schema/Contact.CreditReportFeeS1__c';
import EscrowFeesS1 from '@salesforce/schema/Contact.EscrowFeesS1__c';
import TitleFeeS1 from '@salesforce/schema/Contact.TitleFeeS1__c';
import RecordingFeeS1 from '@salesforce/schema/Contact.RecordingFeeS1__c';

import DiscountCreditS2 from '@salesforce/schema/Contact.DiscountCreditS2__c';
import LenderFeeS2 from '@salesforce/schema/Contact.LenderFeeS2__c';
import AppraisalFeeS2 from '@salesforce/schema/Contact.AppraisalFeeS2__c';
import CreditReportFeeS2 from '@salesforce/schema/Contact.CreditReportFeeS2__c';
import EscrowFeesS2 from '@salesforce/schema/Contact.EscrowFeesS2__c';
import TitleFeeS2 from '@salesforce/schema/Contact.TitleFeeS2__c';
import RecordingFeeS2 from '@salesforce/schema/Contact.RecordingFeeS2__c';

import DiscountCreditS3 from '@salesforce/schema/Contact.DiscountCreditS3__c';
import LenderFeeS3 from '@salesforce/schema/Contact.LenderFeeS3__c';
import AppraisalFeeS3 from '@salesforce/schema/Contact.AppraisalFeeS3__c';
import CreditReportFeeS3 from '@salesforce/schema/Contact.CreditReportFeeS3__c';
import EscrowFeesS3 from '@salesforce/schema/Contact.EscrowFeesS3__c';
import TitleFeeS3 from '@salesforce/schema/Contact.TitleFeeS3__c';
import RecordingFeeS3 from '@salesforce/schema/Contact.RecordingFeeS3__c';

import UFMIPFFS1 from '@salesforce/schema/Contact.UFMIPFFS1__c';
import UFMIPFFS2 from '@salesforce/schema/Contact.UFMIPFFS2__c';
import UFMIPFFS3 from '@salesforce/schema/Contact.UFMIPFFS3__c';

import CancelMIAtS1 from '@salesforce/schema/Contact.CancelMIAtS1__c';
import CancelMIAtS2 from '@salesforce/schema/Contact.CancelMIAtS2__c';
import CancelMIAtS3 from '@salesforce/schema/Contact.CancelMIAtS3__c';

import SolidifyContact from '@salesforce/schema/Contact.SolidifyContact__c';
import CopytoS1And2 from '@salesforce/schema/Contact.CopytoScenarios2and3__c';

import createProposalButtonMethod from '@salesforce/apex/ScenarioTabLeadCont.createProposalButtonMethod';

const SUCCESS_TITLE = 'Loan Information Saved!';
const SUCCESS_VARIANT = 'success';
const FIELDS = [
    'Contact.LoanComparison__c',
    'Contact.Loan_Program_Scenario_1__c',
    'Contact.Loan_Program_Scenario_2__c',
    'Contact.Loan_Program_Scenario_3__c',
    'Contact.LTV_Scenario_1__c',
    'Contact.LTV_Scenario_2__c',
    'Contact.LTV_Scenario_3__c'
];


const generateArray = (result) => {
    var array_items = [];
    for(let i = 0; i < result.length; i++)  {
        console.log(result[i].Name);
        var item = {
            label: result[i].Name,
            value: result[i].Id
        };
        array_items = [ ...array_items, item];   
    }
    
    return array_items;
}


export default class ScenariosTab extends NavigationMixin(LightningElement) {
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
    Property = PropertyField;
    Occupancy = PropertyOccupancy;
    PType = PropertyType;
    PNumberOfUnits = PropertyNumberofUnits;
    PEstimatedValue = PropertyEstimatedValue;
    PPurpose = PropertyPurpose;
    PPurchasePrice = PropertyPurchasePrice;
    PAppraisedValue = PropertyAppraisedValue;
    PLoanAmountwithMIP = PropertyLoanAmountwithMIP;
    PLTV = PropertyLTV;
    PMostRecentClosing = PropertyMostRecentClosing;
    PDayssinceRecentClosing = PropertyDayssinceRecentClosing;
    PLender = PropertyLender;
    PLoanProgram = PropertyLoanProgram;
    PRate = PropertyRate;
    PScheduledBalance = PropertyScheduledBalance;
    PPaymentAmount = PropertyPaymentAmount;

    PropertyObject = PROPERTY_OBJECT;

    Purpose = Purpose;

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
    
    @track estimatedV;
    @track CurrentPropertyRate;
    @track CurrentPropertyBalance;
    @track CurrentPropertyPayments;

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

    
    contactId;
    ContactObject = CONTACT_OBJECT;
    
    @api
    get recordId() {
        return this.contactId;
    }
    
    set recordId(value) {
        //sets contactId attribute
        this.setAttribute('contactId', value);
        //sets contactId assignment
        this.contactId = value;
    }
    
    
    @api objectApiName;
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
            console.log('***data = ' + data.fields.LoanComparison__c.value);
            if(this.objectApiName == 'Contact'){
                console.log('@@@ data.fields.LoanComparison__c.value: ' + data.fields.LoanComparison__c.value);
                this.isRefinance = false;
                this.isUFMIP1 = false;
                this.isCancel1 = false;
                this.isUFMIP2 = false;
                this.isCancel2 = false;
                this.isUFMIP3 = false;
                this.isCancel3 = false;
                if(data.fields.LoanComparison__c.value !== null){
                    if(data.fields.LoanComparison__c.value == 'Refinance'){
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
        fields.Contact = this.contactId;
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
    
    purposeOptions = [
        {value: 'Refinance', label: 'Refinance'},
        {value: 'Purchase', label: 'Purchase'}
    ];

    value = 'Refinance';
    @track isRefinance = true;

    handlePick(event) {
        // Get the string of the "value" attribute on the selected option
        this.value = event.detail.value;
        if (event.detail.value == 'Purchase') {
            this.isRefinance = false;
        } else if(event.detail.value == 'Refinance'){
            this.isRefinance = true;
        }
        console.log("isRefinance = "+this.isRefinance)
    }
    
    propertyItems = [];
    property;
    @track showDetails = false;
    @track selectedProperty;

    handleChange(event) {
        /*this.property = event.detail.value;
        this.getFields();
        //this.showDetails = true;
        console.log("OnPacePaymentS1 = " + this.OnPacePaymentS1);*/
        event.preventDefault();
        const fields = event.detail.fields;
        fields.Contact = this.contactId;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }
    navigateToVFPage() {
        let windowOrigin = window.location.origin;
        console.log('--windowOrigin:    '+windowOrigin);
        let generatedUrl = 'https://solidify.secure.force.com/ContactLoanComparison?id=' + this.contactId
        //let generatedUrl = 'https://lightning-solidify.cs191.force.com/ContactLoanComparison?id=' + this.contactId
        window.open(generatedUrl);
    }
    createProp() {
        console.log('@@@ createProp: ' + this.contactId);
        createProposalButtonMethod({ leadId: this.contactId })
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