trigger quotesTrigger on Quote (after insert, after update) {
    
    set<Id> quoteIds = Trigger.newMap.keyset();
    
    /*
     * Entered: Current Loan: Amount, Interest Rate, Loan Term, First Payment, Last Payment Made
     *          New Loan: Amount (default current balance), Interest Rate, Term
     * Formulas: Number Payments Made, Payments Remaining
     * Calculated: Monthly Payment, Balance Remaining, Payment to keep Term, New Loan Monthly Payment
     * 
     */
    
   	list<Quote> quotes = [SELECT Id, Current_Loan_Amount__C, Current_Interest_Rate__c, Current_Loan_Term__c, Current_Loan_First_Payment__c, Current_Loan_Last_Payment_Made__c,
                          Current_Loan_Number_Payments_Made__c, Current_Loan_Payments_Remaining__c,
                          Current_Loan_Balance_Remaining__c, Current_Loan_Monthly_Payment__c, 	
                          New_Loan_Amount__c, New_Loan_Term__c, New_Loan_Interest_Rate__c, 
                          New_Loan_Payment_To_Keep_Term__c, New_Loan_Monthly_Payment__c 
                          FROM Quote WHERE Id IN :quoteIds
                          ];
    
    list<Quote> quotesToUpdate = new list<Quote>();
    
    for (Quote q: quotes){
        Quote newQ = trigger.newMap.get(q.id);
        Quote oldQ = new Quote();
        if(!trigger.isInsert){
            oldQ = trigger.oldMap.get(q.id);}
        system.debug(oldQ.Current_Loan_Amount__c);
        system.debug(newQ.Name);
        
        if ( trigger.isInsert ||  newQ.Current_Loan_Amount__c!=oldQ.Current_Loan_Amount__c ||
             newQ.Current_Interest_Rate__c != oldQ.Current_Interest_Rate__c ||
             newQ.Current_Loan_Term__c!=oldQ.Current_Loan_Term__c ||
             newQ.Current_Loan_First_Payment__c!=oldQ.Current_Loan_First_Payment__c ||
             newQ.Current_Loan_Last_Payment_Made__c!=oldQ.Current_Loan_Last_Payment_Made__c ||
             newQ.New_Loan_Amount__c!=oldQ.New_Loan_Amount__c ||
             newQ.New_Loan_Interest_Rate__c!=oldQ.New_Loan_Interest_Rate__c ||
             newQ.New_Loan_Term__c!=oldQ.New_Loan_Term__c
           ){
			if (q.Current_Loan_Amount__c != null && q.Current_Interest_Rate__c != null && q.Current_Loan_Term__c != null){   
            	q.Current_Loan_Monthly_Payment__c = solidifyUtil.payment(q.Current_Loan_Amount__c, q.Current_Interest_Rate__c, integer.valueOf(q.Current_Loan_Term__c));
                system.debug(q.Current_Loan_Monthly_Payment__c);
                system.debug(q.Current_Loan_Number_Payments_Made__c);
                if(q.Current_Loan_Number_Payments_Made__c != null){
                        
                		q.Current_Loan_Balance_Remaining__c = solidifyUtil.balance( q.Current_Loan_Amount__c, q.Current_Interest_Rate__c, integer.valueOf(q.Current_Loan_Number_Payments_Made__c), q.Current_Loan_Monthly_Payment__c );
                    }
               	}
            if (q.New_Loan_Term__c !=null && q.New_Loan_Amount__c != null && q.New_Loan_Interest_Rate__c != null){
            	q.New_Loan_Monthly_Payment__c = solidifyUtil.payment(q.New_Loan_Amount__c, q.New_Loan_Interest_Rate__c, integer.valueOf(q.New_Loan_Term__c));
                if (q.Current_Loan_Number_Payments_Made__c!=null){                    
	        		q.New_Loan_Payment_To_Keep_Term__c = solidifyUtil.payment(q.New_Loan_Amount__c, q.New_Loan_Interest_Rate__c, integer.valueOf(q.Current_Loan_Payments_Remaining__c));
                }
                system.debug(solidifyUtil.numberPayments(q.New_Loan_Amount__c, q.New_Loan_Interest_Rate__c, q.Current_Loan_Monthly_Payment__c));
                q.Same_Payment_Term_Reduction__c = q.Current_Loan_Payments_Remaining__c - solidifyUtil.numberPayments(q.New_Loan_Amount__c, q.New_Loan_Interest_Rate__c, q.Current_Loan_Monthly_Payment__c);                
            }                     
    		quotesToUpdate.add(q);
           }      
        update quotesToUpdate;
     }
    
    
}