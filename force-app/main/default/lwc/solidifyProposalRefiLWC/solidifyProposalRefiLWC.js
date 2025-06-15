import {LightningElement, api, wire, track} from 'lwc';
import getProposalFields from '@salesforce/apex/SolidifyComparisonController.getProposalInfo';

import PROPOSAL_OBJECT from '@salesforce/schema/Proposal__c';

export default class solidifyProposalLWC extends LightningElement {
    
    ProposalObject = PROPOSAL_OBJECT;
    @track ProposalRec;
    @api recordId;
    @api objectApiName;
    @track parameterId;
    @track addressEmpty = false;
    @track paymentsNegative = false;

    connectedCallback() {
        this.parameters = this.getQueryParameters();   
        let recordId = this.parameters.id;
        console.log('---- recordId: '+recordId);
        this.parameterId = recordId;

        getProposalFields({recordId : this.parameterId})
        .then(result => { 
            console.log('-----result:   '+JSON.stringify(result));

            this.ProposalRec = result;

            console.log('---Property_Street__c:   '+this.ProposalRec.PropertyAddressText__c);
            if (this.ProposalRec.PropertyAddressText__c !== null) {
                this.addressEmpty = true;
                console.log('addressEmpty = true');
            };

            console.log('---Monthly_Payment_Savings__c:   '+this.ProposalRec.Monthly_Payment_Savings__c);
            if (this.ProposalRec.Monthly_Payment_Savings__c <= 0) {
                this.paymentsNegative = true;
                console.log('paymentsNegative = true');
            };
        })
        .catch(error => {
            console.log('-----error:   '+JSON.stringify(error));
        });
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
    get Qualifying_Fico(){
        return this.ProposalRec ? this.ProposalRec.Qualifying_Fico__c: ' ';
    }
    get First_Time_Homebuyer(){
        return this.ProposalRec ? this.ProposalRec.First_Time_Homebuyer__c: ' ';
    }
    get Veteran(){
        return this.ProposalRec ? this.ProposalRec.Veteran__c: ' ';
    }
    get SolidifyContactName(){
        return this.ProposalRec ? this.ProposalRec.SolidifyContact__r.Name: ' ';
    }
    get SolidifyContactFullPhotoUrl(){
        return this.ProposalRec ? this.ProposalRec.SolidifyContact__r.MediumPhotoUrl: ' ';
    }
    get SolidifyContactMobilePhone(){
        return this.ProposalRec ? this.ProposalRec.SolidifyContact__r.MobilePhone: ' ';
    }
    get SolidifyContactEmail(){
        return this.ProposalRec ? this.ProposalRec.SolidifyContact__r.Email: ' ';
    }
    get SolidifyContactLink(){
        return this.ProposalRec ? this.ProposalRec.SolidifyContact__r.ApplyNowwebsiteLink__c: ' ';
    }
    get SolidifyContactMLS(){
        return this.ProposalRec ? this.ProposalRec.SolidifyContact__r.MLSNumber__c: ' ';
    }
    get Subject_Property_Street(){
        return this.ProposalRec ? this.ProposalRec.PropertyAddressText__c: ' ';
    }
    get Borrower_Name_Text(){
        return this.ProposalRec ? this.ProposalRec.BorrowerName__c: ' ';
    }
    get X10_Yr_Treasury_Yield(){
        return this.ProposalRec ? this.ProposalRec.X10_Yr_Treasury_Yield__c: ' ';
    }
    get Current_Loan_Amount(){
        return this.ProposalRec ? this.ProposalRec.Current_Loan_Amount__c: ' ';
    }
    get Current_Interest_Rate(){
        return this.ProposalRec ? this.ProposalRec.Current_Interest_Rate__c: ' ';
    }
    get Current_Interest(){
        return this.Current_Interest_Rate/100;
    }
    get Current_Loan_Term(){
        return this.ProposalRec ? this.ProposalRec.Current_Loan_Term__c: ' ';
    }
    get Current_Loan_Monthly_Payment(){
        return this.ProposalRec ? this.ProposalRec.Current_Loan_Monthly_Payment__c: ' ';
    }
    get Current_Loan_First_Payment(){
        return this.ProposalRec ? this.ProposalRec.Current_Loan_First_Payment__c: ' ';
    }
    get Current_Loan_Last_Payment_Made(){
        return this.ProposalRec ? this.ProposalRec.Current_Loan_Last_Payment_Made__c: ' ';
    }
    get Current_Loan_Number_Payments_Made(){
        return this.ProposalRec ? this.ProposalRec.Current_Loan_Number_Payments_Made__c: ' ';
    }
    get Current_Loan_Payments_Remaining(){
        return this.ProposalRec ? this.ProposalRec.Current_Loan_Payments_Remaining__c: ' ';
    }
    get Current_Loan_Balance_Remaining(){
        return this.ProposalRec ? this.ProposalRec.Current_Loan_Balance_Remaining__c: ' ';
    }
    get New_Loan_Amount(){
        return this.ProposalRec ? this.ProposalRec.New_Loan_Amount__c: ' ';
    }
    get New_Loan_Interest_Rate(){
        return this.ProposalRec ? this.ProposalRec.New_Loan_Interest_Rate__c: ' ';
    }
    get New_Loan_Interest(){
        return this.New_Loan_Interest_Rate/100;
    }
    get New_Loan_Term(){
        return this.ProposalRec ? this.ProposalRec.New_Loan_Term__c: ' ';
    }
    get New_Loan_Monthly_Payment(){
        return this.ProposalRec ? this.ProposalRec.New_Loan_Monthly_Payment__c: ' ';
    }
    get Monthly_Payment_Savings(){
        return this.ProposalRec ? this.ProposalRec.Monthly_Payment_Savings__c: ' ';
    }
    get Same_Payment_Term_Reduction(){
        return this.ProposalRec ? this.ProposalRec.Same_Payment_Term_Reduction__c: ' ';
    }
    get Early_Payoff_Savings(){
        return this.ProposalRec ? this.ProposalRec.Early_Payoff_Savings__c: ' ';
    }
    get New_Loan_Payment_To_Keep_Term(){
        return this.ProposalRec ? this.ProposalRec.New_Loan_Payment_To_Keep_Term__c: ' ';
    }
    get Stay_On_Pace_Monthly_Savings(){
        return this.ProposalRec ? this.ProposalRec.Stay_On_Pace_Monthly_Savings__c: ' ';
    }
    get NewMonthsPaidifcurrentpayment(){
        return this.ProposalRec ? this.ProposalRec.NewMonthsPaidifcurrentpayment__c: ' ';
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

    @track hideTable = false

}