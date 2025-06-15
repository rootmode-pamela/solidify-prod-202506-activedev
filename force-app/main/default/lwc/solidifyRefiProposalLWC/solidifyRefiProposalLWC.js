import {LightningElement, api, wire, track} from 'lwc';
import getLeadFields from '@salesforce/apex/SolidifyComparisonController.getLeadInfo';

import LEAD_OBJECT from '@salesforce/schema/Lead';

export default class solidifyRefiProposalLWC extends LightningElement {

    leadObject = LEAD_OBJECT;
    @track leadRec;
    @api recordId;
    @api objectApiName;

    @track isRefinance = true;
    @track coBorrowerActive = false;
    @track parameterId;

    @track TIIH1 = true;
    @track TIIH2 = true;
    @track TIIH3 = true;


    connectedCallback() {


        this.parameters = this.getQueryParameters();   
        let recordId = this.parameters.id;
        console.log('---- recordId: '+recordId);
        this.parameterId = recordId;

        getLeadFields({recordId : this.parameterId})
        .then(result => { 
            console.log('-----result:   '+JSON.stringify(result));
            this.leadRec = result;
            console.log('-----this.leadRec.Purpose__c:   '+this.leadRec.Purpose__c);
            if (this.leadRec.Purpose__c == 'Purchase') {
                this.isRefinance = false;
            } else if(this.leadRec.Purpose__c == 'Refinance' || this.leadRec.Purpose__c == 'Refinance - No Cash Out' || this.leadRec.Purpose__c == 'Refinance - Cash Out'){
                this.isRefinance = true;
            }
            if (this.leadRec.CoBorrower_FirstName__c == null || this.leadRec.CoBorrower_LastName__c == null) {
                this.coBorrowerActive = false;
            } else {
                this.coBorrowerActive = true;
            }
            if (this.leadRec.EstimatedTaxesScenario1__c  == null || this.leadRec.EstimatedInsuranceScenario1__c == null) {
                this.TIIH1 = false;
            } else {
                this.TIIH1 = true;
            }
            if (this.leadRec.EstimatedTaxesScenario2__c  == null || this.leadRec.EstimatedInsuranceScenario2__c == null) {
                this.TIIH2 = false;
            } else {
                this.TIIH2 = true;
            }
            if (this.leadRec.EstimatedTaxesScenario3__c  == null || this.leadRec.EstimatedInsuranceScenario3__c == null) {
                this.TIIH3 = false;
            } else {
                this.TIIH3 = true;
            }
        })
        .catch(error => {
            console.log('-----error:   '+JSON.stringify(error));
        });
    }

    get Rate1(){
        return this.Rate_Scenario_1/12;
    }
    get Rate2(){
        return this.Rate_Scenario_2/12;
    }
    get Rate3(){
        return this.Rate_Scenario_3/12;
    }
    get Term1(){
        return this.Term_Due_Scenario_1*12;
    }
    get Term2(){
        return this.Term_Due_Scenario_2*12;
    }
    get Term3(){
        return this.Term_Due_Scenario_3*12;
    }
    get LoanAMT1(){
        return this.LoanAmountwithUFMIPFFS1 + this.TotalFeesS1;
    }
    get LoanAMT2(){
        return this.LoanAmountwithUFMIPFFS2 + this.TotalFeesS2;
    }
    get LoanAMT3(){
        return this.LoanAmountwithUFMIPFFS3 + this.TotalFeesS3;
    }
    get Zero(){
        return 0;
    }

