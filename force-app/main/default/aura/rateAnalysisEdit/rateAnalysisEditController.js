({ 
     doInit: function (component, event, helper){
        component.find("propRecordCreator").getNewRecord(
        "Proposal__c",
        "012f4000000ObpJAAS",
        false,
        $A.getCallback(function() {
            var rec = component.get("v.proposalRecord");
            var error = component.get("v.recordError");
            if (error || (rec === null)) {
                console.log("Error initializing record template: " + error);
                return;
            }
            var myPageRef = component.get("v.pageReference");
            //var addFees = component.find("addFees").set("v.value", "Yes");
            //var gpa = component.find("gpa").set("v.value", 0.000);
            

        }))
    },
    
     updateOverride: function(component, event, helper){
        
        var override = component.find("override").get("v.checked");
        console.log("overrideVal: " + override);
        component.set("v.overrideComp", override);
        helper.handleUpdateNew(component, event, helper);
        
    },
    
    cloneRecord: function(component, event, helper){
 		helper.handleUpdateNew(component,event,helper);
        component.set("v.newProposal.New_Loan_Amount__c", component.get("v.simpleRecord.New_Loan_Amount__c") );
         var addFee = component.find('addFees').get("v.value");
            
            component.set('v.newProposal.Total_Cost_1__c', component.get('v.simpleRecord.Total_Cost_1__c'));          
        	component.set('v.newProposal.Total_Cost_2__c', component.get('v.simpleRecord.Total_Cost_2__c'));
        	component.set('v.newProposal.Total_Cost_3__c', component.get('v.simpleRecord.Total_Cost_3__c' ));
        	component.set('v.newProposal.Total_Cost_4__c', component.get('v.simpleRecord.Total_Cost_4__c'));
        	component.set('v.newProposal.Total_Cost_5__c',component.get('v.simpleRecord.Total_Cost_5__c'));
        	component.set('v.newProposal.Total_Cost_6__c',component.get('v.simpleRecord.Total_Cost_6__c' ));           
            component.set("v.newProposal.Total_Loan_Amount1__c",component.get("v.simpleRecord.Total_Loan_Amount1__c"));
            component.set("v.newProposal.Total_Loan_Amount2__c",component.get("v.simpleRecord.Total_Loan_Amount2__c" ));
            component.set("v.newProposal.Total_Loan_Amount3__c",component.get("v.simpleRecord.Total_Loan_Amount3__c"));
            component.set("v.newProposal.Total_Loan_Amount4__c",component.get("v.simpleRecord.Total_Loan_Amount4__c"));
            component.set("v.newProposal.Total_Loan_Amount5__c",component.get("v.simpleRecord.Total_Loan_Amount5__c"));
            component.set("v.newProposal.Total_Loan_Amount6__c",component.get("v.simpleRecord.Total_Loan_Amount6__c"));            
        
        component.set('v.newProposal.Lock_Period_Days__c',component.get('v.simpleRecord.Lock_Period_Days__c'));
        
        component.set('v.newProposal.FICO_Score__c',component.get('v.simpleRecord.FICO_Score__c'));
        
        component.set('v.newProposal.Estimate_Value__c',component.get('v.simpleRecord.Estimate_Value__c'));
        
        component.set('v.newProposal.Fixed_Term_Years__c',component.get('v.simpleRecord.Fixed_Term_Years__c'));
        
      //  var loanProgram = component.find('loanProgram').get("v.value");
       // component.set('v.simpleRecord.Loan_Program__c', loanProgram);
        
        component.set('v.newProposal.Prepared_Date__c',component.get('v.simpleRecord.Prepared_Date__c'));        
        component.set('v.newProposal.Borrower_Name_Text__c',component.get('v.simpleRecord.Borrower_Name_Text__c'));        
        component.set('v.newProposal.Est_Fees_Lender__c',component.get('v.simpleRecord.Est_Fees_Lender__c'));        
        component.set('v.newProposal.Est_Fees_Title_Escrow__c',component.get('v.simpleRecord.Est_Fees_Title_Escrow__c'));        
        component.set('v.newProposal.Est_Fees_Appraisal_Credit__c',component.get('v.simpleRecord.Est_Fees_Appraisal_Credit__c'));        
        component.set('v.newProposal.X10_Yr_Treasury_Yield__c',component.get("v.simpleRecord.X10_Yr_Treasury_Yield__c"));
               
        component.set('v.newProposal.Origination_Fee__c',component.get("v.simpleRecord.Origination_Fee__c"));       
        component.set('v.newProposal.Transaction_Type__c',component.get('v.simpleRecord.Transaction_Type__c'));        
        component.set('v.newProposal.Loan_Type__c',component.get('v.simpleRecord.Loan_Type__c'));
        component.set('v.newProposal.Add_Fees_to_Loan_Balance__c',component.get('v.simpleRecord.Add_Fees_to_Loan_Balance__c'));        
        
        component.set('v.newProposal.Price_1__c',component.get("v.simpleRecord.Price_1__c"));
        component.set('v.newProposal.Price_2__c',component.get("v.simpleRecord.Price_2__c"));
        component.set('v.newProposal.Price_3__c',component.get("v.simpleRecord.Price_3__c"));
        component.set('v.newProposal.Price_4__c',component.get("v.simpleRecord.Price_4__c"));
        component.set('v.newProposal.Price_5__c',component.get("v.simpleRecord.Price_5__c"));
        component.set('v.newProposal.Price_6__c',component.get("v.simpleRecord.Price_6__c"));
        	
        component.set('v.newProposal.Rate_1__c',component.get("v.simpleRecord.Rate_1__c"));
        component.set('v.newProposal.Rate_2__c',component.get("v.simpleRecord.Rate_2__c"));
        component.set('v.newProposal.Rate_3__c',component.get("v.simpleRecord.Rate_3__c"));
        component.set('v.newProposal.Rate_4__c',component.get("v.simpleRecord.Rate_4__c"));
        component.set('v.newProposal.Rate_5__c',component.get("v.simpleRecord.Rate_5__c"));
        component.set('v.newProposal.Rate_6__c',component.get("v.simpleRecord.Rate_6__c"));

        component.set('v.newProposal.Orig__c',component.get("v.simpleRecord.Orig__c"));
        
        component.set('v.newProposal.Adj_Price1__c',component.get("v.simpleRecord.Adj_Price1__c"));
        component.set('v.newProposal.Adj_Price2__c',component.get("v.simpleRecord.Adj_Price2__c"));
        component.set('v.newProposal.Adj_Price3__c',component.get("v.simpleRecord.Adj_Price3__c"));
        component.set('v.newProposal.Adj_Price4__c',component.get("v.simpleRecord.Adj_Price4__c"));
        component.set('v.newProposal.Adj_Price5__c',component.get("v.simpleRecord.Adj_Price5__c"));
        component.set('v.newProposal.Adj_Price6__c',component.get("v.simpleRecord.Adj_Price6__c"));
        

        component.set('v.newProposal.Global_Pricing_Adjuster__c',component.get("v.simpleRecord.Global_Pricing_Adjuster__c"));  
         var terms = component.find('fixedTermYears').get("v.value");
                component.set('v.newProposal.Fixed_Term_Years__c', terms);
       var rate1 = component.find('rate1').get("v.value");
        var rate2 = component.find('rate2').get("v.value");
        var rate3 = component.find('rate3').get("v.value");
        var rate4 = component.find('rate4').get("v.value");
        var rate5 = component.find('rate5').get("v.value");
        var rate6 = component.find('rate6').get("v.value");
         var pmt1 = rate1/1200;
        var loanAmount1 = component.get("v.simpleRecord.Total_Loan_Amount1__c");
        console.log("total loan amount 1: " + loanAmount1);
        var topNum = pmt1*loanAmount1;
        var bottomNum1A = (1 + pmt1);
        var bottomNum1B = Math.pow(bottomNum1A,-(terms*12)); 
        var bottomNum1C = (1-bottomNum1B);
        var finalResult1 = topNum/bottomNum1C;
        console.log("final result 1: " + finalResult1);
        component.set("v.newProposal.Monthly_PI_Pmt1__c", finalResult1);
        
        var pmt2 = rate2/1200;
        var loanAmount2 = component.get("v.simpleRecord.Total_Loan_Amount2__c");
        console.log("total loan amount 2: " + loanAmount2);
        var topNum = pmt2*loanAmount2;
        var bottomNum2A = (1 + pmt2);
        var bottomNum2B = Math.pow(bottomNum2A,-(terms*12)); 
        var bottomNum2C = (1-bottomNum2B);
        var finalResult2 = topNum/bottomNum2C;
        console.log("final result 2: " + finalResult2);
        component.set("v.newProposal.Monthly_PI_Pmt2__c", finalResult2);
        
        var pmt3 = rate3/1200;
        var loanAmount3 = component.get("v.simpleRecord.Total_Loan_Amount3__c");
        console.log("total loan amount 3: " + loanAmount3);
        var topNum = pmt3*loanAmount3;
        var bottomNum3A = (1 + pmt3);
        var bottomNum3B = Math.pow(bottomNum3A,-(terms*12)); 
        var bottomNum3C = (1-bottomNum3B);
        var finalResult3 = topNum/bottomNum3C;
        console.log("final result 3: " + finalResult3);
        component.set("v.newProposal.Monthly_PI_Pmt3__c", finalResult3);
        
        var pmt4 = rate4/1200;
        var loanAmount4 = component.get("v.simpleRecord.Total_Loan_Amount4__c");
        console.log("total loan amount 4: " + loanAmount4);
        var topNum = pmt4*loanAmount4;
        var bottomNum4A = (1 + pmt4);
        var bottomNum4B = Math.pow(bottomNum4A,-(terms*12)); 
        var bottomNum4C = (1-bottomNum4B);
        var finalResult4 = topNum/bottomNum4C;
        console.log("final result 4: " + finalResult4);
        component.set("v.newProposal.Monthly_PI_Pmt4__c", finalResult4);
        
        var pmt5 = rate5/1200;
        var loanAmount5 = component.get("v.simpleRecord.Total_Loan_Amount5__c");
        console.log("total loan amount 5: " + loanAmount5);
        var topNum = pmt5*loanAmount5;
        var bottomNum5A = (1 + pmt5);
        var bottomNum5B = Math.pow(bottomNum5A,-(terms*12)); 
        var bottomNum5C = (1-bottomNum5B);
        var finalResult5 = topNum/bottomNum5C;
        console.log("final result 5: " + finalResult5);
        component.set("v.newProposal.Monthly_PI_Pmt5__c", finalResult5);
        
        var pmt6 = rate6/1200;
        var loanAmount6 = component.get("v.simpleRecord.Total_Loan_Amount6__c");
        console.log("total loan amount 6: " + loanAmount6);
        var topNum = pmt6*loanAmount6;
        var bottomNum6A = (1 + pmt6);
        var bottomNum6B = Math.pow(bottomNum6A,-(terms*12)); 
        var bottomNum6C = (1-bottomNum6B);
        var finalResult6 = topNum/bottomNum6C;
        console.log("final result 6: " + finalResult6);
        component.set("v.newProposal.Monthly_PI_Pmt6__c", finalResult6);
        
                
        component.set('v.newProposal.Years_Until_BE6__c', 0);
 
		var loanAmt = component.get("v.simpleRecord.New_Loan_Amount__c");
        console.log("LOAN AMOUNT ----: " + loanAmt);
        var total1 = component.find("totalCost1").get("v.value");
        var payment1 = -finalResult1;
        var pv1 = (loanAmt - total1);
        var future = 0;
        var payment2 = -finalResult2;
        var payment3 = -finalResult3;
        var payment4 = -finalResult4;
        var payment5 = -finalResult5;
        var payment6 = -finalResult6;
        var total2 = component.find("totalCost2").get("v.value");
        var pv2 = (loanAmt - total2);
        var total3 = component.find("totalCost3").get("v.value");
        var pv3 = (loanAmt - total3);
        var total4 = component.find("totalCost4").get("v.value");
        var pv4 = (loanAmt - total4);
        var total5 = component.find("totalCost5").get("v.value");
        var pv5 = (loanAmt - total5);
        var total6 = component.find("totalCost6").get("v.value");
        var pv6 = (loanAmt - total6);

        
        var apr1 = helper.calculateAPR(payment1, pv1, terms)*1200;
        var apr2 = helper.calculateAPR(payment2, pv2, terms)*1200;
        var apr3 = helper.calculateAPR(payment3, pv3, terms)*1200;
        var apr4 = helper.calculateAPR(payment4, pv4, terms)*1200;
        var apr5 = helper.calculateAPR(payment5, pv5, terms)*1200;
        var apr6 = helper.calculateAPR(payment6, pv6, terms)*1200;
        console.log(apr1);
        console.log(apr2);
        console.log(apr3);
        console.log(apr4);
        console.log(apr5);
        console.log(apr6);
        component.set("v.newProposal.APR1__c", apr1);
        component.set("v.newProposal.APR2__c", apr2);
        component.set("v.newProposal.APR3__c", apr3);
        component.set("v.newProposal.APR4__c", apr4);
        component.set("v.newProposal.APR5__c", apr5);
        component.set("v.newProposal.APR6__c", apr6);


        var tempRec = component.find("propRecordCreator");
        
        tempRec.saveRecord($A.getCallback(function(result){
            
        console.log(result.state);
            
        var resultsToast = $A.get("e.force:showToast");
        
            if (result.state === "SUCCESS") {
                
                resultsToast.setParams({
                    "title": "Saved",
                    "message": "The record was saved."});
                
                resultsToast.fire();  
                
                var recId = result.recordId;
                
                helper.navigateTo(component, recId);

                } else if (result.state === "ERROR") {
                    console.log('Error: ' + JSON.stringify(result.error));
                    
                    resultsToast.setParams({
                        "title": "Error",
                        "message": "There was an error saving the record: " + JSON.stringify(result.error)});
                    
                    resultsToast.fire();
                    
                } else {
                    console.log('Unknown problem, state: ' + result.state + ', error: ' + JSON.stringify(result.error));
                }
            }));
    	   
    },
    
	handleUpdate : function(component, event, helper){
        
     helper.handleUpdateNew(component, event, helper);
    },
    
    saveRecord : function(component, event, helper){
        helper.handleUpdateNew(component, event, helper);
        
        var tempRec = component.find("recordLoader");
        
        tempRec.saveRecord($A.getCallback(function(result){
            
        console.log(result.state);
            
        var resultsToast = $A.get("e.force:showToast");
        
            if (result.state === "SUCCESS") {
                
                resultsToast.setParams({
                    "title": "Saved",
                    "message": "The record was saved."});
                
                resultsToast.fire();  
                
                var recId = result.recordId;
                
                helper.navigateTo(component, recId);

                } else if (result.state === "ERROR") {
                    console.log('Error: ' + JSON.stringify(result.error));
                    
                    resultsToast.setParams({
                        "title": "Error",
                        "message": "There was an error saving the record: " + JSON.stringify(result.error)});
                    
                    resultsToast.fire();
                    
                } else {
                    console.log('Unknown problem, state: ' + result.state + ', error: ' + JSON.stringify(result.error));
                }
            }));
    	}    

    
})