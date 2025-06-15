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
    
    calculateMonthlyPmt : function(component, rate, loanAmt, terms){
		var pmt = rate/1200;
        var topNum = pmt*loanAmt;
        var bottomNumA = (1 + pmt);
        var bottomNumB = Math.pow(bottomNumA,-(terms*12)); 
        var bottomNumC = (1-bottomNumB);
        var finalResult = topNum/bottomNumC;
        console.log("final result: " + finalResult);
        return finalResult;
      
    }
})