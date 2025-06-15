import { LightningElement, track, api, wire } from 'lwc';
import createAssets from '@salesforce/apex/leadQualifyingTabController.createAssets';
import getAssetList from '@salesforce/apex/leadQualifyingTabController.getAssetList';
import getLiabilityList from '@salesforce/apex/leadQualifyingTabController.getLiabilityList';
import deleteAssets from '@salesforce/apex/leadQualifyingTabController.deleteAssets';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import LightningConfirm from 'lightning/confirm';
import LEAD_OBJECT from '@salesforce/schema/Lead';

import PURPOSE from '@salesforce/schema/Lead.Purpose__c';
import OCCUPANCY from '@salesforce/schema/Lead.Occupancy__c';
import PROPTYPE from '@salesforce/schema/Lead.Subject_Property_Type__c';
import LOANTYPE from '@salesforce/schema/Lead.Loan_Type__c';
import LOANPROGRAM from '@salesforce/schema/Lead.Loan_Program__c';
import ESTIMATEDVALUE from '@salesforce/schema/Lead.Estimated_Value__c';
import FIRSTLOANAMOUNT from '@salesforce/schema/Lead.Loan_Amount__c';
import FIRSTLOANRATE from '@salesforce/schema/Lead.ProposedFirstLoanRate__c';
import SECONDLOANAMOUNT from '@salesforce/schema/Lead.SecondLoanAmount__c';
import SECONDLOANRATE from '@salesforce/schema/Lead.SecondLoanRate__c';
import FICO from '@salesforce/schema/Lead.Qualifying_Fico__c';
import IMPOUNDS from '@salesforce/schema/Lead.Impounds__c';
import SUBJECTPROPERTYZIP from '@salesforce/schema/Lead.PostalCode';
import NUMBEROFUNITS from '@salesforce/schema/Lead.Number_of_Units__c';
import X2NDLOANPROGRAM from '@salesforce/schema/Lead.X2ndLoanProgram__c';

import BORROWERBASE from '@salesforce/schema/Lead.BorrowerBaseIncome__c';
import BORROWERBONUS from '@salesforce/schema/Lead.BorrowerBonuses__c';
import BORROWERCOMMISSION from '@salesforce/schema/Lead.BorrowerCommission__c';
import BORROWERRENT from '@salesforce/schema/Lead.BorrowerNetRent__c';
import BORROWEROTHER from '@salesforce/schema/Lead.BorrowerOtherIncome__c';
import BORROWEROVERTIME from '@salesforce/schema/Lead.BorrowerOvertime__c';
import BORROWERDIVINT from '@salesforce/schema/Lead.BorrowerDivInt__c';
import COBORROWERDIVINT from '@salesforce/schema/Lead.CoBorrowerDivInt__c';
import COBORROWERBASE from '@salesforce/schema/Lead.CoBorrowerBaseIncome__c';
import COBORROWERBONUS from '@salesforce/schema/Lead.CoBorrowerBonuses__c';
import COBORROWERCOMMISSION from '@salesforce/schema/Lead.CoBorrowerCommission__c';
import COBORROWERRENT from '@salesforce/schema/Lead.CoBorrowerNetRent__c';
import COBORROWEROTHER from '@salesforce/schema/Lead.CoBorrowerOtherIncome__c';
import COBORROWEROVERTIME from '@salesforce/schema/Lead.CoBorrowerOvertime__c';

import FIRSTMORTGAGE from '@salesforce/schema/Lead.First_Mortgage__c';
import OTHERFIN from '@salesforce/schema/Lead.Other_Financials__c';
import HAZARDINSURANCE from '@salesforce/schema/Lead.Hazard_Insurance__c';
import TAXES from '@salesforce/schema/Lead.Taxes__c';
import MORTGAGEINSURANCE from '@salesforce/schema/Lead.Mortgage_Insurance__c';
import HOA from '@salesforce/schema/Lead.HOA__c';
import OTHER from '@salesforce/schema/Lead.Other_Expenses__c';
import SUBJECTPROPERTYRENTS from '@salesforce/schema/Lead.SubjectPropertyRents__c';
import SUBJECTPROPERTYNETRENTS from '@salesforce/schema/Lead.SubjectPropertyNetRent__c';


