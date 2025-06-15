({
    navigateTo: function(component, recId) {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": recId
        });
        navEvt.fire();
    },
    
    getLoanInformation : function(component, loanId) {
        var action = component.get("c.getLoanDetails");
        // set param to method  
        action.setParams({
            'recordId' : loanId
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                var selectedBorrower = component.get('v.selectedBorrower');
                selectedBorrower.Name = storeResponse.borrowerContact.Contact.Name;
                selectedBorrower.Id = storeResponse.borrowerContact.ContactId;
                selectedBorrower.Status = undefined;
                selectedBorrower.PropertyId = storeResponse.oppRecord.Subject_Property_Name__c;
                //component.set('v.leadId', storeResponse.borrowerContact.ContactId);
                component.set('v.borrowerName', storeResponse.borrowerContact.Contact.Name);
                component.set('v.loanAmount', storeResponse.oppRecord.Amount);
                component.set("v.transactionType", storeResponse.oppRecord.Purpose__c);
                component.set("v.selectionUser", [storeResponse.solidifyContact]);
                component.set('v.selectedBorrower', selectedBorrower);
                let fixedTermYears = parseInt(storeResponse.oppRecord.encompass_By_EM__Amortization_Term_Months__c);
                fixedTermYears = fixedTermYears ? Math.floor(fixedTermYears / 12) : 0;
                component.set('v.fixedTermYears', fixedTermYears);

                var getSelectRecord = component.get('v.selectedBorrower');
                var applicationEvent = $A.get("e.c:selectedsObjectRecordEventApp");
                applicationEvent.setParams({"recordByEvent" : getSelectRecord})
                applicationEvent.fire();
                console.log('@@@ event fired on loan record');
                
                //For auto populating the Property look up
                var selectedProp = component.get('v.selectedProp');
                selectedProp.Id = storeResponse.oppRecord.Subject_Property_Name__c;
                selectedProp.Name = storeResponse.oppRecord.Subject_Property_Name__r ? storeResponse.oppRecord.Subject_Property_Name__r.Name : null;
                component.set('v.propId', storeResponse.oppRecord.Subject_Property_Name__c);
                component.set('v.selectedProp', selectedProp);
                
                var getSelectRecordTwo = component.get('v.selectedProp');
                console.log('@@@ getSelectRecordTwo:    '+JSON.stringify(getSelectRecordTwo));
                var applicationEventTwo = $A.get("e.c:selectedPropertyEventApp");
                applicationEventTwo.setParams({"recordByEvent" : getSelectRecordTwo})
                applicationEventTwo.fire();

                //For auto populating the loan look up
                var selectedLoan = component.get('v.selectedLoan');
                selectedLoan.Id = storeResponse.oppRecord.Id;
                selectedLoan.Name = storeResponse.oppRecord.Name;
                selectedLoan.Loan_Amount__c = storeResponse.oppRecord.Loan_Amount__c;
                selectedLoan.Purpose__c = storeResponse.oppRecord.Purpose__c;
                selectedLoan.Qual_FICO__c = storeResponse.oppRecord.Qual_FICO__c;
                selectedLoan.Loan_Program__c = storeResponse.oppRecord.Loan_Program__c;
                selectedLoan.Loan_Type__c = storeResponse.oppRecord.Loan_Type__c;
                selectedLoan.Purchase_Price__c = storeResponse.oppRecord.Purchase_Price__c;
                selectedLoan.Appraised_Value__c = storeResponse.oppRecord.Appraised_Value__c;
                selectedLoan.Amount = storeResponse.oppRecord.Amount;
                selectedLoan.Grid_Title_Escrow_Rec__c = storeResponse.oppRecord.Grid_Title_Escrow_Rec__c;
                selectedLoan.Grid_Lender_Fees__c = storeResponse.oppRecord.Grid_Lender_Fees__c;
                selectedLoan.Grid_Appraisal_Credit_VOE__c = storeResponse.oppRecord.Grid_Appraisal_Credit_VOE__c;
                selectedLoan.Property_Value__c = storeResponse.oppRecord.Property_Value__c;
                selectedLoan.MIP_FF__c = storeResponse.oppRecord.MIP_FF__c;
                selectedLoan.Down_Payment__c = storeResponse.oppRecord.Down_Payment__c;
                selectedLoan.encompass_By_EM__Estimated_Real_Estate_Taxes_Amount__c = storeResponse.oppRecord.encompass_By_EM__Estimated_Real_Estate_Taxes_Amount__c;
                selectedLoan.encompass_By_EM__Estimated_Hazard_Insurance_Amount__c = storeResponse.oppRecord.encompass_By_EM__Estimated_Hazard_Insurance_Amount__c;

                component.set('v.loanId', storeResponse.oppRecord.Id);
                console.log('@@@ storeResponse.oppRecord.Id: ' + storeResponse.oppRecord.Id);
                component.set('v.selectedLoan', selectedLoan);
                
                var getSelectRecordThree = component.get('v.selectedLoan');
                console.log('@@@ getSelectRecordThree:    '+JSON.stringify(getSelectRecordThree));
                var applicationEventThree = $A.get("e.c:selectedLoanEventApp");
                applicationEventThree.setParams({"recordByEvent" : getSelectRecordThree})
                applicationEventThree.fire();
            }
            
        });
        // enqueue the Action  
        $A.enqueueAction(action);
        
    },

    getLoanProgramsList : function(component) {
        let action = component.get("c.getLoanPicklistValues");

        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                let storeResponse = response.getReturnValue();
                component.set('v.loanProgramList', storeResponse.loanPrograms);
                component.set('v.transactionTypeList', storeResponse.transactionType);
            }
        });
        $A.enqueueAction(action);
    },

    getLeadInformation : function(component, leadId) {
        var action = component.get("c.getLeadDetails");
        // set param to method  
        action.setParams({
            'recordId' : leadId
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                // console.log('@@@ getLeadDetails: ' + JSON.stringify(storeResponse));
                console.log('### New getLeadInformation : ' + JSON.stringify(storeResponse.Loan_Amount__c));
                component.set("v.loanSelected", true);
                component.set("v.loanAmount", storeResponse.Loan_Amount__c);
                component.set("v.transactionType", storeResponse.Purpose__c);
                component.set("v.newProposal.FICO_Score__c", storeResponse.Qualifying_Fico__c);
                component.set('v.loanProgram', storeResponse.Loan_Program__c);
                component.set('v.loanType', storeResponse.Loan_Type__c);
                component.set('v.purchasePrice', storeResponse.Purchase_Price__c);
            }
        });
        // enqueue the Action  
        $A.enqueueAction(action);
        
    },
    
   /* calculateAPR : function(payment, present, terms) {
        //APR calculation in js helper
        var guess = 0.01;
        var type= 0;
        var periods = terms*12;
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
 */   
    validateForm : function(component, event, helper){
        var loanAmt = component.get('v.loanAmount');
        var term = component.find('fixedTermYears').get('v.value');
        var rate1 = component.find('rate1').get('v.value');
        var rate2 = component.find('rate2').get('v.value');
        var rate3 = component.find('rate3').get('v.value');
        var rate4 = component.find('rate4').get('v.value');
        var rate5 = component.find('rate5').get('v.value');
        var rate6 = component.find('rate6').get('v.value');
        console.log('validate form: ' + loanAmt + ':' + term + ':' + rate1);

        if( !(component.get('v.loanAmount') >0 ) || !(term>0) ||  !(rate1>0) ){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title : 'Required Fields Missing',
                message: 'Please ensure that all required fields have been filled in',
                messageTemplate: 'Record created!',
                type: 'error'
            });
            toastEvent.fire();
            return false;
        } else {
           return true;
        }
    },

    handleUpdateNew : function(component, event, helper, override){
        //Update the Adj. Price values based on Price and Global Pricing Adjuster inputs
        console.log('handleUpdateNew');
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
            origVal = origValBase
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
        }
            
            component.find("origPrice1").set("v.value",origVal);
            component.find("origPrice2").set("v.value",origVal);
            component.find("origPrice3").set("v.value",origVal);
            component.find("origPrice4").set("v.value",origVal);
            component.find("origPrice5").set("v.value",origVal);
            component.find("origPrice6").set("v.value",origVal);
            
            
            var estTitle = parseFloat(component.find("estTitle").get("v.value"))?parseFloat(component.find("estTitle").get("v.value")):0;
            var estLender = parseFloat(component.find("estLender").get("v.value"))?parseFloat(component.find("estLender").get("v.value")):0;
            var estCredit = parseFloat(component.find("estCredit").get("v.value"))?parseFloat(component.find("estCredit").get("v.value")):0;           
            var totalFees = estTitle + estLender + estCredit;
            console.log('fees: ' + estTitle + ':' + estLender + ':' + estCredit);
            var totalCost1 = parseFloat(totalFees) + parseFloat(origVal) + parseFloat((adj1/100)*loanAmount);
            var totalCost2 = parseFloat(totalFees) + parseFloat(origVal) + parseFloat((adj2/100)*loanAmount);
            var totalCost3 = parseFloat(totalFees) + parseFloat(origVal) + parseFloat((adj3/100)*loanAmount);
            var totalCost4 = parseFloat(totalFees) + parseFloat(origVal) + parseFloat((adj4/100)*loanAmount);
            var totalCost5 = parseFloat(totalFees) + parseFloat(origVal) + parseFloat((adj5/100)*loanAmount);
            var totalCost6 = parseFloat(totalFees) + parseFloat(origVal) + parseFloat((adj6/100)*loanAmount);
            
            
            console.log("loan amount: " + loanAmount); 
            console.log('totalCost1:' + totalCost1);
            console.log('adj1:'+adj1 + ' origFee:'+origFee);
            
            //Set Closing Costs and Total Loan Amounts 
            var addFee = component.find("addFees").get("v.value")? component.find("addFees").get("v.value"):'No';
            component.set("v.newProposal.Add_Fees_to_Loan_Balance__c", addFee);
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
                console.log('totalCost1new'+totalCost1new);
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

                console.log('rate 6:'+totalCost6new+':'+adj6);
            }       
            
 /*       
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
*/
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
            
            /*
            var SolidContact = component.find('SolidContact').get("v.value");
            component.set('v.newProposal.SolidifyContact__c', SolidContact);
            */
            
            var selectionObj5 = component.get('v.selectionUser');
            component.set("v.newProposal.SolidifyContact__c", null);
            
            for (var i=0; i< selectionObj5.length; i++) {
                var sObjRec = selectionObj5[i];
                component.set("v.newProposal.SolidifyContact__c", sObjRec.id);
            }
            
            
            
        /*    var fico = component.find('ficoScore').get("v.value");
            component.set('v.newProposal.FICO_Score__c', fico);
         */   
            var estValue = component.find('estVal').get("v.value");
            component.set('v.newProposal.Estimate_Value__c', estValue);
            
            var terms = component.find('fixedTermYears').get("v.value");
            component.set('v.newProposal.Fixed_Term_Years__c', terms);
            console.log('@@@ Fixed_Term_Years__c: ' + component.get('v.newProposal.Fixed_Term_Years__c'));
            
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
            
           // var addLoanFees = component.find('addFees').get("v.value");
           // component.set('v.newProposal.Add_Fees_to_Loan_Balance__c', addLoanFees);
            
            console.log('setting values for prepaids');
            component.set('v.newProposal.Current_Balance_Down_Payment__c', component.find('Downpayment').get('v.value'));
            component.set('v.newProposal.Escrow_Interest_Daily_Rate__c', component.find('EscrowIntRate').get('v.value'));
            component.set('v.newProposal.Escrow_Interest_Days__c', component.find('EscrowIntDays').get('v.value'));
            component.set('v.newProposal.Escrow_Interest_Total__c', component.find('EscrowIntTotal').get('v.value'));
            component.set('v.newProposal.Escrow_Taxes_Monthly_Rate__c', component.find('EscrowTaxRate').get('v.value'));
            component.set('v.newProposal.Escrow_Taxes_Months__c', component.find('EscrowTaxMonths').get('v.value'));
            component.set('v.newProposal.Escrow_Taxes_Total__c', component.find('EscrowTaxTotal').get('v.value'));
            component.set('v.newProposal.Escrow_Ins_Monthly_Rate__c', component.find('EscrowInsRate').get('v.value'));
            component.set('v.newProposal.Escrow_Ins_Months__c', component.find('EscrowInsMonths').get('v.value'));
            component.set('v.newProposal.Escrow_Insurance_Total__c', component.find('EscrowInsTotal').get('v.value'));

            component.set('v.newProposal.Hide_Escrows_Client_View__c', component.find('Hide_Escrows_Client_View').get('v.checked'));
            component.set('v.newProposal.Hide_Funds_To_Close_Client_View__c', component.find('Hide_Funds_To_Close_Client_View').get('v.checked'));
            component.set('v.newProposal.Simple_Breakeven__c', component.find('Simple_Breakeven').get('v.checked'));

            //cancelMI
            //MIPercent
            //includeFFMIP
            



            var price1 = component.find('price1').get("v.value");
            var price2 = component.find('price2').get("v.value");
            var price3 = component.find('price3').get("v.value");
            var price4 = component.find('price4').get("v.value");
            var price5 = component.find('price5').get("v.value");
            var price6 = component.find('price6').get("v.value");       
            console.log('price6:'+price6);
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
            console.log('rate6:'+rate6);
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

            var loanPop = component.get("v.loanSelected");
            if (loanPop == true){
              //  var purchasePrice = component.find("purchasePrice").get("v.value");
                var purchasePrice = component.find("v.selectedLoan.Purchase_Price__c");
                component.set("v.newProposal.Purchase_Price__c", purchasePrice);
                
                //var appraisedVal = component.find("appraisedVal").get("v.value");
                var appraisedVal = component.find("v.selectedLoan.Appraised_Value__c");
                component.set("v.newProposal.Appraised_Value__c", appraisedVal);
   
            }
    },

    setProposalFieldFromLoan: function (component, proposalField, loanField) {
        console.log('component.get(`v.selectedLoan.${loanField}`) ' + component.get(`v.selectedLoan.${loanField}`))
        component.set(`v.newProposal.${proposalField}`, component.get(`v.selectedLoan.${loanField}`));
    },

    submitRecord : function(component, event, helper){
        helper.setProposalFieldFromLoan(component, 'Est_Fees_Appraisal_Credit__c', 'Grid_Appraisal_Credit_VOE__c');
        helper.setProposalFieldFromLoan(component, 'Escrow_Taxes_Monthly_Rate__c', 'encompass_By_EM__Estimated_Real_Estate_Taxes_Amount__c');
        helper.setProposalFieldFromLoan(component, 'Escrow_Ins_Monthly_Rate__c', 'encompass_By_EM__Estimated_Hazard_Insurance_Amount__c');
        component.set('v.newProposal.Other__c', component.find('Other').get('v.value'));

        console.log(component.get('v.newProposal'));
        var action = component.get("c.saveProposalRecord");
        action.setParams({"newProposal": component.get("v.newProposal")});

        action.setCallback(this, function(response) {
            var state = response.getState();
            if(component.isValid() && state == "SUCCESS"){
                var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : 'Success',
                        message: 'The record was saved.',
                        duration:'20000',
                        key: 'info_alt',
                        type: 'success',
                        mode: 'pester'
                    });
                    toastEvent.fire();
                    helper.navigateTo(component, response.getReturnValue());

            } else {
                var toastEvent = $A.get("e.force:showToast");
                var errors = response.getError();
                toastEvent.setParams({
                    title : 'Error',
                    message:'There was a problem : '+ errors[0].message,
                    duration:'10000',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'pester'
                });
                toastEvent.fire();
                $A.get('e.force:closeQuickAction').fire();
                $A.get('e.force:refreshView').fire();
            }
        });
        $A.enqueueAction(action);


    }
        
    })