({
	calculateLoan : function(component, event, helper) {
		var principal = component.get("v.loanAmount");
        var interestPerPeriod = component.get("v.interestRate")/12/100;
        var numberPayments = component.get("v.term")*12;
        var numberArmPayments = component.get("v.armTerm")*12;
        var intOnly = component.get("v.interestOnlySelection");
        var addPrin = component.get("v.additionalPrincipal");
        var armInt;
        var totalInt;
        var monthly;
        var newTerm;

        //calculate interest over loan term

           var x = Math.pow((1 + interestPerPeriod), numberPayments);
           totalInt = ((principal*(x*interestPerPeriod)/(x-1))*numberPayments)-principal; 
             
        //calculate monthly payments
        if (intOnly == "yes") {
            //interest only
            monthly = principal*interestPerPeriod;
        } else {
			//traditional loan
			monthly = helper.pmt(interestPerPeriod, numberPayments, principal, 0, 0);
        }
        
        //calculate term for additional principal
        if (addPrin > 0){
            newTerm = helper.nper(interestPerPeriod, - monthly - addPrin, principal, 0, 0)/12;
            console.log(newTerm);
            // Total interest calculation with new term
            numberPayments = newTerm * 12;
            var y = Math.pow((1 + interestPerPeriod), numberPayments);
            totalInt = ((principal*(y*interestPerPeriod)/(y-1))*numberPayments)-principal
        } else {
            newTerm = component.get("v.term");
        }
        
        //calculate interest over arm term
        if (!isNaN(numberArmPayments) && (numberArmPayments>0) ) {
            console.log("# Arm Payments: " + numberArmPayments);
            console.log(interestPerPeriod);
            console.log(principal);
            armInt = helper.cumint(helper.pmt(interestPerPeriod, numberPayments, principal, 0, 0), interestPerPeriod, principal, 1, numberArmPayments);
            console.log(armInt);
            }
        
        //populate form output fields
        if (!isNaN(monthly) && 
        (monthly != Number.POSITIVE_INFINITY) &&
        (monthly != Number.NEGATIVE_INFINITY)) {

            console.log("addPrin " + addPrin);
            console.log("v.interestPerPeriod", interestPerPeriod);
            console.log("v.numberPayments", helper.round(numberPayments, 0));
            console.log("Interest Only:" + intOnly);
            
        	component.set("v.monthlyPayments", helper.round(monthly, 2));
        	component.set("v.totalInterest", helper.round(totalInt,0));
            component.set("v.armInterest", helper.round(armInt,0));
        }

        if (!newTerm) {
            component.set("v.newTerm", 0);
        } else if (!isNaN(newTerm) &&
        (newTerm != Number.POSITIVE_INFINITY) &&
        (newTerm != Number.NEGATIVE_INFINITY)) {
			
            component.set("v.newTerm", helper.round(newTerm, 1));
        
        }
            
    }, 
    
    handleProductChange : function(component, event, helper) {}
        
   
})