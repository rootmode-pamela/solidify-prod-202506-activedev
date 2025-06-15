({
    fillComponents : function(component, event, helper){
         console.log('fill components entry');
        component.set('v.showSpinner', true);
        var contact = component.get('v.selectedLookUpRecord');
        var contactId = contact.Id;
        
		console.log(component.get('v.partnerType'));
        console.log(component.get('v.fromDate'));
        console.log(component.get('v.toDate'));
        console.log(contactId);
        component.set('v.query', 'true');
        var leadQueryString;
        let partnerTypeString = component.get('v.partnerType');       
        if(partnerTypeString=='Opportunity.Account.Referred_By__c' || partnerTypeString == 'Any_Role'){
            console.log('setting the Leads query');
        	//set the Leads query for Referred By selection
            leadQueryString = 'Referred_By__c = \'' + contactId + '\'';
            console.log(leadQueryString);   
        } 
        
         //create Loan Query String using partnertype field name
      	let partnerTypeQueryString = '';

        console.log(partnerTypeString);
        if(partnerTypeString == 'Any_Role'){
           partnerTypeQueryString = '( Opportunity.Account.Referred_By__c = ' + ' \'' + contactId + '\' OR ' + 
           	'Sellers_Agent__c = ' + ' \'' + contactId + '\' OR ' +
            'Buyers_Agent__c = ' + ' \'' + contactId + '\' OR ' +
            'Escrow_Contact__c = '  + ' \'' + contactId + '\' OR ' +
            'Appraiser_Contact__c = ' + ' \'' + contactId + '\' OR ' +
            'Lender_AE__c = ' + ' \'' + contactId + '\')';
           } else if (partnerTypeString == 'Real_Estate'){
            partnerTypeQueryString = '( Sellers_Agent__c = ' + ' \'' + contactId + '\' OR ' +
            'Buyers_Agent__c = ' + ' \'' + contactId + '\')';     
        	} else {
           partnerTypeQueryString = component.get('v.partnerType') + ' = \'' + contactId + '\'';
           }
        
		//call helper to create Components  
        //create Loan Query String using partnertype field name
      	
        var closedQueryString;
        if(component.get('v.allTime')){
            closedQueryString = partnerTypeQueryString;
        } else {
            closedQueryString = partnerTypeQueryString + ' AND closeDate > ' + component.get('v.fromDate').substring(0, 10) + ' AND closeDate < ' + component.get('v.toDate').substring(0, 10) ;
        }

        console.log('Opportunity query:' + closedQueryString);
        
        
        var closedLoansComp = component.find('closedLoans'); 
        closedLoansComp.getDataTable('Opportunity', 'solidifyReferrals', 'Loan_Amount__c', closedQueryString + ' AND IsClosed = True');
        console.log('closeLoans DataTable Complete');
        
        var openLoansComp = component.find('pipelineLoans');        
        openLoansComp.getDataTable('Opportunity', 'solidifyReferrals', 'Loan_Amount__c', partnerTypeQueryString + ' AND IsClosed != True');
  		console.log('openLoans DataTable Complete');
        
        console.log('leadQueryString: ' + leadQueryString);
        var openLeadsComp = component.find('openLeads'); 
        if (leadQueryString != null) {
     		openLeadsComp.getDataTable('Lead', 'solidifyReferrals', 'Loan_Amount__c', leadQueryString + ' AND IsConverted != True');
            console.log('leads DataTable Complete');
        } else {
            openLeadsComp.resetDataTable();
        }
        
    	console.log('All Component Methods Complete');
        component.set('v.showSpinner', false);

        
    }
    
})