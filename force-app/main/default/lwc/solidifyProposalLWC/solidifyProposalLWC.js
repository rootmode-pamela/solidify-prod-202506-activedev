import {LightningElement, api, wire, track} from 'lwc';
import getProposalFields from '@salesforce/apex/SolidifyComparisonController.getProposalInfo';

import PROPOSAL_OBJECT from '@salesforce/schema/Proposal__c';

export default class solidifyProposalLWC extends LightningElement {
    
    ProposalObject = PROPOSAL_OBJECT;
    @track ProposalRec;
    @api recordId;
    @api objectApiName;

    @track isRefinance = true;
    @track coBorrowerActive = false;
    @track parameterId;
    @track addressEmpty = true;

    @track TIIH1 = true;
    @track TIIH2 = true;
    @track TIIH3 = true;
    @track hideFundsToClose = false;


    connectedCallback() {

        this.parameters = this.getQueryParameters();   
        let recordId = this.parameters.id;
    //    console.log('---- recordId: '+recordId);
        this.parameterId = recordId;

        getProposalFields({recordId : this.parameterId})
        .then(result => { 
 //           console.log('-----result:   '+JSON.stringify(result));
            this.ProposalRec = result;
            console.log('-----Purpose:   '+this.ProposalRec.Purpose__c);
            if (this.ProposalRec.Purpose__c == 'Purchase') {
                this.isRefinance = false;
            } else if(this.ProposalRec.Purpose__c == 'Refinance' || this.ProposalRec.Purpose__c == 'Refi_No_Cashout' || this.ProposalRec.Purpose__c == 'Refi_Cashout'){
                this.isRefinance = true;
            }
            if (this.ProposalRec.CoBorrower_FirstName__c == null || this.ProposalRec.CoBorrower_LastName__c == null) {
                this.coBorrowerActive = false;
            } else {
                this.coBorrowerActive = true;
            }
            if (this.ProposalRec.EstimatedTaxesScenario1__c  == null || this.ProposalRec.EstimatedInsuranceScenario1__c == null) {
                this.TIIH1 = false;
            } else {
                this.TIIH1 = true;
            }
            if (this.ProposalRec.EstimatedTaxesScenario2__c  == null || this.ProposalRec.EstimatedInsuranceScenario2__c == null) {
                this.TIIH2 = false;
            } else {
                this.TIIH2 = true;
            }
            if (this.ProposalRec.EstimatedTaxesScenario3__c  == null || this.ProposalRec.EstimatedInsuranceScenario3__c == null) {
                this.TIIH3 = false;
            } else {
                this.TIIH3 = true;
            }
            console.log('Property ' + this.ProposalRec.Property__c + ':' + this.addressEmpty);
           if (this.ProposalRec.Property__c && this.ProposalRec.Property__r.Property_Street__c != null) {
                this.addressEmpty = false;
                console.log(this.addressEmpty);
            } 
            console.log('hide:' + this.ProposalRec.Hide_Funds_To_Close_Client_View__c);
            if (this.ProposalRec.Hide_Funds_To_Close_Client_View__c == true){
                this.hideFundsToClose = true;
                console.log('hideClose:'+this.hideFundsToClose);
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
        return this.ProposalRec ? this.ProposalRec.APRScenario1__c: ' ';
    }
    get APR2(){
        return this.ProposalRec ? this.ProposalRec.APRScenario2__c: ' ';
    }
    get APR3(){
        return this.ProposalRec ? this.ProposalRec.APRScenario3__c: ' ';
    }
    get occupancy(){
        return this.ProposalRec ? this.ProposalRec.Occupancy__c: ' ';
    }
    get subjectProperty(){
        return this.ProposalRec ? this.ProposalRec.Subject_Property_Type__c: ' ';
    }
    get numberOfUnits(){
        return this.ProposalRec ? this.ProposalRec.Number_of_Units__c: ' ';
    }
    get estimatedValue(){
        return this.ProposalRec ? this.ProposalRec.Estimated_Value__c: ' ';
    }
    get currentProgram(){
        return this.ProposalRec ? this.ProposalRec.Current_Program__c: ' ';
    }
    get currentBalance(){
        return this.ProposalRec ? this.ProposalRec.Current_Balance__c: ' ';
    }
    get CurrentRate(){
        return this.ProposalRec ? this.ProposalRec.Current_Rate__c: ' ';
    }
    get CurrentPayment(){
        return this.ProposalRec ? this.ProposalRec.Current_Payment__c: ' ';
    }
    get YearsRemainingOnCurrentLoan(){
        return this.ProposalRec ? this.ProposalRec.Years_Remaining_on_Current_Loan__c: ' ';
    }
    get Total_Interest_Remaining_on_Current_Loan(){
        return this.ProposalRec ? this.ProposalRec.Total_Interest_Remaining_on_Current_Loan__c: ' ';
    }
    get Purpose(){
        return this.ProposalRec ? this.ProposalRec.Purpose__c: ' ';
    }
    get Purchase_Price(){
        return this.ProposalRec ? this.ProposalRec.Purchase_Price__c: ' ';
    }
    get Purchase_Price_S1(){
        return this.ProposalRec ? this.ProposalRec.Purchase_Price_S1__c: ' ';
    }
    get Purchase_Price_S2(){
        return this.ProposalRec ? this.ProposalRec.Purchase_Price_S2__c: ' ';
    }
    get Purchase_Price_S3(){
        return this.ProposalRec ? this.ProposalRec.Purchase_Price_S2__c: ' ';
    }
    get Qualifying_Fico(){
        return this.ProposalRec ? this.ProposalRec.Qualifying_Fico__c: ' ';
    }
    get First_Time_Homebuyer(){
        return this.ProposalRec ? this.ProposalRec.First_Time_Homebuyer__c: ' ';
    }
    get Veteran(){
        return this.ProposalRec ? this.ProposalRec.Veteran__c: ' ';
    }
    get Purpose_Scenario_1(){
        return this.ProposalRec ? this.ProposalRec.Purpose_Scenario_1__c: ' ';
    }
    get Purpose_Scenario_2(){
        return this.ProposalRec ? this.ProposalRec.Purpose_Scenario_2__c: ' ';
    }
    get Purpose_Scenario_3(){
        return this.ProposalRec ? this.ProposalRec.Purpose_Scenario_3__c: ' ';
    }
    get DownPaymentScenario1(){
        return this.ProposalRec ? this.ProposalRec.DownPaymentScenario1__c: ' ';
    }
    get DownPaymentScenario2(){
        return this.ProposalRec ? this.ProposalRec.DownPaymentScenario2__c: ' ';
    }
    get DownPaymentScenario3(){
        return this.ProposalRec ? this.ProposalRec.DownPaymentScenario3__c: ' ';
    }
    get Loan_Program_Scenario_1(){
        return this.ProposalRec ? this.ProposalRec.Loan_Program_Scenario_1__c: ' ';
    }
    get Loan_Program_Scenario_2(){
        return this.ProposalRec ? this.ProposalRec.Loan_Program_Scenario_2__c: ' ';
    }
    get Loan_Program_Scenario_3(){
        return this.ProposalRec ? this.ProposalRec.Loan_Program_Scenario_3__c: ' ';
    }
    get ProgramNameS1F(){
        return this.ProposalRec?.ProgramNameS1F__c;
    }
    get ProgramNameS2F(){
        return this.ProposalRec ? this.ProposalRec.ProgramNameS2F__c: ' ';
    }
    get ProgramNameS3F(){
        return this.ProposalRec ? this.ProposalRec.ProgramNameS3F__c: ' ';
    }
    get Term_Due_Scenario_1(){
        return this.ProposalRec ? this.ProposalRec.Term_Due_Scenario_1__c: ' ';
    }
    get Term_Due_Scenario_2(){
        return this.ProposalRec ? this.ProposalRec.Term_Due_Scenario_2__c: ' ';
    }
    get Term_Due_Scenario_3(){
        return this.ProposalRec ? this.ProposalRec.Term_Due_Scenario_3__c: ' ';
    }
    get FeeScenario1(){
        return this.ProposalRec ? this.ProposalRec.FeeScenario1__c: ' ';
    }
    get FeeScenario2(){
        return this.ProposalRec ? this.ProposalRec.FeeScenario2__c: ' ';
    }
    get FeeScenario3(){
        return this.ProposalRec ? this.ProposalRec.FeeScenario3__c: ' ';
    }
    get First_Loan_Amount_Scenario_1(){
        return this.ProposalRec ? this.ProposalRec.First_Loan_Amount_Scenario_1__c: ' ';
    }
    get First_Loan_Amount_Scenario_2(){
        return this.ProposalRec ? this.ProposalRec.First_Loan_Amount_Scenario_2__c: ' ';
    }
    get First_Loan_Amount_Scenario_3(){
        return this.ProposalRec ? this.ProposalRec.First_Loan_Amount_Scenario_3__c: ' ';
    }
    get Rate_Scenario_1(){
        return this.ProposalRec ? this.ProposalRec.Rate_Scenario_1__c: ' ';
    }
    get Rate_Scenario_2(){
        return this.ProposalRec ? this.ProposalRec.Rate_Scenario_2__c: ' ';
    }
    get Rate_Scenario_3(){
        return this.ProposalRec ? this.ProposalRec.Rate_Scenario_3__c: ' ';
    }
    get LTV_Scenario_1(){
        return this.ProposalRec ? this.ProposalRec.LTV_Scenario_1__c: ' ';
    }
    get LTV_Scenario_2(){
        return this.ProposalRec ? this.ProposalRec.LTV_Scenario_2__c: ' ';
    }
    get LTV_Scenario_3(){
        return this.ProposalRec ? this.ProposalRec.LTV_Scenario_3__c: ' ';
    }
    get CLTV_Scenario_1(){
        return this.ProposalRec ? this.ProposalRec.CLTV_Scenario_1__c: ' ';
    }
    get CLTV_Scenario_2(){
        return this.ProposalRec ? this.ProposalRec.CLTV_Scenario_2__c: ' ';
    }
    get CLTV_Scenario_3(){
        return this.ProposalRec ? this.ProposalRec.CLTV_Scenario_3__c: ' ';
    }
    get Monthly_Payment_Scenario_1(){
        return this.ProposalRec ? this.ProposalRec.Monthly_Payment_Scenario_1__c: ' ';
    }
    get Monthly_Payment_Scenario_2(){
        return this.ProposalRec ? this.ProposalRec.Monthly_Payment_Scenario_2__c: ' ';
    }
    get Monthly_Payment_Scenario_3(){
        return this.ProposalRec ? this.ProposalRec.Monthly_Payment_Scenario_3__c: ' ';
    }
    get EstimatedTaxesScenario1(){
        return this.ProposalRec ? this.ProposalRec.EstimatedTaxesScenario1__c: ' ';
    }
    get EstimatedTaxesScenario2(){
        return this.ProposalRec ? this.ProposalRec.EstimatedTaxesScenario2__c: ' ';
    }
    get EstimatedTaxesScenario3(){
        return this.ProposalRec ? this.ProposalRec.EstimatedTaxesScenario3__c: ' ';
    }
    get EstimatedInsuranceScenario1(){
        return this.ProposalRec ? this.ProposalRec.EstimatedInsuranceScenario1__c: ' ';
    }
    get EstimatedInsuranceScenario2(){
        return this.ProposalRec ? this.ProposalRec.EstimatedInsuranceScenario2__c: ' ';
    }
    get EstimatedInsuranceScenario3(){
        return this.ProposalRec ? this.ProposalRec.EstimatedInsuranceScenario3__c: ' ';
    }
    get EstimatedMortgageInsuranceScenario1(){
        return this.ProposalRec ? this.ProposalRec.EstimatedMortgageInsuranceScenario1__c: ' ';
    }
    get EstimatedMortgageInsuranceScenario2(){
        return this.ProposalRec ? this.ProposalRec.EstimatedMortgageInsuranceScenario2__c: ' ';
    }
    get EstimatedMortgageInsuranceScenario3(){
        return this.ProposalRec ? this.ProposalRec.EstimatedMortgageInsuranceScenario3__c: ' ';
    }
    get EstimatedHOAScenario1(){
        return this.ProposalRec ? this.ProposalRec.EstimatedHOAScenario1__c: ' ';
    }
    get EstimatedHOAScenario2(){
        return this.ProposalRec ? this.ProposalRec.EstimatedHOAScenario2__c: ' ';
    }
    get EstimatedHOAScenario3(){
        return this.ProposalRec ? this.ProposalRec.EstimatedHOAScenario3__c: ' ';
    }
    get TotalMonthlyPaymentScenario1(){
        return this.ProposalRec ? this.ProposalRec.TotalMonthlyPaymentScenario1__c: ' ';
    }
    get TotalMonthlyPaymentScenario2(){
        return this.ProposalRec ? this.ProposalRec.TotalMonthlyPaymentScenario2__c: ' ';
    }
    get TotalMonthlyPaymentScenario3(){
        return this.ProposalRec ? this.ProposalRec.TotalMonthlyPaymentScenario3__c: ' ';
    }
    get Total_Interest_Scenario_1(){
        return this.ProposalRec ? this.ProposalRec.Total_Interest_Scenario_1__c: ' ';
    }
    get Total_Interest_Scenario_2(){
        return this.ProposalRec ? this.ProposalRec.Total_Interest_Scenario_2__c: ' ';
    }
    get Total_Interest_Scenario_3(){
        return this.ProposalRec ? this.ProposalRec.Total_Interest_Scenario_3__c: ' ';
    }
    get EstimatedFundstoCloseScenario1(){
        return this.ProposalRec ? this.ProposalRec.EstimatedFundstoCloseScenario1__c: ' ';
    }
    get EstimatedFundstoCloseScenario2(){
        return this.ProposalRec ? this.ProposalRec.EstimatedFundstoCloseScenario2__c: ' ';
    }
    get EstimatedFundstoCloseScenario3(){
        return this.ProposalRec ? this.ProposalRec.EstimatedFundstoCloseScenario3__c: ' ';
    }
    get Monthly_Payment_Savings_Scenario_1(){
        return this.ProposalRec ? this.ProposalRec.Monthly_Payment_Savings_Scenario_1__c: ' ';
    }
    get Monthly_Payment_Savings_Scenario_2(){
        return this.ProposalRec ? this.ProposalRec.Monthly_Payment_Savings_Scenario_2__c: ' ';
    }
    get Monthly_Payment_Savings_Scenario_3(){
        return this.ProposalRec ? this.ProposalRec.Monthly_Payment_Savings_Scenario_3__c: ' ';
    }
    get Daily_Interest_Savings_Scenario_1(){
        return this.ProposalRec ? this.ProposalRec.Daily_Interest_Savings_Scenario_1__c: ' ';
    }
    get Daily_Interest_Savings_Scenario_2(){
        return this.ProposalRec ? this.ProposalRec.Daily_Interest_Savings_Scenario_2__c: ' ';
    }
    get Daily_Interest_Savings_Scenario_3(){
        return this.ProposalRec ? this.ProposalRec.Daily_Interest_Savings_Scenario_3__c: ' ';
    }
    get On_Pace_Payment_Scenario_1(){
        return this.ProposalRec ? this.ProposalRec.On_Pace_Payment_Scenario_1__c: ' ';
    }
    get On_Pace_Payment_Scenario_2(){
        return this.ProposalRec ? this.ProposalRec.On_Pace_Payment_Scenario_2__c: ' ';
    }
    get On_Pace_Payment_Scenario_3(){
        return this.ProposalRec ? this.ProposalRec.On_Pace_Payment_Scenario_3__c: ' ';
    }
    get On_Pace_Savings_Scenario_1(){
        return this.ProposalRec ? this.ProposalRec.On_Pace_Savings_Scenario_1__c: ' ';
    }
    get On_Pace_Savings_Scenario_2(){
        return this.ProposalRec ? this.ProposalRec.On_Pace_Savings_Scenario_2__c: ' ';
    }
    get On_Pace_Savings_Scenario_3(){
        return this.ProposalRec ? this.ProposalRec.On_Pace_Savings_Scenario_3__c: ' ';
    }
    get Maturity_Reduction_Scenario_1(){
        return this.ProposalRec ? this.ProposalRec.Maturity_Reduction_Scenario_1__c: ' ';
    }
    get Maturity_Reduction_Scenario_2(){
        return this.ProposalRec ? this.ProposalRec.Maturity_Reduction_Scenario_2__c: ' ';
    }
    get Maturity_Reduction_Scenario_3(){
        return this.ProposalRec ? this.ProposalRec.Maturity_Reduction_Scenario_3__c: ' ';
    }
    get Lifetime_Savings_Scenario_1(){
        return this.ProposalRec ? this.ProposalRec.Lifetime_Savings_Scenario_1__c: ' ';
    }
    get Lifetime_Savings_Scenario_2(){
        return this.ProposalRec ? this.ProposalRec.Lifetime_Savings_Scenario_2__c: ' ';
    }
    get Lifetime_Savings_Scenario_3(){
        return this.ProposalRec ? this.ProposalRec.Lifetime_Savings_Scenario_3__c: ' ';
    }
    get SolidifyContactName(){
        return this.ProposalRec ? this.ProposalRec.SolidifyContact__r?.Name: ' ';
    }
    get SolidifyContactFullPhotoUrl(){
        return this.ProposalRec ? this.ProposalRec.SolidifyContact__r?.MediumPhotoUrl: ' ';
    }
    get SolidifyContactMobilePhone(){
        return this.ProposalRec ? this.ProposalRec.SolidifyContact__r?.MobilePhone: ' ';
    }
    get SolidifyContactEmail(){
        return this.ProposalRec ? this.ProposalRec.SolidifyContact__r?.Email: ' ';
    }
    get SolidifyContactLink(){
        let url = this.ProposalRec ? this.ProposalRec.SolidifyContact__r?.ApplyNowwebsiteLink__c: ' ';
        if(url == null || url == ''){
            url = 'https://solidify.com/loan-application/?loanapp&siteid=4788621173&lar=admin&workFlowId=159718';
        }
        return url;
    }
    get SolidifyContactMLS(){
        return this.ProposalRec ? this.ProposalRec.SolidifyContact__r?.MLSNumber__c: ' ';
    }

    get DiscountCreditS1(){
        return this.ProposalRec ? this.ProposalRec.DiscountCreditS1__c: ' ';
    }
    get LenderFeeS1(){
        return this.ProposalRec ? this.ProposalRec.LenderFeeS1__c: ' ';
    }
    get AppraisalFeeS1(){
        return this.ProposalRec ? this.ProposalRec.AppraisalFeeS1__c: ' ';
    }
    get CreditReportFeeS1(){
        return this.ProposalRec ? this.ProposalRec.CreditReportFeeS1__c: ' ';
    }
    get EscrowFeesS1(){
        return this.ProposalRec ? this.ProposalRec.EscrowFeesS1__c: ' ';
    }
    get TitleFeeS1(){
        return this.ProposalRec ? this.ProposalRec.TitleFeeS1__c: ' ';
    }
    get RecordingFeeS1(){
        return this.ProposalRec ? this.ProposalRec.RecordingFeeS1__c: ' ';
    }
    get TotalFeesS1(){
        return this.ProposalRec ? this.ProposalRec.TotalFeesS1__c: ' ';
    }
    get SellerCredit1(){
        return this.ProposalRec ? this.ProposalRec.SellerCredit1__c: ' ';
    }
    get CashDeposit1(){
        return this.ProposalRec ? this.ProposalRec.CashDeposit1__c: ' ';
    }
    get DiscountCreditS2(){
        return this.ProposalRec ? this.ProposalRec.DiscountCreditS2__c: ' ';
    }
    get LenderFeeS2(){
        return this.ProposalRec ? this.ProposalRec.LenderFeeS2__c: ' ';
    }
    get AppraisalFeeS2(){
        return this.ProposalRec ? this.ProposalRec.AppraisalFeeS2__c: ' ';
    }
    get CreditReportFeeS2(){
        return this.ProposalRec ? this.ProposalRec.CreditReportFeeS2__c: ' ';
    }
    get EscrowFeesS2(){
        return this.ProposalRec ? this.ProposalRec.EscrowFeesS2__c: ' ';
    }
    get TitleFeeS2(){
        return this.ProposalRec ? this.ProposalRec.TitleFeeS2__c: ' ';
    }
    get RecordingFeeS2(){
        return this.ProposalRec ? this.ProposalRec.RecordingFeeS2__c: ' ';
    }
    get TotalFeesS2(){
        return this.ProposalRec ? this.ProposalRec.TotalFeesS2__c: ' ';
    }
    get DiscountCreditS3(){
        return this.ProposalRec ? this.ProposalRec.DiscountCreditS3__c: ' ';
    }
    get SellerCredit2(){
        return this.ProposalRec ? this.ProposalRec.SellerCredit2__c: ' ';
    }
    get CashDeposit2(){
        return this.ProposalRec ? this.ProposalRec.CashDeposit2__c: ' ';
    }
    get LenderFeeS3(){
        return this.ProposalRec ? this.ProposalRec.LenderFeeS3__c: ' ';
    }
    get AppraisalFeeS3(){
        return this.ProposalRec ? this.ProposalRec.AppraisalFeeS3__c: ' ';
    }
    get CreditReportFeeS3(){
        return this.ProposalRec ? this.ProposalRec.CreditReportFeeS3__c: ' ';
    }
    get EscrowFeesS3(){
        return this.ProposalRec ? this.ProposalRec.EscrowFeesS3__c: ' ';
    }
    get TitleFeeS3(){
        return this.ProposalRec ? this.ProposalRec.TitleFeeS3__c: ' ';
    }
    get RecordingFeeS3(){
        return this.ProposalRec ? this.ProposalRec.RecordingFeeS3__c: ' ';
    }
    get TotalFeesS3(){
        return this.ProposalRec ? this.ProposalRec.TotalFeesS3__c: ' ';
    }
    get SellerCredit3(){
        return this.ProposalRec ? this.ProposalRec.SellerCredit3__c: ' ';
    }
    get CashDeposit3(){
        return this.ProposalRec ? this.ProposalRec.CashDeposit3__c: ' ';
    }
    get FirstName(){
        return this.ProposalRec ? this.ProposalRec.FirstName: ' ';
    }
    get LastName(){
        return this.ProposalRec ? this.ProposalRec.LastName: ' ';
    }
    get BorrowerName(){
        return this.ProposalRec ? this.ProposalRec.BorrowerName__c: ' ';
    }
    get CoBorrower_FirstName(){
        return this.ProposalRec ? this.ProposalRec.CoBorrower_FirstName__c: ' ';
    }
    get CoBorrower_LastName(){
        return this.ProposalRec ? this.ProposalRec.CoBorrower_LastName__c: ' ';
    }
    get CoBorrowerName(){
        return this.CoBorrower_FirstName + ' ' + this.CoBorrower_LastName;
    }
    get Subject_Property_Street(){
        return this.ProposalRec ? this.ProposalRec.PropertyAddressText__c: ' ';
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
        return this.ProposalRec ? this.ProposalRec.UFMIPFFS1__c: ' ';
    }
    get UFMIPFFS2(){
        return this.ProposalRec ? this.ProposalRec.UFMIPFFS2__c: ' ';
    }
    get UFMIPFFS3(){
        return this.ProposalRec ? this.ProposalRec.UFMIPFFS3__c: ' ';
    }
    get LoanAmountwithUFMIPFFS1(){
        return this.ProposalRec ? this.ProposalRec.LoanAmountwithUFMIPFFS1__c: ' ';
    }
    get LoanAmountwithUFMIPFFS2(){
        return this.ProposalRec ? this.ProposalRec.LoanAmountwithUFMIPFFS2__c: ' ';
    }
    get LoanAmountwithUFMIPFFS3(){
        return this.ProposalRec ? this.ProposalRec.LoanAmountwithUFMIPFFS3__c: ' ';
    }
    get CancelMIAtS1(){
        return this.ProposalRec ? this.ProposalRec.CancelMIAtS1__c: ' ';
    }
    get CancelMIAtS2(){
        return this.ProposalRec ? this.ProposalRec.CancelMIAtS2__c: ' ';
    }
    get CancelMIAtS3(){
        return this.ProposalRec ? this.ProposalRec.CancelMIAtS3__c: ' ';
    }

    get Scenario1Name(){
        return this.ProposalRec ? this.ProposalRec.Scenario1Name__c: ' ';
    }
    get Scenario2Name(){
        return this.ProposalRec ? this.ProposalRec.Scenario2Name__c: ' ';
    }
    get Scenario3Name(){
        return this.ProposalRec ? this.ProposalRec.Scenario3Name__c: ' ';
    }


    get Borrower_Name_Text(){
        return this.ProposalRec ? this.ProposalRec.Borrower_Name_Text__c: ' ';
    }
    get Fixed_Term_Years(){
        return this.ProposalRec ? this.ProposalRec.Fixed_Term_Years__c: ' ';
    }
    get Prepared_Date(){
        return this.ProposalRec ? this.ProposalRec.Prepared_Date__c: ' ';
    }
    get New_Loan_Amount(){
        return this.ProposalRec ? this.ProposalRec.New_Loan_Amount__c: ' ';
    }
    get Estimate_Value(){
        return this.ProposalRec ? this.ProposalRec.Estimate_Value__c: ' ';
    }
    get FICO_Score(){
        return this.ProposalRec ? this.ProposalRec.FICO_Score__c: ' ';
    }
    get Lock_Period_Days(){
        return this.ProposalRec ? this.ProposalRec.Lock_Period_Days__c: ' ';
    }
    
    get EstimatedFundsToCloseS1(){
        return this.ProposalRec ? this.ProposalRec.EstimatedFundstoCloseScenario1__c: ' ';
    }
    get EstimatedFundsToCloseS2(){
        return this.ProposalRec ? this.ProposalRec.EstimatedFundstoCloseScenario2__c: ' ';
    }
    get EstimatedFundsToCloseS3(){
        return this.ProposalRec ? this.ProposalRec.EstimatedFundstoCloseScenario3__c: ' ';
    }

    get hideFundsToClose(){
        console.log('fundsToClose');
        return this.ProposalRec ? this.ProposalRec.Hide_Funds_To_Close_Client_View__c: true;
    }
    get OtherDueAtCloseS1(){
        return this.ProposalRec ? this.ProposalRec.OtherDueAtCloseS1__c: ' ';
    }
    get OtherDueAtCloseS2(){
        return this.ProposalRec ? this.ProposalRec.OtherDueAtCloseS2__c: ' ';
    }
    get OtherDueAtCloseS3(){
        return this.ProposalRec ? this.ProposalRec.OtherDueAtCloseS3__c: ' ';
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
        console.log('handleToggleClick');
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

    get InterestCalcS1() {
        console.log('interestCalcS3', this.First_Loan_Amount_Scenario_1, this.First_Loan_Amount_Scenario_1 !== ' ',
            this.CurrentRate, this.CurrentRate !== ' ', ((this.First_Loan_Amount_Scenario_1 * this.CurrentRate) / 365) * 15)
        if (this.First_Loan_Amount_Scenario_1 !== ' ' && this.CurrentRate !== ' ' && this.First_Loan_Amount_Scenario_1 != null && this.CurrentRate != null) {
            return ((this.First_Loan_Amount_Scenario_1 * this.CurrentRate/100) / 365) * 15
        }
        return 0;
    }

    get InterestCalcS2() {
        console.log('interestCalcS3', this.First_Loan_Amount_Scenario_2, this.First_Loan_Amount_Scenario_2 !== ' ',
            this.CurrentRate, this.CurrentRate !== ' ', ((this.First_Loan_Amount_Scenario_2 * this.CurrentRate) / 365) * 15)
        if (this.First_Loan_Amount_Scenario_2 !== ' ' && this.CurrentRate !== ' ' && this.First_Loan_Amount_Scenario_2 != null && this.CurrentRate != null) {
            return ((this.First_Loan_Amount_Scenario_2 * this.CurrentRate/100) / 365) * 15
        }
        return 0;
    }

    get InterestCalcS3() {
        console.log('interestCalcS3', this.First_Loan_Amount_Scenario_3, this.First_Loan_Amount_Scenario_3 !== ' ', this.CurrentRate, this.CurrentRate !== ' ', ((this.First_Loan_Amount_Scenario_3 * this.CurrentRate) / 365) * 15)
        if (this.First_Loan_Amount_Scenario_3 !== ' ' && this.CurrentRate !== ' ' && this.First_Loan_Amount_Scenario_3 != null && this.CurrentRate != null) {
            return ((this.First_Loan_Amount_Scenario_3 * this.CurrentRate/100) / 365) * 15
        }
        return 0;
    }

    get EscrowsCalcS1() {
        console.log('EscrowsCalcS1');
        console.log(this.EstimatedTaxesScenario1 + ' ' + this.ProposalRec.Escrow_Taxes_Months__c + ' ' + this.ProposalRec.Escrow_Ins_Months__c + ' ' + this.EstimatedInsuranceScenario1 + ' ' + this.OtherDueAtCloseS1 );
        let estTax = this.EstimatedTaxesScenario1;
        let escrowTaxMo = this.ProposalRec.Escrow_Taxes_Months__c;
        let escrowInsMo = this.ProposalRec.Escrow_Ins_Months__c;
        let estIns = this.EstimatedInsuranceScenario1;
        let otherToClose = this.OtherDueAtCloseS1;
        /*let estTax = this.EstimatedTaxesScenario1;
        // return (estTax*Escrow_Taxes_Months__c) + (EstimatedInsuranceScenario1__c * Escrow_Ins_Months__c)*/
        return (estTax*escrowTaxMo) + (estIns * escrowInsMo) + otherToClose;
    }

    get EscrowsCalcS2() {
        let estTax = this.EstimatedTaxesScenario2;
        let escrowTaxMo = this.ProposalRec.Escrow_Taxes_Months__c;
        let escrowInsMo = this.ProposalRec.Escrow_Ins_Months__c;
        let estIns = this.EstimatedInsuranceScenario2;
        let otherToClose = this.OtherDueAtCloseS2;

        /* let estTax = this.EstimatedTaxesScenario2;
        // return (estTax*Escrow_Taxes_Months__c) + (EstimatedInsuranceScenario2__c * Escrow_Ins_Months__c)
        return '(estTax*Escrow_Taxes_Months__c) + (EstimatedInsuranceScenario2__c * Escrow_Ins_Months__c)'*/
        return (estTax*escrowTaxMo) + (estIns * escrowInsMo) + otherToClose;
    }

    get EscrowsCalcS3() {
        let estTax = this.EstimatedTaxesScenario3;
        let escrowTaxMo = this.ProposalRec.Escrow_Taxes_Months__c;
        let escrowInsMo = this.ProposalRec.Escrow_Ins_Months__c;
        let estIns = this.EstimatedInsuranceScenario3;
        let otherToClose = this.OtherDueAtCloseS3;
        return (estTax*escrowTaxMo) + (estIns * escrowInsMo) + otherToClose;
    }

}