    get APR1(){
        return this.leadRec ? this.leadRec.APRScenario1__c: ' ';
    }
    get APR2(){
        return this.leadRec ? this.leadRec.APRScenario2__c: ' ';
    }
    get APR3(){
        return this.leadRec ? this.leadRec.APRScenario3__c: ' ';
    }
    get occupancy(){
        return this.leadRec ? this.leadRec.Occupancy__c: ' ';
    }
    get subjectProperty(){
        return this.leadRec ? this.leadRec.Subject_Property_Type__c: ' ';
    }
    get numberOfUnits(){
        return this.leadRec ? this.leadRec.Number_of_Units__c: ' ';
    }
    get estimatedValue(){
        return this.leadRec ? this.leadRec.Estimated_Value__c: ' ';
    }
    get currentProgram(){
        return this.leadRec ? this.leadRec.Current_Program__c: ' ';
    }
    get currentBalance(){
        return this.leadRec ? this.leadRec.Current_Balance__c: ' ';
    }
    get CurrentRate(){
        return this.leadRec ? this.leadRec.Current_Rate__c: ' ';
    }
    get CurrentPayment(){
        return this.leadRec ? this.leadRec.Current_Payment__c: ' ';
    }
    get YearsRemainingOnCurrentLoan(){
        return this.leadRec ? this.leadRec.Years_Remaining_on_Current_Loan__c: ' ';
    }
    get Total_Interest_Remaining_on_Current_Loan(){
        return this.leadRec ? this.leadRec.Total_Interest_Remaining_on_Current_Loan__c: ' ';
    }
    get Purpose(){
        return this.leadRec ? this.leadRec.Purpose__c: ' ';
    }
    get Purchase_Price(){
        return this.leadRec ? this.leadRec.Purchase_Price__c: ' ';
    }
    get Qualifying_Fico(){
        return this.leadRec ? this.leadRec.Qualifying_Fico__c: ' ';
    }
    get First_Time_Homebuyer(){
        return this.leadRec ? this.leadRec.First_Time_Homebuyer__c: ' ';
    }
    get Veteran(){
        return this.leadRec ? this.leadRec.Veteran__c: ' ';
    }
    get Purpose_Scenario_1(){
        return this.leadRec ? this.leadRec.Purpose_Scenario_1__c: ' ';
    }
    get Purpose_Scenario_2(){
        return this.leadRec ? this.leadRec.Purpose_Scenario_2__c: ' ';
    }
    get Purpose_Scenario_3(){
        return this.leadRec ? this.leadRec.Purpose_Scenario_3__c: ' ';
    }
    get DownPaymentScenario1(){
        return this.leadRec ? this.leadRec.DownPaymentScenario1__c: ' ';
    }
    get DownPaymentScenario2(){
        return this.leadRec ? this.leadRec.DownPaymentScenario2__c: ' ';
    }
    get DownPaymentScenario3(){
        return this.leadRec ? this.leadRec.DownPaymentScenario3__c: ' ';
    }
    get Loan_Program_Scenario_1(){
        return this.leadRec ? this.leadRec.Loan_Program_Scenario_1__c: ' ';
    }
    get Loan_Program_Scenario_2(){
        return this.leadRec ? this.leadRec.Loan_Program_Scenario_2__c: ' ';
    }
    get Loan_Program_Scenario_3(){
        return this.leadRec ? this.leadRec.Loan_Program_Scenario_3__c: ' ';
    }
    get ProgramNameS1F(){
        return this.leadRec ? this.leadRec.ProgramNameS1F__c: ' ';
    }
    get ProgramNameS2F(){
        return this.leadRec ? this.leadRec.ProgramNameS2F__c: ' ';
    }
    get ProgramNameS3F(){
        return this.leadRec ? this.leadRec.ProgramNameS3F__c: ' ';
    }
    get Term_Due_Scenario_1(){
        return this.leadRec ? this.leadRec.Term_Due__c: ' ';
    }
    get Term_Due_Scenario_2(){
        return this.leadRec ? this.leadRec.Term_Due_Scenario_2__c: ' ';
    }
    get Term_Due_Scenario_3(){
        return this.leadRec ? this.leadRec.Term_Due_Scenario_3__c: ' ';
    }
    get FeeScenario1(){
        return this.leadRec ? this.leadRec.FeeScenario1__c: ' ';
    }
    get FeeScenario2(){
        return this.leadRec ? this.leadRec.FeeScenario2__c: ' ';
    }
    get FeeScenario3(){
        return this.leadRec ? this.leadRec.FeeScenario3__c: ' ';
    }
    get First_Loan_Amount_Scenario_1(){
        return this.leadRec ? this.leadRec.First_Loan_Amount_Scenario_1__c: ' ';
    }
    get First_Loan_Amount_Scenario_2(){
        return this.leadRec ? this.leadRec.First_Loan_Amount_Scenario_2__c: ' ';
    }
    get First_Loan_Amount_Scenario_3(){
        return this.leadRec ? this.leadRec.First_Loan_Amount_Scenario_3__c: ' ';
    }
    get Rate_Scenario_1(){
        return this.leadRec ? this.leadRec.Rate_Scenario_1__c: ' ';
    }
    get Rate_Scenario_2(){
        return this.leadRec ? this.leadRec.Rate_Scenario_2__c: ' ';
    }
    get Rate_Scenario_3(){
        return this.leadRec ? this.leadRec.Rate_Scenario_3__c: ' ';
    }
    get LTV_Scenario_1(){
        return this.leadRec ? this.leadRec.LTV_Scenario_1__c: ' ';
    }
    get LTV_Scenario_2(){
        return this.leadRec ? this.leadRec.LTV_Scenario_2__c: ' ';
    }
    get LTV_Scenario_3(){
        return this.leadRec ? this.leadRec.LTV_Scenario_3__c: ' ';
    }
    get CLTV_Scenario_1(){
        return this.leadRec ? this.leadRec.CLTV_Scenario_1__c: ' ';
    }
    get CLTV_Scenario_2(){
        return this.leadRec ? this.leadRec.CLTV_Scenario_2__c: ' ';
    }
    get CLTV_Scenario_3(){
        return this.leadRec ? this.leadRec.CLTV_Scenario_3__c: ' ';
    }
    get Monthly_Payment_Scenario_1(){
        return this.leadRec ? this.leadRec.Monthly_Payment_Scenario_1__c: ' ';
    }
    get Monthly_Payment_Scenario_2(){
        return this.leadRec ? this.leadRec.Monthly_Payment_Scenario_2__c: ' ';
    }
    get Monthly_Payment_Scenario_3(){
        return this.leadRec ? this.leadRec.Monthly_Payment_Scenario_3__c: ' ';
    }
    get EstimatedTaxesScenario1(){
        return this.leadRec ? this.leadRec.EstimatedTaxesScenario1__c: ' ';
    }
    get EstimatedTaxesScenario2(){
        return this.leadRec ? this.leadRec.EstimatedTaxesScenario2__c: ' ';
    }
    get EstimatedTaxesScenario3(){
        return this.leadRec ? this.leadRec.EstimatedTaxesScenario3__c: ' ';
    }
    get EstimatedInsuranceScenario1(){
        return this.leadRec ? this.leadRec.EstimatedInsuranceScenario1__c: ' ';
    }
    get EstimatedInsuranceScenario2(){
        return this.leadRec ? this.leadRec.EstimatedInsuranceScenario2__c: ' ';
    }
    get EstimatedInsuranceScenario3(){
        return this.leadRec ? this.leadRec.EstimatedInsuranceScenario3__c: ' ';
    }
    get EstimatedMortgageInsuranceScenario1(){
        return this.leadRec ? this.leadRec.EstimatedMortgageInsuranceScenario1__c: ' ';
    }
    get EstimatedMortgageInsuranceScenario2(){
        return this.leadRec ? this.leadRec.EstimatedMortgageInsuranceScenario2__c: ' ';
    }
    get EstimatedMortgageInsuranceScenario3(){
        return this.leadRec ? this.leadRec.EstimatedMortgageInsuranceScenario3__c: ' ';
    }
    get EstimatedHOAScenario1(){
        return this.leadRec ? this.leadRec.EstimatedHOAScenario1__c: ' ';
    }
    get EstimatedHOAScenario2(){
        return this.leadRec ? this.leadRec.EstimatedHOAScenario2__c: ' ';
    }
    get EstimatedHOAScenario3(){
        return this.leadRec ? this.leadRec.EstimatedHOAScenario3__c: ' ';
    }
    get TotalMonthlyPaymentScenario1(){
        return this.leadRec ? this.leadRec.TotalMonthlyPaymentScenario1__c: ' ';
    }
    get TotalMonthlyPaymentScenario2(){
        return this.leadRec ? this.leadRec.TotalMonthlyPaymentScenario2__c: ' ';
    }
    get TotalMonthlyPaymentScenario3(){
        return this.leadRec ? this.leadRec.TotalMonthlyPaymentScenario3__c: ' ';
    }
    get Total_Interest_Scenario_1(){
        return this.leadRec ? this.leadRec.Total_Interest_Scenario_1__c: ' ';
    }
    get Total_Interest_Scenario_2(){
        return this.leadRec ? this.leadRec.Total_Interest_Scenario_2__c: ' ';
    }
    get Total_Interest_Scenario_3(){
        return this.leadRec ? this.leadRec.Total_Interest_Scenario_3__c: ' ';
    }
    get EstimatedFundstoCloseScenario1(){
        return this.leadRec ? this.leadRec.EstimatedFundstoCloseScenario1__c: ' ';
    }
    get EstimatedFundstoCloseScenario2(){
        return this.leadRec ? this.leadRec.EstimatedFundstoCloseScenario2__c: ' ';
    }
    get EstimatedFundstoCloseScenario3(){
        return this.leadRec ? this.leadRec.EstimatedFundstoCloseScenario3__c: ' ';
    }
    get Monthly_Payment_Savings_Scenario_1(){
        return this.leadRec ? this.leadRec.Monthly_Payment_Savings_Scenario_1__c: ' ';
    }
    get Monthly_Payment_Savings_Scenario_2(){
        return this.leadRec ? this.leadRec.Monthly_Payment_Savings_Scenario_2__c: ' ';
    }
    get Monthly_Payment_Savings_Scenario_3(){
        return this.leadRec ? this.leadRec.Monthly_Payment_Savings_Scenario_3__c: ' ';
    }
    get Daily_Interest_Savings_Scenario_1(){
        return this.leadRec ? this.leadRec.Daily_Interest_Savings_Scenario_1__c: ' ';
    }
    get Daily_Interest_Savings_Scenario_2(){
        return this.leadRec ? this.leadRec.Daily_Interest_Savings_Scenario_2__c: ' ';
    }
    get Daily_Interest_Savings_Scenario_3(){
        return this.leadRec ? this.leadRec.Daily_Interest_Savings_Scenario_3__c: ' ';
    }
    get On_Pace_Payment_Scenario_1(){
        return this.leadRec ? this.leadRec.On_Pace_Payment_Scenario_1__c: ' ';
    }
    get On_Pace_Payment_Scenario_2(){
        return this.leadRec ? this.leadRec.On_Pace_Payment_Scenario_2__c: ' ';
    }
    get On_Pace_Payment_Scenario_3(){
        return this.leadRec ? this.leadRec.On_Pace_Payment_Scenario_3__c: ' ';
    }
    get On_Pace_Savings_Scenario_1(){
        return this.leadRec ? this.leadRec.On_Pace_Savings_Scenario_1__c: ' ';
    }
    get On_Pace_Savings_Scenario_2(){
        return this.leadRec ? this.leadRec.On_Pace_Savings_Scenario_2__c: ' ';
    }
    get On_Pace_Savings_Scenario_3(){
        return this.leadRec ? this.leadRec.On_Pace_Savings_Scenario_3__c: ' ';
    }
    get Maturity_Reduction_Scenario_1(){
        return this.leadRec ? this.leadRec.Maturity_Reduction_Scenario_1__c: ' ';
    }
    get Maturity_Reduction_Scenario_2(){
        return this.leadRec ? this.leadRec.Maturity_Reduction_Scenario_2__c: ' ';
    }
    get Maturity_Reduction_Scenario_3(){
        return this.leadRec ? this.leadRec.Maturity_Reduction_Scenario_3__c: ' ';
    }
    get Lifetime_Savings_Scenario_1(){
        return this.leadRec ? this.leadRec.Lifetime_Savings_Scenario_1__c: ' ';
    }
    get Lifetime_Savings_Scenario_2(){
        return this.leadRec ? this.leadRec.Lifetime_Savings_Scenario_2__c: ' ';
    }
    get Lifetime_Savings_Scenario_3(){
        return this.leadRec ? this.leadRec.Lifetime_Savings_Scenario_3__c: ' ';
    }
    get SolidifyContactName(){
        return this.leadRec ? this.leadRec.SolidifyContact__r.Name: ' ';
    }
    get SolidifyContactFullPhotoUrl(){
        return this.leadRec ? this.leadRec.SolidifyContact__r.MediumPhotoUrl: ' ';
    }
    get SolidifyContactMobilePhone(){
        return this.leadRec ? this.leadRec.SolidifyContact__r.MobilePhone: ' ';
    }
    get SolidifyContactEmail(){
        return this.leadRec ? this.leadRec.SolidifyContact__r.Email: ' ';
    }
    get SolidifyContactLink(){
        return this.leadRec ? this.leadRec.SolidifyContact__r.ApplyNowwebsiteLink__c: ' ';
    }
    get SolidifyContactMLS(){
        return this.leadRec ? this.leadRec.SolidifyContact__r.MLSNumber__c: ' ';
    }