import LTV from '@salesforce/schema/Lead.QualitfyingLTV__c';
import CLTV from '@salesforce/schema/Lead.QualitfyingCLTV__c';
import TOP from '@salesforce/schema/Lead.Top__c';
import BOTTOM from '@salesforce/schema/Lead.Bottom__c';

import BASEINCOMETOTAL from '@salesforce/schema/Lead.BaseIncomeTotal__c';
import BONUSTOTAL from '@salesforce/schema/Lead.BonusesTotal__c';
import COMMISSIONTOTAL from '@salesforce/schema/Lead.CommissionTotal__c';
import DIVINTTOTAL from '@salesforce/schema/Lead.DividendInterestTotal__c';
import NETRENTTOTAL from '@salesforce/schema/Lead.NetRentTotal__c';
import OTHERTOTAL from '@salesforce/schema/Lead.OtherTotal__c';
import OVERTIMETOTAL from '@salesforce/schema/Lead.OvertimeTotal__c';
import MONTHLYINCOMETOTAL from '@salesforce/schema/Lead.TotalMonthlyIncome__c';
import MONTHLYLIABILITIESTOTAL from '@salesforce/schema/Lead.TotalMonthlyLiabilities__c';
import POSITIVECASH from '@salesforce/schema/Lead.SubjectPropertyPositiveNetCashFlow__c';
import NEGATIVECASH from '@salesforce/schema/Lead.SubjectPropertyNegativeNetCashFlow__c';
import PRIMARYHOUSINGEXPENSE from '@salesforce/schema/Lead.PrimaryHousingExpense__c';

import TOTALBORROWER from '@salesforce/schema/Lead.Total_Borrower__c';
import TOTALCOBORROWER from '@salesforce/schema/Lead.Total_CoBorrower__c';
import TOTALINCOME from '@salesforce/schema/Lead.Total_Income__c';
import getLiabilities from '@salesforce/apex/AssetsController.getAssetsList';


const SUCCESS_TITLE = 'Lead Information Saved!';
const SUCCESS_VARIANT = 'success';
const columnsA = [
    { "label": "Name", "apiName": "Name", "fieldType": "text", "objectName": "Asset__c", "required": true },
    { "label": "Type", "apiName": "Type__c", "fieldType": "picklist", "objectName": "Asset__c" },
    { "label": "Amount", "apiName": "Amount__c", "fieldType": "text", "type": "number", "objectName": "Asset__c", "required": true }
];
const columnsL = [
    { "label": "Name", "apiName": "Name", "fieldType": "text", "objectName": "Asset__c" },
    { "label": "Type", "apiName": "Type__c", "fieldType": "picklist", "objectName": "Asset__c" },
    { "label": "Amount", "apiName": "Amount__c", "fieldType": "text", "type": "number", "objectName": "Asset__c" }
];

const columns = [
    { label: 'Name', fieldName: 'Name', hideDefaultActions: true},
    { label: 'Type', fieldName: 'Type__c', hideDefaultActions: true },
    { label: 'Amount', fieldName: 'Amount__c', type: "currency", hideDefaultActions: true },
    {
        label: 'Delete', type: 'button-icon', initialWidth: 75,
        typeAttributes: {
            iconName: 'action:delete', title: 'Delete', variant: 'border-filled',
            alternativeText: 'Delete',  iconClass: 'slds-icon-text-error'
        }, hideDefaultActions: true
    },
];

export default class LeadQualifyingTab extends LightningElement {
    Purpose = PURPOSE;
    Occupancy = OCCUPANCY;
    PropType = PROPTYPE;
    LoanType = LOANTYPE;
    LoanProgram = LOANPROGRAM;
    EstimatedValue = ESTIMATEDVALUE;
    FirstLoanAmount = FIRSTLOANAMOUNT;
    FirstLoanRate = FIRSTLOANRATE;
    SecondLoanAmount = SECONDLOANAMOUNT;
    SecondLoanRate = SECONDLOANRATE;
    Fico = FICO;
    Impounds = IMPOUNDS;
    SubjectPropZip = SUBJECTPROPERTYZIP;
    NumberOfUnits = NUMBEROFUNITS;
    x2ndLoanProgram = X2NDLOANPROGRAM;

