import { LightningElement, api, track, wire } from 'lwc';
import getAssetList from '@salesforce/apex/leadQualifyingTabController.getAssetList';
import LightningConfirm from 'lightning/confirm';
import createAssets from '@salesforce/apex/leadQualifyingTabController.createAssets';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import ASSET_OBJECT from '@salesforce/schema/Asset__c';
import TYPE_FIELD from '@salesforce/schema/Asset__c.Type__c';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';

export default class AssestButtonAddRecord extends LightningElement {
    @api recordId;
    @track pickListOptions;
    @track isLoading;
	typeOptions = [{ value: '-None-', label: '' }];
    filterList = [];
    keyIndex = 0;
	wiredLiabilitiesResult; 
    totalBalance;  
    refreshTable;
    totalAmountgrid;
    errorA;
    data = [];
    @track dataA;
    record = {};
	
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

    connectedCallback() {
        this.handleAddRow();
    }

    handleAddRow() {
        let objRow = {
            Name: '',
            Type__c: '',
            Amount__c: '',
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
    }
    
    async saveRows() 
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
            createAssets({ 
                assets: this.filterList,
                recordId: this.recordId,
                type: 'Asset'
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
            return refreshApex(this.refreshTable), refreshApex(this.wiredLiabilitiesResult);
            
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

    refresh() {
        return refreshApex(this.wiredLiabilitiesResult);
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
}