/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 08-16-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public class ContactTriggerHandler {
    public static void calcRate(List<Contact> contacts) {
        // first calc payment
        for(Contact l : contacts) {
            System.debug('### caRate_Scenario_1__c: ' + l.Rate_Scenario_1__c);
            System.debug('### Term_Due_Scenario_1__c: ' + l.Term_Due_Scenario_1__c);
            System.debug('### First_Loan_Amount_Scenario_1__c: ' + l.First_Loan_Amount_Scenario_1__c);
            System.debug('### TotalFeesS1__c: ' + l.TotalFeesS1__c);
            if(l.Term_Due_Scenario_1__c != NULL && l.Rate_Scenario_1__c != NULL && l.TotalFeesS1__c != NULL && l.First_Loan_Amount_Scenario_1__c != NULL) {
                Double ir = (l.Rate_Scenario_1__c/100 )/ 12;
                Double np = l.Term_Due_Scenario_1__c * 12;
                Double pv = l.First_Loan_Amount_Scenario_1__c /*+ l.TotalFeesS1__c*/;
                Double fv = 0;
                Double type = 0;
                
                Double pmt, pvif;
                System.debug('### caRate_Scenario_1__c: ' + l.Rate_Scenario_1__c);
                System.debug('### Term_Due_Scenario_1__c: ' + l.Term_Due_Scenario_1__c);
                System.debug('### First_Loan_Amount_Scenario_1__c: ' + l.First_Loan_Amount_Scenario_1__c);
                System.debug('### TotalFeesS1__c: ' + l.TotalFeesS1__c);
                
                if (ir == 0) {
                    l.PaymentResultS1__c = -(pv + fv)/np;
                    break;
                }
                
                pvif = Math.pow ( (1 + ir), np );
                pmt = - ir * (pv * pvif + fv) / (pvif - 1);
                System.debug('### calc pmt: ' + pmt);
                if (type == 1) pmt = pmt / (1 + ir);
                l.PaymentResultS1__c = pmt;
            }
        }
        
        // do rate calc
        for(Contact l : contacts) {
            System.debug('### UFMIPFFS1__c: ' + l.UFMIPFFS1__c);
            System.debug('### PaymentResultS1__c: ' + l.PaymentResultS1__c);
            System.debug('### TotalFeesS1__c: ' + l.TotalFeesS1__c);
            System.debug('### EstimatedMortgageInsuranceScenario1__c: ' + l.EstimatedMortgageInsuranceScenario1__c);
            System.debug('### CancelMIAtS1__c: ' + l.CancelMIAtS1__c);
            if(l.PaymentResultS1__c != null && l.UFMIPFFS1__c != null && l.TotalFeesS1__c != null && l.EstimatedMortgageInsuranceScenario1__c != null && l.CancelMIAtS1__c != null) {
                Double guess = .01;
                Double future = 0;
                Double type = 0;
                Double periods = l.Term_Due_Scenario_1__c * 12;
                Double payment = l.PaymentResultS1__c - ( l.EstimatedMortgageInsuranceScenario1__c - l.CancelMIAtS1__c);
                Double present = l.First_Loan_Amount_Scenario_1__c - l.UFMIPFFS1__c - l.TotalFeesS1__c;
                
                Double epsMax = 0.00004539992;
                Integer iterMax = 20;
                
                Double y = 0, y0 = 0, y1 = 0, x0 = 0, x1 = 0, f = 0;
                Integer i = 0;
                Double rate = guess;
                
                if (Math.abs(rate) < epsMax) {
                    y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
                } else {
                    f = Math.exp(periods * Math.log(1 + rate));
                    y = present * f + payment * (1 / rate + type) * (f - 1) + future;
                }
                y0 = present + payment * periods + future;
                y1 = present * f + payment * (1 / rate + type) * (f - 1) + future;
                i = 0; 
                x0 = 0;
                x1 = rate;
                System.debug('### y0: ' + y0);
                System.debug('### y1: ' + y1);
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
                System.debug('### rate: ' + rate);
                
                l.APRScenario1__c = (rate * 12);
                
                
            }
            
        }
    }
    public static void calcRate2(List<Contact> contacts) {
        // first calc payment
        for(Contact l : contacts) {
            System.debug('### caRateScenario2__c: ' + l.RateScenario2__c);
            System.debug('### Term_Due_Scenario_2__c: ' + l.Term_Due_Scenario_2__c);
            System.debug('### First_Loan_Amount_Scenario_2__c: ' + l.First_Loan_Amount_Scenario_2__c);
            System.debug('### TotalFeesS2__c: ' + l.TotalFeesS2__c);
            if(l.Term_Due_Scenario_2__c != NULL && l.RateScenario2__c != NULL && l.TotalFeesS2__c != NULL && l.First_Loan_Amount_Scenario_2__c != NULL) {
                Double ir = (l.RateScenario2__c/100 )/ 12;
                Double np = l.Term_Due_Scenario_2__c * 12;
                Double pv = l.First_Loan_Amount_Scenario_2__c /*+ l.TotalFeesS2__c*/;
                Double fv = 0;
                Double type = 0;
                
                Double pmt, pvif;
                System.debug('### caRateScenario2__c: ' + l.RateScenario2__c);
                System.debug('### Term_Due_Scenario_2__c: ' + l.Term_Due_Scenario_2__c);
                System.debug('### First_Loan_Amount_Scenario_2__c: ' + l.First_Loan_Amount_Scenario_2__c);
                System.debug('### TotalFeesS2__c: ' + l.TotalFeesS2__c);
                
                if (ir == 0) {
                    l.PaymentResultS2__c = -(pv + fv)/np;
                    break;
                }
                
                pvif = Math.pow ( (1 + ir), np );
                pmt = - ir * (pv * pvif + fv) / (pvif - 1);
                System.debug('### calc pmt: ' + pmt);
                if (type == 1) pmt = pmt / (1 + ir);
                l.PaymentResultS2__c = pmt;
            }
        }
        
        // do rate calc
        for(Contact l : contacts) {
            System.debug('### UFMIPFFS2__c: ' + l.UFMIPFFS2__c);
            System.debug('### PaymentResultS2__c: ' + l.PaymentResultS2__c);
            System.debug('### TotalFeesS2__c: ' + l.TotalFeesS2__c);
            System.debug('### EstimatedMortgageInsuranceScenario2__c: ' + l.EstimatedMortgageInsuranceScenario2__c);
            System.debug('### CancelMIAtS2__c: ' + l.CancelMIAtS2__c);
            if(l.PaymentResultS2__c != null && l.UFMIPFFS2__c != null && l.TotalFeesS2__c != null && l.EstimatedMortgageInsuranceScenario2__c != null && l.CancelMIAtS2__c != null) {
                Double guess = .01;
                Double future = 0;
                Double type = 0;
                Double periods = l.Term_Due_Scenario_2__c * 12;
                Double payment = l.PaymentResultS2__c - ( l.EstimatedMortgageInsuranceScenario2__c - l.CancelMIAtS2__c);
                Double present = l.First_Loan_Amount_Scenario_2__c - l.UFMIPFFS2__c - l.TotalFeesS2__c;
                
                Double epsMax = 0.00004539992;
                Integer iterMax = 20;
                
                Double y = 0, y0 = 0, y1 = 0, x0 = 0, x1 = 0, f = 0;
                Integer i = 0;
                Double rate = guess;
                
                if (Math.abs(rate) < epsMax) {
                    y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
                } else {
                    f = Math.exp(periods * Math.log(1 + rate));
                    y = present * f + payment * (1 / rate + type) * (f - 1) + future;
                }
                y0 = present + payment * periods + future;
                y1 = present * f + payment * (1 / rate + type) * (f - 1) + future;
                i = 0; 
                x0 = 0;
                x1 = rate;
                System.debug('### y0: ' + y0);
                System.debug('### y1: ' + y1);
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
                System.debug('### rate: ' + rate);
                
                l.APRScenario2__c = (rate * 12);
                
                
            }
            
        }
    }
    public static void calcRate3(List<Contact> contacts) {
        // first calc payment
        for(Contact l : contacts) {
            System.debug('### caRateScenario3__c: ' + l.RateScenario3__c);
            System.debug('### Term_Due_Scenario_3__c: ' + l.Term_Due_Scenario_3__c);
            System.debug('### First_Loan_Amount_Scenario_3__c: ' + l.First_Loan_Amount_Scenario_3__c);
            System.debug('### TotalFeesS3__c: ' + l.TotalFeesS3__c);
            if(l.Term_Due_Scenario_3__c != NULL && l.RateScenario3__c != NULL && l.TotalFeesS3__c != NULL && l.First_Loan_Amount_Scenario_3__c != NULL) {
                Double ir = (l.RateScenario3__c/100 )/ 12;
                Double np = l.Term_Due_Scenario_3__c * 12;
                Double pv = l.First_Loan_Amount_Scenario_3__c /*+ l.TotalFeesS3__c*/;
                Double fv = 0;
                Double type = 0;
                
                Double pmt, pvif;
                System.debug('### caRateScenario3__c: ' + l.RateScenario3__c);
                System.debug('### Term_Due_Scenario_3__c: ' + l.Term_Due_Scenario_3__c);
                System.debug('### First_Loan_Amount_Scenario_3__c: ' + l.First_Loan_Amount_Scenario_3__c);
                System.debug('### TotalFeesS3__c: ' + l.TotalFeesS3__c);
                
                if (ir == 0) {
                    l.PaymentResultS3__c = -(pv + fv)/np;
                    break;
                }
                
                pvif = Math.pow ( (1 + ir), np );
                pmt = - ir * (pv * pvif + fv) / (pvif - 1);
                System.debug('### calc pmt: ' + pmt);
                if (type == 1) pmt = pmt / (1 + ir);
                l.PaymentResultS3__c = pmt;
            }
        }
        
        // do rate calc
        for(Contact l : contacts) {
            System.debug('### UFMIPFFS3__c: ' + l.UFMIPFFS3__c);
            System.debug('### PaymentResultS3__c: ' + l.PaymentResultS3__c);
            System.debug('### TotalFeesS3__c: ' + l.TotalFeesS3__c);
            System.debug('### EstimatedMortgageInsuranceScenario3__c: ' + l.EstimatedMortgageInsuranceScenario3__c);
            System.debug('### CancelMIAtS3__c: ' + l.CancelMIAtS3__c);
            if(l.PaymentResultS3__c != null && l.UFMIPFFS3__c != null && l.TotalFeesS3__c != null && l.EstimatedMortgageInsuranceScenario3__c != null && l.CancelMIAtS3__c != null) {
                Double guess = .01;
                Double future = 0;
                Double type = 0;
                Double periods = l.Term_Due_Scenario_3__c * 12;
                Double payment = l.PaymentResultS3__c - ( l.EstimatedMortgageInsuranceScenario3__c - l.CancelMIAtS3__c);
                Double present = l.First_Loan_Amount_Scenario_3__c - l.UFMIPFFS3__c - l.TotalFeesS3__c;
                
                Double epsMax = 0.00004539992;
                Integer iterMax = 20;
                
                Double y = 0, y0 = 0, y1 = 0, x0 = 0, x1 = 0, f = 0;
                Integer i = 0;
                Double rate = guess;
                
                if (Math.abs(rate) < epsMax) {
                    y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
                } else {
                    f = Math.exp(periods * Math.log(1 + rate));
                    y = present * f + payment * (1 / rate + type) * (f - 1) + future;
                }
                y0 = present + payment * periods + future;
                y1 = present * f + payment * (1 / rate + type) * (f - 1) + future;
                i = 0; 
                x0 = 0;
                x1 = rate;
                System.debug('### y0: ' + y0);
                System.debug('### y1: ' + y1);
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
                System.debug('### rate: ' + rate);
                
                l.APRScenario3__c = (rate * 12);
                
                
            }
            
        }
    }
    
}