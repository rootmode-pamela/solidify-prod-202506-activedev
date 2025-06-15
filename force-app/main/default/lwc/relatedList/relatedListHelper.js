/* eslint-disable guard-for-in */
/* eslint-disable no-console */
import initDataMethod from "@salesforce/apex/RelatedListController.initData";

export default class RelatedListHelper {

    fetchData(state) {
        let jsonData = Object.assign({}, state)
        jsonData.numberOfRecords = state.numberOfRecords + 1
        jsonData = JSON.stringify(jsonData)
        return initDataMethod({ jsonData })
            .then(response => {
                const data = JSON.parse(response)
                console.log('data from helper', data);
                return this.processData(data, state)
            })
            .catch(error => {
                console.log(error);
            });
    }

    processData(data, state){
        if(data == null || data.records == null) return data;
        const records = data.records;
        this.generateLinks(records)
        if (records.length > state.numberOfRecords) {
            records.pop()
            data.title = `${data.sobjectLabelPlural} (${state.numberOfRecords}+)`
        } else {
            data.title = `${data.sobjectLabelPlural} (${Math.min(state.numberOfRecords, records.length)})`
        }
        return data
    }


    initColumnsWithActions(columns, customActions, allowDelete, allowEdit) {
        if (!customActions.length) {
            customActions = []
            if (allowEdit) {
                customActions.push({ label: 'Edit', name: 'edit' });
            }
            if (allowDelete) {
                customActions.push({ label: 'Delete', name: 'delete' });
            }
        }
        if (!allowDelete && !allowEdit) return [...columns];
        return [...columns, { type: 'action', typeAttributes: { rowActions: customActions } }]
    }

    generateLinks(records) {
        records.forEach(record => {
            record.LinkName = '/' + record.Id
            if (record.CreatedBy != null) {
                record.CreatedById = '/' + record.CreatedById;
                record['CreatedByName'] = record.CreatedBy.Name;
            }
            if (record.Amount == null) {
                record.Amount = 0;
            }
            if (record.Probability != null) {
                record.Probability = record.Probability*100;
            }
            if (record.User != null && record.User.Name != null) {
                record.UserName = record.User.Name;
            }
            /*for (const propertyName in record) {
                console.log(record)
                const propertyValue = record[propertyName];
                if (typeof propertyValue === 'object') {
                    const newValue = propertyValue.Id ? ('/' + propertyValue.Id) : null;
                    this.flattenStructure(record, propertyName + '_', propertyValue);
                    if (newValue !== null) {
                        record[propertyName + '_LinkName'] = newValue;
                    }
                }
            }*/
        });

    }

    flattenStructure(topObject, prefix, toBeFlattened) {
        for (const propertyName in toBeFlattened) {
            const propertyValue = toBeFlattened[propertyName];
            if (typeof propertyValue === 'object') {
                this.flattenStructure(topObject, prefix + propertyName + '_', propertyValue);
            } else {
                topObject[prefix + propertyName] = propertyValue;
            }
        }
    }
}