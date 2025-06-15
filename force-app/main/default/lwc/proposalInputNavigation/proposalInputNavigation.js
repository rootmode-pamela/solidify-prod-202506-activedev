import { LightningElement, api, wire } from "lwc";
import { CurrentPageReference, NavigationMixin } from "lightning/navigation";

export default class proposalInputNavigation extends NavigationMixin(LightningElement) {
    @api recordId = null;

    @api propRecType;

    @api url;

    @wire(CurrentPageReference) 
    pageRef;

    goToRefi(event) {
        this[NavigationMixin.Navigate]({
            type: "standard__component",

            attributes: {
                componentName: "c__solidify_newProposal"
            }
        });
    }

    goToScenario(event) {
        this[NavigationMixin.Navigate]({
            type: "standard__webPage",

            attributes: {
                url: "/lightning/n/Scenario_Analysis_Proposal"
            }
        });
    }

    goToRateNew(event) {
        this[NavigationMixin.Navigate]({
            type: "standard__webPage",

            attributes: {
                url: "/lightning/n/Rate_Analysis_Input"
            }
        });
    }

    cancelDialog(event) {
        this[NavigationMixin.Navigate]({
            type: "standard__objectPage",

            attributes: {
                objectApiName: "Proposal__c",
                actionName: "home"
            }
        });
    }
}