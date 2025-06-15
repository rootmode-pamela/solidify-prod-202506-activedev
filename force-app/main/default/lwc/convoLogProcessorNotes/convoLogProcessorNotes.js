import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import{ refreshApex } from '@salesforce/apex';
import getConvoLog from '@salesforce/apex/convoLogProcessorNotes.getConvoLog';
import processorNote from '@salesforce/apex/convoLogProcessorNotes.processorNote';


export default class ConvoLogProcessorNotes extends LightningElement {
    @api recordId;
    processorNote = '';
    ConvoLog = '';
    isLoading = false;
    notifyProcessor = false;
    
    renderedCallback() {
        this.retrieveConvoLog();
    }

    retrieveConvoLog() {
        getConvoLog({ recordId: this.recordId })
            .then(result => {
                this.ConvoLog = result;
                console.log('Initial ConvoLog:', result);
            })
            .catch(error => {
                console.error('Error fetching existing value:', error);
            });
    }

    handleProcessorNoteChange(event) {
        this.processorNote = event.target.value;
    }

    handleNotifyProcessorChange(event){
        console.log('notify processor:' + event.target.checked);
        this.notifyProcessor = event.target.checked;
    }

    handlesave() {
        this.isLoading = true;
        console.log(this.notifyProcessor);
        processorNote({ recordId: this.recordId, processorNote: this.processorNote, notifyProcessor: this.notifyProcessor })
            .then(updatedConvoLog => {
                console.log('Updated ConvoLog from Apex:', updatedConvoLog);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Processor Note saved successfully...!!',
                        variant: 'success',
                    })
                );
             /*   this.retrieveConvoLog();
                this.processorNote = '';
                console.log('Updated ConvoLog in component:', this.ConvoLog);      */         
                this.isLoading = false; 
                this.dispatchEvent(new CustomEvent('closemodal'));                
                //return refreshApex(this.ConvoLog);                
            })
            .catch(error => {                
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Failed to save Processor Note.',
                        variant: 'error',
                    })
                );
                console.error('Error:', error);
                this.isLoading = false;
            });
    }

    closeModal(event) {
        this.dispatchEvent(new CustomEvent('closemodal'));
    }
}