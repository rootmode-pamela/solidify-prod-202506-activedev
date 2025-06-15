import { LightningElement, api, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import PROPOSAL_OBJECT from '@salesforce/schema/Proposal__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord, getRecordCreateDefaults, generateRecordInputForCreate, getRecord, getFieldValue } from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';
import getRecordDataProp from '@salesforce/apex/SolidifyComparisonController.getRecordDataProp';

/** Apex methods from SampleLookupController */
import search from '@salesforce/apex/LookupController.search';
import getRecentlyViewed from '@salesforce/apex/LookupController.getRecentlyViewed';

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
import PropLead from '@salesforce/schema/Proposal__c.Borrower_Lead__c';
import PropContact from '@salesforce/schema/Proposal__c.Borrower__c';
import PropLoan from '@salesforce/schema/Proposal__c.Most_Recent_Loan__c';

import Scenario1Name from '@salesforce/schema/Proposal__c.Scenario1Name__c';
import Scenario2Name from '@salesforce/schema/Proposal__c.Scenario2Name__c';
import Scenario3Name from '@salesforce/schema/Proposal__c.Scenario3Name__c';
import Purpose_S1 from '@salesforce/schema/Proposal__c.Purpose_Scenario_1__c';
import Purpose_S2 from '@salesforce/schema/Proposal__c.Purpose_Scenario_2__c';
import Purpose_S3 from '@salesforce/schema/Proposal__c.Purpose_Scenario_3__c';
import DownPaymentScenario1 from '@salesforce/schema/Proposal__c.DownPaymentScenario1__c';
import DownPaymentScenario2 from '@salesforce/schema/Proposal__c.DownPaymentScenario2__c';
import DownPaymentScenario3 from '@salesforce/schema/Proposal__c.DownPaymentScenario3__c';
import Loan_Program_S1 from '@salesforce/schema/Proposal__c.Loan_Program_Scenario_1__c';
import Loan_Program_S2 from '@salesforce/schema/Proposal__c.Loan_Program_Scenario_2__c';
import Loan_Program_S3 from '@salesforce/schema/Proposal__c.Loan_Program_Scenario_3__c';
import TermDue_S1 from '@salesforce/schema/Proposal__c.Term_Due_Scenario_1__c';
import TermDue_S2 from '@salesforce/schema/Proposal__c.Term_Due_Scenario_2__c';
import TermDue_S3 from '@salesforce/schema/Proposal__c.Term_Due_Scenario_3__c';
import Fees_S1 from '@salesforce/schema/Proposal__c.FeeScenario1__c';
import Fees_S2 from '@salesforce/schema/Proposal__c.FeeScenario2__c';
import Fees_S3 from '@salesforce/schema/Proposal__c.FeeScenario3__c';
import LoamAmt_S1 from '@salesforce/schema/Proposal__c.First_Loan_Amount_Scenario_1__c';
import LoamAmt_S2 from '@salesforce/schema/Proposal__c.First_Loan_Amount_Scenario_2__c';
import LoamAmt_S3 from '@salesforce/schema/Proposal__c.First_Loan_Amount_Scenario_3__c';
import RateScenario_S1 from '@salesforce/schema/Proposal__c.Rate_Scenario_1__c';
import RateScenario_S2 from '@salesforce/schema/Proposal__c.Rate_Scenario_2__c';
import RateScenario_S3 from '@salesforce/schema/Proposal__c.Rate_Scenario_3__c';
import LTV_S1 from '@salesforce/schema/Proposal__c.LTV_Scenario_1__c';
import LTV_S2 from '@salesforce/schema/Proposal__c.LTV_Scenario_2__c';
import LTV_S3 from '@salesforce/schema/Proposal__c.LTV_Scenario_3__c';
import CLTV_S1 from '@salesforce/schema/Proposal__c.CLTV_Scenario_1__c';
import CLTV_S2 from '@salesforce/schema/Proposal__c.CLTV_Scenario_2__c';
import CLTV_S3 from '@salesforce/schema/Proposal__c.CLTV_Scenario_3__c';
import MonthlyPayment_S1 from '@salesforce/schema/Proposal__c.Monthly_Payment_Scenario_1__c';
import MonthlyPayment_S2 from '@salesforce/schema/Proposal__c.Monthly_Payment_Scenario_2__c';
import MonthlyPayment_S3 from '@salesforce/schema/Proposal__c.Monthly_Payment_Scenario_3__c';
import EstTaxesS1 from '@salesforce/schema/Proposal__c.EstimatedTaxesScenario1__c';
import EstTaxesS2 from '@salesforce/schema/Proposal__c.EstimatedTaxesScenario2__c';
import EstTaxesS3 from '@salesforce/schema/Proposal__c.EstimatedTaxesScenario3__c';
import EstInsuranceS1 from '@salesforce/schema/Proposal__c.EstimatedInsuranceScenario1__c';
import EstInsuranceS2 from '@salesforce/schema/Proposal__c.EstimatedInsuranceScenario2__c';
import EstInsuranceS3 from '@salesforce/schema/Proposal__c.EstimatedInsuranceScenario3__c';
import EstMtgInsuranceS1 from '@salesforce/schema/Proposal__c.EstimatedMortgageInsuranceScenario1__c';
import EstMtgInsuranceS2 from '@salesforce/schema/Proposal__c.EstimatedMortgageInsuranceScenario2__c';
import EstMtgInsuranceS3 from '@salesforce/schema/Proposal__c.EstimatedMortgageInsuranceScenario3__c';
import EstHoaS1 from '@salesforce/schema/Proposal__c.EstimatedHOAScenario1__c';
import EstHoaS2 from '@salesforce/schema/Proposal__c.EstimatedHOAScenario2__c';
import EstHoaS3 from '@salesforce/schema/Proposal__c.EstimatedHOAScenario3__c';
import TotalMonthlyPaymentS1 from '@salesforce/schema/Proposal__c.TotalMonthlyPaymentScenario1__c';
import TotalMonthlyPaymentS2 from '@salesforce/schema/Proposal__c.TotalMonthlyPaymentScenario2__c';
import TotalMonthlyPaymentS3 from '@salesforce/schema/Proposal__c.TotalMonthlyPaymentScenario3__c';
import TotalInterest_S1 from '@salesforce/schema/Proposal__c.Total_Interest_Scenario_1__c';
import TotalInterest_S2 from '@salesforce/schema/Proposal__c.Total_Interest_Scenario_2__c';
import TotalInterest_S3 from '@salesforce/schema/Proposal__c.Total_Interest_Scenario_3__c';
import EstimatedFundstoCloseScenario1 from '@salesforce/schema/Proposal__c.EstimatedFundstoCloseScenario1__c';
import EstimatedFundstoCloseScenario2 from '@salesforce/schema/Proposal__c.EstimatedFundstoCloseScenario2__c';
import EstimatedFundstoCloseScenario3 from '@salesforce/schema/Proposal__c.EstimatedFundstoCloseScenario3__c';
import MonthlySavings_S1 from '@salesforce/schema/Proposal__c.Monthly_Payment_Savings_Scenario_1__c';
import MonthlySavings_S2 from '@salesforce/schema/Proposal__c.Monthly_Payment_Savings_Scenario_2__c';
import MonthlySavings_S3 from '@salesforce/schema/Proposal__c.Monthly_Payment_Savings_Scenario_3__c';
import InterestSavings_S1 from '@salesforce/schema/Proposal__c.Daily_Interest_Savings_Scenario_1__c';
import InterestSavings_S2 from '@salesforce/schema/Proposal__c.Daily_Interest_Savings_Scenario_2__c';
import InterestSavings_S3 from '@salesforce/schema/Proposal__c.Daily_Interest_Savings_Scenario_3__c';
import OnPacePayment_S1 from '@salesforce/schema/Proposal__c.On_Pace_Payment_Scenario_1__c';
import OnPacePayment_S2 from '@salesforce/schema/Proposal__c.On_Pace_Payment_Scenario_2__c';
import OnPacePayment_S3 from '@salesforce/schema/Proposal__c.On_Pace_Payment_Scenario_3__c';
import OnPaceSavings_S1 from '@salesforce/schema/Proposal__c.On_Pace_Savings_Scenario_1__c';
import OnPaceSavings_S2 from '@salesforce/schema/Proposal__c.On_Pace_Savings_Scenario_2__c';
import OnPaceSavings_S3 from '@salesforce/schema/Proposal__c.On_Pace_Savings_Scenario_3__c';
import MaturityReduction_S1 from '@salesforce/schema/Proposal__c.Maturity_Reduction_Scenario_1__c';
import MaturityReduction_S2 from '@salesforce/schema/Proposal__c.Maturity_Reduction_Scenario_2__c';
import MaturityReduction_S3 from '@salesforce/schema/Proposal__c.Maturity_Reduction_Scenario_3__c';
import LifetimeSavings_S1 from '@salesforce/schema/Proposal__c.Lifetime_Savings_Scenario_1__c';
import LifetimeSavings_S2 from '@salesforce/schema/Proposal__c.Lifetime_Savings_Scenario_2__c';
import LifetimeSavings_S3 from '@salesforce/schema/Proposal__c.Lifetime_Savings_Scenario_3__c';

import SolidifyContact from '@salesforce/schema/Proposal__c.SolidifyContact__c';
import Borrower_Name_Text from '@salesforce/schema/Proposal__c.Borrower_Name_Text__c';
import Fixed_Term_Years from '@salesforce/schema/Proposal__c.Fixed_Term_Years__c';
import Prepared_Date from '@salesforce/schema/Proposal__c.Prepared_Date__c';
import New_Loan_Amount from '@salesforce/schema/Proposal__c.New_Loan_Amount__c';
import Estimate_Value from '@salesforce/schema/Proposal__c.Estimate_Value__c';
import FICO_Score from '@salesforce/schema/Proposal__c.FICO_Score__c';
import Lock_Period_Days from '@salesforce/schema/Proposal__c.Lock_Period_Days__c';

import DiscountCreditS1 from '@salesforce/schema/Proposal__c.DiscountCreditS1__c';
import LenderFeeS1 from '@salesforce/schema/Proposal__c.LenderFeeS1__c';
import AppraisalFeeS1 from '@salesforce/schema/Proposal__c.AppraisalFeeS1__c';
import CreditReportFeeS1 from '@salesforce/schema/Proposal__c.CreditReportFeeS1__c';
import EscrowFeesS1 from '@salesforce/schema/Proposal__c.EscrowFeesS1__c';
import TitleFeeS1 from '@salesforce/schema/Proposal__c.TitleFeeS1__c';
import RecordingFeeS1 from '@salesforce/schema/Proposal__c.RecordingFeeS1__c';

import DiscountCreditS2 from '@salesforce/schema/Proposal__c.DiscountCreditS2__c';
import LenderFeeS2 from '@salesforce/schema/Proposal__c.LenderFeeS2__c';
import AppraisalFeeS2 from '@salesforce/schema/Proposal__c.AppraisalFeeS2__c';
import CreditReportFeeS2 from '@salesforce/schema/Proposal__c.CreditReportFeeS2__c';
import EscrowFeesS2 from '@salesforce/schema/Proposal__c.EscrowFeesS2__c';
import TitleFeeS2 from '@salesforce/schema/Proposal__c.TitleFeeS2__c';
import RecordingFeeS2 from '@salesforce/schema/Proposal__c.RecordingFeeS2__c';

import DiscountCreditS3 from '@salesforce/schema/Proposal__c.DiscountCreditS3__c';
import LenderFeeS3 from '@salesforce/schema/Proposal__c.LenderFeeS3__c';
import AppraisalFeeS3 from '@salesforce/schema/Proposal__c.AppraisalFeeS3__c';
import CreditReportFeeS3 from '@salesforce/schema/Proposal__c.CreditReportFeeS3__c';
import EscrowFeesS3 from '@salesforce/schema/Proposal__c.EscrowFeesS3__c';
import TitleFeeS3 from '@salesforce/schema/Proposal__c.TitleFeeS3__c';
import RecordingFeeS3 from '@salesforce/schema/Proposal__c.RecordingFeeS3__c';

import UFMIPFFS1 from '@salesforce/schema/Proposal__c.UFMIPFFS1__c';
import UFMIPFFS2 from '@salesforce/schema/Proposal__c.UFMIPFFS2__c';
import UFMIPFFS3 from '@salesforce/schema/Proposal__c.UFMIPFFS3__c';

import CancelMIAtS1 from '@salesforce/schema/Proposal__c.CancelMIAtS1__c';
import CancelMIAtS2 from '@salesforce/schema/Proposal__c.CancelMIAtS2__c';
import CancelMIAtS3 from '@salesforce/schema/Proposal__c.CancelMIAtS3__c';

import CopytoS1And2 from '@salesforce/schema/Proposal__c.CopytoScenarios2and3__c';

import { CurrentPageReference } from 'lightning/navigation';

export default class ScenariosTabProposal extends NavigationMixin(LightningElement) {

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
    PropLead = PropLead;
    PropContact = PropContact;
    PropLoan = PropLoan;
    Scenario1Name = Scenario1Name;
    Scenario2Name = Scenario2Name;
    Scenario3Name = Scenario3Name;
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

    SolidifyContact = SolidifyContact;
    BorrowerNameText = Borrower_Name_Text;
    FixedTermYears = Fixed_Term_Years;
    PreparedDate = Prepared_Date;
    NewLoanAmount = New_Loan_Amount;
    EstimateValue = Estimate_Value;
    FICOScore = FICO_Score;
    LockPeriodDays = Lock_Period_Days;
    ProposalObject = PROPOSAL_OBJECT;

    userId = Id;

    
    @track isRefinance = true;
    @track isUFMIP1 = true;
    @track isCancel1 = true;
    @track isUFMIP2 = true;
    @track isCancel2 = true;
    @track isUFMIP3 = true;
    @track isCancel3 = true;

    handleCopytoChange(event){
        this.value = event.target.value;
        console.log("Copy to S2 and S3 = " + event.target.value)
        if (event.target.value == true){
            this.EstimatedTaxS2 = this.EstimatedTaxS1.value;
            this.EstimatedTaxS3 = this.EstimatedTaxS1;
            this.EstimatedInsuranceS2 = this.EstimatedInsuranceS1;
            this.EstimatedInsuranceS3 = this.EstimatedInsuranceS1;
            this.EstMortgageInsuranceS2 = this.EstMortgageInsuranceS1;
            this.EstMortgageInsuranceS3 = this.EstMortgageInsuranceS1;
            this.EstimatedHoaS2 = this.EstimatedHoaS1;
            this.EstimatedHoaS3 = this.EstimatedHoaS1;
        }
    }

    @api propId;
    @track SelectedRelatedRecord = [];
    @track SelectedisLead = false;
    @track SelectedisContact = false;
    @track SelectedisLoan = false;
    @track SelectedObject = false;

    @track recordIdFromButton;
    @track recordObjectFromButton;
    @track recordNameFromButton;

    handleSubmitForm(event){
        this.checkForErrors();
        event.preventDefault();       // stop the form from submitting
        const fields = event.detail.fields;
        console.log("Fields = "+JSON.stringify(fields));
        if (this.SelectedisLead){ //For Leads
            fields.Borrower_Lead__c = this.SelectedRelatedRecord;
        }
        else if(this.SelectedisContact){ //For Contacts
            fields.Borrower__c = this.SelectedRelatedRecord;
        }
        else if(this.SelectedisLoan){ //For Loan (Opportunity)
            fields.Most_Recent_Loan__c = this.SelectedRelatedRecord;
        };
        fields.RecordTypeId = '0125G000001MuHzQAK'; //For sandboxes
        this.template.querySelector('lightning-record-edit-form').submit(fields);
     }

    handleSuccess(event){
        this.propId = event.detail.id;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.propId,
                objectApiName: 'Proposal__c',
                actionName: 'view'
       }
        });
    }

    handlePick(event) {
        // Get the string of the "value" attribute on the selected option
        this.value = event.detail.value;
        if (event.detail.value == 'Purchase') {
            this.isRefinance = false;
        } else if(event.detail.value == 'Refinance'){
            this.isRefinance = true;
        }
        console.log("isRefinance = "+this.isRefinance);
    }


    // Use alerts instead of toasts (LEX only) to notify user
    @api notifyViaAlerts = false;

    /*initialSelection = [
        {
            id: 'na',
            sObjectType: 'na',
            icon: 'standard:lightning_component',
            title: 'Inital selection',
            subtitle: 'Not a valid record'
        }
    ];*/
    errors = [];
    recentlyViewed = [];
    newRecordOptions = [
        { value: 'Contact', label: 'New Contact' },
        { value: 'Opportunity', label: 'New Loan' },
        { value: 'Lead', label: 'New Lead' }
    ];

    /**
     * Loads recently viewed records and set them as default lookpup search results (optional)
     */
    @wire(getRecentlyViewed)
    getRecentlyViewed({ data }) {
        if (data) {
            this.recentlyViewed = data;
            this.initLookupDefaultResults();
        }
    }

    connectedCallback() {
        this.initLookupDefaultResults();
    }

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        console.log('@@@ currentPageReference: ' + JSON.stringify(currentPageReference));
        var urlStateParameters = currentPageReference.state;
        console.log('@@@ StateParams: ' + JSON.stringify(urlStateParameters));
        this.recordIdFromButton = urlStateParameters.c__recordIdFromButton;
        console.log('@@@ recordIdFromButton: ' + this.recordIdFromButton);
        this.recordObjectFromButton = urlStateParameters.c__sObjectFromButton;
        console.log('@@@ recordObjectFromButton: ' + this.recordObjectFromButton);
        this.recordNameFromButton = urlStateParameters.c__nameFromButton;
        console.log('@@@ nameFromButton: ' + this.recordNameFromButton);

            var iconVal = '';
        if(this.recordObjectFromButton == 'Contact'){
            iconVal = 'standard:contact';
        } else if (this.recordObjectFromButton == 'Lead') {
            iconVal = 'standard:lead';
        } else if (this.recordObjectFromButton == 'Opportunity') {
            iconVal = 'standard:opportunity';
        }
        this.initialSelection = [
            {
                id: this.recordIdFromButton,
                sObjectType: this.recordObjectFromButton,
                title: this.recordNameFromButton,
                subtitle: this.recordNameFromButton,
                icon: iconVal
            }
        ];
        const selection = this.initialSelection;
        if(selection.length != 0){
            this.SelectedObject = selection[0].sObjectType;
            this.SelectedRelatedRecord = selection[0].id;
            console.log("initial Selected record = " + JSON.stringify(selection));
            console.log("Selected Object = " + this.SelectedObject);
            console.log("Selected ID = " + this.SelectedRelatedRecord);
            if (this.SelectedObject == 'Lead'){
                this.SelectedisLead = true;
                this.SelectedisContact = false;
                this.SelectedisLoan = false;
                console.log("Selected Object is Lead");
            }else if (this.SelectedObject == 'Contact'){
                this.SelectedisContact = true;
                this.SelectedisLead = false;
                this.SelectedisLoan = false;
                console.log("Selected Object is Contact");
            }else if (this.SelectedObject == 'Opportunity'){
                this.SelectedisLoan = true;
                this.SelectedisContact = false;
                this.SelectedisLead = false;
                console.log("Selected Object is Opportunity");
            };
            this.getPrefil(this.SelectedRelatedRecord, this.SelectedObject);
        }
    }

   


    /**
     * Initializes the lookup default results with a list of recently viewed records (optional)
     */
    initLookupDefaultResults() {
        // Make sure that the lookup is present and if so, set its default results
        const lookup = this.template.querySelector('c-lookup-l-w-c');
        if (lookup) {
            lookup.setDefaultResults(this.recentlyViewed);
        }
    }

    /**
     * Handles the lookup search event.
     * Calls the server to perform the search and returns the resuls to the lookup.
     * @param {event} event `search` event emmitted by the lookup
     */
    handleLookupSearch(event) {
        const lookupElement = event.target;
        // Call Apex endpoint to search for records and pass results to the lookup
        search(event.detail)
            .then((results) => {
                lookupElement.setSearchResults(results);
            })
            .catch((error) => {
                this.notifyUser('Lookup Error', 'An error occured while searching with the lookup field.', 'error');
                // eslint-disable-next-line no-console
                console.error('Lookup error', JSON.stringify(error));
                this.errors = [error];
            });
    }

    /**
     * Handles the lookup selection change
     * @param {event} event 'selectionchange' event emmitted by the lookup.
     * The event contains the list of selected ids.
     */
    // eslint-disable-next-line no-unused-vars
    handleLookupSelectionChange(event) {
        this.checkForErrors();
        const selection = event.target.getSelection();
        if(selection.length != 0){
            this.SelectedObject = selection[0].sObjectType;
            this.SelectedRelatedRecord = selection[0].id;
            console.log("Selected record = " + JSON.stringify(selection));
            console.log("Selected Object = " + this.SelectedObject);
            console.log("Selected ID = " + this.SelectedRelatedRecord);
            if (this.SelectedObject == 'Lead'){
                this.SelectedisLead = true;
                this.SelectedisContact = false;
                this.SelectedisLoan = false;
                console.log("Selected Object is Lead");
            }else if (this.SelectedObject == 'Contact'){
                this.SelectedisContact = true;
                this.SelectedisLead = false;
                this.SelectedisLoan = false;
                console.log("Selected Object is Contact");
            }else if (this.SelectedObject == 'Opportunity'){
                this.SelectedisLoan = true;
                this.SelectedisContact = false;
                this.SelectedisLead = false;
                console.log("Selected Object is Opportunity");
            };
            this.getPrefil(this.SelectedRelatedRecord, this.SelectedObject);
        }
    }

    Rec;
    error;
    TaxesValue;
    HOAValue;
    InsuranceValue;
    PurposeValue;
    OccupancyValue;
    NumberOfUnitsV;
    EstimatedValue;
    CurrentProgramV;
    CurrentBalanceV;
    CurrentRateV;
    CurrentPaymentV;

    getPrefil(SelectedId, SelectedObj) {
        getRecordDataProp({ recordId : SelectedId, rObject : SelectedObj})
            .then(result => {
                this.Rec = result;
                this.error = undefined;
                if (SelectedObj == 'Lead'){
                    this.TaxesValue = this.Rec.Taxes__c;
                    this.HOAValue = this.Rec.HOA__c;
                    this.InsuranceValue = this.Rec.Hazard_Insurance__c;
                    this.PurposeValue = this.Rec.Purpose__c;
                    this.OccupancyValue = this.Rec.Occupancy__c;
                    this.NumberOfUnitsV = this.Rec.Number_of_Units__c;
                    this.EstimatedValue = this.Rec.Estimated_Value__c;
                    this.CurrentProgramV = this.Rec.Current_Program__c;
                    this.CurrentBalanceV = this.Rec.Current_Balance__c;
                    this.CurrentRateV = this.Rec.Current_Rate__c;
                    this.CurrentPaymentV = this.Rec.Current_Payment__c;
                }

                console.log(JSON.stringify(result));
                console.log("result", this.Rec);
            })
            .catch(error => {
                this.Rec = undefined;
                this.error = error;

                console.log("error", JSON.stringify(this.error));
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error updating account record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }

    // All functions below are part of the sample app form (not required by the lookup).

    handleClear() {
        this.initialSelection = [];
        this.errors = [];
    }

    checkForErrors() {
        this.errors = [];
        const selection = this.template.querySelector('c-lookup-l-w-c').getSelection();
        // Enforcing required field
        if (selection.length === 0) {
            this.errors.push({ message: 'Please make a selection.' });
        }
    }

}