import {LightningElement, track, api, wire} from 'lwc';
import getLiabilities from '@salesforce/apex/AssetsController.getAssetsList';

export default class BlendedRateModal extends LightningElement {
    @api recordId;
    @track isLoading;    
    
    closeModal(event) 
    {
        this.dispatchEvent(new CustomEvent('closemodal'));     
        
        //window.location.reload(true); 
    }
}