    get DiscountCreditS1(){
        return this.leadRec ? this.leadRec.DiscountCreditS1__c: ' ';
    }
    get LenderFeeS1(){
        return this.leadRec ? this.leadRec.LenderFeeS1__c: ' ';
    }
    get AppraisalFeeS1(){
        return this.leadRec ? this.leadRec.AppraisalFeeS1__c: ' ';
    }
    get CreditReportFeeS1(){
        return this.leadRec ? this.leadRec.CreditReportFeeS1__c: ' ';
    }
    get EscrowFeesS1(){
        return this.leadRec ? this.leadRec.EscrowFeesS1__c: ' ';
    }
    get TitleFeeS1(){
        return this.leadRec ? this.leadRec.TitleFeeS1__c: ' ';
    }
    get RecordingFeeS1(){
        return this.leadRec ? this.leadRec.RecordingFeeS1__c: ' ';
    }
    get TotalFeesS1(){
        return this.leadRec ? this.leadRec.TotalFeesS1__c: ' ';
    }
    get DiscountCreditS2(){
        return this.leadRec ? this.leadRec.DiscountCreditS2__c: ' ';
    }
    get LenderFeeS2(){
        return this.leadRec ? this.leadRec.LenderFeeS2__c: ' ';
    }
    get AppraisalFeeS2(){
        return this.leadRec ? this.leadRec.AppraisalFeeS2__c: ' ';
    }
    get CreditReportFeeS2(){
        return this.leadRec ? this.leadRec.CreditReportFeeS2__c: ' ';
    }
    get EscrowFeesS2(){
        return this.leadRec ? this.leadRec.EscrowFeesS2__c: ' ';
    }
    get TitleFeeS2(){
        return this.leadRec ? this.leadRec.TitleFeeS2__c: ' ';
    }
    get RecordingFeeS2(){
        return this.leadRec ? this.leadRec.RecordingFeeS2__c: ' ';
    }
    get TotalFeesS2(){
        return this.leadRec ? this.leadRec.TotalFeesS2__c: ' ';
    }
    get DiscountCreditS3(){
        return this.leadRec ? this.leadRec.DiscountCreditS3__c: ' ';
    }
    get LenderFeeS3(){
        return this.leadRec ? this.leadRec.LenderFeeS3__c: ' ';
    }
    get AppraisalFeeS3(){
        return this.leadRec ? this.leadRec.AppraisalFeeS3__c: ' ';
    }
    get CreditReportFeeS3(){
        return this.leadRec ? this.leadRec.CreditReportFeeS3__c: ' ';
    }
    get EscrowFeesS3(){
        return this.leadRec ? this.leadRec.EscrowFeesS3__c: ' ';
    }
    get TitleFeeS3(){
        return this.leadRec ? this.leadRec.TitleFeeS3__c: ' ';
    }
    get RecordingFeeS3(){
        return this.leadRec ? this.leadRec.RecordingFeeS3__c: ' ';
    }
    get TotalFeesS3(){
        return this.leadRec ? this.leadRec.TotalFeesS3__c: ' ';
    }
    get BorrowerName(){
        return this.leadRec ? this.leadRec.BorrowerName__c: ' ';
    }
    get CoBorrower_FirstName(){
        return this.leadRec ? this.leadRec.CoBorrower_FirstName__c: ' ';
    }
    get CoBorrower_LastName(){
        return this.leadRec ? this.leadRec.CoBorrower_LastName__c: ' ';
    }
    get CoBorrowerName(){
        return this.CoBorrower_FirstName + ' ' + this.CoBorrower_LastName;
    }
    get Subject_Property_Street(){
        return this.leadRec ? this.leadRec.PropertyAddressText__c: ' ';
    }
    get ServicesTotalS1(){
        return this.AppraisalFeeS1 + this.EscrowFeesS1 + this.TitleFeeS1;
    }
    get ServicesTotalS2(){
        return this.AppraisalFeeS2 + this.EscrowFeesS2 + this.TitleFeeS2;
    }
    get ServicesTotalS3(){
        return this.AppraisalFeeS3 + this.EscrowFeesS3 + this.TitleFeeS3;
    }

