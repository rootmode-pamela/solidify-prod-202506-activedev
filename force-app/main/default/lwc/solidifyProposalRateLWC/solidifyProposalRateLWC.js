import {LightningElement, api, wire, track} from 'lwc';
import getProposalFields from '@salesforce/apex/SolidifyComparisonController.getRateAnalysisProposalInfo';
import PROPOSAL_OBJECT from '@salesforce/schema/Proposal__c';
import SystemModstamp from '@salesforce/schema/Account.SystemModstamp';

export default class solidifyProposalLWC extends LightningElement {
 
    toggleFeesIconName = 'utility:chevrondown';
    @track expandFees = false;
    toggleEscrowsIconName = 'utility:chevrondown';
    @track expandEscrows = false;
    togglePaymentsIconName = 'utility:chevrondown';
    @track expandPayments = false;

    handleToggleFeesClick(event) {
        console.log('button clicked: ' + event);
        let childsList = this.getElementsByTagName('h1')
        // retrieve the classList from the specific element
        /*const contentBlockClasslist = this.template.querySelector(
            '.lgc-id_content-toggle',
            '.lgc-id_content-toggle2'
        ).classList;
        // toggle the hidden class
        contentBlockClasslist.toggle('slds-hidden');*/

        // if the current icon-name is `utility:preview` then change it to `utility:hide`
        if (this.toggleFeesIconName === 'utility:chevronleft') {
            console.log('change to chevron down');
            this.expandFees = false;
            this.toggleFeesIconName = 'utility:chevrondown';
            this.toggleFeesButtonLabel = 'Reveal Fees';
           // this.getElementsByClassName('row-header-box').style.maxWidth = "11.11%";
        } else {
            console.log('change to chevron left');
            this.expandFees = true;
            this.toggleFeesIconName = 'utility:chevronleft';
            this.toggleFeesButtonLabel = 'Hide Fees';
            //this.getElementsByClassName('row-header-box').style.maxWidth = "14.286%";
        }
    }

    handleToggleEscrowsClick(event) {
        
        // if the current icon-name is `utility:preview` then change it to `utility:hide`
        if (this.toggleEscrowsIconName === 'utility:chevronleft') {
            this.expandEscrows = false;
            this.toggleEscrowsIconName = 'utility:chevrondown';
            this.toggleEscrowsButtonLabel = 'Reveal Escrows';
           // this.getElementsByClassName('row-header-box').style.maxWidth = "11.11%";
        } else {
            this.expandEscrows = true;
            this.toggleEscrowsIconName = 'utility:chevronleft';
            this.toggleEscrowsButtonLabel = 'Hide Escrows';
          //  this.getElementsByClassName('row-header-box').style.maxWidth = "14.286%";
        }
    }

    get expandedEscrows1() {
        return this.expandedEscrows(this.InterestDue1);
    }

    get expandedEscrows2() {
        return this.expandedEscrows(this.InterestDue2);
    }

    get expandedEscrows3() {
        return this.expandedEscrows(this.InterestDue3);
    }

    get expandedEscrows4() {
        return this.expandedEscrows(this.InterestDue4);
    }

    get expandedEscrows5() {
        return this.expandedEscrows(this.InterestDue5);
    }

    get expandedEscrows6() {
        return this.expandedEscrows(this.InterestDue6);
    }

    expandedEscrows(interestDue) {
        return [
            {name: 'DownPayment', value: this.Downpayment},
            {name: 'InterestDue', value: interestDue},
            {name: 'Escrows', value: this.Escrows},
            {name: 'Other', value: this.otherPayment},
        ]
    }

    handleTogglePaymentsClick(event) {
        
        // if the current icon-name is `utility:preview` then change it to `utility:hide`
        if (this.togglePaymentsIconName === 'utility:chevronleft') {
            this.expandPayments = false;
            this.togglePaymentsIconName = 'utility:chevrondown';
            this.togglePaymentsButtonLabel = 'Reveal Payments';
           // this.getElementsByClassName('row-header-box').style.maxWidth = "11.11%";
        } else {
            this.expandPayments = true;
            this.togglePaymentsIconName = 'utility:chevronleft';
            this.togglePaymentsButtonLabel = 'Hide Payments';
           // this.getElementsByClassName('row-header-box').style.maxWidth = "14.286%";
        }
    }
    
    ProposalObject = PROPOSAL_OBJECT;
    @track ProposalRec;
    @api recordId;
    @api objectApiName;