    BorrowerBaseIncome = BORROWERBASE;
    BorrowerBonus = BORROWERBONUS;
    BorrowerCommission = BORROWERCOMMISSION;
    BorrowerRent = BORROWERRENT;
    BorrowerOther = BORROWEROTHER;
    BorrowerOvertime = BORROWEROVERTIME;
    BorrowerDivInt = BORROWERDIVINT;
    CoBorrowerDivInt = COBORROWERDIVINT;
    CoBorrowerBaseIncome = COBORROWERBASE;
    CoBorrowerBonus = COBORROWERBONUS;
    CoBorrowerCommission = COBORROWERCOMMISSION;
    CoBorrowerRent = COBORROWERRENT;
    CoBorrowerOther = COBORROWEROTHER;
    CoBorrowerOvertime = COBORROWEROVERTIME;

    LTV = LTV;
    CLTV = CLTV;
    Top = TOP;
    Bottom = BOTTOM;

    FirstMortgage = FIRSTMORTGAGE;
    OtherFin = OTHERFIN;
    HazardInsurance = HAZARDINSURANCE;
    Taxes = TAXES;
    MortgageInsurance = MORTGAGEINSURANCE;
    Hoa = HOA;
    Other = OTHER;
    SubjectPropertyRents = SUBJECTPROPERTYRENTS;
    SubjectPropertyNetRents = SUBJECTPROPERTYNETRENTS;

    BaseIncomeTotal = BASEINCOMETOTAL;
    TotalBorrower = TOTALBORROWER;
    TotalCoBorrower = TOTALCOBORROWER;
    IncomeTotal = TOTALINCOME;
    BonusTotal = BONUSTOTAL;
    CommissionTotal = COMMISSIONTOTAL;
    DivIntTotal = DIVINTTOTAL;
    NetRentTotal = NETRENTTOTAL;
    OtherTotal = OTHERTOTAL;
    OvertimeTotal = OVERTIMETOTAL;
    MonthlyIncomeTotal = MONTHLYINCOMETOTAL;
    MonthlyLiablitiesTotal = MONTHLYLIABILITIESTOTAL;
    PositiveCash = POSITIVECASH;
    NegativeCash = NEGATIVECASH;
    PrimaryHousingExpenses = PRIMARYHOUSINGEXPENSE;

    totalAmountgrid;

    leadId;
    LeadObject = LEAD_OBJECT;
    @api objectApiName;
    @api recordId;

    data = [];
    @track dataA;
    @track dataL;
    columns = columns;
    record = {};
    selectedRecords = [];
    refreshTable;
    refreshTableL;
    errorA;
    errorL;

    @track isLoading;
    @track isSaveLoading;

    totalBalance;

    // New Code Added
    @track isOpenBlendedRateModal = false;
    @track isOpenAssestModal = false;

    connectedCallback() {
        this.recordId = this.recordId;
        this.objectApiName = this.objectApiName;
      
        this.delayTimeout = setTimeout(() => {
            getAssetList();
            getLiabilityList();
        }, 100);
    }

    @wire(getAssetList, { recordId: '$recordId' })
    Asset(result) {
        this.refreshTable = result;
        if (result.data) {
            let totalAmount = 0;
            this.dataA = result.data;
            this.dataA.forEach(obj => {
                let amount = parseFloat(obj.Amount__c);
                if (!isNaN(amount)) {
                    totalAmount += amount;
                }
            });
            this.totalAmountgrid = totalAmount;

            this.errorA = undefined;
        } else if (result.error) {
            this.errorA = result.error;
            this.dataA = undefined;
        }
    };

    refresh() {
        return refreshApex(this.refreshTable);
    }

    @wire(getLiabilityList, { recordId: '$recordId' })
    Liability(result) {
        this.refreshTableL = result;
        if (result.data) {
            this.dataL = result.data;
            this.errorL = undefined;

        } else if (result.error) {
            this.errorL = result.error;
            this.dataL = undefined;
        }
    };

    // New Added /////////////////////////////
    @wire(getLiabilities, { LoanId: '$recordId', Type: 'Asset' })
    wiredLiabilities(wiredResult) {
        console.log('assets blended rate handleResults');
        console.log('Object Record ID :: ', this.recordId);
        const { error, data } = wiredResult;
        this.wiredLiabilitiesResult = wiredResult;

        if (data) {
            console.log(data);
            console.log('object data exists');
            this.liabilities = data;
            let Balance = 0;
            data.forEach(obj => {
                //let pmt = parseFloat(obj.Balance__c);
                let pmt = parseFloat(obj.Amount__c || 0);
                Balance += pmt;
            });
            this.recordCount = data.count;
            this.totalBalance = Balance;
            console.log('totalBalance:' + this.totalBalance);
            this.isLoading = false;
        } else if (error) {
            console.log('Error occurred retrieving asset-liability records');
        }
    }

