import {LightningElement, api, track, wire} from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import LOAN_OBJECT from '@salesforce/schema/Opportunity';
import LeadSource_Field from '@salesforce/schema/Opportunity.LeadSource';
import Referred_By_Field from '@salesforce/schema/Opportunity.Referred_By__c';
import Buyers_Agent_Field from '@salesforce/schema/Opportunity.Buyers_Agent__c';
import Primary_Goal from '@salesforce/schema/Opportunity.Primary_Goal__c';
import Appraisal from '@salesforce/schema/Opportunity.Appraisal__c';
import Escrows from '@salesforce/schema/Opportunity.Escrows__c';
import Admin_Fee from '@salesforce/schema/Opportunity.Admin_Fee__c';
import Other_Liens_New from '@salesforce/schema/Opportunity.Other_Liens_New__c';
import IncomeType from '@salesforce/schema/Opportunity.IncomeType__c';
import Vesting from '@salesforce/schema/Opportunity.Vesting__c';
import Closing_Funds from '@salesforce/schema/Opportunity.Closing_Funds__c';
import Fee_Structure from '@salesforce/schema/Opportunity.Fee_Structure__c';
import Loan_Originator from '@salesforce/schema/Opportunity.Loan_Originator__c';
import Co_Loan_Originator from '@salesforce/schema/Opportunity.Co_Loan_Originator__c';
import Loan_Processor from '@salesforce/schema/Opportunity.Loan_Processor__c';
import Lender from '@salesforce/schema/Opportunity.Lender__c';
import Initial_Docs_In_By from '@salesforce/schema/Opportunity.Initial_Docs_In_By__c';
import LE_Acknowledged_By from '@salesforce/schema/Opportunity.LE_Acknowledged_By__c';
import Loan_Status_Update from '@salesforce/schema/Opportunity.Loan_Status_Update__c';
import Appraisal_Contingency from '@salesforce/schema/Opportunity.Appraisal_Contingency__c';
import Loan_Contingency from '@salesforce/schema/Opportunity.Loan_Contingency__c';
import Approval_Expected from '@salesforce/schema/Opportunity.Approval_Expected__c';
import Final_Conditions_In_By from '@salesforce/schema/Opportunity.Final_Conditions_In_By__c';
import CD_Out_By from '@salesforce/schema/Opportunity.CD_Out_By__c';
import Sign_Final_Docs_By from '@salesforce/schema/Opportunity.Sign_Final_Docs_By__c';
import COE from '@salesforce/schema/Opportunity.COE__c';
import Lock_Expiration from '@salesforce/schema/Opportunity.Lock_Expiration__c';
import Lender_AE__c from '@salesforce/schema/Opportunity.Lender_AE__c';
import Escrow_Contact from '@salesforce/schema/Opportunity.Escrow_Contact__c';
import Sellers_Agent from '@salesforce/schema/Opportunity.Sellers_Agent__c';
const FIELDS = [
    "Opportunity.Subject_Property_Name__r.Property_State__c",
    "Opportunity.Purpose__c",
    LeadSource_Field, Referred_By_Field, Buyers_Agent_Field, Primary_Goal, Appraisal, Escrows, Admin_Fee,
    Other_Liens_New, IncomeType, Vesting, Closing_Funds, Fee_Structure, Loan_Originator, Co_Loan_Originator,
    Loan_Processor, Lender, Initial_Docs_In_By, LE_Acknowledged_By, Loan_Status_Update, Appraisal_Contingency,
    Loan_Contingency, Approval_Expected, Final_Conditions_In_By, CD_Out_By, Sign_Final_Docs_By, COE, Lock_Expiration,
    Lender_AE__c, Escrow_Contact, Sellers_Agent,
];
// import EXIT_BUTTON_STYLE from '@salesforce/resourceUrl/exitButtonStyle';

// import {loadStyle} from 'lightning/platformResourceLoader';

export default class SolidifyLoadSetupLWC extends NavigationMixin(LightningElement) {

