({
	doInit : function(component, event, helper) {
//		helper.onSearch(component, helper, "");
		helper.setColumns(component, helper);		
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__ResearchLoanResultsController',
            },
            state: {
                "c__propertyId": ""
            }
        };
        component.set("v.pageReference", pageReference);
    
	},

    loadMoreData: function (component, event, helper) {
        //Display a spinner to signal that data is being loaded
        event.getSource().set("v.isLoading", true);
        //Display "Loading" when more data is being loaded
        component.set('v.loadMoreStatus', 'Loading');
        helper.fetchData(component, component.get('v.rowsToLoad'))
            .then($A.getCallback(function (data) {
                if (component.get('v.data').length >= component.get('v.totalNumberOfRows')) {
                    component.set('v.enableInfiniteLoading', false);
                    component.set('v.loadMoreStatus', 'No more data to load');
                } else {
                    var currentData = cmp.get('v.data');
                    //Appends new data to the end of the table
                    var newData = currentData.concat(data);
                    component.set('v.data', newData);
                    component.set('v.loadMoreStatus', '');
                }
                event.getSource().set("v.isLoading", false);
            }));
    },
    
   	doSearch : function(component, event, helper) {
        console.log('ResearchLoanResultsController.js')
        var params = event.getParams('arguments');
        component.set('v.argumentObj', params)

        console.log(JSON.stringify(params));
        console.log('params ' + JSON.stringify(params.arguments.formData));
        if(params) {
            helper.setColumns(component, helper);
            //LoanType, LoanIR, LoanPurp, LoanEarliestClose, LoanLatestClose
            helper.onSearch(component,helper,
                            params.arguments.formData.LoanType,
                            params.arguments.formData.LoanProg,
                            params.arguments.formData.InterestRate,
                            params.arguments.formData.MinFico,
                            params.arguments.formData.MaxFico,
                            params.arguments.formData.MinSchedBal,
                            params.arguments.formData.MaxSchedBal,
                            params.arguments.formData.LoanPurpose,
                            params.arguments.formData.LoanOccupancy,
                            params.arguments.formData.LoanOriginator,
                            params.arguments.formData.EarliestDate,
                            params.arguments.formData.LatestDate,
                            params.arguments.formData.MinDaysClosed);
            
        }
	},
    
    onPropSelect : function(component, event, helper) {
        component.set("v.selectedPropertyId", event.getParam("propertyId"));
    },
    
    handleRowAction: function (cmp, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');

        switch (action.name) {
            case 'new_proposal':
                helper.newProposal(cmp, event, row);
                break;
        }
    },
    
   	showSpinner: function(component, event, helper) {
        component.set("v.Spinner", true); 
    },
    
   	hideSpinner : function(component,event,helper){
        component.set("v.Spinner", false);
    },

    updateColumnSorting: function( component, event, helper) {
        component.set("v.sortedDirection", event.getParam("sortDirection"));
        component.set("v.sortedBy", event.getParam("fieldName") );

        console.log('@@@ sortDirection: ' + event.getParam("sortDirection"));
        console.log('@@@ fieldName: ' + event.getParam("fieldName"));
        
        var params = component.get('v.argumentObj');

        console.log(JSON.stringify(params));
        console.log('params ' + JSON.stringify(params.arguments.formData));
        if(params) {
            helper.setColumns(component, helper);
            //LoanType, LoanIR, LoanPurp, LoanEarliestClose, LoanLatestClose
            helper.onSearch(component,helper,
                            params.arguments.formData.LoanType,
                            params.arguments.formData.LoanProg,
                            params.arguments.formData.InterestRate,
                            params.arguments.formData.MinFico,
                            params.arguments.formData.MaxFico,
                            params.arguments.formData.MinSchedBal,
                            params.arguments.formData.MaxSchedBal,
                            params.arguments.formData.LoanPurpose,
                            params.arguments.formData.LoanOccupancy,
                            params.arguments.formData.LoanOriginator,
                            params.arguments.formData.EarliestDate,
                            params.arguments.formData.LatestDate,
                            params.arguments.formData.MinDaysClosed);
            
        }
    },
})