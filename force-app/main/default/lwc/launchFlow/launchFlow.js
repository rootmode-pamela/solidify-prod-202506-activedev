import {LightningElement, track, api} from 'lwc';

export default class LaunchFlow extends LightningElement {

    @api flowName;
    @api variables;
    @api modalTitle;
    @api buttonTitle;

    @track showModal;

    launchFlow(){
        this.showModal = true;
        this.template.querySelector('lightning-flow').startFlow(this.flowName, this.variables);
    }

    handleStatusChange(event){
        if (event.detail.status === 'FINISHED') {
            this.closeModal();
        }
    }

    closeModal(){
        this.showModal = false;
    }

    get containerClass(){
        return this.showModal ? '' : 'slds-hide';
    }

    get iconName() {
        let name = null;
        if (this.buttonTitle == 'Setup') {
            name = "utility:paste";
        } else if (this.buttonTitle == 'Share Summary') {
            name = "utility:internal_share";
        } else if (this.buttonTitle == 'Calculator') {
            name = "utility:number_input";
        }
        return name;
    }

    get modalWindowClass() {
        return this.flowName == 'Loan_Setup' ?  'slds-modal__container setupFlowWindow' : 'slds-modal__container'
    }
}