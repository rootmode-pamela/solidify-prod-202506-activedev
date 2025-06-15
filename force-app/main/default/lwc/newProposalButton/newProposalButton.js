import { LightningElement, api, wire, track } from 'lwc';
import { createRecord, getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { NavigationMixin } from "lightning/navigation";
import getRecordForProp from '@salesforce/apex/SolidifyComparisonController.getRecordForProp';

import CONTACTNAME from '@salesforce/schema/Contact.Name';
import LEADNAME from '@salesforce/schema/Lead.Name';
import LOANNAME from '@salesforce/schema/Opportunity.Name';
import PROPOBJECT from '@salesforce/schema/Proposal__c';

const fieldsContact = [CONTACTNAME];
const fieldsLead = [LEADNAME];
const fieldsOpp = [LOANNAME];


export default class NewProposalButton extends NavigationMixin(LightningElement) {
    @api recordid;
    @api objectapiname;
    @api propRecType;
    @api url;
    @track buttonClicked = false;
    @track Name;
    @track Status;
    @track Rec;

    createProp() {
        this.buttonClicked = true;
    }

    goToRefi(event) {
        getRecordForProp({recordId : this.recordid,rObject : this.objectapiname})
        .then(result => { 
            console.log('-----result:   '+JSON.stringify(result));

            this.Rec = result;
            this.Name = this.Rec.Name;

            var objectName = this.objectapiname;
            var recordId = this.recordid;
            var name = this.Rec.Name;

            if(this.objectapiname == 'Opportunity'){
                recordId = this.Rec.ContactId;
                objectName = 'Contact';
                name = this.Rec.Contact.Name;
            }
            

            console.log('@@@ name: ' + this.Name);

            this[NavigationMixin.Navigate]({
                type: "standard__component",
                attributes: {
                    componentName: "c__solidify_newProposal"
                },
                state: {
                    c__recordIdFromButton: recordId,
                    c__sObjectFromButton: objectName,
                    c__nameFromButton: name,
                    c__contactId: recordId
                }
            });
        })
        .catch(error => {
            console.log('-----error:   '+JSON.stringify(error));
        });
    }

    @track propId;
    goToScenario(event) {
            const fields = {};
            if (this.objectapiname == 'Lead'){ //For Leads
                fields.Borrower_Lead__c = this.recordid;
            } else if (this.objectapiname == 'Contact'){ //For Contact
                fields.Borrower__c = this.recordid;
            } else if (this.objectapiname == 'Opportunity'){ //For Loan
                fields.Most_Recent_Loan__c = this.recordid;
            }

            fields.RecordTypeId = '0125G000001MuHzQAK'; //For Prod

            const recordInput = { apiName: PROPOBJECT.objectApiName, fields };
            createRecord(recordInput)
            .then(prop => {
                this.propId = prop.id;
                console.log(this.propId);
                this.dispatchEvent(
                    this[NavigationMixin.Navigate]({
                        type: "standard__recordPage",
                        attributes: {
                            recordId: this.propId,
                            objectApiName: 'Proposal__c',
                            actionName: 'view'
                        }
                    }) 
/*                    this[NavigationMixin.Navigate]({
                        type: "standard__component",
                        attributes: {
                            componentName: "c__rateAnalysisInputNew"
                        },
                        state: {
                            c__recordIdFromButton: recordId,
                            c__sObjectFromButton: objectName,
                            c__contactId: recordId
                        }
                    }) */
                );
            })
            .catch(error => {
            /*    this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                ); */
                console.log('-----error:   '+JSON.stringify(error));
            });

        }

    goToRateNew(event) {
        getRecordForProp({recordId : this.recordid,rObject : this.objectapiname})
        .then(result => { 
            console.log('-----result:   '+JSON.stringify(result));
            this.Rec = result;
            this.Name = this.Rec.Name;
            if(this.objectapiname == 'Lead'){
                this.Status = this.Rec.Status;

                this[NavigationMixin.Navigate]({
                    type: "standard__component",
    
                    attributes: {
                        componentName: "c__rateAnalysisInputNew"
                    },
                    state: {
                        c__recordIdFromButton: this.recordid,
                        c__sObjectFromButton: this.objectapiname,
                        c__nameFromButton: this.Name,
                        c__statusFromButton: this.Status
                    },
                });
            }
            else if(this.objectapiname == 'Contact'){
                this[NavigationMixin.Navigate]({
                    type: "standard__component",
    
                    attributes: {
                        componentName: "c__rateAnalysisInputNew"
                    },
                    state: {
                        c__recordIdFromButton: this.recordid,
                        c__sObjectFromButton: this.objectapiname,
                        c__nameFromButton: this.Name
                    },
                });
            }else if(this.objectapiname == 'Opportunity'){
                this[NavigationMixin.Navigate]({
                    type: "standard__component",
    
                    attributes: {
                        componentName: "c__rateAnalysisInputNew"
                    },
                    state: {
                        c__recordIdFromButton: this.recordid,
                        c__sObjectFromButton: this.objectapiname,
                        c__nameFromButton: this.Name
                    },
                });
            }
            
        })
        .catch(error => {
            console.log('-----error:   '+JSON.stringify(error));
        });
    }

    cancelDialog() {
        this.buttonClicked = false;
    }
}