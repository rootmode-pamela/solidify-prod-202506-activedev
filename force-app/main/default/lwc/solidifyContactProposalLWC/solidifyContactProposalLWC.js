import {LightningElement, api, wire, track} from 'lwc';
import getContactFields from '@salesforce/apex/SolidifyComparisonController.getContactInfo';

import CONTACT_OBJECT from '@salesforce/schema/Contact';

export default class SolidifyContactProposalLWC extends LightningElement {

    ContactObject = CONTACT_OBJECT;
    @track ContactRec;
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

        getContactFields({recordId : this.parameterId})
        .then(result => { 
            console.log('-----result:   '+JSON.stringify(result));
            this.ContactRec = result;
            console.log('-----this.ContactRec.LoanComparison__c:   '+this.ContactRec.LoanComparison__c);
            if (this.ContactRec.LoanComparison__c == 'Purchase') {
                this.isRefinance = false;
            } else if(this.ContactRec.LoanComparison__c == 'Refinance'){

                this.isRefinance = true;
            }
            if (this.ContactRec.CoBorrower_FirstName__c == null || this.ContactRec.CoBorrower_LastName__c == null) {
                this.coBorrowerActive = false;
            } else {
                this.coBorrowerActive = true;
            }
            if (this.ContactRec.EstimatedTaxesScenario1__c  == null || this.ContactRec.EstimatedInsuranceScenario1__c == null) {
                this.TIIH1 = false;
            } else {
                this.TIIH1 = true;
            }
            if (this.ContactRec.EstimatedTaxesScenario2__c  == null || this.ContactRec.EstimatedInsuranceScenario2__c == null) {
                this.TIIH2 = false;
            } else {
                this.TIIH2 = true;
            }
            if (this.ContactRec.EstimatedTaxesScenario3__c  == null || this.ContactRec.EstimatedInsuranceScenario3__c == null) {
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
        return this.ContactRec ? this.ContactRec.APRScenario1__c: ' ';
    }
    get APR2(){
        return this.ContactRec ? this.ContactRec.APRScenario2__c: ' ';
    }
    get APR3(){
        return this.ContactRec ? this.ContactRec.APRScenario3__c: ' ';
    }
    get occupancy(){
        return this.ContactRec ? this.ContactRec.Occupancy__c: ' ';
    }
    get subjectProperty(){
        return this.ContactRec ? this.ContactRec.Subject_Property_Type__c: ' ';
    }
    get numberOfUnits(){
        return this.ContactRec ? this.ContactRec.Number_of_Units__c: ' ';
    }
    get estimatedValue(){
        return this.ContactRec ? this.ContactRec.Estimated_Value__c: ' ';
    }
    get currentProgram(){
        return this.ContactRec ? this.ContactRec.Current_Program__c: ' ';
    }
    get currentBalance(){
        return this.ContactRec ? this.ContactRec.Current_Balance__c: ' ';
    }
    get CurrentRate(){
        return this.ContactRec ? this.ContactRec.Current_Rate__c: ' ';
    }
    get CurrentPayment(){
        return this.ContactRec ? this.ContactRec.Current_Payment__c: ' ';
    }
    get YearsRemainingOnCurrentLoan(){
        return this.ContactRec ? this.ContactRec.Years_Remaining_on_Current_Loan__c: ' ';
    }
    get Total_Interest_Remaining_on_Current_Loan(){
        return this.ContactRec ? this.ContactRec.Total_Interest_Remaining_on_Current_Loan__c: ' ';
    }
    get Purpose(){
        return this.ContactRec ? this.ContactRec.LoanComparison__c: ' ';
    }
    get Purchase_Price(){
        return this.ContactRec ? this.ContactRec.Purchase_Price__c: ' ';
    }
    get Qualifying_Fico(){
        return this.ContactRec ? this.ContactRec.Qualifying_Fico__c: ' ';
    }
    get First_Time_Homebuyer(){
        return this.ContactRec ? this.ContactRec.First_Time_Homebuyer__c: ' ';
    }
    get Veteran(){
        return this.ContactRec ? this.ContactRec.Veteran__c: ' ';
    }
    get Purpose_Scenario_1(){
        return this.ContactRec ? this.ContactRec.Purpose_Scenario_1__c: ' ';
    }
    get Purpose_Scenario_2(){
        return this.ContactRec ? this.ContactRec.Purpose_Scenario_2__c: ' ';
    }
    get Purpose_Scenario_3(){
        return this.ContactRec ? this.ContactRec.Purpose_Scenario_3__c: ' ';
    }
    get DownPaymentScenario1(){
        return this.ContactRec ? this.ContactRec.DownPaymentScenario1__c: ' ';
    }
    get DownPaymentScenario2(){
        return this.ContactRec ? this.ContactRec.DownPaymentScenario2__c: ' ';
    }
    get DownPaymentScenario3(){
        return this.ContactRec ? this.ContactRec.DownPaymentScenario3__c: ' ';
    }
    get Loan_Program_Scenario_1(){
        return this.ContactRec ? this.ContactRec.Loan_Program_Scenario_1__c: ' ';
    }
    get Loan_Program_Scenario_2(){
        return this.ContactRec ? this.ContactRec.Loan_Program_Scenario_2__c: ' ';
    }
    get Loan_Program_Scenario_3(){
        return this.ContactRec ? this.ContactRec.Loan_Program_Scenario_3__c: ' ';
    }
    get ProgramNameS1F(){
        return this.ContactRec ? this.ContactRec.ProgramNameS1F__c: ' ';
    }
    get ProgramNameS2F(){
        return this.ContactRec ? this.ContactRec.ProgramNameS2F__c: ' ';
    }
    get ProgramNameS3F(){
        return this.ContactRec ? this.ContactRec.ProgramNameS3F__c: ' ';
    }
    get Term_Due_Scenario_1(){
        return this.ContactRec ? this.ContactRec.Term_Due_Scenario_1__c: ' ';
    }
    get Term_Due_Scenario_2(){
        return this.ContactRec ? this.ContactRec.Term_Due_Scenario_2__c: ' ';
    }
    get Term_Due_Scenario_3(){
        return this.ContactRec ? this.ContactRec.Term_Due_Scenario_3__c: ' ';
    }
    get FeeScenario1(){
        return this.ContactRec ? this.ContactRec.FeeScenario1__c: ' ';
    }
    get FeeScenario2(){
        return this.ContactRec ? this.ContactRec.FeeScenario2__c: ' ';
    }
    get FeeScenario3(){
        return this.ContactRec ? this.ContactRec.FeeScenario3__c: ' ';
    }
    get First_Loan_Amount_Scenario_1(){
        return this.ContactRec ? this.ContactRec.First_Loan_Amount_Scenario_1__c: ' ';
    }
    get First_Loan_Amount_Scenario_2(){
        return this.ContactRec ? this.ContactRec.First_Loan_Amount_Scenario_2__c: ' ';
    }
    get First_Loan_Amount_Scenario_3(){
        return this.ContactRec ? this.ContactRec.First_Loan_Amount_Scenario_3__c: ' ';
    }
    get Rate_Scenario_1(){
        return this.ContactRec ? this.ContactRec.Rate_Scenario_1__c: ' ';
    }
    get Rate_Scenario_2(){
        return this.ContactRec ? this.ContactRec.RateScenario2__c: ' ';
    }
    get Rate_Scenario_3(){
        return this.ContactRec ? this.ContactRec.RateScenario3__c: ' ';
    }
    get LTV_Scenario_1(){
        return this.ContactRec ? this.ContactRec.LTV_Scenario_1__c: ' ';
    }
    get LTV_Scenario_2(){
        return this.ContactRec ? this.ContactRec.LTV_Scenario_2__c: ' ';
    }
    get LTV_Scenario_3(){
        return this.ContactRec ? this.ContactRec.LTV_Scenario_3__c: ' ';
    }
    get CLTV_Scenario_1(){
        return this.ContactRec ? this.ContactRec.CLTV_Scenario_1__c: ' ';
    }
    get CLTV_Scenario_2(){
        return this.ContactRec ? this.ContactRec.CLTV_Scenario_2__c: ' ';
    }
    get CLTV_Scenario_3(){
        return this.ContactRec ? this.ContactRec.CLTV_Scenario_3__c: ' ';
    }
    get Monthly_Payment_Scenario_1(){
        return this.ContactRec ? this.ContactRec.Monthly_Payment_Scenario_1__c: ' ';
    }
    get Monthly_Payment_Scenario_2(){
        return this.ContactRec ? this.ContactRec.Monthly_Payment_Scenario_2__c: ' ';
    }
    get Monthly_Payment_Scenario_3(){
        return this.ContactRec ? this.ContactRec.Monthly_Payment_Scenario_3__c: ' ';
    }
    get EstimatedTaxesScenario1(){
        return this.ContactRec ? this.ContactRec.EstimatedTaxesScenario1__c: ' ';
    }
    get EstimatedTaxesScenario2(){
        return this.ContactRec ? this.ContactRec.EstimatedTaxesScenario2__c: ' ';
    }
    get EstimatedTaxesScenario3(){
        return this.ContactRec ? this.ContactRec.EstimatedTaxesScenario3__c: ' ';
    }
    get EstimatedInsuranceScenario1(){
        return this.ContactRec ? this.ContactRec.EstimatedInsuranceScenario1__c: ' ';
    }
    get EstimatedInsuranceScenario2(){
        return this.ContactRec ? this.ContactRec.EstimatedInsuranceScenario2__c: ' ';
    }
    get EstimatedInsuranceScenario3(){
        return this.ContactRec ? this.ContactRec.EstimatedInsuranceScenario3__c: ' ';
    }
    get EstimatedMortgageInsuranceScenario1(){
        return this.ContactRec ? this.ContactRec.EstimatedMortgageInsuranceScenario1__c: ' ';
    }
    get EstimatedMortgageInsuranceScenario2(){
        return this.ContactRec ? this.ContactRec.EstimatedMortgageInsuranceScenario2__c: ' ';
    }
    get EstimatedMortgageInsuranceScenario3(){
        return this.ContactRec ? this.ContactRec.EstimatedMortgageInsuranceScenario3__c: ' ';
    }
    get EstimatedHOAScenario1(){
        return this.ContactRec ? this.ContactRec.EstimatedHOAScenario1__c: ' ';
    }
    get EstimatedHOAScenario2(){
        return this.ContactRec ? this.ContactRec.EstimatedHOAScenario2__c: ' ';
    }
    get EstimatedHOAScenario3(){
        return this.ContactRec ? this.ContactRec.EstimatedHOAScenario3__c: ' ';
    }
    get TotalMonthlyPaymentScenario1(){
        return this.ContactRec ? this.ContactRec.TotalMonthlyPaymentScenario1__c: ' ';
    }
    get TotalMonthlyPaymentScenario2(){
        return this.ContactRec ? this.ContactRec.TotalMonthlyPaymentScenario2__c: ' ';
    }
    get TotalMonthlyPaymentScenario3(){
        return this.ContactRec ? this.ContactRec.TotalMonthlyPaymentScenario3__c: ' ';
    }
    get Total_Interest_Scenario_1(){
        return this.ContactRec ? this.ContactRec.Total_Interest_Scenario_1__c: ' ';
    }
    get Total_Interest_Scenario_2(){
        return this.ContactRec ? this.ContactRec.Total_Interest_Scenario_2__c: ' ';
    }
    get Total_Interest_Scenario_3(){
        return this.ContactRec ? this.ContactRec.Total_Interest_Scenario_3__c: ' ';
    }
    get EstimatedFundstoCloseScenario1(){
        return this.ContactRec ? this.ContactRec.EstimatedFundstoCloseScenario1__c: ' ';
    }
    get EstimatedFundstoCloseScenario2(){
        return this.ContactRec ? this.ContactRec.EstimatedFundstoCloseScenario2__c: ' ';
    }
    get EstimatedFundstoCloseScenario3(){
        return this.ContactRec ? this.ContactRec.EstimatedFundstoCloseScenario3__c: ' ';
    }
    get Monthly_Payment_Savings_Scenario_1(){
        return this.ContactRec ? this.ContactRec.Monthly_Payment_Savings_Scenario_1__c: ' ';
    }
    get Monthly_Payment_Savings_Scenario_2(){
        return this.ContactRec ? this.ContactRec.Monthly_Payment_Savings_Scenario_2__c: ' ';
    }
    get Monthly_Payment_Savings_Scenario_3(){
        return this.ContactRec ? this.ContactRec.Monthly_Payment_Savings_Scenario_3__c: ' ';
    }
    get Daily_Interest_Savings_Scenario_1(){
        return this.ContactRec ? this.ContactRec.Daily_Interest_Savings_Scenario_1__c: ' ';
    }
    get Daily_Interest_Savings_Scenario_2(){
        return this.ContactRec ? this.ContactRec.Daily_Interest_Savings_Scenario_2__c: ' ';
    }
    get Daily_Interest_Savings_Scenario_3(){
        return this.ContactRec ? this.ContactRec.Daily_Interest_Savings_Scenario_3__c: ' ';
    }
    get On_Pace_Payment_Scenario_1(){
        return this.ContactRec ? this.ContactRec.On_Pace_Payment_Scenario_1__c: ' ';
    }
    get On_Pace_Payment_Scenario_2(){
        return this.ContactRec ? this.ContactRec.On_Pace_Payment_Scenario_2__c: ' ';
    }
    get On_Pace_Payment_Scenario_3(){
        return this.ContactRec ? this.ContactRec.On_Pace_Payment_Scenario_3__c: ' ';
    }
    get On_Pace_Savings_Scenario_1(){
        return this.ContactRec ? this.ContactRec.On_Pace_Savings_Scenario_1__c: ' ';
    }
    get On_Pace_Savings_Scenario_2(){
        return this.ContactRec ? this.ContactRec.On_Pace_Savings_Scenario_2__c: ' ';
    }
    get On_Pace_Savings_Scenario_3(){
        return this.ContactRec ? this.ContactRec.On_Pace_Savings_Scenario_3__c: ' ';
    }
    get Maturity_Reduction_Scenario_1(){
        return this.ContactRec ? this.ContactRec.Maturity_Reduction_Scenario_1__c: ' ';
    }
    get Maturity_Reduction_Scenario_2(){
        return this.ContactRec ? this.ContactRec.Maturity_Reduction_Scenario_2__c: ' ';
    }
    get Maturity_Reduction_Scenario_3(){
        return this.ContactRec ? this.ContactRec.Maturity_Reduction_Scenario_3__c: ' ';
    }
    get Lifetime_Savings_Scenario_1(){
        return this.ContactRec ? this.ContactRec.Lifetime_Savings_Scenario_1__c: ' ';
    }
    get Lifetime_Savings_Scenario_2(){
        return this.ContactRec ? this.ContactRec.Lifetime_Savings_Scenario_2__c: ' ';
    }
    get Lifetime_Savings_Scenario_3(){
        return this.ContactRec ? this.ContactRec.Lifetime_Savings_Scenario_3__c: ' ';
    }
    get SolidifyContactName(){
        return this.ContactRec ? this.ContactRec.SolidifyContact__r.Name: ' ';
    }
    get SolidifyContactFullPhotoUrl(){
        return this.ContactRec ? this.ContactRec.SolidifyContact__r.MediumPhotoUrl: ' ';
    }
    get SolidifyContactMobilePhone(){
        return this.ContactRec ? this.ContactRec.SolidifyContact__r.MobilePhone: ' ';
    }
    get SolidifyContactEmail(){
        return this.ContactRec ? this.ContactRec.SolidifyContact__r.Email: ' ';
    }
    get SolidifyContactLink(){
        return this.ContactRec ? this.ContactRec.SolidifyContact__r.ApplyNowwebsiteLink__c: ' ';
    }
    get SolidifyContactMLS(){
        return this.ContactRec ? this.ContactRec.SolidifyContact__r.MLSNumber__c: ' ';
    }

    get DiscountCreditS1(){
        return this.ContactRec ? this.ContactRec.DiscountCreditS1__c: ' ';
    }
    get LenderFeeS1(){
        return this.ContactRec ? this.ContactRec.LenderFeeS1__c: ' ';
    }
    get AppraisalFeeS1(){
        return this.ContactRec ? this.ContactRec.AppraisalFeeS1__c: ' ';
    }
    get CreditReportFeeS1(){
        return this.ContactRec ? this.ContactRec.CreditReportFeeS1__c: ' ';
    }
    get EscrowFeesS1(){
        return this.ContactRec ? this.ContactRec.EscrowFeesS1__c: ' ';
    }
    get TitleFeeS1(){
        return this.ContactRec ? this.ContactRec.TitleFeeS1__c: ' ';
    }
    get RecordingFeeS1(){
        return this.ContactRec ? this.ContactRec.RecordingFeeS1__c: ' ';
    }
    get TotalFeesS1(){
        return this.ContactRec ? this.ContactRec.TotalFeesS1__c: ' ';
    }
    get DiscountCreditS2(){
        return this.ContactRec ? this.ContactRec.DiscountCreditS2__c: ' ';
    }
    get LenderFeeS2(){
        return this.ContactRec ? this.ContactRec.LenderFeeS2__c: ' ';
    }
    get AppraisalFeeS2(){
        return this.ContactRec ? this.ContactRec.AppraisalFeeS2__c: ' ';
    }
    get CreditReportFeeS2(){
        return this.ContactRec ? this.ContactRec.CreditReportFeeS2__c: ' ';
    }
    get EscrowFeesS2(){
        return this.ContactRec ? this.ContactRec.EscrowFeesS2__c: ' ';
    }
    get TitleFeeS2(){
        return this.ContactRec ? this.ContactRec.TitleFeeS2__c: ' ';
    }
    get RecordingFeeS2(){
        return this.ContactRec ? this.ContactRec.RecordingFeeS2__c: ' ';
    }
    get TotalFeesS2(){
        return this.ContactRec ? this.ContactRec.TotalFeesS2__c: ' ';
    }
    get DiscountCreditS3(){
        return this.ContactRec ? this.ContactRec.DiscountCreditS3__c: ' ';
    }
    get LenderFeeS3(){
        return this.ContactRec ? this.ContactRec.LenderFeeS3__c: ' ';
    }
    get AppraisalFeeS3(){
        return this.ContactRec ? this.ContactRec.AppraisalFeeS3__c: ' ';
    }
    get CreditReportFeeS3(){
        return this.ContactRec ? this.ContactRec.CreditReportFeeS3__c: ' ';
    }
    get EscrowFeesS3(){
        return this.ContactRec ? this.ContactRec.EscrowFeesS3__c: ' ';
    }
    get TitleFeeS3(){
        return this.ContactRec ? this.ContactRec.TitleFeeS3__c: ' ';
    }
    get RecordingFeeS3(){
        return this.ContactRec ? this.ContactRec.RecordingFeeS3__c: ' ';
    }
    get TotalFeesS3(){
        return this.ContactRec ? this.ContactRec.TotalFeesS3__c: ' ';
    }
    get FirstName(){
        return this.ContactRec ? this.ContactRec.FirstName: ' ';
    }
    get LastName(){
        return this.ContactRec ? this.ContactRec.LastName: ' ';
    }
    get Name(){
        return this.ContactRec ? this.ContactRec.Name: ' ';
    }
    get SelectedProperty(){
        return this.ContactRec ? this.ContactRec.SelectedProperty__r.Name: ' ';
    }
    get Subject_Property_Street(){
        return this.ContactRec ? this.ContactRec.SelectedProperty__r.Property_Street__c: ' ';
    }
    get PropertyOccupancy(){
        return this.ContactRec ? this.ContactRec.PropertyOccupancy__c: ' ';
    }
    get PropertyType(){
        return this.ContactRec ? this.ContactRec.PropertyType__c: ' ';
    }
    get PropertyNumberofUnits(){
        return this.ContactRec ? this.ContactRec.PropertyNumberofUnits__c: ' ';
    }
    get PropertyEstimatedValue(){
        return this.ContactRec ? this.ContactRec.PropertyEstimatedValue__c: ' ';
    }
    get PropertyPurpose(){
        return this.ContactRec ? this.ContactRec.PropertyPurpose__c: ' ';
    }
    get PropertyPurchasePrice(){
        return this.ContactRec ? this.ContactRec.PropertyPurchasePrice__c: ' ';
    }
    get PropertyAppraisedValue(){
        return this.ContactRec ? this.ContactRec.PropertyAppraisedValue__c: ' ';
    }
    get PropertyLoanAmountwithMIP(){
        return this.ContactRec ? this.ContactRec.PropertyLoanAmountwithMIP__c: ' ';
    }
    get PropertyLTV(){
        return this.ContactRec ? this.ContactRec.PropertyLTV__c: ' ';
    }
    get PropertyMostRecentClosing(){
        return this.ContactRec ? this.ContactRec.PropertyMostRecentClosing__c: ' ';
    }
    get PropertyDayssinceRecentClosing(){
        return this.ContactRec ? this.ContactRec.PropertyDayssinceRecentClosing__c: ' ';
    }
    get PropertyLender(){
        return this.ContactRec ? this.ContactRec.PropertyLender__c: ' ';
    }
    get PropertyLoanProgram(){
        return this.ContactRec ? this.ContactRec.PropertyLoanProgram__c: ' ';
    }
    get PropertyRate(){
        return this.ContactRec ? this.ContactRec.PropertyRate__c: ' ';
    }
    get PropertyScheduledBalance(){
        return this.ContactRec ? this.ContactRec.PropertyScheduledBalance__c: ' ';
    }
    get PropertyPaymentAmount(){
        return this.ContactRec ? this.ContactRec.PropertyPaymentAmount__c: ' ';
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
        return this.ContactRec ? this.ContactRec.UFMIPFFS1__c: ' ';
    }
    get UFMIPFFS2(){
        return this.ContactRec ? this.ContactRec.UFMIPFFS2__c: ' ';
    }
    get UFMIPFFS3(){
        return this.ContactRec ? this.ContactRec.UFMIPFFS3__c: ' ';
    }
    get LoanAmountwithUFMIPFFS1(){
        return this.ContactRec ? this.ContactRec.LoanAmountwithUFMIPFFS1__c: ' ';
    }
    get LoanAmountwithUFMIPFFS2(){
        return this.ContactRec ? this.ContactRec.LoanAmountwithUFMIPFFS2__c: ' ';
    }
    get LoanAmountwithUFMIPFFS3(){
        return this.ContactRec ? this.ContactRec.LoanAmountwithUFMIPFFS3__c: ' ';
    }
    get CancelMIAtS1(){
        return this.ContactRec ? this.ContactRec.CancelMIAtS1__c: ' ';
    }
    get CancelMIAtS2(){
        return this.ContactRec ? this.ContactRec.CancelMIAtS2__c: ' ';
    }
    get CancelMIAtS3(){
        return this.ContactRec ? this.ContactRec.CancelMIAtS3__c: ' ';
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