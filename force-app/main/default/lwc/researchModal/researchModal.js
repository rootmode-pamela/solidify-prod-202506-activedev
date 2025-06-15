import {LightningElement, track, api, wire} from 'lwc';

export default class ResearchModal extends LightningElement {
    @api recordId;
    @api propertyRecordId;
    @api object;
    @track isLoading;    
    
    connectedCallback(){
        console.log('+++ recordId ' + this.recordId);
        console.log('+++ object ' + this.object);
        console.log('+++ propertyRecordId' + this.propertyRecordId);
    }

    closeModal(event){
        this.isLoading = false;
        this.dispatchEvent(new CustomEvent('closemodal'));     

    }

    handleCancel(event){
        this.isLoading = false;
        this.dispatchEvent(new CustomEvent('closemodal'));
    }




}