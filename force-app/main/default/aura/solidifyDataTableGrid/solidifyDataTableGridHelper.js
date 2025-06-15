({
    getDataHelper : function(component, event) {   
        console.log('getDataHelper');
        var params = event.getParam('arguments');
        console.log (params.objectName);
        console.log(params.fieldSetName);
        console.log(params.amountField);
        console.log(params.criteriaString);
        
        var action = component.get('c.getRecords');
        //Set the Object parameters and Field Set name
        action.setParams({
            strObjectName : params.objectName,
            strFieldSetName : params.fieldSetName,
            strQueryParams : params.criteriaString,
            strAmountField : params.amountField
        });
        console.log('Sending DataTable')
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.mycolumns', response.getReturnValue().lstDataTableColumns);
                component.set('v.mydata', response.getReturnValue().lstDataTableData); 
                component.set('v.recordCount ', response.getReturnValue().intDataTableRecordCount);
                component.set('v.totalAmount', response.getReturnValue().decDataTableTotalAmount );
            }else if (state === 'ERROR'){
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' +
                                    errors[0].message);
                    }
                } else {
                    console.log('Unknown error');
                }
            }else{
                console.log('Something went wrong, Please check with your admin');
            }
        });
        $A.enqueueAction(action);	
    },
    
    resetDataHelper : function(component, event){
        component.set('v.mycolumns', '');
        component.set('v.mydata', ''); 
        component.set('v.recordCount ', '');
        component.set('v.totalAmount', '' );
    }

})