    get OriginationTotalS1(){
        return this.LenderFeeS1 + this.DiscountCreditS1;
    }
    get OriginationTotalS2(){
        return this.LenderFeeS2 + this.DiscountCreditS2;
    }
    get OriginationTotalS3(){
        return this.LenderFeeS3 + this.DiscountCreditS2;
    }

    get UFMIPFFS1(){
        return this.leadRec ? this.leadRec.UFMIPFFS1__c: ' ';
    }
    get UFMIPFFS2(){
        return this.leadRec ? this.leadRec.UFMIPFFS2__c: ' ';
    }
    get UFMIPFFS3(){
        return this.leadRec ? this.leadRec.UFMIPFFS3__c: ' ';
    }
    get LoanAmountwithUFMIPFFS1(){
        return this.leadRec ? this.leadRec.LoanAmountwithUFMIPFFS1__c: ' ';
    }
    get LoanAmountwithUFMIPFFS2(){
        return this.leadRec ? this.leadRec.LoanAmountwithUFMIPFFS2__c: ' ';
    }
    get LoanAmountwithUFMIPFFS3(){
        return this.leadRec ? this.leadRec.LoanAmountwithUFMIPFFS3__c: ' ';
    }
    get CancelMIAtS1(){
        return this.leadRec ? this.leadRec.CancelMIAtS1__c: ' ';
    }
    get CancelMIAtS2(){
        return this.leadRec ? this.leadRec.CancelMIAtS2__c: ' ';
    }
    get CancelMIAtS3(){
        return this.leadRec ? this.leadRec.CancelMIAtS3__c: ' ';
    }


