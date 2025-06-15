import { LightningElement, api, track, wire } from 'lwc';

export default class RelatedRecordOpportunity extends LightningElement {
    @api recordId;
    @api object;
    @track isLoading;
    @track fieldsChanged = false;

    handleSubmit(event){
        this.isLoading = true;
    }

    closeModal(event) 
    {
        this.isLoading = false
        this.dispatchEvent(new CustomEvent('closemodal'));            
    }

    fieldChanged(){
        this.fieldsChanged = true;
    }

    handleCancel(){
        this.dispatchEvent(new CustomEvent('cancel'));
    }

    handleSuccess(){
        console.log('handleSuccess');
        const event = new ShowToastEvent({
            title: 'Success',
            message: 'Record updated',
            variant: 'success'
        });
        this.dispatchEvent(event);
    }
 
    }