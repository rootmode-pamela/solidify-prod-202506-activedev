import LightningDatatable from 'lightning/datatable';
import percentFixed from './percentFixed.html';
import picklistColumn from './picklistColumn.html';
import pickliststatic from './pickliststatic.html';

const options=[
    {label: 'X', value: 'X'},
    {label: 'Y', value: 'Y'}
];

export default class CustomDatatable extends LightningDatatable {
    static customTypes = {
        percentFixed : {
            template : percentFixed,
            typeAttributes : ['maximum-fraction-digits', 'minimum-fraction-digits', 'editable']
        },
        picklistColumn: {
            template: pickliststatic,
            editTemplate: picklistColumn,
            standardCellLayout: true,
            typeAttributes: ['label', 'placeholder', 'options', 'value', 'context', 'variant','name']
        } 
    };

   
}