    @track isRefinance = true;
    @track isRefiAnalysis = false;
    @track isRateAnalysis = false;
    @track isComparisonAnalysis = false;
    @track parameterId;

    @track BackgroundColor = [];
    @track ChartLabels = [];
    @track ChartData = [];

    @track Exclude1 = false;
    @track addressEmpty = false;
    @track addFeesToBalance = true;
    @track Exclude2 = false;
    @track Exclude3 = false;
    @track Exclude4 = false;
    @track Exclude5 = false;
    @track Exclude6 = false;
    @track nullBreakevenYears1 = false;
    @track nullBreakevenYears2 = false;
    @track nullBreakevenYears3 = false;
    @track nullBreakevenYears4 = false;
    @track nullBreakevenYears5 = false;

    get BackgroundColor() {
        return ["rgba(84, 167, 123, 1)"];
    }

/*    @track Bar1BackgroundColor = [];
    @track Bar1ChartLabels = [];
    @track Bar1ChartData1 = [];
    @track Bar1ChartData2 = [];

    get Bar1BackgroundColor() {
        return ["rgba(84, 167, 123, 1)"]; 
    } */


    connectedCallback() {
        this.parameters = this.getQueryParameters();   
        let recordId = this.parameters.id;
        console.log('---- recordId: '+recordId);
        this.parameterId = recordId;

        getProposalFields({recordId : this.parameterId})
        .then(result => { 
            console.log('-----result:   '+JSON.stringify(result));

            this.ProposalRec = result;

            console.log('-----this.ProposalRec.Purpose__c:   '+this.ProposalRec.Purpose__c);
            console.log('rate1:' + this.ProposalRec.Rate_1__c);

/*            this.ChartLabels = [this.ProposalRec.Rate_1__c+"%", this.ProposalRec.Rate_2__c+"%", this.ProposalRec.Rate_3__c+"%",
            this.ProposalRec.Rate_4__c+"%", this.ProposalRec.Rate_5__c+"%", this.ProposalRec.Rate_6__c+"%"];
            
            this.ChartData = [this.ProposalRec.Monthly_PI_Pmt1__c, this.ProposalRec.Monthly_PI_Pmt2__c, this.ProposalRec.Monthly_PI_Pmt3__c,
                this.ProposalRec.Monthly_PI_Pmt4__c, this.ProposalRec.Monthly_PI_Pmt5__c, this.ProposalRec.Monthly_PI_Pmt6__c];
            
                console.log('-----this.ChartData:   '+this.ChartData+' '+this.BackgroundColor);

            this.Bar1ChartLabels = [this.ProposalRec.Rate_1__c+"%", this.ProposalRec.Rate_2__c+"%", this.ProposalRec.Rate_3__c+"%",
                this.ProposalRec.Rate_4__c+"%", this.ProposalRec.Rate_5__c+"%", this.ProposalRec.Rate_6__c+"%"];

            this.Bar1ChartData1 = [this.ProposalRec.Years_Until_Breakeven1__c, this.ProposalRec.Years_Until_Breakeven2__c, this.ProposalRec.Years_Until_Breakeven3__c,
                this.ProposalRec.Years_Until_Breakeven4__c, this.ProposalRec.Years_Until_Breakeven5__c, this.ProposalRec.Years_Until_Breakeven6__c];
            
                console.log('-----this.Bar1ChartData1:   '+this.Bar1ChartData1+' '+this.Bar1BackgroundColor);
            
            this.Bar1ChartData2 = [this.ProposalRec.Monthly_PI_Pmt1__c, this.ProposalRec.Monthly_PI_Pmt2__c, this.ProposalRec.Monthly_PI_Pmt3__c,
                this.ProposalRec.Monthly_PI_Pmt4__c, this.ProposalRec.Monthly_PI_Pmt5__c, this.ProposalRec.Monthly_PI_Pmt6__c];
                
                console.log('-----this.Bar1ChartData2:   '+this.Bar1ChartData2+' '+this.Bar1BackgroundColor);
*/
            if (this.ProposalRec.Purpose__c == 'Purchase') {
                this.isRefinance = false;
            } else if(this.ProposalRec.Purpose__c == 'Refinance' || this.ProposalRec.Purpose__c == 'Refi_No_Cashout' || this.ProposalRec.Purpose__c == 'Refi_Cashout'){
                this.isRefinance = true;
            }

            if (this.ProposalRec.Property__r.Property_Street__c !== null) {
                this.addressEmpty = true;
            }
            if (this.ProposalRec.Add_Fees_to_Loan_Balance__c == 'No') {
                this.addFeesToBalance = false;
            }
            if (this.ProposalRec.Years_Until_Breakeven1__c == 0) {
                this.nullBreakevenYears1 = true;
            }
            if (this.ProposalRec.Years_Until_Breakeven2__c == 0) {
                this.nullBreakevenYears2 = true;
            }
            if (this.ProposalRec.Years_Until_Breakeven3__c == 0) {
                this.nullBreakevenYears3 = true;
            }
            if (this.ProposalRec.Years_Until_Breakeven4__c == 0) {
                this.nullBreakevenYears4 = true;
            }
            if (this.ProposalRec.Years_Until_Breakeven5__c == 0) {
                this.nullBreakevenYears5 = true;
            }

            if (this.ProposalRec.ExcludeRate1__c == true) {
                this.Exclude1 = true;
            }
            if (this.ProposalRec.ExcludeRate2__c == true) {
                this.Exclude2 = true;
            }
            if (this.ProposalRec.ExcludeRate3__c == true) {
                this.Exclude3 = true;
            }
            if (this.ProposalRec.ExcludeRate4__c == true) {
                this.Exclude4 = true;
            }
            if (this.ProposalRec.ExcludeRate5__c == true) {
                this.Exclude5 = true;
            }
            if (this.ProposalRec.ExcludeRate6__c == true) {
                this.Exclude6 = true;
            }

            if (this.ProposalRec.RecordTypeId == '012f4000000OatvAAC') {
                this.isRefiAnalysis = true;
                console.log('isRefiAnalysis = true');
            } else if(this.ProposalRec.RecordTypeId == '012f4000000ObpJAAS'){
                this.isRateAnalysis = true;
                console.log('isRateAnalysis = true');
            } else if(this.ProposalRec.RecordTypeId == '0127c0000000tYQAAY'){
                this.isComparisonAnalysis = true;
                console.log('isComparisonAnalysis = true');
            } 
            
            //FOR SANDBOX

            if (this.ProposalRec.RecordTypeId == '012f4000000OatvAAC') {
                this.isRefiAnalysis = true;
                console.log('isRefiAnalysis = true');
            } else if(this.ProposalRec.RecordTypeId == '012f4000000ObpJAAS'){
                this.isRateAnalysis = true;
                console.log('isRateAnalysis = true');
            } else if(this.ProposalRec.RecordTypeId == '0125G000001MuHzQAK'){
                this.isComparisonAnalysis = true;
                console.log('isComparisonAnalysis = true');
            } 
            this.isRateAnalysis = true;
        })
        .catch(error => {
            console.log('-----error:   '+JSON.stringify(error));
        });
    }


