import {LightningElement, track, api, wire} from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import OPPORTUNITY_OBJECT from "@salesforce/schema/Opportunity";


export default class ClosedElsewhereModal extends LightningElement {

    opportunityObject = OPPORTUNITY_OBJECT;

    @track showSpinner = false;
    @track loanName;
    @track recordTypeId;
    @api objectApiName;

    @wire(getObjectInfo, { objectApiName: OPPORTUNITY_OBJECT })
    getRecordTypeId({error,data}){
        if(!data){
            return;
        }
        for (const key in data.recordTypeInfos) {
            if (data.recordTypeInfos[key]?.name == 'Closed Elsewhere') {
                this.recordTypeId = key;
            }
        }
    };

    handleSuccess(event) {
        this.showSpinner = false;
        this.showToast('Loan {0} was created.', 'success', event.detail.id);
        this.closeAction();
    }
    handleError(event) {
        this.showSpinner = false;
        this.showToast('Loan was not created.', 'error');
    }
    handleSubmit(event) {
        this.showSpinner = true;
        this.loanName = event.detail.fields?.Name;
        console.log('Submit + ' + this.objectApiName)
        event.preventDefault();
        const fields = event.detail.fields;
        fields.StageName = 'New';
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }

    showToast(message, variant, recordId = null) {
        const event = new ShowToastEvent({
            message,
            variant,
            messageData: [
                {
                    url: location.origin + '/lightning/r/Opportunity/' + recordId + '/view',
                    label: this.loanName
                }
            ]
        });
        this.dispatchEvent(event);
    }

    closeAction(){
        this.dispatchEvent(new CloseActionScreenEvent());
    }

    get isPropertyPage() {
        return this.objectApiName == 'Properties__c'
    }
}