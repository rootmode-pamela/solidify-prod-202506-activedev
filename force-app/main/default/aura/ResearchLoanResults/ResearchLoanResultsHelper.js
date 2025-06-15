({
	onSearch: function(component, helper, LoanType, LoanProg, LoanIR, MinFico, MaxFico,  MinSchedBal, MaxSchedBal, LoanPurp, LoanOcc, LoanOrig, LoanEarliestClose, LoanLatestClose, MinDaysClosed) {
        
        var sortby = component.get('v.sortedBy');
        var sortOrder = component.get('v.sortedDirection');

        console.log('ResearchLoanResults onSearch sortby: ' + sortby);
        console.log('ResearchLoanResults onSearch sortOrder: ' + sortOrder);

		var action = component.get('c.getPropertyLoans');
        var params = {"LoanType" : LoanType,
                      "LoanProg" : LoanProg,
                      "InterestRate" : LoanIR,
                      "MinFico" : MinFico,
                      "MaxFico" : MaxFico,
                      "MinSchedBal" : MinSchedBal,
                      "MaxSchedBal" : MaxSchedBal,
                      "LoanPurpose" : LoanPurp,
                      "LoanOccupancy" : LoanOcc,
                      "LoanOriginator" : LoanOrig,
                      "EarliestDate" : LoanEarliestClose,
                      "LatestDate" : LoanLatestClose,
                      "MinDaysClosed" : MinDaysClosed,
                      "sortby" : sortby,
                      "sortOrder" : sortOrder
                     };
        if(params){
            action.setParams(params);}
        action.setCallback(this, function(response){
            if (response.getState() === 'SUCCESS') {
                console.log('search returned');
                var rows = response.getReturnValue();
                for (var i = 0; i < rows.length; i++) {
                	var row = rows[i];
                    
                    if (row.Most_Recent_Closed_Opportunity__c) {
                        row.loanFileName = row.Most_Recent_Closed_Opportunity__r.Name;
                        row.loanFileLink =  '/'+row.Most_Recent_Closed_Opportunity__c;
						row.subjectPropStreet = row.Most_Recent_Closed_Opportunity__r.Subject_Prop_Street__c; 
                        row.subjectPropLink = '/'+row.Id;
                        row.occupancy = row.Most_Recent_Closed_Opportunity__r.Occupancy__c;
                        row.loanType = row.Most_Recent_Closed_Opportunity__r.Loan_Type__c;
                        row.loanProgram = row.Most_Recent_Closed_Opportunity__r.Loan_Program__c;
                        row.scheduleBal = row.Most_Recent_Closed_Opportunity__r.Current_Schedule_Balance__c;
                        row.interestRate = row.Most_Recent_Closed_Opportunity__r.Interest_Rate__c/100;
                        row.daysClosed = row.Most_Recent_Closed_Opportunity__r.Days_Closed__c;
                        row.closeDate = row.Most_Recent_Closed_Opportunity__r.CloseDate;
                        row.firstPayment = row.Most_Recent_Closed_Opportunity__r.First_Payment__c!=null?row.Most_Recent_Closed_Opportunity__r.First_Payment__c:null;
                        if(row.Most_Recent_Closed_Opportunity__r.Borrower_Record__c){
                            row.borrowerId = row.Most_Recent_Closed_Opportunity__r.Borrower_Record__c;
                        	row.borrowerName = row.Most_Recent_Closed_Opportunity__r.Borrower_Record__r.Name;                            
                        }

                        /*
                        row.purpose = row.Most_Recent_Closed_Opportunity__r.Purpose__c;  
                        row.LO = row.Most_Recent_Closed_Opportunity__r.Loan_Originator__c;
                        row.Amount = row.Most_Recent_Closed_Opportunity__r.Loan_Amount__c;   
                        row.InterestRate = row.Most_Recent_Closed_Opportunity__r.Interest_Rate__c;  
                        row.BorrowerFICO = row.Most_Recent_Closed_Opportunity__r.Borrower_FICO__c;
                        */
                    } 
                    
                    if (row.Household__c) { 
                        row.householdName = row.Household__r.Name;
                        row.householdLink =  '/'+row.Household__c;
                    }
                    
                    row.ltv = row.LTV_of_Most_Recent_Closing__c/100;
                    row.cltv = row.CLTV_of_Most_Recent_Closed_Loan__c/100;
                }
                
                component.set('v.loans', response.getReturnValue());
                console.log('loans: ' + response.getReturnValue());
            } else {
                console.log('Error retrieving Loans');
                console.log(response.getState());
                let errors = response.getError();
					let message = 'Unknown error'; // Default error message
				// Retrieve the error message sent by the server
				if (errors && Array.isArray(errors) && errors.length > 0) {
    			message = errors[0].message;
				}
				// Display the message
				console.error(message);
            }
            
        });
        $A.enqueueAction(action); 
	}, 
    
    setColumns: function (component, helper){
    //Id, Name, Household__r.Name, Most_Recent_Closed_Opportunity__r.CloseDate, ' 
    //        + 'Most_Recent_Closed_Opportunity__r.Loan_Type__c, Most_Recent_Closed_Opportunity__r.Purpose__c, ' 
    //        + 'Most_Recent_Closed_Opportunity__r.Loan_Amount__c, Most_Recent_Closed_Opportunity__r.Interest_Rate__c '
     
         var actions = [
            { label: 'New Proposal', name: 'new_proposal' }
        ];
        component.set('v.columns', [
            {label: 'Household', fieldName: 'householdLink', type: 'url', wrapText: true, initialWidth: 150, sortable: true, typeAttributes: {label: { fieldName: 'householdName' }, target: '_blank'}},
            {label: 'Loan File Name', fieldName: 'loanFileLink', type: 'url', wrapText: true, initialWidth: 150, sortable: true, typeAttributes: {label: { fieldName: 'loanFileName' }, target: '_blank'}},
            {label: 'Subject Prop Street', fieldName: 'subjectPropLink', type: 'url', wrapText: true, initialWidth: 100, sortable: true, typeAttributes: {label: { fieldName: 'subjectPropStreet' }, target: '_blank'}},
            {label: 'Occupancy', fieldName: 'occupancy', type: 'text', wrapText: true, sortable: true},
            {label: 'Property Type', fieldName: 'Property_Type__c', type: 'text', wrapText: true, sortable: true},
            {label: 'Units', fieldName: 'Number_of_Units__c', type: 'text', initialWidth: 50, sortable: true},
            {label: 'Loan Type', fieldName: 'loanType', type: 'text', sortable: true},
            {label: 'Program', fieldName: 'loanProgram', type: 'text', initialWidth: 70, sortable: true},
            {label: 'Scheduled Bal', fieldName: 'scheduleBal', type: 'currency', sortable: true, typeAttributes: { currencyCode: 'USD', maximumSignificantDigits: 5}},
            {label: 'Interest Rate', fieldName: 'interestRate', type: 'percent', sortable: true, typeAttributes: { currencyCode: 'USD', maximumSignificantDigits: 5}},
            {label: 'Qual Fico', fieldName: 'Qual_Fico__c', type: 'number', initialWidth: 70, sortable: true},
            {label: 'LTV', fieldName: 'ltv', type: 'percent', initialWidth: 70, sortable: true, typeAttributes: { step: '0.01', maximumFractionDigits : 2}},
            {label: 'CLTV', fieldName: 'cltv', type: 'percent', initialWidth: 70, sortable: true, typeAttributes: { step: '0.01', maximumFractionDigits : 2}},
            {label: 'Lender', fieldName: 'Lender_of_Most_Recent_Closing__c', type: 'text', wrapText: true, sortable: true},
            {label: 'Days Closed', fieldName: 'daysClosed', type: 'number', initialWidth: 70, sortable: true},
            {label: 'Closed Date', fieldName: 'closeDate', type: 'date-local', sortable: true, typeAttributes:{month: "2-digit",day: "2-digit"}},
            {label: 'First Payment', fieldName: 'firstPayment', type: 'date-local', sortable: true, typeAttributes:{month: "2-digit",day: "2-digit"}},
            {label: 'Refi', type: "button", initialWidth: 70, typeAttributes:{ label: "Refi Proposal", name: "new_proposal", title: "click to start a refi proposal"}}
            
            /*
            {label: 'Property', fieldName: 'Name', type: 'text'},
            {label: 'Property Disposition', fieldName: 'Property_Disposition__c', type: 'text'},
            {label: 'Close date', fieldName: 'CloseDate', type: 'text'},
            {label: 'Loan Type', fieldName: 'LoanType', type: 'text'},
            {label: 'Amount', fieldName: 'Amount', type: 'currency', typeAttributes: { currencyCode: 'USD', maximumSignificantDigits: 5}},
            {label: 'Balance', fieldName: 'Balance', type: 'currency', typeAttributes: { currencyCode: 'USD', maximumSignificantDigits: 5}},
            {label: 'Interest Rate', fieldName: 'InterestRate', type: 'number'},
            {label: 'Borrower FICO', fieldName: 'BorrowerFICO', type: 'number'},
            {label: 'Purpose', fieldName: 'Purpose', type: 'text'},
            {label: 'Occupancy', fieldName: 'Occupancy', type: 'text'},
            {label: 'LO', fieldName: 'LO', type: 'text'},
          	{ type: 'action', typeAttributes: { rowActions: actions } }
			*/
        ]);
        
	}, 
    
    newProposal : function(component, event, currentRow ){
        console.log('New proposal for:' + currentRow.Household);
        console.log(JSON.stringify(currentRow));
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__solidify_newProposal'
            },
            state: {
                "c__propertyId": currentRow.Id,
                "c__recordIdFromButton": currentRow.borrowerId,
                "c__sObjectFromButton": "Property",
                "c__nameFromButton": currentRow.borrowerName,
                "c__contactId": currentRow.borrowerId
            }
    	};

       var navService = component.find("navService");
    //    var pageReference = component.get("v.pageReference");
    //    event.preventDefault();
        navService.navigate(pageReference);
    },


})