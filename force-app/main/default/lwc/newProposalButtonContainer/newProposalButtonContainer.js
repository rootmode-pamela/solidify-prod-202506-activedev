import { LightningElement, api } from 'lwc';

export default class NewProposalButtonContainer extends LightningElement {
    @api recordId;
    @api objectApiName;
}