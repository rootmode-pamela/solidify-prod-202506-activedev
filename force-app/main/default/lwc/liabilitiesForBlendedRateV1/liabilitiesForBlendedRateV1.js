import { LightningElement, wire, api, track } from 'lwc';
import getLiabilities from '@salesforce/apex/AssetsController.getAssetsList';
import LightningConfirm from 'lightning/confirm';
//import getLiabilities from '@salesforce/apex/AssetsController.getAssetListLoan';
import updateAssets from '@salesforce/apex/AssetsController.updateAssets';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import ASSET_OBJECT from '@salesforce/schema/Asset__c';
import TYPE_FIELD from '@salesforce/schema/Asset__c.Type__c';
import saveAsset  from '@salesforce/apex/insertAssetRecord.saveAsset';
 

const COLS = [
    { label: 'Name', fieldName: 'Name',  editable: true },
    { label: 'Type', fieldName: 'Type__c',  editable: true, type: 'text'},

    { label: 'Amount', fieldName: 'Amount__c', type: 'currency',  editable: true},
    { label: 'Payment', fieldName: 'Payment__c', type: 'currency',  editable: true},
    { label: 'Rate', fieldName: 'Interest_Rate__c', type: 'percent-fixed', editable: true, typeAttributes: {'minimumFractionDigits':3, 'maximumFractionDigits':3}},
    //{ label: 'Planned Payment', fieldName: 'Planned_Payment__c', type: 'currency',  editable: true},
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
    totalAmountgrid;
    showPopup = false;
    showSpinner = false;
    //for Apex refresh
    wiredLiabilitiesResult;    
    
    typeOptions = [{ value: '-None-', label: '' }];
    filterList = [];
    keyIndex = 0;

    // For Delete    

    connectedCallback() {
        this.handleAddRow();
    }

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
        console.log('Object Record ID :: ', this.recordId);
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
             if(isNaN(this.totalPayment))
             {
                this.totalPayment = 0;
             }
             this.totalAmountgrid = totalAmount;
             if(isNaN(this.totalAmountgrid))
             {
                this.totalAmountgrid = 0;
             }
             console.log('totalAmountgrid:' + this.totalAmountgrid);
           //  this.error = undefined;                      
             this.blendedRate = (weightedRateTotal/totalAmount).toFixed(2);
             if(isNaN(this.blendedRate))
             {
                this.blendedRate = 0;
             }
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

    async handleRowAction(event) {
        console.log('handleRowAction');
        const action = event.detail.action.name;
        const row = event.detail.row;
        switch (action) {
            case 'delete':
                const result = await LightningConfirm.open({
                    label: 'Are you you sure?',
                    message: 'Are you sure you want to delete Asset record?',
                    theme: 'error'
                });
         
                if (result) 
                {
                    this.deleteAsset(row);    
                }
        }
    }

    async deleteAsset(row) {
        const recordId = row.Id;
        try {
            this.isLoading = true; 
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
            this.isLoading = false; 
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

    handleCancel(event){
        this.showPopup=false;
    }

    /*handleShowPopup(event){
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

    
    
    closePopup() {
        this.showPopup=false;
    }*/  
    
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: TYPE_FIELD })
    industryValues({ data, error }) {
        if (data) {
            data.values.forEach(val => {
                this.typeOptions = [...this.typeOptions, { value: val.value, label: val.label }];
            });
        }
        else if (error) {
            this.processErrorMessage(error);
        }
    }

    handleAddRow() {
        let objRow = {
            Name: '',
            Type__c: '',
            Amount__c: '',
            Payment__c: '',
            Interest_Rate__c: '',
            Planned_Payment__c: '',
            id: ++this.keyIndex
        }

        this.filterList = [...this.filterList, Object.create(objRow)];
    }

    handleRemoveRow(event) {
        this.filterList = this.filterList.filter((ele) => {
            return parseInt(ele.id) !== parseInt(event.currentTarget.dataset.index);
        });

        if (this.filterList.length == 0) {
            this.handleAddRow();
        }
    }
       
    handleChange(event) {
        if (event.target.name == 'assetName') {
            this.filterList[event.currentTarget.dataset.index].Name = event.target.value;
        }
        else if (event.target.name == 'assetType') {
            this.filterList[event.currentTarget.dataset.index].Type__c = event.target.value;
        }
        else if (event.target.name == 'assetAmount') {
            this.filterList[event.currentTarget.dataset.index].Amount__c = event.target.value;
        }
        else if (event.target.name == 'assetPayment') {
            this.filterList[event.currentTarget.dataset.index].Payment__c = event.target.value;
        }
        else if (event.target.name == 'assetRate') {
            this.filterList[event.currentTarget.dataset.index].Interest_Rate__c = event.target.value;
        }
        // else if (event.target.name == 'assetPlannedPayment') {
        //     this.filterList[event.currentTarget.dataset.index].Planned_Payment__c = event.target.value;
        // }
                
    }
    
    saveRows() 
    {                    
        let allInputs = this.template.querySelectorAll('lightning-input');
        let isValid = true;

        allInputs.forEach(input => {
            if (input.required && !input.value) {
                input.setCustomValidity("This field is required");
                input.reportValidity();
                isValid = false;
            } else {
                input.setCustomValidity(""); // Reset any previous custom validity
                input.reportValidity();
            }
        });

        if (isValid) { 
            this.isLoading = true;                   
            console.log('isValid => ', isValid);      
            console.log('this.filterList => ', this.filterList);        
            saveAsset({ 
                lstAsset: this.filterList,
                recordID: this.recordId
            }).then(result => {  
                this.isLoading = false;          
                this.showToastMessage('success', 'Records Saved Successfully!!', 'Success');
                this.filterList = [];
                if (this.filterList.length == 0) 
                {                
                    this.handleAddRow();                    
                    this.template.querySelectorAll('lightning-combobox').forEach(element => {
                    element.value = null;
                });                
                this.template.querySelectorAll('lightning-input').forEach(element => {
                    element.value = null;
                });
            }
            console.log('result ==> ', result);
            }).catch(error => {
            this.processErrorMessage(error);
            this.isLoading = false;
            })   
        }
        else 
        {            
            this.showToast('Error', 'Please fill in all required fields', 'error');
        }                                       
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
    
    processErrorMessage(message) {
        let errorMsg = '';
        if (message) {
            if (message.body) {
                if (Array.isArray(message.body)) {
                    errorMsg = message.body.map(e => e.message).join(', ');
                } else if (typeof message.body.message === 'string') {
                    errorMsg = message.body.message;
                }
            }
            else {
                errorMsg = message;
            }
        }
        this.showToastMessage('error', errorMsg, 'Error!');
    }

    async showToastMessage(variant, message, title) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            })
        );
        await refreshApex(this.wiredLiabilitiesResult);
    }
}