    get TotalFees1(){
        return this.ProposalRec ? this.ProposalRec.TotalFees1__c: ' ';
    }
    get TotalFees2(){
        return this.ProposalRec ? this.ProposalRec.TotalFees2__c: ' ';
    }
    get TotalFees3(){
        return this.ProposalRec ? this.ProposalRec.TotalFees3__c: ' ';
    }
    get TotalFees4(){
        return this.ProposalRec ? this.ProposalRec.TotalFees4__c: ' ';
    }
    get TotalFees5(){
        return this.ProposalRec ? this.ProposalRec.TotalFees5__c: ' ';
    }
    get TotalFees6(){
        return this.ProposalRec ? this.ProposalRec.TotalFees6__c: ' ';
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
/*    get currentProgram(){
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
    */
    get Purpose(){
        return this.ProposalRec ? this.ProposalRec.Purpose__c: ' ';
    }
/*    get Purchase_Price(){
        return this.ProposalRec ? this.ProposalRec.Purchase_Price__c: ' ';
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
    */
    get SolidifyContactName(){
        return this.ProposalRec && this.ProposalRec.SolidifyContact__c ? this.ProposalRec.SolidifyContact__r.Name: ' ';
    }
    get SolidifyContactFullPhotoUrl(){
        return this.ProposalRec  && this.ProposalRec.SolidifyContact__c ? this.ProposalRec.SolidifyContact__r.MediumPhotoUrl: ' ';
    } 
    get SolidifyContactMobilePhone(){
        return this.ProposalRec  && this.ProposalRec.SolidifyContact__c ? this.ProposalRec.SolidifyContact__r.MobilePhone: ' ';
    }
    get SolidifyContactEmail(){
        return this.ProposalRec  && this.ProposalRec.SolidifyContact__c ? this.ProposalRec.SolidifyContact__r.Email: ' ';
    }
    get SolidifyContactLink(){
        return this.ProposalRec  && this.ProposalRec.SolidifyContact__c ? this.ProposalRec.SolidifyContact__r.ApplyNowwebsiteLink__c: ' ';
    }
    get SolidifyContactMLS(){
        return this.ProposalRec  && this.ProposalRec.SolidifyContact__c ? this.ProposalRec.SolidifyContact__r.MLSNumber__c: ' ';
    }
    get SolidifyOther(){
        return this.ProposalRec  && this.ProposalRec.Other__c ? this.ProposalRec.Other__c: ' ';
    }

    get Subject_Property_Street(){
        return this.ProposalRec ? this.ProposalRec.PropertyAddressText__c: ' ';
    }

    get APRF1(){
        return this.APR1/100;
    }
    get APRF2(){
        return this.APR2/100;
    }
    get APRF3(){
        return this.APR3/100;
    }
    get APRF4(){
        return this.APR4/100;
    }
    get APRF5(){
        return this.APR5/100;
    }
    get APRF6(){
        return this.APR6/100;
    }

    get Borrower_Name_Text(){
        return this.ProposalRec ? this.ProposalRec.BorrowerName__c: ' ';
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
    get Rate_1(){
        return this.ProposalRec ? this.ProposalRec.Rate_1__c: 0;
    }
    get APR1(){
        return this.ProposalRec ? this.ProposalRec.APR1__c: ' ';
    }
    get Total_Cost_1(){
        return this.ProposalRec ? this.ProposalRec.Total_Cost_1__c: ' ';
    }
    get Total_Loan_Amount1(){
        return this.ProposalRec ? this.ProposalRec.Total_Loan_Amount1__c: 0;
    }
    get Monthly_PI_Pmt1(){
        return this.ProposalRec ? this.ProposalRec.Monthly_PI_Pmt1__c: ' ';
    }
    get Years_Until_Breakeven1(){
        if (this.ProposalRec) {
            return this.ProposalRec.Simple_Breakeven__c? this.ProposalRec.Breakeven_Scenario1_Simple__c :  this.ProposalRec.Years_Until_Breakeven1__c;
        }
        else {return ' '; }
    }
    get Rate_2(){
        return this.ProposalRec ? this.ProposalRec.Rate_2__c: ' ';
    }
    get APR2(){
        return this.ProposalRec ? this.ProposalRec.APR2__c: ' ';
    }
    get Total_Cost_2(){
        return this.ProposalRec ? this.ProposalRec.Total_Cost_2__c: ' ';
    }
    get Total_Loan_Amount2(){
        return this.ProposalRec ? this.ProposalRec.Total_Loan_Amount2__c: ' ';
    }
    get Monthly_PI_Pmt2(){
        return this.ProposalRec ? this.ProposalRec.Monthly_PI_Pmt2__c: ' ';
    }
    get Years_Until_Breakeven2(){
        if(this.ProposalRec){
            return this.ProposalRec.Simple_Breakeven__c? this.ProposalRec.Breakeven_Scenario2_Simple__c :  this.ProposalRec.Years_Until_Breakeven2__c
        }
        else {  return ' ';  }

    }
    get Rate_3(){
        return this.ProposalRec ? this.ProposalRec.Rate_3__c: ' ';
    }
    get APR3(){
        return this.ProposalRec ? this.ProposalRec.APR3__c: ' ';
    }
    get Total_Cost_3(){
        return this.ProposalRec ? this.ProposalRec.Total_Cost_3__c: ' ';
    }
    get Total_Loan_Amount3(){
        return this.ProposalRec ? this.ProposalRec.Total_Loan_Amount3__c: ' ';
    }
    get Monthly_PI_Pmt3(){
        return this.ProposalRec ? this.ProposalRec.Monthly_PI_Pmt3__c: ' ';
    }
    get Years_Until_Breakeven3(){
        if(this.ProposalRec){
            return this.ProposalRec.Simple_Breakeven__c? this.ProposalRec.Breakeven_Scenario3_Simple__c :  this.ProposalRec.Years_Until_Breakeven3__c;
        } else {return ' ';}

    }
    get Rate_4(){
        return this.ProposalRec ? this.ProposalRec.Rate_4__c: ' ';
    }
    get APR4(){
        return this.ProposalRec ? this.ProposalRec.APR4__c: ' ';
    }
    get Total_Cost_4(){
        return this.ProposalRec ? this.ProposalRec.Total_Cost_4__c: ' ';
    }
    get Total_Loan_Amount4(){
        return this.ProposalRec ? this.ProposalRec.Total_Loan_Amount4__c: ' ';
    }
    get Monthly_PI_Pmt4(){
        return this.ProposalRec ? this.ProposalRec.Monthly_PI_Pmt4__c: ' ';
    }
    get Years_Until_Breakeven4(){
        if(this.ProposalRec){
            return this.ProposalRec.Simple_Breakeven__c? this.ProposalRec.Breakeven_Scenario4_Simple__c :  this.ProposalRec.Years_Until_Breakeven4__c;
        } else {return ' '; }
    }
    get Rate_5(){
        return this.ProposalRec ? this.ProposalRec.Rate_5__c: ' ';
    }
    get APR5(){
        return this.ProposalRec ? this.ProposalRec.APR5__c: ' ';
    }
    get Total_Cost_5(){
        return this.ProposalRec ? this.ProposalRec.Total_Cost_5__c: ' ';
    }
    get Total_Loan_Amount5(){
        return this.ProposalRec ? this.ProposalRec.Total_Loan_Amount5__c: ' ';
    }
    get Monthly_PI_Pmt5(){
        return this.ProposalRec ? this.ProposalRec.Monthly_PI_Pmt5__c: ' ';
    }
    get Years_Until_Breakeven5(){
        if(this.ProposalRec){
            return this.ProposalRec.Simple_Breakeven__c? this.ProposalRec.Breakeven_Scenario5_Simple__c :  this.ProposalRec.Years_Until_Breakeven5__c;
        } else { return ' '; }
    }
    get Rate_6(){
        return this.ProposalRec ? this.ProposalRec.Rate_6__c: ' ';
    }
    get APR6(){
        return this.ProposalRec ? this.ProposalRec.APR6__c: ' ';
    }
    get Total_Cost_6(){
        return this.ProposalRec ? this.ProposalRec.Total_Cost_6__c: ' ';
    }
    get Total_Loan_Amount6(){
        return this.ProposalRec ? this.ProposalRec.Total_Loan_Amount6__c: ' ';
    }
    get Monthly_PI_Pmt6(){
        return this.ProposalRec ? this.ProposalRec.Monthly_PI_Pmt6__c: ' ';
    }
    get Years_Until_Breakeven6(){
        return this.ProposalRec ? this.ProposalRec.Years_Until_Breakeven6__c: ' ';
    }

    get StandardFees(){
        return this.ProposalRec ? this.ProposalRec.StandardFees__c: ' ';
    }
    get RateCost1(){
        return this.ProposalRec ? this.ProposalRec.RateCost1__c: ' ';
    }
    get RateCost2(){
        return this.ProposalRec ? this.ProposalRec.RateCost2__c: ' ';
    }
    get RateCost3(){
        return this.ProposalRec ? this.ProposalRec.RateCost3__c: ' ';
    }
    get RateCost4(){
        return this.ProposalRec ? this.ProposalRec.RateCost4__c: ' ';
    }
    get RateCost5(){
        return this.ProposalRec ? this.ProposalRec.RateCost5__c: ' ';
    }
    get RateCost6(){
        return this.ProposalRec ? this.ProposalRec.RateCost6__c: ' ';
    }
    get Fixed_Term_Years(){
        return this.ProposalRec ? this.ProposalRec.Fixed_Term_Years__c: ' ';
    }
    get Loan_Type(){
        return this.ProposalRec ? this.ProposalRec.Loan_Type__c: ' ';
    }
    get Downpayment(){
        return this.ProposalRec?.Current_Balance_Down_Payment__c ?? 0;
    }
    get Escrow_Interest_Days(){
        return this.ProposalRec ? this.ProposalRec.Escrow_Interest_Days__c:' ';
    }
    get InterestDue1(){
       let intDays = this.ProposalRec?.Escrow_Interest_Days__c ?? 0;
       let intLoanAmt = this.addFeesToLoanBalance ? this.Total_Loan_Amount1 : this.New_Loan_Amount;
       let intDue1 = (parseFloat(this.Rate_1)/100*parseFloat(intLoanAmt)/365)*intDays;
       return this.ProposalRec ? intDue1: 0;
    }
    get InterestDue2(){
       let intDays = this.ProposalRec?.Escrow_Interest_Days__c ?? 0;
       let intLoanAmt = this.addFeesToLoanBalance ? this.Total_Loan_Amount2 : this.New_Loan_Amount;
       let intDue2 = (parseFloat(this.Rate_2)/100*parseFloat(intLoanAmt)/365)*intDays;
       return this.ProposalRec ? intDue2: 0;
    }
    get InterestDue3(){
        let intDays = this.ProposalRec?.Escrow_Interest_Days__c ?? 0;
        let intLoanAmt = this.addFeesToLoanBalance ? this.Total_Loan_Amount3 : this.New_Loan_Amount;
        let intDue3 = (parseFloat(this.Rate_3)/100*parseFloat(intLoanAmt)/365)*intDays;
        return this.ProposalRec ? intDue3: 0;
    }
    get InterestDue4(){
        let intDays = this.ProposalRec?.Escrow_Interest_Days__c ?? 0;
        let intLoanAmt = this.addFeesToLoanBalance ? this.Total_Loan_Amount4 : this.New_Loan_Amount;
        let intDue4 = (parseFloat(this.Rate_4)/100*parseFloat(intLoanAmt)/365)*intDays;
        return this.ProposalRec ? intDue4: 0;
    }
    get InterestDue5(){
        let intDays = this.ProposalRec?.Escrow_Interest_Days__c ?? 0;
        let intLoanAmt = this.addFeesToLoanBalance ? this.Total_Loan_Amount5 : this.New_Loan_Amount;
        let intDue5 = (parseFloat(this.Rate_5)/100*parseFloat(intLoanAmt)/365)*intDays;
        return this.ProposalRec ? intDue5: 0;
    }
    get InterestDue6(){
        let intDays = this.ProposalRec?.Escrow_Interest_Days__c ?? 0;
        let intLoanAmt = this.addFeesToLoanBalance ? this.Total_Loan_Amount6 : this.New_Loan_Amount;
        let intDue6 = (parseFloat(this.Rate_6)/100*parseFloat(intLoanAmt)/365)*intDays;
        return this.ProposalRec ? intDue6: 0;
        }  
    get Escrows() {
        return this.ProposalRec ? this.ProposalRec.Escrow_Taxes_Total__c + this.ProposalRec.Escrow_Insurance_Total__c: 0;
    }
    get TotalFundsToClose1(){
        let fundsToClose1 = this.InterestDue1 + this.Downpayment + this.Escrows + this.otherPayment;
        if(this.addFeesToLoanBalance==false){
            fundsToClose1 = fundsToClose1 + this.TotalFees1;
        }
        return this.ProposalRec ? fundsToClose1 : ' ';
    }
    get TotalFundsToClose2(){
        let fundsToClose2 = this.InterestDue2 + this.Downpayment + this.Escrows + this.otherPayment;
        if(this.addFeesToLoanBalance==false){
            fundsToClose2 = fundsToClose2 + this.TotalFees2;
        }
        return this.ProposalRec ? fundsToClose2 : ' ';
    }
    get TotalFundsToClose3(){
        let fundsToClose3 = this.InterestDue3 + this.Downpayment + this.Escrows + this.otherPayment;
        if(this.addFeesToLoanBalance==false){
            fundsToClose3 = fundsToClose3 + this.TotalFees3;
        }
        return this.ProposalRec ? fundsToClose3 : ' ';
    }
    get TotalFundsToClose4(){
        let fundsToClose4 = this.InterestDue4 + this.Downpayment + this.Escrows + this.otherPayment;
        if(this.addFeesToLoanBalance==false){
            fundsToClose4 = fundsToClose4 + this.TotalFees4;
        }
        return this.ProposalRec ? fundsToClose4 : ' ';
    }
    get TotalFundsToClose5(){
        let fundsToClose5 = this.InterestDue5 + this.Downpayment + this.Escrows + this.otherPayment;
        if(this.addFeesToLoanBalance==false){
            fundsToClose5 = fundsToClose5 + this.TotalFees5;
        }
        return this.ProposalRec ? fundsToClose5 : ' ';
    }
    get addFeesToLoanBalance(){
        var addFees
        if (this.ProposalRec && this.ProposalRec.Add_Fees_to_Loan_Balance__c=='No'){
            addFees = false;
        } else {
            addFees = true;
        }
        return addFees;
    }
    get TotalFundsToClose6(){
        let fundsToClose6 = this.InterestDue6 + this.Downpayment + this.Escrows + this.otherPayment;
        if(this.addFeesToLoanBalance==false){
            fundsToClose6 = fundsToClose6 + this.TotalFees6;
        }
        return this.ProposalRec ? fundsToClose6 : ' ';
    }
    get otherPayment() {
        return this.ProposalRec?.Other__c ?? 0;
    }
    get EstTaxes(){
        return this.ProposalRec ? this.ProposalRec.Escrow_Taxes_Monthly_Rate__c: ' ';
    }
    get EstInsurance(){
        return this.ProposalRec ? this.ProposalRec.Escrow_Ins_Monthly_Rate__c: ' ';
    }
    get mortgageInsurance(){
        return this.ProposalRec ? this.ProposalRec.MI__c : false;
    }
    get MortgageIns1(){
        return this.ProposalRec && this.ProposalRec.MI__c ? this.ProposalRec.MI_Percent__c/100*this.Total_Loan_Amount1/12: 0 ;
    }
    get MortgageIns2(){
        return this.ProposalRec && this.ProposalRec.MI__c ? this.ProposalRec.MI_Percent__c/100*this.Total_Loan_Amount2/12: 0;
    }
    get MortgageIns3(){
        return this.ProposalRec && this.ProposalRec.MI__c ? this.ProposalRec.MI_Percent__c/100*this.Total_Loan_Amount3/12: 0;
    }
    get MortgageIns4(){
        return this.ProposalRec && this.ProposalRec.MI__c ? this.ProposalRec.MI_Percent__c/100*this.Total_Loan_Amount4/12: 0;
    }
    get MortgageIns5(){
        return this.ProposalRec && this.ProposalRec.MI__c ? this.ProposalRec.MI_Percent__c/100*this.Total_Loan_Amount5/12: 0;
    }
    get MortgageIns6(){
        return this.ProposalRec && this.ProposalRec.MI__c ? this.ProposalRec.MI_Percent__c/100*this.Total_Loan_Amount6/12: 0;
    }
    get TotalPayment1(){
        let totpmt = parseFloat(this.Monthly_PI_Pmt1) + parseFloat(this.MortgageIns1) + parseFloat(this.EstTaxes) + parseFloat(this.EstInsurance);
        return this.ProposalRec ? totpmt : ' ';
    }
    get TotalPayment2(){
        let totpmt = parseFloat(this.Monthly_PI_Pmt2) + parseFloat(this.MortgageIns2) + parseFloat(this.EstTaxes) + parseFloat(this.EstInsurance);
        return this.ProposalRec ? totpmt : ' ';
    }
    get TotalPayment3(){
        let totpmt = parseFloat(this.Monthly_PI_Pmt3) + parseFloat(this.MortgageIns3) + parseFloat(this.EstTaxes) + parseFloat(this.EstInsurance);
        return this.ProposalRec ? totpmt : ' ';
    }
    get TotalPayment4(){
        let totpmt = parseFloat(this.Monthly_PI_Pmt4) + parseFloat(this.MortgageIns4) + parseFloat(this.EstTaxes) + parseFloat(this.EstInsurance);
        return this.ProposalRec ? totpmt : ' ';
    }
    get TotalPayment5(){
        let totpmt = parseFloat(this.Monthly_PI_Pmt5) + parseFloat(this.MortgageIns5) + parseFloat(this.EstTaxes) + parseFloat(this.EstInsurance);
        return this.ProposalRec ? totpmt : ' ';
    }
    get TotalPayment6(){
        let totpmt = parseFloat(this.Monthly_PI_Pmt6) + parseFloat(this.MortgageIns6) + parseFloat(this.EstTaxes) + parseFloat(this.EstInsurance);
        return this.ProposalRec ? totpmt : ' ';
    }
    get FFMIP1(){
        return this.ProposalRec ? this.ProposalRec.FFMIP1__c : ' ';
    }
    get TotalLoanWithFFMIP1(){
        return this.ProposalRec ? this.ProposalRec.TotalLoanWithFFMIP1__c : ' ';
    }
    get FFMIP2(){
        return this.ProposalRec ? this.ProposalRec.FFMIP2__c : ' ';
    }
    get TotalLoanWithFFMIP2(){
        return this.ProposalRec ? this.ProposalRec.TotalLoanWithFFMIP2__c : ' ';
    }
    get FFMIP3(){
        return this.ProposalRec ? this.ProposalRec.FFMIP3__c : ' ';
    }
    get TotalLoanWithFFMIP3(){
        return this.ProposalRec ? this.ProposalRec.TotalLoanWithFFMIP3__c : ' ';
    }
    get FFMIP4(){
        return this.ProposalRec ? this.ProposalRec.FFMIP4__c : ' ';
    }
    get TotalLoanWithFFMIP4(){
        return this.ProposalRec ? this.ProposalRec.TotalLoanWithFFMIP4__c : ' ';
    }
    get FFMIP5(){
        return this.ProposalRec ? this.ProposalRec.FFMIP5__c : ' ';
    }
    get TotalLoanWithFFMIP5(){
        return this.ProposalRec ? this.ProposalRec.TotalLoanWithFFMIP5__c : ' ';
    }
    get FFMIP6(){
        return this.ProposalRec ? this.ProposalRec.FFMIP6__c : ' ';
    }
    get TotalLoanWithFFMIP6(){
        return this.ProposalRec ? this.ProposalRec.TotalLoanWithFFMIP6__c : ' ';
    }
    get FFMIP(){
        return this.ProposalRec ? this.ProposalRec.FFMIP__c : false ;
    }
    get Add_FFMIP_To_Loan(){
        return this.ProposalRec ? this.ProposalRec.Add_FFMIP_To_Loan__c : ' ' ;
    }
    get showEscrows(){
        return this.ProposalRec ? !this.ProposalRec.Hide_Escrows_Client_View__c : false ;
    }
    get hideEscrows(){
        return this.ProposalRec ? this.ProposalRec.Hide_Escrows_Client_View__c : false ;
    }
    get showFundsToClose(){
        return this.ProposalRec ? !this.ProposalRec.Hide_Funds_To_Close_Client_View__c : false ;
    }


/*
    ChartData = [this.Monthly_Payment_Scenario_1, this.EstimatedTaxesScenario1, 
    this.EstimatedInsuranceScenario1, this.EstimatedMortgageInsuranceScenario1, this.EstimatedHOAScenario1];
    BackgroundColor = ["rgba(14, 110, 206, 1)",
       "rgba(45, 156, 237, 1)",
       "rgba(104, 206, 238, 1)",
       "rgba(150, 242, 238, 1)",
       "rgba(150, 242, 238, 1)"];
    ChartLabels = ["Principle & Interest", "Taxes", "Insurance", "Mortgage Insurance", "HOA"];

*/
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

    @track excludeCard1 = true;
    @track excludeCard2 = true;
    @track excludeCard3 = true;
    @track excludeCard4 = true;
    @track excludeCard5 = true;
    @track excludeCard6 = true;

    value1 = '';
    value2 = '';
    value3 = '';
    value4 = '';
    value5 = '';
    value6 = '';

    get options1() {
        return [
            { label: '', value: 'Yes1' },
        ];
    }
    get options2() {
        return [
            { label: '', value: 'Yes2' },
        ];
    }
    get options3() {
        return [
            { label: '', value: 'Yes3' },
        ];
    }
    get options4() {
        return [
            { label: '', value: 'Yes4' },
        ];
    }
    get options5() {
        return [
            { label: '', value: 'Yes5' },
        ];
    }
    get options6() {
        return [
            { label: '', value: 'Yes6' },
        ];
    }
    handleChangeE1(event) {
        const selectedOption = event.detail.value;
        if (selectedOption== 'Yes1') {
            this.excludeCard1 = false;
        } else {
            this.excludeCard1 = true;
        }
    }
    handleChangeE2(event) {
        const selectedOption = event.detail.value;
        if (selectedOption== 'Yes2') {
            this.excludeCard2 = false;
        } else {
            this.excludeCard2 = true;
        }
    }
    handleChangeE3(event) {
        const selectedOption = event.detail.value;
        if (selectedOption== 'Yes3') {
            this.excludeCard3 = false;
        } else {
            this.excludeCard3 = true;
        }
    }
    handleChangeE4(event) {
        const selectedOption = event.detail.value;
        if (selectedOption== 'Yes4') {
            this.excludeCard4 = false;
        } else {
            this.excludeCard4 = true;
        }
    }
    handleChangeE5(event) {
        const selectedOption = event.detail.value;
        if (selectedOption== 'Yes5') {
            this.excludeCard5 = false;
        } else {
            this.excludeCard5 = true;
        }
    }
    handleChangeE6(event) {
        const selectedOption = event.detail.value;
        if (selectedOption== 'Yes6') {
            this.excludeCard6 = false;
        } else {
            this.excludeCard6 = true;
        }
    }
}