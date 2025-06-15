({
    navigateTo: function(component, recId) {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": recId
        });
        navEvt.fire();
    },
    
    updateStuff: function(component, event, helper){
        
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

        
       component.set("v.newProposal.New_Loan_Amount__c", loanAmount);
        console.log("loan amount: " + loanAmount); 
        
        //Set Closing Costs and Total Loan Amounts 
        var addFee = component.find('addFees').get("v.value");
        
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
            if(totalCost6new < 0){
                totalCost6new = 0;
            }
            console.log('--------TOTAL COST NEW: ' + totalCost6new);
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
    

    },
    
    

})