    //Get URL Parameters
    getQueryParameters() {
        var params = {};
        var search = location.search.substring(1);
        
        if (search) {
            params = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', (key, value) => {
                return key === "" ? value : decodeURIComponent(value)
            });
        }
        
        return params;
    }

    @track isDetails1 = false
    @track isDetails2 = false
    @track isDetails3 = false
    @track hideTable = false

    handleToggleClick(event) {
        this.isDetails1 = true;
        this.hideTable = true;
    }


    navigateToApplyPage() {
        let windowOrigin = window.location.origin;
        console.log('--windowOrigin:    '+windowOrigin);
        let generatedUrl = this.SolidifyContactLink
        window.open(generatedUrl);
    }

    handleToggleClick2(event) {
        this.isDetails2 = true;
        this.hideTable = true;
    }

    handleToggleClick3(event) {
        this.isDetails3 = true;
        this.hideTable = true;
    }

    closeModal() {
        this.isDetails1 = false
        this.isDetails2 = false
        this.isDetails3 = false
        this.hideTable = false;
    }

    @track isPITI = false;
    @track isPITI2 = false;
    @track isPITI3 = false;
    value1 = '';
    value2 = '';
    value3 = '';

    get options1() {
        return [
            { label: 'Include Taxes and Insurance', value: 'Yes1' },
        ];
    }
    get options2() {
        return [
            { label: 'Include Taxes and Insurance', value: 'Yes2' },
        ];
    }
    get options3() {
        return [
            { label: 'Include Taxes and Insurance', value: 'Yes3' },
        ];
    }

    handleChangePITI1(event) {
        const selectedOption = event.detail.value;
        if (selectedOption== 'Yes1') {
            this.isPITI = true;
        } else {
            this.isPITI = false;
        }
    }
    handleChangePITI2(event) {
        const selectedOption = event.detail.value;
        if (selectedOption== 'Yes2') {
            this.isPITI2 = true;
        } else {
            this.isPITI2 = false;
        }
    }
    handleChangePITI3(event) {
        const selectedOption = event.detail.value;
        if (selectedOption== 'Yes3') {
            this.isPITI3 = true;
        } else {
            this.isPITI3 = false;
        }
    }

}