    LoanObject = LOAN_OBJECT;
    LeadSource = LeadSource_Field;
    ReferredBy = Referred_By_Field;
    BuyersAgent = Buyers_Agent_Field;
    PrimaryGoal = Primary_Goal;
    Appraisal = Appraisal;
    Escrows = Escrows;
    AdminFee = Admin_Fee;
    OtherLiensNew = Other_Liens_New;
    IncomeType = IncomeType;
    Vesting = Vesting;
    ClosingFunds = Closing_Funds;
    FeeStructure = Fee_Structure;
    LoanOriginator = Loan_Originator;
    CoLoanOriginator = Co_Loan_Originator;
    LoanProcessor = Loan_Processor;
    Lender = Lender;
    InitialDocsInBy = Initial_Docs_In_By;
    LEAcknowledgedBy = LE_Acknowledged_By;
    LoanStatusUpdate = Loan_Status_Update;
    AppraisalContingency = Appraisal_Contingency;
    LoanContingency = Loan_Contingency;
    ApprovalExpected = Approval_Expected;
    FinalConditionsInBy = Final_Conditions_In_By;
    CDOutBy = CD_Out_By;
    SignFinalDocsBy = Sign_Final_Docs_By;
    COE = COE;
    LockExpiration = Lock_Expiration;
    LenderAE = Lender_AE__c;
    EscrowContact = Escrow_Contact;
    SellersAgent = Sellers_Agent;

    @api purpose;
    @api loanId;
    @track isLoad = true;

    @track isPurchOrPurchase = false;
    @track isPurchase = false;
    @track isPurchaseAndInAZ = false;

    @track keyInfoSection = false;
    @track contactSection = false;
    @track timelineSection = false;

    @track loanData;

    @wire(getRecord, { recordId: '$loanId', fields: FIELDS })
    loan({error, data}) {
        if (data) {
            this.prepareLoanPreview(data);
            const purpose = data.fields?.Purpose__c?.value;
            const state = data.fields?.Subject_Property_Name__r?.value?.fields.Property_State__c?.value;
            this.isPurchOrPurchase = purpose == 'Purchase' || purpose == 'Purch';
            this.isPurchase = purpose == 'Purchase';
            this.isPurchaseAndInAZ = purpose == 'Purchase'  && state == 'AZ';
        } else if (error) {
            console.log(error);
        }
    };

    prepareLoanPreview(data) {
        const fields = data.fields;
        this.loanData = JSON.parse(JSON.stringify(fields));
        console.log('prepareLoanPreview', JSON.parse(JSON.stringify(fields)), JSON.parse(JSON.stringify(FIELDS)));
    }

    get LeadSource_Field_value() {if (this.loanData) return this.loanData[LeadSource_Field.fieldApiName].displayValue ?? ''}
    get Referred_By_Field_value() {if (this.loanData) return this.loanData[Referred_By_Field.fieldApiName].displayValue ?? ''}
    get Buyers_Agent_Field_value() {if (this.loanData) return this.loanData[Buyers_Agent_Field.fieldApiName].displayValue ?? ''}
    get Primary_Goal_value() {if (this.loanData) return this.loanData[Primary_Goal.fieldApiName].displayValue ?? ''}
    get Appraisal_value() {if (this.loanData) return this.loanData[Appraisal.fieldApiName].displayValue ?? ''}
    get Escrows_value() {if (this.loanData) return this.loanData[Escrows.fieldApiName].displayValue ?? ''}
    get Admin_Fee_value() {if (this.loanData) return this.loanData[Admin_Fee.fieldApiName].displayValue ?? ''}
    get Other_Liens_New_value() {if (this.loanData) return this.loanData[Other_Liens_New.fieldApiName].displayValue ?? ''}
    get IncomeType_value() {if (this.loanData) return this.loanData[IncomeType.fieldApiName].displayValue ?? ''}
    get Vesting_value() {if (this.loanData) return this.loanData[Vesting.fieldApiName].displayValue ?? ''}
    get Closing_Funds_value() {if (this.loanData) return this.loanData[Closing_Funds.fieldApiName].displayValue ?? ''}
    get Fee_Structure_value() {if (this.loanData) return this.loanData[Fee_Structure.fieldApiName].displayValue ?? ''}
    get Loan_Originator_value() {if (this.loanData) return this.loanData[Loan_Originator.fieldApiName].displayValue ?? ''}
    get Co_Loan_Originator_value() {if (this.loanData) return this.loanData[Co_Loan_Originator.fieldApiName].displayValue ?? ''}
    get Loan_Processor_value() {if (this.loanData) return this.loanData[Loan_Processor.fieldApiName].displayValue ?? ''}
    get Lender_value() {if (this.loanData) return this.loanData[Lender.fieldApiName].displayValue ?? ''}
    get Initial_Docs_In_By_value() {if (this.loanData) return this.loanData[Initial_Docs_In_By.fieldApiName].displayValue ?? ''}
    get LE_Acknowledged_By_value() {if (this.loanData) return this.loanData[LE_Acknowledged_By.fieldApiName].displayValue ?? ''}
    get Loan_Status_Update_value() {if (this.loanData) return this.loanData[Loan_Status_Update.fieldApiName].displayValue ?? ''}
    get Appraisal_Contingency_value() {if (this.loanData) return this.loanData[Appraisal_Contingency.fieldApiName].displayValue ?? ''}
    get Loan_Contingency_value() {if (this.loanData) return this.loanData[Loan_Contingency.fieldApiName].displayValue ?? ''}
    get Approval_Expected_value() {if (this.loanData) return this.loanData[Approval_Expected.fieldApiName].displayValue ?? ''}
    get Final_Conditions_In_By_value() {if (this.loanData) return this.loanData[Final_Conditions_In_By.fieldApiName].displayValue ?? ''}
    get CD_Out_By_value() {if (this.loanData) return this.loanData[CD_Out_By.fieldApiName].displayValue ?? ''}
    get Sign_Final_Docs_By_value() {if (this.loanData) return this.loanData[Sign_Final_Docs_By.fieldApiName].displayValue ?? ''}
    get COE_value() {if (this.loanData) return this.loanData[COE.fieldApiName].displayValue ?? ''}
    get Lock_Expiration_value() {if (this.loanData) return this.loanData[Lock_Expiration.fieldApiName].displayValue ?? ''}
    get Lender_AE__c_value() {if (this.loanData) return this.loanData[Lender_AE__c.fieldApiName].displayValue ?? ''}
    get Escrow_Contact_value() {if (this.loanData) return this.loanData[Escrow_Contact.fieldApiName].displayValue ?? ''}
    get Sellers_Agent_value() {if (this.loanData) return this.loanData[Sellers_Agent.fieldApiName].displayValue ?? ''}

