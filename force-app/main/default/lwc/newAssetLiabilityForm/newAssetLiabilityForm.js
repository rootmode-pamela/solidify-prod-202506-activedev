import { api } from 'lwc';
import LightningModal from 'lightning/modal';
import { CloseActionScreenEvent } from 'lightning/actions';
import ASSET_OBJECT from '@salesforce/schema/Asset__c';
import { RefreshEvent } from 'lightning/refresh';
import NAME from "@salesforce/schema/Asset__c.Name"; 
import AMOUNT from "@salesforce/schema/Asset__c.Amount__c";
import ASSETORLIABILITY from "@salesforce/schema/Asset__c.AssetOrLiability__c";
import TYPE from "@salesforce/schema/Asset__c.Type__c";
import INTEREST_RATE from "@salesforce/schema/Asset__c.Interest_Rate__c";
import LEAD from "@salesforce/schema/Asset__c.Lead__c";
import LOAN from "@salesforce/schema/Asset__c.Loan__c";
import PAYMENT from "@salesforce/schema/Asset__c.Payment__c";
import PLANNEDPAYMENT from "@salesforce/schema/Asset__c.Planned_Payment__c";




export default class NewAssetLiabilityForm extends LightningModal {

    @api parentId;
    @api objectApiName;

    assetFields = [
        NAME,
        AMOUNT,
        TYPE,
        INTEREST_RATE,
        PAYMENT,
        PLANNEDPAYMENT,
        LEAD,
        LOAN
      ];


    handleSubmit(event) {
        console.log(parentId);
        console.log(objectApiName);
        event.preventDefault(); // stop the form from submitting
        const fields = event.detail.fields;
        fields.Loan__c = parentId; // modify a field
        fields.AssetOrLiability__c = 'Liability';
        this.template.querySelector('lightning-record-form').submit(fields);
        console.log('after submit');
    }  

    


    closePopupSuccess(event) {
      console.log('closePopupSuccess');
      const successEvent = new CustomEvent('success', {
        detail: this.record.Id
      });
      this.dispatchEvent(successEvent);
      this.close();
    }
    
      closePopup() {
        this.close();
      }
}