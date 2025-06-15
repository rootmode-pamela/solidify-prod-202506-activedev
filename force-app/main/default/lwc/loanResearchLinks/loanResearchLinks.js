import { LightningElement, api, wire, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

const OPPORTUNITY_FIELDS = [
    'Opportunity.Subject_Prop_Street__c',
    'Opportunity.Subject_Prop_City__c',
    'Opportunity.Subject_Prop_St__c',
    'Opportunity.Subject_Prop_Zip__c',
    'Opportunity.Purpose__c',
    'Opportunity.Subject_Property_Name__c',
    'Opportunity.Subject_Property_County__c'
];
const LEAD_FIELDS = [
    'Lead.Subject_Property_Street__c',
    'Lead.Subject_Property_City__c',
    'Lead.Subject_Property_State__c',
    'Lead.Subject_Property_Zip__c',
    'Lead.Subject_Property_County__c',
    'Lead.Purpose__c',
    'Lead.Property__c'
];

export default class LoanResearchLinks extends LightningElement {
@api recordId;
@api object;
@track data;
street;
city;
st;
zip;
county;

connectedCallback(){
    console.log('^^^ ' + this.recordId + ' ' + this.object);
}

@wire(getRecord, {recordId : "$recordId", fields : '$fields'})
loadFields({error, data}){
    if(error){
        console.log('^^^error ' + JSON.stringify(error));
    } else
    if(data){
        console.log('research link data for ' + this.object);
        console.log(JSON.stringify(data));
        if(this.object === 'Opportunity'){
            this.street = data.fields.Subject_Prop_Street__c.value;
            this.city = data.fields.Subject_Prop_City__c.value;
            this.st = data.fields.Subject_Prop_St__c.value;
            this.zip = data.fields.Subject_Prop_Zip__c.value;
            this.county = data.fields.Subject_Property_County__c.value;
    
        } else if (this.object === 'Lead'){
            this.street = data.fields.Street.value;
            this.city = data.fields.City.value;
            this.st = data.fields.State.value;
            this.zip = data.fields.PostalCode.value;
            this.county = data.fields.Subject_Property_County__c.value;
        }
    }
}

get fields(){
    if(this.object === 'Lead'){
        return LEAD_FIELDS;
    } else if (this.object === 'Opportunity'){
        return OPPORTUNITY_FIELDS;
    }
}

addressString(){
    return  this.street + (this.city!= null ? ',' : '' ) +
    this.city + (this.st!= null ? ',' : '' ) +
    this.st +  (this.zip!= null ? ',' : '' ) 
    + this.zip ;
}

get zillowValue() {
    return  'https://www.zillow.com/homes/1_ah/' + this.addressString() + '_rb/?view=public';
}

get googleSearch(){
    return 'https://www.google.com/search?q=' + this.addressString() ;
}

get googleMaps(){
    return 'http://maps.google.com/maps?f=q&amp;hl=en&amp;q=' + this.addressString() + '&amp;om=1';
}

get propTaxBillSearch(){
    return 'http://www.google.com/search?ei=hbxXWqbrN9PejwPb3YGQDg&amp;q=' + this.county + '+county+property+tax+bill+search&amp;oq=' + this.county + '+county+property+tax+bill+search&amp;gs_l=psy-ab.3..0.3951.6005.0.6573.12.11.1.0.0.0.150.1120.5j6.11.0....0...1c.1.64.psy-ab..1.10.937...0i7i30k1j0i8i7i30k1j0i13k1.0.ALi6IA_tJoA';
}

}