    connectedCallback() {
        this.isLoad = false;
    }

    handleSubmit() {
        this.isLoad = true;
    }
    handleSuccess() {
        this.isLoad = false;
        this.navigateToLoadRecordPage();
    }

    handleCancel() {
        this.navigateToLoadRecordPage();
    }

    handleBackToSetup() {
        this.showShareSummary = false;
    }

    get editAll_state() {
        return this.keyInfoSection && this.contactSection && this.timelineSection;
    }

    handleEditAll(event) {
        const state = !this.editAll_state;
        // event.currentTarget.label = !state ? 'Edit All' : 'Hide All';
        // event.currentTarget.variant = !state ? 'brand-outline' : 'brand';
        this.handleChangeAllSections(state)
    }

    navigateToLoadRecordPage(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.loanId,
                objectApiName: this.LoanObject,
                actionName: 'view'
            }
        });
    }

    handleChangeAllSections(state) {
        this.keyInfoSection = state;
        this.contactSection = state;
        this.timelineSection = state;
    }

    handleChangeKeyInfoSection(event) {
        // this.keyInfoSection = !this.keyInfoSection;
        this.handleEditAll(event);
    }

    handleChangeContactSection(event) {
        // this.contactSection = !this.contactSection;
        this.handleEditAll(event);
    }

    handleChangeTimelineSection(event) {
        // this.timelineSection = !this.timelineSection;
        this.handleEditAll(event);
    }

    @track buttonTitle = 'Share Summary';
    @track showShareSummary = false;

    get flowClass() {
        return 'setupFlowWindow' +(this.showShareSummary ? '':' slds-hide');
    }

    launchFlow(){
        this.showShareSummary = true;
        this.template.querySelector('lightning-flow').startFlow("New_Loan_Alert", [
            {
                name: 'recordId',
                type: 'String',
                value: this.loanId
            }
        ]);
    }

    handleStatusChange(event){
        console.log(event.detail.status);
        if (event.detail.status === 'FINISHED') {
            this.closeModal();
        }
    }

    closeModal(){
        this.handleBackToSetup();
    }
    get iconName() {
        let name = null;
        if (this.buttonTitle === 'Setup') {
            name = "utility:paste";
        } else if (this.buttonTitle === 'Share Summary') {
            name = "utility:internal_share";
        } else if (this.buttonTitle === 'Calculator') {
            name = "utility:number_input";
        }
        return name;
    }
}