import { LightningElement, api, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import { reduceErrors } from 'c/ldsUtils';
import updateAssets from '@salesforce/apex/AssetsController.updateAssets';
import getLiabilities from '@salesforce/apex/AssetsController.getAssetListLoan';

export default class BlendedRate extends LightningElement {
    @api recordId;
    @track assets;
    error;
    blendedRate;
    totalPayment;
    showPopup = false;
    refreshHandlerId;
    updatedFields = [];

    /** Wired Apex result so it can be refreshed programmatically */
    wiredAssetsResult;
    columns = [
        { label: 'Name', fieldName: 'Name',  editable: true },
        { label: 'Type', fieldName: 'Type__c',  editable: true},
        { label: 'Amount', fieldName: 'Amount__c', type: 'currency',  editable: true},
        { label: 'Payment', fieldName: 'Payment__c', type: 'currency',  editable: true},
        { label: 'Rate', fieldName: 'Interest_Rate__c', type: 'percent', editable: true, typeAttributes: {'minimumFractionDigits':3, 'maximumFractionDigits':3}},
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


    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'AssetsLiabilities__r',
        fields: ['Asset__c.Id', 'Asset__c.Name', 'Asset__c.Type__c', 'Asset__c.AssetOrLiability__c', 'Asset__c.Amount__c', 'Asset__c.Interest_Rate__c', 'Asset__c.Payment__c', 'Asset__c.Planned_Payment__c']
    }, 
    getLiabilities, { LoanId:'$recordId', Type:'Liability'}
    )
    liabilities;

    listInfo({error, data}) {
        console.log('assets blended rate');
        console.log(this.recordId);
        this.wiredAssetsResult = data;
        if (data) {
            console.log(data.records);
            let tempRecords = [];
            let totalAmount = 0;
            let payment = 0;
            let weightedRateTotal = 0;
            data.records.forEach( obj => {
                let tempRecord = {};
                tempRecord.Id = obj.fields.Id.value;
                tempRecord.Name = obj.fields.Name.value;
                tempRecord.Type__c = obj.fields.Type__c.value;
                tempRecord.Amount__c = obj.fields.Amount__c.value;
                tempRecord.Interest_Rate__c = obj.fields.Interest_Rate__c.value/100;
                tempRecord.Payment__c = obj.fields.Payment__c.value;
                tempRecord.Planned_Payment__c = obj.fields.Planned_Payment__c.value;
                tempRecords.push( tempRecord );

                let amount = parseFloat(obj.fields.Amount__c.value);
                let rate = parseFloat(obj.fields.Interest_Rate__c.value);
                let pmt = parseFloat(obj.fields.Payment__c.value);
                weightedRateTotal += amount * rate;
                totalAmount += amount;
                payment += pmt;

            } );

            this.assets = tempRecords;
            this.recordCount = data.count;
            this.error = undefined;
            this.blendedRate = (weightedRateTotal/totalAmount).toFixed(2);
        } else if (error) {
            console.error('Error occurred retrieving asset-liability records');
        }
    }

    async handleSave(event) {
        const updatedFields = event.detail.draftValues;
        this.updatedFields = [];
        updatedFields.forEach(function(row){
            if(row.Interest_Rate__c>0){
                row.Interest_Rate__c = row.Interest_Rate__c*100;
            }
        });

        

        try {
            // Pass edited fields to the updateAssets Apex controller
            await updateAssets({ assetsForUpdate: updatedFields });

            // Report success with a toast
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Records updated',
                    variant: 'success'
                })
            );
       //     this.refreshContainer();
            // Display fresh data in the datatable
            await refreshApex(this.assets);
          //  this.dispatchEvent(new RefreshEvent());
         // Clear all datatable draft values
            this.updatedFields = [];
            console.log('sent refresh');
            return this.refresh();

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

    refresh() {
        refreshApex(this.assets);
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


    async showSuccessToast(message, title) {
        const evt = new ShowToastEvent({
          title: title,
          message: message,
          variant: "success"
        });
        this.dispatchEvent(evt);
    }


    handleSubmit(event) {
        console.log('overriding submit');
        console.log(recordId);
        console.log(objectApiName);
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
      refreshApex(this.wiredAssetsResult);
    }
    
    closePopup() {
        this.showPopup=false;
    }
}