({
    round: function (value, decimals) {
 		return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
	},
    
    nper: function (rate, payment, presentvalue, futurevalue, type) {
  	  	var type = (typeof type === 'undefined') ? 0 : type;
		var futurevalue = (typeof futurevalue === 'undefined') ? 0 : futurevalue;
        
		// Return number of periods
  		var num = payment * (1 + rate * type) - futurevalue * rate;
  		var den = (presentvalue * rate + payment * (1 + rate * type));
  		return Math.log(num / den) / Math.log(1 + rate)
	},
    
  /*  cumipmt: function (rate, nperiods, presentvalue, startperiod, endperiod, type) {
  		// Return error if invalid values
  		if (rate <= 0 || nperiods <= 0 || presentvalue <= 0) return '#NUM!';
		if (startperiod < 1 || endperiod < 1 || startperiod > endperiod) return '#NUM!';
		if (type !== 0 && type !== 1) return '#NUM!';
        console.log("rate: " + rate);
        console.log("nperiods " + nperiods);
        console.log("pv " + presentvalue);
        console.log("start " + startperiod);
        console.log("end " + endperiod);
        console.log("type " + type);
        
  		// Compute cumulative interest
  		var payment = this.pmt(rate, nperiods, presentvalue, 0, type);
        console.log("payment " + payment);
  		var interest = 0;
  		if(startperiod === 1) {
    		if(type === 0) {
      		interest = -presentvalue;
                console.log("start interest " + interest);
      		startperiod++;
    		}
  		}
  		for (var i = startperiod; i <= endperiod; i++) {
    		if (type === 1) {
      			interest += this.fv(rate, i - 2, payment, presentvalue, 1 ) - payment;
    		} else {
      			interest += this.fv(rate, i - 1, payment, presentvalue, 0 );
    		}
            console.log("fv " +this.fv(rate, i - 1, payment, presentvalue, 0 ) );
            console.log("int " + interest);
  		}
  		interest *= rate;
        	console.log("interest " + interest);
        
        

  		// Return cumulative interest
  		return interest;
	},
    
    */
    cumint: function (payment, rateperperiod, presentvalue, startperiod, endperiod) {
        console.log("cumint function");
        console.log("cumint args: " + payment + " " + rateperperiod + " " + presentvalue + " " + startperiod + " " + endperiod);
        var bal = presentvalue;
        var cuminterest = 0;
        var interest = 0;
        
        var i;
        for ( i = 1; i <= endperiod; i++){
            //calculate interest this period
            interest = rateperperiod*bal;
            bal = bal - (payment-interest);
            console.log(i + "interest: " + interest + " balance: " + bal + " cuminterest: " + cuminterest);
            if (i >= startperiod) {
            	cuminterest = cuminterest+interest;
            }
         }
            console.log(cuminterest);
            return cuminterest;     
    },
    
    
    fv: function(rate, nperiods, payment, presentvalue, type) {
       	presentvalue = presentvalue || 0;
  		type = type || 0;
        console.log("fv args: " + rate + " " + nperiods + " " + payment)

  		// Return future value
  		var result;
  		if (rate === 0) {
    		result = presentvalue + payment * nperiods;
  		} else {
    		var term = Math.pow(1 + rate, nperiods);
            console.log("term " + term);
    		if (type === 1) {
      			result = presentvalue * term + payment * (1 + rate) * (term - 1) / rate;
                 console.log("fvresult1: " + result);
        	} else {
      			result = presentvalue * term + payment * (term - 1) / rate;
                console.log("fvresult0: " + result);
    		}
  		}
  		return -result;
		},

	pmt: function(rate, nperiods, presentvalue, futurevalue, type) {
		futurevalue = futurevalue || 0;
  		type = type || 0;
        console.log(rate);

  		// Return payment
  		var result;
  		if (rate === 0) {
    		result = (presentvalue + futurevalue) / nperiods;
  		} else {
    		var term = Math.pow(1 + rate, nperiods);
    		if (type === 1) {
      			result = (futurevalue * rate / (term - 1) + presentvalue * rate / (1 - 1 / term)) / (1 + rate);
    		} else {
      			result = futurevalue * rate / (term - 1) + presentvalue * rate / (1 - 1 / term);
    		}
  		}
  		return result;
	},

    conv_number: function (expr, decplaces) { 
        // This function is from David Goodman's Javascript Bible.
		var str = "" + Math.round(expr * Math.pow(10,decplaces));
		while (str.length <= decplaces) {
			str = "0" + str;
		}
		var decpoint = str.length - decplaces;
		return (str.substring(0,decpoint) + "." + str.substring(decpoint,str.length));
	}

})