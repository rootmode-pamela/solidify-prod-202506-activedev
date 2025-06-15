({
	doInit: function(component, event, helper) {
        //check whether event.force:createRecord is supported by standalone app and display/hide New button
        console.log('record create allowed: ' + $A.get("e.force:createRecord"));
        component.set("v.showNew", $A.get("e.force:createRecord"));
        helper.getLoanTypes(component);
        helper.getLoanPrograms(component);
        helper.getLoanPurposes(component);
        helper.getLoanOriginators(component);
        helper.getLoanOccupancies(component);

       // console.log('Retrieved Loan Types: ' + component.get('v.loanTypes'));
	},
    
 
 	onFormSubmit: function(component, event, helper) {

        console.log('LoanSearchForm handleSearch');

        var LoanType = component.get("v.selectedLoanType");
        console.log("Search type " + LoanType);	
        var LoanProg = component.get("v.selectedLoanProgram");
        console.log("Search prog " + LoanProg);	
        var LoanPurp = component.get("v.selectedPurpose");
        console.log("Search purp " + LoanPurp);
        var LoanOcc = component.get("v.selectedOccupancy");
        console.log("Seach occ:" + LoanOcc);
        var LoanOrig = component.get("v.selectedOriginator");
        console.log("Search LO: " + LoanOrig);
        var LoanEarliestClose = new Date(component.find("loanFirstClose").get("v.value")).toJSON();
        console.log("Search earliest date " + LoanEarliestClose);
        console.log('latest');
        var latest = new Date(component.find("loanLastClose").get("v.value"));
        var LoanLatestClose = null;
        if(latest<= new Date('1970-01-01T00:00:00Z')){
            console.log('keeping null');        
        } else {
        	LoanLatestClose = new Date(latest).toJSON();    
        }
        var MinDaysClosed = component.find("minDaysClosed").get("v.value");
        
        
        console.log("Search latest date " + LoanLatestClose);
        var LoanIR = component.find("loanMinIR").get("v.value");
        console.log("Search IR " + LoanIR);
        var minFico = component.find("minFico").get("v.value");
        console.log("Search minFico " + minFico);
        /*
        var maxFico = component.find("maxFico").get("v.value");
        console.log("Search maxFico " + maxFico);
        */
        var maxFico;
        var minBal = component.find("minBal").get("v.value");
        console.log("Search minBal " + minBal);
        var maxBal = component.find("maxBal").get("v.value");
        console.log("Search maxBal " + maxBal);
     
     
  //getPropertyLoans(String LoanType, String InterestRate, String MinFico, String MaxFico, String MinSchedBal, String MaxSchedBal, String LoanPurpose, String LoanOccupancy, String LoanOriginator, String EarliestDate, String LatestDate){
    
        var f = component.getEvent("formSubmit");
        f.setParams({"formData":
                     {"LoanType" : LoanType,
                      "LoanProg" : LoanProg,
                      "InterestRate" : LoanIR,
                      "MinFico" : minFico,
                      "MaxFico"  : maxFico,
                      "MinSchedBal" : minBal,
                      "MaxSchedBal" : maxBal,
                      "LoanOriginator": LoanOrig,
                      "LoanOccupancy": LoanOcc,
                      "LoanPurpose" : LoanPurp,
                      "EarliestDate" : LoanEarliestClose,
                      "LatestDate" : LoanLatestClose,
                      "MinDaysClosed" : MinDaysClosed
                     }
        });
        console.dir(JSON.stringify(f.getParams()));
        console.dir(JSON.stringify(f.getParams().formData));
        console.log('formData Params: ' + f.getParams().formData);
        console.log('formData Earliest: ' + f.getParams().formData.EarliestDate);
        f.fire();

    },

    handleTypeChange: function(component, event, helper) {
		component.set("v.selectedLoanType", component.find("loanType").get("v.value"));
        console.log('selected loan type: ' + component.get('v.selectedLoanType'));
    },
    
    handlePurposeChange: function(component, event, helper) {
		component.set("v.selectedPurpose", component.find("loanPurpose").get("v.value"));
        console.log('selected purpose: ' + component.get('v.selectedPurpose'));
    },
    
    handleLOChange: function(component, event, helper) {
		component.set("v.selectedOriginator", component.find("loanOriginator").get("v.value"));
        console.log('selected originator: ' + component.get('v.selectedOriginator'));
    },
    
    handleOccChange: function(component, event, helper) {
		component.set("v.selectedOccupancy", component.find("loanOccupancy").get("v.value"));
        console.log('selected occupancy: ' + component.get('v.selectedOccupancy'));
    },
    
    handleLoanProgramChange: function(component, event, helper) {
		component.set("v.selectedLoanProgram", component.find("loanProgram").get("v.value"));
        console.log('selected loan program: ' + component.get('v.selectedLoanProgram'));
    },
    
})