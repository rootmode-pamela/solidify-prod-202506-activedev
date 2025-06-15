import { LightningElement, wire, api, track } from 'lwc';
import getLiabilities from '@salesforce/apex/AssetsController.getAssetListLoan';
import updateAssets from '@salesforce/apex/AssetsController.updateAssets';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import ASSET_OBJECT from '@salesforce/schema/Asset__c';
import TYPE_FIELD from '@salesforce/schema/Asset__c.Type__c';
 

const COLS = [
    { label: 'Name', fieldName: 'Name',  editable: true },
    { label: 'Type', fieldName: 'Type__c',  editable: true, type: 'text'},
/*    { label: 'Type pick', fieldName: 'Type__c', editable: true, typeAttributes: {
            placeholder: 'Choose Type', 
            options: { types }, 
            value: { fieldName: 'Type__c' }, // default value for picklist,
            context: { fieldName: 'Id' } // binding account Id with context variable to be returned back
        }
    }, */
    { label: 'Amount', fieldName: 'Amount__c', type: 'currency',  editable: true},
    { label: 'Payment', fieldName: 'Payment__c', type: 'currency',  editable: true},
    { label: 'Rate', fieldName: 'Interest_Rate__c', type: 'percent-fixed', editable: true, typeAttributes: {'minimumFractionDigits':3, 'maximumFractionDigits':3}},
    { label: 'Planned Payment', fieldName: 'Planned_Payment__c', type: 'currency',  editable: true},
    {
        type: 'button-icon',
        typeAttributes:
        {
            iconName: 'utility:delete',
            name: 'delete',
            iconClass: 'slds-icon-text-error'
        }
    }    
];


export default class LiabilitiesWithBlendedRate extends LightningElement {
    @api recordId;
    @track data;
    @track pickListOptions;
    @track isLoading;
    liabilities;
    columns = COLS;
    draftValues = [];
    blendedRate;
    totalPayment;
    showPopup = false;
    showSpinner = false;
    //for Apex refresh
    wiredLiabilitiesResult;

    @wire(getObjectInfo, { objectApiName: ASSET_OBJECT })
    objectInfo;
 

    @wire(getPicklistValues, {
        recordTypeId: "$objectInfo.data.defaultRecordTypeId",
        fieldApiName: TYPE_FIELD
    })
 
    wirePickList({ error, data }) {
        let options = [];
        if (data) {
            console.log('picklist options');
            console.log(data);
            this.pickListOptions = data.values;
            this.pickListOptions.forEach(r => {
                options.push({
                  label: r.label,
                  value: r.value,
                });
              });
            this.pickListOptions = options;
           // this.pickListOptions = this.types;


        } else if (error) {
            console.log(error);
        }
     
    }


    @wire(getLiabilities, { LoanId:'$recordId', Type:'Liability'}, { pickList: '$pickListOptions' })
    wiredLiabilities(wiredResult) {
        console.log('assets blended rate handleResults');
        console.log(this.recordId);
        const { error, data } = wiredResult;
        this.wiredLiabilitiesResult = wiredResult;

        if (data) {
            console.log(data);
            console.log('object data exists');
            this.liabilities = data;
            let tempRecords = [];
            let totalAmount = 0;
            let payment = 0;
            let weightedRateTotal = 0;
            data.forEach( obj => {
                let amount = parseFloat(obj.Amount__c);
                let rate = parseFloat(obj.Interest_Rate__c);
                let pmt = parseFloat(obj.Payment__c);
                weightedRateTotal += amount * rate;
                totalAmount += amount;
                payment += pmt;
            } );
            this.recordCount = data.count;
            this.totalPayment = payment;
          //  this.error = undefined;
            this.blendedRate = (weightedRateTotal/totalAmount).toFixed(2);
            console.log('end of sum:' + this.blendedRate);
            this.isLoading = false;
        } else if (error) {
            console.log('Error occurred retrieving asset-liability records');
        }
    } 


    refresh() {
        return refreshApex(this.wiredLiabilitiesResult);
    }

    async handleSave(event) {
        console.log('handleSave');
        const updatedFields = event.detail.draftValues;
        console.log('handleSave');
        console.log(event.detail);
        console.log(updatedFields);
        // Clear all datatable draft values
        this.draftValues = [];

        try {
            // Pass edited fields to the updateContacts Apex controller
            await updateAssets({ assetsForUpdate: updatedFields });

            // Report success with a toast
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Records updated',
                    variant: 'success'
                })
            );

            // Display fresh data in the datatable
            await refreshApex(this.wiredLiabilitiesResult);
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error while updating or refreshing records',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        }
    }

    handleRowAction(event) {
        console.log('handleRowAction');
        const action = event.detail.action.name;
        const row = event.detail.row;
        switch (action) {
            case 'delete':
                this.deleteAsset(row);    
        }
    }


    async deleteAsset(row) {
        const recordId = row.Id;
        try {
            await deleteRecord(recordId);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Record deleted',
                    variant: 'success'
                })
            );
            console.log('refreshing');
            await refreshApex(this.wiredLiabilitiesResult);
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error deleting record',
                    message: reduceErrors(error).join(', '),
                    variant: 'error'
                })
            );
        }
    }

    handleShowPopup(event){
        this.showPopup = true;
        console.log('showPopup:' + showPopup);
    }
    handleSubmit(event) {
        console.log('overriding submit');
        console.log(recordId);
        console.log(objectApiName);
        this.isLoading = true;
        event.preventDefault(); // stop the form from submitting
        const fields = event.detail.fields;
        fields.Loan__c = recordId; // modify a field
        fields.AssetOrLiability__c = 'Liability';
        this.template.querySelector('lightning-record-form').submit(fields);
        console.log('after submit');
    }  

    closePopupSuccess(event) {
      console.log('closePopupSuccess');
      this.showPopup=false;
      this.isLoading = false;
      refreshApex(this.wiredLiabilitiesResult);
    }

    handleCancel(event){
        this.showPopup=false;
    }
    
    closePopup() {
        this.showPopup=false;
    }

}