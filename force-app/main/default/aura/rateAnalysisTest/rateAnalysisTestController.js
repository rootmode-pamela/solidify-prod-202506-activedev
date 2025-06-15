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
	
    
    handleUpdate : function(component, event, helper){
        
        //Update the Adj. Price values based on Price and Global Pricing Adjuster inputs
        var globalAdjust = component.find("gpa").get("v.value");
        var price1 = component.find("price1").get("v.value");
        var adj1 = parseFloat(globalAdjust) + parseFloat(price1);
        
        var price2 = component.find("price2").get("v.value");
        var adj2 = parseFloat(globalAdjust) + parseFloat(price2);
                
        var price3 = component.find("price3").get("v.value");
        var adj3 = parseFloat(globalAdjust) + parseFloat(price3);
        
        var price4 = component.find("price4").get("v.value");
        var adj4 = parseFloat(globalAdjust) + parseFloat(price4);
        
        var price5 = component.find("price5").get("v.value");
        var adj5 = parseFloat(globalAdjust) + parseFloat(price5);
        
        var price6 = component.find("price6").get("v.value");
        var adj6 = parseFloat(globalAdjust) + parseFloat(price6);
        
        component.find("adjPrice1").set("v.value",adj1);
        component.find("adjPrice2").set("v.value",adj2);
        component.find("adjPrice3").set("v.value",adj3);
        component.find("adjPrice4").set("v.value",adj4);
        component.find("adjPrice5").set("v.value",adj5);
        component.find("adjPrice6").set("v.value",adj6);
        
        
        //Update the Origin Price based on loan amount of orig. fee percentage
        var origFee = (component.find("origFee").get("v.value"))/100;
        var loanAmount = component.find("loanAmount").get("v.value");
        var origValBase = loanAmount*origFee;
        console.log(origValBase);
        var origVal;
        
        if(origValBase < 2500){
            origVal = 2500;
        } else if (origValBase > 9500){
            origVal = 9500;
        } else origVal = origValBase;
        
        component.find("origPrice1").set("v.value",origVal);
        component.find("origPrice2").set("v.value",origVal);
        component.find("origPrice3").set("v.value",origVal);
        component.find("origPrice4").set("v.value",origVal);
        component.find("origPrice5").set("v.value",origVal);
        component.find("origPrice6").set("v.value",origVal);
        
        
       var estTitle = parseFloat(component.find("estTitle").get("v.value"));
       var estLender = parseFloat(component.find("estLender").get("v.value"));
       var estCredit = parseFloat(component.find("estCredit").get("v.value"));           
       var totalFees = estTitle + estLender + estCredit;
            
       var totalCost1 = totalFees + origVal + (adj1/100)*loanAmount;
       var totalCost2 = totalFees + origVal + (adj2/100)*loanAmount;
       var totalCost3 = totalFees + origVal + (adj3/100)*loanAmount;
       var totalCost4 = totalFees + origVal + (adj4/100)*loanAmount;
       var totalCost5 = totalFees + origVal + (adj5/100)*loanAmount;
       var totalCost6 = totalFees + origVal + (adj6/100)*loanAmount;


        console.log("loan amount: " + loanAmount); 
        
        //Set Closing Costs and Total Loan Amounts 
        var addFee = component.find("addFees").get("v.value");
        
        if(addFee == "No"){
            
 			component.find("totalCost1").set("v.value",totalCost1);
            component.find("totalCost2").set("v.value",totalCost2);
            component.find("totalCost3").set("v.value",totalCost3);
            component.find("totalCost4").set("v.value",totalCost4);
            component.find("totalCost5").set("v.value",totalCost5);
            component.find("totalCost6").set("v.value",totalCost6);
            component.set('v.newProposal.Total_Cost_1__c', totalCost1);          
        	component.set('v.newProposal.Total_Cost_2__c', totalCost2);
        	component.set('v.newProposal.Total_Cost_3__c', totalCost3);
        	component.set('v.newProposal.Total_Cost_4__c', totalCost4);
        	component.set('v.newProposal.Total_Cost_5__c', totalCost5);
        	component.set('v.newProposal.Total_Cost_6__c', totalCost6);           
            component.set("v.newProposal.Total_Loan_Amount1__c", loanAmount);
            component.set("v.newProposal.Total_Loan_Amount2__c", loanAmount);
            component.set("v.newProposal.Total_Loan_Amount3__c", loanAmount);
            component.set("v.newProposal.Total_Loan_Amount4__c", loanAmount);
            component.set("v.newProposal.Total_Loan_Amount5__c", loanAmount);
            component.set("v.newProposal.Total_Loan_Amount6__c", loanAmount);            
        } 
        
        if(addFee == "Yes"){
            
            var totalCost1new = totalCost1 + (totalCost1*((parseFloat(adj1/100) + parseFloat(origFee))));
            var totalCost2new = totalCost2 + (totalCost2*((parseFloat(adj2/100) + parseFloat(origFee))));
            var totalCost3new = totalCost3 + (totalCost3*((parseFloat(adj3/100) + parseFloat(origFee))));
            var totalCost4new = totalCost4 + (totalCost4*((parseFloat(adj4/100) + parseFloat(origFee))));
            var totalCost5new = totalCost5 + (totalCost5*((parseFloat(adj5/100) + parseFloat(origFee))));
            var totalCost6new = totalCost6 + (totalCost6*((parseFloat(adj6/100) + parseFloat(origFee))));
            
            component.find("totalCost1").set("v.value",totalCost1new);
            component.find("totalCost2").set("v.value",totalCost2new);
            component.find("totalCost3").set("v.value",totalCost3new);
            component.find("totalCost4").set("v.value",totalCost4new);
            component.find("totalCost5").set("v.value",totalCost5new);
            component.find("totalCost6").set("v.value",totalCost6new);   
            component.set('v.newProposal.Total_Cost_1__c', totalCost1new);           
        	component.set('v.newProposal.Total_Cost_2__c', totalCost2new);
        	component.set('v.newProposal.Total_Cost_3__c', totalCost3new);
        	component.set('v.newProposal.Total_Cost_4__c', totalCost4new);
        	component.set('v.newProposal.Total_Cost_5__c', totalCost5new);
        	component.set('v.newProposal.Total_Cost_6__c', totalCost6new);            
            component.set("v.newProposal.Total_Loan_Amount1__c", (parseFloat(loanAmount)+parseFloat(totalCost1new)));
            component.set("v.newProposal.Total_Loan_Amount2__c", (parseFloat(loanAmount)+parseFloat(totalCost2new)));
            component.set("v.newProposal.Total_Loan_Amount3__c", (parseFloat(loanAmount)+parseFloat(totalCost3new)));
            component.set("v.newProposal.Total_Loan_Amount4__c", (parseFloat(loanAmount)+parseFloat(totalCost4new)));
            component.set("v.newProposal.Total_Loan_Amount5__c", (parseFloat(loanAmount)+parseFloat(totalCost5new)));
            component.set("v.newProposal.Total_Loan_Amount6__c", (parseFloat(loanAmount)+parseFloat(totalCost6new)));
        }       
        
        var totalCostCheck = component.find("totalCost6").get("v.value");
        if(totalCostCheck < 0){
            totalCostCheck = 0;
            component.find("totalCost6").set("v.value", totalCostCheck);
            component.set("v.newProposal.Total_Cost_6__c", totalCostCheck);
        }
         var contactId = component.get('v.contactId');
        component.set('v.newProposal.Borrower__c', contactId);
        
        var leadId = component.get('v.leadId');
        component.set('v.newProposal.Borrower_Lead__c', leadId);
        
        var loanId = component.get('v.loanId');
        component.set('v.newProposal.Most_Recent_Loan__c', loanId);
              
        var lockPer = component.find('lockPer').get("v.value");
        component.set('v.newProposal.Lock_Period_Days__c', lockPer);
        
        var fico = component.find('ficoScore').get("v.value");
        component.set('v.newProposal.FICO_Score__c', fico);
        
        var estValue = component.find('estVal').get("v.value");
        component.set('v.newProposal.Estimate_Value__c', estValue);
        
        var terms = component.find('fixedTermYears').get("v.value");
        component.set('v.newProposal.Fixed_Term_Years__c', terms);
        
        var loanProgram = component.find('loanProgram').get("v.value");
        component.set('v.newProposal.Loan_Program__c', loanProgram);
        
		var prepDate = component.find('prepDate').get("v.value");
        component.set('v.newProposal.Prepared_Date__c', prepDate);
        
		var borrower = component.find('borrowerName').get("v.value");
        component.set('v.newProposal.Borrower_Name_Text__c', borrower);
        
        var lenderFees = component.find('estLender').get("v.value");
        component.set('v.newProposal.Est_Fees_Lender__c', lenderFees);
        
        var titleFees = component.find('estTitle').get("v.value");
        component.set('v.newProposal.Est_Fees_Title_Escrow__c', titleFees);
        
        var appraisalFees = component.find('estCredit').get("v.value");
        component.set('v.newProposal.Est_Fees_Appraisal_Credit__c', appraisalFees);
        
        var treasuryYield = component.find('treasuryYield').get("v.value");
        component.set("v.newProposal.X10_Yr_Treasury_Yield__c", treasuryYield);
        
        var compensation = component.find('origFee').get("v.value");
        component.set("v.newProposal.Origination_Fee__c", compensation);
        
        var transactionType = component.find('transactionType').get("v.value");
        component.set('v.newProposal.Transaction_Type__c', transactionType);
        
        var currPmt = component.find('currPayment').get("v.value");
        component.set('v.newProposal.Current_Loan_Monthly_Payment__c', currPmt);
        
        var firstPmtDate = component.find('firstPmtDate').get("v.value");
        component.set('v.newProposal.Est_First_Payment_Date__c', firstPmtDate);
        
        var propState = component.find('propState').get("v.value");
        component.set('v.newProposal.Property_State__c', propState);
        
        if (transactionType != 'Purchase'){
      			var currBal = component.find('currentBal').get("v.value");
        		console.log('currBal: ' + currBal);
            	component.set('v.newProposal.Current_Balance_Down_Payment__c', currBal);
        }
        
        var loanType = component.find('loanType').get("v.value");
        console.log('loanType: ' + loanType);
        component.set('v.newProposal.Loan_Type__c', loanType);
        
        var addLoanFees = component.find('addFees').get("v.value");
        component.set('v.newProposal.Add_Fees_to_Loan_Balance__c', addLoanFees);
        
        
      	var price1 = component.find('price1').get("v.value");
        var price2 = component.find('price2').get("v.value");
        var price3 = component.find('price3').get("v.value");
        var price4 = component.find('price4').get("v.value");
        var price5 = component.find('price5').get("v.value");
        var price6 = component.find('price6').get("v.value");       
        component.set("v.newProposal.Price_1__c", price1);
        component.set("v.newProposal.Price_2__c", price2);
        component.set("v.newProposal.Price_3__c", price3);
        component.set("v.newProposal.Price_4__c", price4);
        component.set("v.newProposal.Price_5__c", price5);
        component.set("v.newProposal.Price_6__c", price6);
        
        var rate1 = component.find('rate1').get("v.value");
        var rate2 = component.find('rate2').get("v.value");
        var rate3 = component.find('rate3').get("v.value");
        var rate4 = component.find('rate4').get("v.value");
        var rate5 = component.find('rate5').get("v.value");
        var rate6 = component.find('rate6').get("v.value");		
        component.set("v.newProposal.Rate_1__c", rate1);
        component.set("v.newProposal.Rate_2__c", rate2);
        component.set("v.newProposal.Rate_3__c", rate3);
        component.set("v.newProposal.Rate_4__c", rate4);
        component.set("v.newProposal.Rate_5__c", rate5);
        component.set("v.newProposal.Rate_6__c", rate6);

        var orig = component.find("origPrice1").get("v.value");  
        component.set("v.newProposal.Orig__c", orig);
        
        component.set("v.newProposal.Adj_Price_1__c", component.find("adjPrice1").get("v.value"));
        component.set("v.newProposal.Adj_Price_2__c", component.find("adjPrice2").get("v.value"));
        component.set("v.newProposal.Adj_Price_3__c", component.find("adjPrice3").get("v.value"));
        component.set("v.newProposal.Adj_Price_4__c", component.find("adjPrice4").get("v.value"));
        component.set("v.newProposal.Adj_Price_5__c", component.find("adjPrice5").get("v.value"));
        component.set("v.newProposal.Adj_Price_6__c", component.find("adjPrice6").get("v.value"));
        
        var tot1 = component.find("totalCost1").get("v.value");
        	     
        var gpa = component.find("gpa").get("v.value");
        component.set("v.newProposal.Global_Pricing_Adjuster__c", gpa);
        
        
        //Calculate Monthly Payments

        var pmt1 = rate1/1200;
        var loanAmount1 = component.get("v.newProposal.Total_Loan_Amount1__c");     
        var finalResult1 = helper.calculateMonthlyPmt(component, rate1, loanAmount1, terms);
        component.set("v.newProposal.Monthly_PI_Pmt1__c", finalResult1);
          
        var pmt2 = rate2/1200;
        var loanAmount2 = component.get("v.newProposal.Total_Loan_Amount2__c");
        var finalResult2 = helper.calculateMonthlyPmt(component, rate2, loanAmount2, terms);    
        component.set("v.newProposal.Monthly_PI_Pmt2__c", finalResult2);
        
        var pmt3 = rate3/1200;
        var loanAmount3 = component.get("v.newProposal.Total_Loan_Amount3__c");
		var finalResult3 = helper.calculateMonthlyPmt(component, rate3, loanAmount3, terms);
        component.set("v.newProposal.Monthly_PI_Pmt3__c", finalResult3);
        
        var pmt4 = rate4/1200;
        var loanAmount4 = component.get("v.newProposal.Total_Loan_Amount4__c");
        var finalResult4 = helper.calculateMonthlyPmt(component, rate4, loanAmount4, terms);
        component.set("v.newProposal.Monthly_PI_Pmt4__c", finalResult4);
        
        var pmt5 = rate5/1200;
        var loanAmount5 = component.get("v.newProposal.Total_Loan_Amount5__c");
        var finalResult5 = helper.calculateMonthlyPmt(component, rate5, loanAmount5, terms);
        component.set("v.newProposal.Monthly_PI_Pmt5__c", finalResult5);
        
        var pmt6 = rate6/1200;
        var loanAmount6 = component.get("v.newProposal.Total_Loan_Amount6__c");
        var finalResult6 = helper.calculateMonthlyPmt(component, rate6, loanAmount6, terms);
        component.set("v.newProposal.Monthly_PI_Pmt6__c", finalResult6);

        
        var rateTerm = terms*12;
       	var ccBase = 0; 
        var ccComp1 = component.find("totalCost1").get("v.value");
        var ccComp2 = component.find("totalCost2").get("v.value");
        var ccComp3 = component.find("totalCost3").get("v.value");
        var ccComp4 = component.find("totalCost4").get("v.value");
        var ccComp5 = component.find("totalCost5").get("v.value");
        
        var finalResultBase = finalResult6;
        var finalResultComp1 = finalResult1;
        var finalResultComp2 = finalResult2;
        var finalResultComp3 = finalResult3;
        var finalResultComp4 = finalResult4;
        var finalResultComp5 = finalResult5;
        
        component.set('v.newProposal.Years_Until_BE6__c', 0);
 
        
        //Calculate APR Values
       
        var loanAmount = component.find("loanAmount").get("v.value");
        var future = 0;
        var payment1 = -finalResult1;
        var payment2 = -finalResult2;
        var payment3 = -finalResult3;
        var payment4 = -finalResult4;
        var payment5 = -finalResult5;
        var payment6 = -finalResult6;
        var pv1 = (loanAmount - tot1);
        var total2 = component.find("totalCost2").get("v.value");
        var pv2 = (loanAmount - total2);
        var total3 = component.find("totalCost3").get("v.value");
        var pv3 = (loanAmount - total3);
        var total4 = component.find("totalCost4").get("v.value");
        var pv4 = (loanAmount - total4);
        var total5 = component.find("totalCost5").get("v.value");
        var pv5 = (loanAmount - total5);
        var total6 = component.find("totalCost6").get("v.value");
        var pv6 = (loanAmount - total6);
        
        component.set("v.newProposal.APR1__c", (helper.calculateAPR(payment1, pv1, terms)*1200));
        component.set("v.newProposal.APR2__c", (helper.calculateAPR(payment2, pv2, terms)*1200));
        component.set("v.newProposal.APR3__c", (helper.calculateAPR(payment3, pv3, terms)*1200));
        component.set("v.newProposal.APR4__c", (helper.calculateAPR(payment4, pv4, terms)*1200));
        component.set("v.newProposal.APR5__c", (helper.calculateAPR(payment5, pv5, terms)*1200));
        component.set("v.newProposal.APR6__c", (helper.calculateAPR(payment6, pv6, terms)*1200));
       
        var loanPop = component.get("v.loanSelected");
        
        if (loanPop == true){           
           component.set("v.newProposal.Purchase_Price__c", component.find("purchasePrice").get("v.value"));
           component.set("v.newProposal.Appraised_Value__c", component.find("appraisedVal").get("v.value"));
        }
    },
    
    saveRecord : function(component, event, helper){
         var loanAmount = component.find("loanAmount").get("v.value"); 
		 component.set("v.newProposal.New_Loan_Amount__c", loanAmount);       
        
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
    	}       
})