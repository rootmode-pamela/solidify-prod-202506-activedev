import {LightningElement, api} from 'lwc';

export default class DynamicalInput extends LightningElement {
    @api fieldName;
    @api showEditInput;
    @api value;

    editField(event) {
        this.dispatchEvent(new CustomEvent("inputchange"));
    }
}