    get formattedTotalBalance() {
        if (typeof this.totalBalance === 'number') {
            return this.totalBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        }
        return '';
    }
    /////////////////////////////////////////

    async handleRowAction(event) {
        let actionName = event.detail.action.name;
        window.console.log('actionName ====> ' + actionName);
        let row = event.detail.row;
        const result = await LightningConfirm.open({
            label: 'Are you you sure?',
            message: 'Are you sure you want to delete Asset record?',
            theme: 'error'
        });

        if (result) {
            this.deleteRow(row);
        }
        //this.deleteRow(row);
    }

    deleteRow(currentRow) {
        this.isLoading = true;
        let currentRecord = [];
        currentRecord.push(currentRow.Id);
        this.isSaveLoading = true;

        // calling apex class method to delete the selected contact
        deleteAssets({ lstAsstIds: currentRecord })
            .then(result => {
                window.console.log('result ====> ' + result);
                this.isSaveLoading = false;

                // showing success message
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success!!',
                    message: currentRow.Name + ' Asset deleted.',
                    variant: 'success'
                }),);

                // refreshing table data using refresh apex
                //return refreshApex(this.refreshTable), refreshApex(this.refreshTableL);
                this.isLoading = false;
                return refreshApex(this.refreshTable), refreshApex(this.wiredLiabilitiesResult);

            })
            .catch(error => {
                window.console.log('Error ====> ' + error);
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error!!',
                    message: error.message,
                    variant: 'error'
                }),);
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        const fields = event.detail.fields;
        console.log("Lead ID = " + this.recordId);
        fields.Lead = this.recordId;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
        //this.template.querySelector('lightning-record-edit-form');
    }
    handleSuccess() {
        // TODO: dispatch the custom event and show the success message    
        this.dispatchEvent(new ShowToastEvent({
            title: SUCCESS_TITLE,
            variant: SUCCESS_VARIANT
        }))
        this.dispatchEvent(new CustomEvent('createreview', { detail: {} }));
    }

    @track records;
    @api recordJson;
    @track columnsA = columnsA;
    @track columnsL = columnsL;
    @track columns = columns;

    assetsubmit(event) {
        this.isSaveLoading = true;
        var dynamicTable = this.template.querySelector("c-dynamic-table");
        if (dynamicTable) {
            var records = dynamicTable.retrieveRecords();
            console.log("All rows' values:", JSON.stringify(records));

            createAssets({ assets: records, recordId: this.recordId, type: 'Asset' })
                .then(result => {
                    console.log('Records saved successfully:', result);

                    if (result.status === 'success') {
                        getLiabilities();
                        // Display a success toast message
                        const event = new ShowToastEvent({
                            title: 'Success',
                            message: 'Assets saved Successfully.',
                            variant: 'success',
                            mode: 'dismissable'
                        });
                        this.dispatchEvent(event);
                    }
                    else if (result.status === 'failure') {
                        // Display an error toast message
                        const event = new ShowToastEvent({
                            title: 'Assets saved Failed.',
                            message: result.message,
                            variant: 'error',
                            mode: 'dismissable'
                        });
                        this.dispatchEvent(event);
                    }

                    dynamicTable.refreshChildData();
                    this.isSaveLoading = false;
                    return refreshApex(this.refreshTable), refreshApex(this.wiredLiabilitiesResult);
                })
                .catch(error => {
                    console.error('Error saving records:', error);
                    const event = new ShowToastEvent({
                        title: 'Error',
                        message: error,
                        variant: 'error',
                        mode: 'dismissable'
                    });
                    this.dispatchEvent(event);
                });

        }
    }

    // New Code Added    
    openBlendedRateModal() {
        this.isOpenBlendedRateModal = true;
    }

    closeBlendedRateModal() {
        this.isOpenBlendedRateModal = false;

    }

    openAssestModal() {
        this.isOpenAssestModal = true;

    }

    closeAssestModal() {
        this.isOpenAssestModal = false;

    }
}