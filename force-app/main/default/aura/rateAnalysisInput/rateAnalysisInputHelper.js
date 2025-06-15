({
    navigateTo: function(component, recId) {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": recId
        });
        navEvt.fire();
    },
    
  	
    calculateAPR : function(payment, present, terms) {
        var guess = 0.01;
        var type= 0;
        var periods = terms*12;
        console.log('periods: ' + periods);
        var future = 0;
      
        // Set maximum epsilon for end of iteration
        var epsMax = 1e-10;
      
        // Set maximum number of iterations
        var iterMax = 10;
      
        // Implement Newton's method
        var y, y0, y1, x0, x1 = 0,
          f = 0,
          i = 0;
        var rate = guess;
        if (Math.abs(rate) < epsMax) {
          y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
        } else {
          f = Math.exp(periods * Math.log(1 + rate));
          y = present * f + payment * (1 / rate + type) * (f - 1) + future;
        }
        y0 = present + payment * periods + future;
        y1 = present * f + payment * (1 / rate + type) * (f - 1) + future;
        i = x0 = 0;
        x1 = rate;
        while ((Math.abs(y0 - y1) > epsMax) && (i < iterMax)) {
          rate = (y1 * x0 - y0 * x1) / (y1 - y0);
          x0 = x1;
          x1 = rate;
            if (Math.abs(rate) < epsMax) {
              y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
            } else {
              f = Math.exp(periods * Math.log(1 + rate));
              y = present * f + payment * (1 / rate + type) * (f - 1) + future;
            }
          y0 = y1;
          y1 = y;
          ++i;
        }
        return rate;
    },    
    
     handleUpdateNew : function(component, event, helper, override){
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
        var comp = component.find("origFee").get("v.value");
        var override = component.get("v.overrideComp");
        console.log("override: " + override);
        console.log("orig val base: " + origValBase);
        console.log("comp: " + comp);
         console.log("loan amountNEW: " + loanAmount);
        var origVal;
        
        if(override == false){          
            if(origValBase < 2500 && comp != 0 ){
                origVal = 2500;
            } else if (origValBase > 9500 && comp != 0){
                origVal = 9500 ;
            } else if (comp == 0){
                   origVal = 0}
                else{origVal = origValBase}
        } 
         if(override == true){
            var overrideMin = component.find("overrideMin").get("v.value");
            console.log("override min: " + overrideMin);
            var overrideMax = component.find("overrideMax").get("v.value");
            console.log("override min: " + overrideMax);
             
            if(origValBase < overrideMin){
                origVal = overrideMin;
                console.log("origValMin: " + origVal);
            } else if (origValBase > overrideMax){
                origVal = overrideMax;
                 console.log("origValMax: " + origVal);
            } else {origVal = origValBase
                   console.log("origValFits: " + origVal);
                   }             
        }
        
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
            
            var totalCost1 = parseFloat(totalFees) + parseFloat(origVal) + parseFloat((adj1/100)*loanAmount);
            var totalCost2 = parseFloat(totalFees) + parseFloat(origVal) + parseFloat((adj2/100)*loanAmount);
            var totalCost3 = parseFloat(totalFees) + parseFloat(origVal) + parseFloat((adj3/100)*loanAmount);
            var totalCost4 = parseFloat(totalFees) + parseFloat(origVal) + parseFloat((adj4/100)*loanAmount);
            var totalCost5 = parseFloat(totalFees) + parseFloat(origVal) + parseFloat((adj5/100)*loanAmount);
            var totalCost6 = parseFloat(totalFees) + parseFloat(origVal) + parseFloat((adj6/100)*loanAmount);

       
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
        
        var totalCostCheck6 = component.find("totalCost6").get("v.value");
        if(totalCostCheck6 < 0){
            totalCostCheck6 = 0;
            component.find("totalCost6").set("v.value", totalCostCheck6);
            component.set("v.newProposal.Total_Cost_6__c", totalCostCheck6);
            component.set("v.newProposal.Total_Loan_Amount6__c", loanAmount);
        }
        
        var totalCostCheck5 = component.find("totalCost5").get("v.value");
        if(totalCostCheck5 < 0){
            totalCostCheck5 = 0;
            component.find("totalCost5").set("v.value", totalCostCheck5);
            component.set("v.newProposal.Total_Cost_5__c", totalCostCheck5);
            component.set("v.newProposal.Total_Loan_Amount5__c", loanAmount);
        }
        
        var totalCostCheck4 = component.find("totalCost4").get("v.value");
        if(totalCostCheck4 < 0){
            totalCostCheck4 = 0;
            component.find("totalCost4").set("v.value", totalCostCheck4);
            component.set("v.newProposal.Total_Cost_4__c", totalCostCheck4);
            component.set("v.newProposal.Total_Loan_Amount4__c", loanAmount);
        }
        
        var totalCostCheck3 = component.find("totalCost3").get("v.value");
        if(totalCostCheck3 < 0){
            totalCostCheck3 = 0;
            component.find("totalCost3").set("v.value", totalCostCheck3);
            component.set("v.newProposal.Total_Cost_3__c", totalCostCheck3);
            component.set("v.newProposal.Total_Loan_Amount3__c", loanAmount);
        }
        var contactId = component.get('v.contactId');
        console.log('contact id: ' + contactId);
        component.set('v.newProposal.Borrower__c', contactId);
        
        var leadId = component.get('v.leadId');
        console.log('lead id: ' + leadId);
        component.set('v.newProposal.Borrower_Lead__c', leadId);
        
        var loanId = component.get('v.loanId');
        console.log('loan id: ' + loanId);
        component.set('v.newProposal.Most_Recent_Loan__c', loanId);
              
        var lockPer = component.find('lockPer').get("v.value");
        component.set('v.newProposal.Lock_Period_Days__c', lockPer);

        var SolidContact = component.find('SolidContact').get("v.value");
        component.set('v.newProposal.SolidifyContact__c', SolidContact);
        
        var fico = component.find('ficoScore').get("v.value");
        component.set('v.newProposal.FICO_Score__c', fico);
        
        var estValue = component.find('estVal').get("v.value");
        component.set('v.newProposal.Estimate_Value__c', estValue);
        
        var terms = component.find('fixedTermYears').get("v.value");
        component.set('v.newProposal.Fixed_Term_Years__c', terms);
        
        var loanProgram = component.find('loanProgram').get("v.value");
       console.log('loan program: ' + loanProgram);
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
        console.log('transaction type : ' + transactionType);
        component.set('v.newProposal.Transaction_Type__c', transactionType);
        
       
        
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
        
        var adj1 = component.find("adjPrice1").get("v.value");
        var adj2 = component.find("adjPrice2").get("v.value");
        var adj3 = component.find("adjPrice3").get("v.value");
        var adj4 = component.find("adjPrice4").get("v.value");
        var adj5 = component.find("adjPrice5").get("v.value");
        var adj6 = component.find("adjPrice6").get("v.value");
        component.set("v.newProposal.Adj_Price_1__c", adj1);
        component.set("v.newProposal.Adj_Price_2__c", adj2);
        component.set("v.newProposal.Adj_Price_3__c", adj3);
        component.set("v.newProposal.Adj_Price_4__c", adj4);
        component.set("v.newProposal.Adj_Price_5__c", adj5);
        component.set("v.newProposal.Adj_Price_6__c", adj6);
        
        var tot1 = component.find("totalCost1").get("v.value");
       
    	     
        var gpa = component.find("gpa").get("v.value");
        component.set("v.newProposal.Global_Pricing_Adjuster__c", gpa);

        var pmt1 = rate1/1200;
        var loanAmount1 = component.get("v.newProposal.Total_Loan_Amount1__c");
        console.log("loan amount1: " + loanAmount1);
        var topNum = pmt1*loanAmount1;
        var bottomNum1A = (1 + pmt1);
        var bottomNum1B = Math.pow(bottomNum1A,-(terms*12)); 
        var bottomNum1C = (1-bottomNum1B);
        var finalResult1 = topNum/bottomNum1C;
        console.log("final result 1: " + finalResult1);
        component.set("v.newProposal.Monthly_PI_Pmt1__c", finalResult1);
        
        var pmt2 = rate2/1200;
        var loanAmount2 = component.get("v.newProposal.Total_Loan_Amount2__c");
        console.log("loan amount: " + loanAmount2);
        var topNum = pmt2*loanAmount2;
        var bottomNum2A = (1 + pmt2);
        var bottomNum2B = Math.pow(bottomNum2A,-(terms*12)); 
        var bottomNum2C = (1-bottomNum2B);
        var finalResult2 = topNum/bottomNum2C;
        console.log("final result 2: " + finalResult2);
        component.set("v.newProposal.Monthly_PI_Pmt2__c", finalResult2);
        
        var pmt3 = rate3/1200;
        var loanAmount3 = component.get("v.newProposal.Total_Loan_Amount3__c");
        console.log("loan amount: " + loanAmount3);
        var topNum = pmt3*loanAmount3;
        var bottomNum3A = (1 + pmt3);
        var bottomNum3B = Math.pow(bottomNum3A,-(terms*12)); 
        var bottomNum3C = (1-bottomNum3B);
        var finalResult3 = topNum/bottomNum3C;
        console.log("final result 3: " + finalResult3);
        component.set("v.newProposal.Monthly_PI_Pmt3__c", finalResult3);
        
        var pmt4 = rate4/1200;
        var loanAmount4 = component.get("v.newProposal.Total_Loan_Amount4__c");
        console.log("loan amount: " + loanAmount4);
        var topNum = pmt4*loanAmount4;
        var bottomNum4A = (1 + pmt4);
        var bottomNum4B = Math.pow(bottomNum4A,-(terms*12)); 
        var bottomNum4C = (1-bottomNum4B);
        var finalResult4 = topNum/bottomNum4C;
        console.log("final result 4: " + finalResult4);
        component.set("v.newProposal.Monthly_PI_Pmt4__c", finalResult4);
        
        var pmt5 = rate5/1200;
        var loanAmount5 = component.get("v.newProposal.Total_Loan_Amount5__c");
        console.log("loan amount: " + loanAmount5);
        var topNum = pmt5*loanAmount5;
        var bottomNum5A = (1 + pmt5);
        var bottomNum5B = Math.pow(bottomNum5A,-(terms*12)); 
        var bottomNum5C = (1-bottomNum5B);
        var finalResult5 = topNum/bottomNum5C;
        console.log("final result 5: " + finalResult5);
        component.set("v.newProposal.Monthly_PI_Pmt5__c", finalResult5);
        
        var pmt6 = rate6/1200;
        var loanAmount6 = component.get("v.newProposal.Total_Loan_Amount6__c");
        console.log("loan amount: " + loanAmount6);
        var topNum = pmt6*loanAmount6;
        var bottomNum6A = (1 + pmt6);
        var bottomNum6B = Math.pow(bottomNum6A,-(terms*12)); 
        var bottomNum6C = (1-bottomNum6B);
        var finalResult6 = topNum/bottomNum6C;
        console.log("final result 6: " + finalResult6);
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
        
        var loanAmount = component.find("loanAmount").get("v.value");
        var payment1 = -finalResult1;
        var pv1 = (loanAmount - tot1);
        var future = 0;
        var payment2 = -finalResult2;
        var payment3 = -finalResult3;
        var payment4 = -finalResult4;
        var payment5 = -finalResult5;
        var payment6 = -finalResult6;
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

        
        var apr1 = this.calculateAPR(payment1, pv1, terms)*1200;
        var apr2 = this.calculateAPR(payment2, pv2, terms)*1200;
        var apr3 = this.calculateAPR(payment3, pv3, terms)*1200;
        var apr4 = this.calculateAPR(payment4, pv4, terms)*1200;
        var apr5 = this.calculateAPR(payment5, pv5, terms)*1200;
        var apr6 = this.calculateAPR(payment6, pv6, terms)*1200;
        console.log('APR 1 '+ apr1);
        console.log('APR 2 ' + apr2);
        console.log('apr3' + apr3);
        console.log('apr4' + apr4);
        console.log('apr5' + apr5);
        console.log('apr6' + apr6);
        component.set("v.newProposal.APR1__c", apr1);
        component.set("v.newProposal.APR2__c", apr2);
        component.set("v.newProposal.APR3__c", apr3);
        component.set("v.newProposal.APR4__c", apr4);
        component.set("v.newProposal.APR5__c", apr5);
        component.set("v.newProposal.APR6__c", apr6);
       
        var loanPop = component.get("v.loanSelected");
        if (loanPop == true){
       var purchasePrice = component.find("purchasePrice").get("v.value");
       component.set("v.newProposal.Purchase_Price__c", purchasePrice);
        
       var appraisedVal = component.find("appraisedVal").get("v.value");
       component.set("v.newProposal.Appraised_Value__c", appraisedVal);
            
    
        }
     }

})