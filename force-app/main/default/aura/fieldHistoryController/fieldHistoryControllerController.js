({
 	doInit : function(component, event) {
		//populate attribute fields
    	component.set('v.mycolumns', [
            { 	label: 'Date', fieldName: 'CreatedDate', type: 'date', typeAttributes: {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }, sortable: 'true'},
            {   label: 'New Value', fieldName: 'NewValue', type: 'String', sortable: 'false'},
            {   label: 'Created By', fieldName: 'Alias', type: 'String', sortable: 'true'}
        ]); 
        console.log(component.get('v.mycolumns'));
        var action = component.get("c.getFieldHistory");
        action.setParams({
            sObjectName: "Opportunity",
            recordId : component.get("v.recordId"),
            fieldName : component.get("v.fieldName"), 
            returnLimit : component.get("v.recordLimit"),
            commaDelimitedFieldNames: "Id, CreatedDate, NewValue, CreatedBy.Alias",
        });

        action.setCallback(this, function(actionResult) {
            var state = actionResult.getState();
            console.log(actionResult.getReturnValue());
            if (state === 'SUCCESS') {
                var rows = actionResult.getReturnValue();
            		for (var i = 0; i < rows.length; i++) {
                	var row = rows[i];
                	if (row.CreatedBy) row.Alias = row.CreatedBy.Alias;
            }
            component.set('v.historyItems', rows);
                
            	//component.set('v.historyItems', actionResult.getReturnValue());
                console.log(actionResult.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    

            
    
    
})