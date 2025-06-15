import { LightningElement, track, api } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import RelatedListHelper from "./relatedListHelper";
import {loadStyle} from 'lightning/platformResourceLoader';
import relatedListResource from '@salesforce/resourceUrl/relatedListResource';

export default class RelatedList extends NavigationMixin(LightningElement) {
    @track state = {}
    @api sobjectApiName;
    @api relatedFieldApiName;
    @api numberOfRecords = 6;
    @api sortedBy;
    @api sortedDirection = "ASC";
    @api rowActionHandler;
    @api fields;
    @api columns;
    @api customActions = [];
    @api iconName;
    @api allowDelete = false;
    @api allowEdit = false;

    apiCustomIcon = false;
    helper = new RelatedListHelper()

    renderedCallback() {
        loadStyle(this, relatedListResource + '/relatedList.css')
    }

    connectedCallback() {
        this.init();
    }

    @api
    get recordId() {
        return this.state.recordId;
    }

    set recordId(value) {
        this.state.recordId = value;
        // this.init();
    }
    get hasRecords() {
        return this.state.records != null && this.state.records.length;
    }

    async init() {
        this.state.showRelatedList = this.recordId != null;
        console.log('Async INIT RL', (! (this.recordId
            && this.sobjectApiName
            && this.relatedFieldApiName
            && this.fields
            && this.columns)), this.recordId, this.sobjectApiName, this.relatedFieldApiName, this.fields, this.columns );
        if (! (this.recordId
            && this.sobjectApiName
            && this.relatedFieldApiName
            && this.fields
            && this.columns)) {
            this.state.records = [];
            return;
        }

        this.state.fields = this.fields
        this.state.relatedFieldApiName= this.relatedFieldApiName
        this.state.recordId= this.recordId
        this.state.numberOfRecords= this.numberOfRecords
        this.state.sobjectApiName= this.sobjectApiName
        this.state.sortedBy= this.sortedBy
        this.state.sortedDirection= this.sortedDirection
        this.state.customActions= this.customActions

        const data = await this.helper.fetchData(this.state);
        if (data == null || data.records == null)
            this.state.records = data.records;
        if (!this.iconName) this.state.iconName = data.iconName;
        else this.state.iconName = this.iconName;
        this.state.sobjectLabel = data.sobjectLabel;
        this.state.sobjectLabelPlural = data.sobjectLabelPlural;
        this.state.title = data.title;
        this.state.parentRelationshipApiName = data.parentRelationshipApiName;
        this.state.columns = this.helper.initColumnsWithActions(this.columns, this.customActions, this.allowDelete, this.allowEdit)
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        if (this.rowActionHandler) {
            this.rowActionHandler.call()
        } else {
            switch (actionName) {
                case "delete":
                    this.handleDeleteRecord(row);
                    break;
                case "edit":
                    this.handleEditRecord(row);
                    break;
                default:
            }
        }
    }

    handleGotoRelatedList() {
        this[NavigationMixin.Navigate]({
            type: "standard__recordRelationshipPage",
            attributes: {
                recordId: this.recordId,
                relationshipApiName: this.state.parentRelationshipApiName,
                actionName: "view",
                objectApiName: this.sobjectApiName
            }
        });
    }

    handleCreateRecord() {
        const newEditPopup = this.template.querySelector("c-related-list-new-edit-popup");
        newEditPopup.recordId = null
        newEditPopup.recordName = null        
        newEditPopup.sobjectApiName = this.sobjectApiName;
        newEditPopup.sobjectLabel = this.state.sobjectLabel;
        newEditPopup.show();
    }

    handleEditRecord(row) {
        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes: {
                recordId: row.Id,
                actionName: "edit"
            }
        });
        // const newEditPopup = this.template.querySelector("c-related-list-new-edit-popup");
        // newEditPopup.recordId = row.Id;
        // newEditPopup.recordName = row.Name;
        // newEditPopup.sobjectApiName = this.sobjectApiName;
        // newEditPopup.sobjectLabel = this.state.sobjectLabel;
        // newEditPopup.show();
    }

    handleDeleteRecord(row) {
        const newEditPopup = this.template.querySelector("c-related-list-delete-popup");
        newEditPopup.recordId = row.Id;
        newEditPopup.recordName = row.Name;
        newEditPopup.sobjectLabel = this.state.sobjectLabel;
        newEditPopup.show();
    }

    handleRefreshData() {
        this.init();
    }
}