/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 08-16-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public class LeadTriggerHandler {
    public static void pushLeadsToRcaAPI(List<Lead> leadList, Map<Id, Lead> oldLeadsMap){
        Set<Id> updateLeadIds = new Set<Id>();
        Set<Id> insertLeadIds = new Set<id>();
        for(Lead leadRec : leadList){
            if(oldLeadsMap != null){
                Lead oldLeadRec = oldLeadsMap.get(leadRec.Id);
                if(leadRec.LeadSource == 'Lower My Bills' || leadRec.LeadSource == 'Refily'){// && oldLeadRec.LeadSource != leadRec.LeadSource
                    updateLeadIds.add(leadRec.Id);
                }
            }else{
                if(leadRec.LeadSource == 'Lower My Bills' || leadRec.LeadSource == 'Refily'){
                    insertLeadIds.add(leadRec.Id);
                }
            }
        }
        if(!updateLeadIds.isEmpty() && !System.isFuture() && !System.isBatch()){
            //postLeadsToRca(updateLeadIds, 'PATCH');
        }

        if(!insertLeadIds.isEmpty() && !System.isFuture() && !System.isBatch()){
            //postLeadsToRca(insertLeadIds, 'POST');
        }
    }

    @future(callout=true)
    public static void postLeadsToRca(Set<Id> leadIds, String verb){
        LeadApi__c leadApi = LeadApi__c.getOrgDefaults();
        List<Lead> leads = [SELECT Id, PartnerLeadId__c, Salutation, FirstName, MiddleName, LastName, Suffix,
                                Title, Street, City, LMB_Mailing_St__c, Company, Country, PostalCode, Email, Phone, MobilePhone,
                                Website, CampaignName__c, LeadSource, LoanDesignation__c, LeadNote__c, UpdateStatus__c, LeadAge__c, ExpirationDate__c, 
                                AnnualSavings__c, HasTCPAConsent__c, CreatedDate
                                FROM Lead WHERE Id =: leadIds];

        if(!leads.isEmpty()){
            List<Lead> updateLeadsList = new List<Lead>();
            for(Lead leadRec : leads){
            List<RequestBodyHandler> reqBody = new List<RequestBodyHandler>{constructReqBody(leadRec)};
                                
            Http http = new Http();
            HttpRequest httpReq = new HttpRequest();
            HttpResponse httpRes = new HttpResponse();
            httpReq.setMethod(verb);
            httpReq.setEndPoint(leadApi.post_patch_endpoint__c);
            httpReq.setHeader('Content-Type', 'application/json');
            httpReq.setHeader('client_id', leadApi.client_id__c);
            httpReq.setHeader('client_secret', leadApi.client_secret__c);
            httpReq.setHeader('PartnerVendorID', leadApi.partner_vendorid__c);
            httpReq.setBody(JSON.serialize(reqBody));
            httpReq.setTimeout(20000);
            httpRes = http.send(httpReq);

            Lead updLead = new Lead(Id=leadRec.Id);
            updLead.RCA_Request_JSON__c = httpReq.getBody();
            updLead.RCA_Response_JSON__c = httpRes.getBody();
            updateLeadsList.add(updLead);
            }

            if(!updateLeadsList.isEmpty()){
                update updateLeadsList;
            }
        }
    }

    public static RequestBodyHandler constructReqBody(Lead leadRec){
        RequestBodyHandler reqBody = new RequestBodyHandler();
        if(isValid(leadRec.PartnerLeadId__c)){
            reqBody.PartnerLeadId = String.valueOf(leadRec.PartnerLeadId__c);
        }
        reqBody.Salutation = leadRec.Salutation;
        reqBody.FirstName = leadRec.FirstName;
        reqBody.MiddleName = leadRec.MiddleName;
        reqBody.LastName = leadRec.LastName;
        reqBody.Suffix = leadRec.Suffix;
        reqBody.Title = leadRec.Title;
        reqBody.Street = leadRec.Street;
        reqBody.City = leadRec.City;
        reqBody.State = leadRec.LMB_Mailing_St__c;
        reqBody.Company = leadRec.Company;
        reqBody.Country = leadRec.Country;
        reqBody.PostalCode = leadRec.PostalCode;
        reqBody.Email = leadRec.Email;
        reqBody.HomePhone = leadRec.Phone;
        reqBody.MobilePhone = leadRec.MobilePhone;
        reqBody.WorkPhone = leadRec.Phone;
        reqBody.Website = leadRec.Website;
        reqBody.CampaignName = leadRec.CampaignName__c;
        reqBody.LeadSource = leadRec.LeadSource;
        reqBody.LoanDesignation = leadRec.LoanDesignation__c;
        reqBody.LeadNote = leadRec.LeadNote__c;
        reqBody.UpdateStatus = LeadRec.UpdateStatus__c;
        if(isValid(leadRec.LeadAge__c)){
            reqBody.LeadAge = Integer.valueOf(leadRec.LeadAge__c);
        }

        if(isValid(leadRec.ExpirationDate__c)){
            reqBody.ExpirationDate = String.valueOf(leadRec.ExpirationDate__c);
        }

        if(isValid(leadRec.AnnualSavings__c)){
            reqBody.AnnualSavings = Integer.valueOf(leadRec.AnnualSavings__c);
        }

        if(isValid(leadRec.HasTCPAConsent__c)){
            reqBody.HasTCPAConsent = leadRec.HasTCPAConsent__c ? 'true' : 'false';
        }

        if(isValid(leadRec.CreatedDate)){
            reqBody.LeadCreateDate = String.valueOf(Date.valueOf(leadRec.CreatedDate));
        }
        return reqBody;
    }
    
    public static Boolean isValid(Object obj){
        Boolean isValid = false;
        if(obj instanceof String){
            if(obj != null && obj != ''){
                isValid = true;
            }
        }else{
            if(obj != null){
                isValid = true;
            }
        }
        return isValid;
    }

    public static void copyToScenario23 (List<Lead> leads){
        for (Lead l: leads){
            if(l.CopytoScenarios2and3__c){
                l.Loan_Program_Scenario_2__c =l.Loan_Program_Scenario_1__c;
                l.Term_Due_Scenario_2__c = l.Term_Due__c;
                l.DownPaymentScenario2__c=l.DownPaymentScenario1__c;
                l.First_Loan_Amount_Scenario_2__c=l.First_Loan_Amount_Scenario_1__c;
                l.Rate_Scenario_2__c=l.Rate_Scenario_1__c;
                l.DiscountCreditS2__c=l.DiscountCreditS1__c;
                l.LenderFeeS2__c=l.LenderFeeS1__c;
                l.AppraisalFeeS2__c=l.AppraisalFeeS1__c;
                l.CreditReportFeeS2__c=l.CreditReportFeeS1__c;
                l.EscrowFeesS2__c=l.EscrowFeesS1__c;
                l.TitleFeeS2__c=l.TitleFeeS1__c;
                l.RecordingFeeS2__c=l.RecordingFeeS1__c;
                l.EstimatedTaxesScenario2__c=l.EstimatedTaxesScenario1__c;
                l.EstimatedInsuranceScenario2__c=l.EstimatedInsuranceScenario1__c;
                l.EstimatedMortgageInsuranceScenario2__c=l.EstimatedMortgageInsuranceScenario1__c;
                l.EstimatedHOAScenario2__c=l.EstimatedHOAScenario1__c;

                
                l.Loan_Program_Scenario_3__c =l.Loan_Program_Scenario_1__c;
                l.Term_Due_Scenario_3__c = l.Term_Due__c;
                l.DownPaymentScenario3__c=l.DownPaymentScenario1__c;
                l.First_Loan_Amount_Scenario_3__c=l.First_Loan_Amount_Scenario_1__c;
                l.Rate_Scenario_3__c=l.Rate_Scenario_1__c;
                l.DiscountCreditS3__c=l.DiscountCreditS1__c;
                l.LenderFeeS3__c=l.LenderFeeS1__c;
                l.AppraisalFeeS3__c=l.AppraisalFeeS1__c;
                l.CreditReportFeeS3__c=l.CreditReportFeeS1__c;
                l.EscrowFeesS3__c=l.EscrowFeesS1__c;
                l.TitleFeeS3__c=l.TitleFeeS1__c;
                l.RecordingFeeS3__c=l.RecordingFeeS1__c;
                l.EstimatedTaxesScenario3__c=l.EstimatedTaxesScenario1__c;
                l.EstimatedInsuranceScenario3__c=l.EstimatedInsuranceScenario1__c;
                l.EstimatedMortgageInsuranceScenario3__c=l.EstimatedMortgageInsuranceScenario1__c;
                l.EstimatedHOAScenario3__c=l.EstimatedHOAScenario1__c;

                l.copytoScenarios2and3__c = false;


            }
        }

    }

    public static void calcEscrows(List<Lead> leads){
        for (Lead l: leads){
            l.EstimatedTaxesScenario1__c = (nz(l?.Scenarios_Tax_Percent__c)/100 * nz(l?.First_Loan_Amount_Scenario_1__c))/12;
            l.EstimatedTaxesScenario2__c = (nz(l?.Scenarios_Tax_Percent__c)/100 * nz(l?.First_Loan_Amount_Scenario_2__c))/12;
            l.EstimatedTaxesScenario3__c = (nz(l?.Scenarios_Tax_Percent__c)/100 * nz(l?.First_Loan_Amount_Scenario_3__c))/12; 

            l.EstimatedInsuranceScenario1__c = (nz(l?.Scenarios_Insurance__c)/100 * nz(l?.First_Loan_Amount_Scenario_1__c))/12;
            l.EstimatedInsuranceScenario2__c = (nz(l?.Scenarios_Insurance__c)/100 * nz(l?.First_Loan_Amount_Scenario_2__c))/12;
            l.EstimatedInsuranceScenario3__c = (nz(l?.Scenarios_Insurance__c)/100 * nz(l?.First_Loan_Amount_Scenario_3__c))/12;

            l.EstimatedMortgageInsuranceScenario1__c = (nz(l?.Scenarios_MI_Percent__c)/100 * nz(l?.First_Loan_Amount_Scenario_1__c))/12;
            l.EstimatedMortgageInsuranceScenario2__c = (nz(l?.Scenarios_MI_Percent__c)/100 * nz(l?.First_Loan_Amount_Scenario_2__c))/12;
            l.EstimatedMortgageInsuranceScenario3__c = (nz(l?.Scenarios_MI_Percent__c)/100 * nz(l?.First_Loan_Amount_Scenario_3__c))/12;

        }

    }

    public static decimal nz(decimal num){
        if(num==null) num=0;
        return num;
    }


    public static void calcRate(List<Lead> leads) {
        // first calc payment
        for(Lead l : leads) {
            System.debug('### caRate_Scenario_1__c: ' + l.Rate_Scenario_1__c);
            System.debug('### Term_Due__c: ' + l.Term_Due__c);
            System.debug('### First_Loan_Amount_Scenario_1__c: ' + l.First_Loan_Amount_Scenario_1__c);
            System.debug('### TotalFeesS1__c: ' + l.TotalFeesS1__c);
            if(l.Term_Due__c != NULL && l.Rate_Scenario_1__c != NULL && l.TotalFeesS1__c != NULL && l.First_Loan_Amount_Scenario_1__c != NULL) {
                Double ir = (l.Rate_Scenario_1__c/100 )/ 12;
                Double np = l.Term_Due__c * 12;
                Double pv = l.First_Loan_Amount_Scenario_1__c /*+ l.TotalFeesS1__c*/;
                Double fv = 0;
                Double type = 0;
                
                Double pmt, pvif;
                System.debug('### caRate_Scenario_1__c: ' + l.Rate_Scenario_1__c);
                System.debug('### Term_Due__c: ' + l.Term_Due__c);
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
        for(Lead l : leads) {
            System.debug('### UFMIPFFS1__c: ' + l.UFMIPFFS1__c);
            System.debug('### PaymentResultS1__c: ' + l.PaymentResultS1__c);
            System.debug('### TotalFeesS1__c: ' + l.TotalFeesS1__c);
            System.debug('### EstimatedMortgageInsuranceScenario1__c: ' + l.EstimatedMortgageInsuranceScenario1__c);
            System.debug('### CancelMIAtS1__c: ' + l.CancelMIAtS1__c);
            if(l.PaymentResultS1__c != null && l.UFMIPFFS1__c != null && l.TotalFeesS1__c != null && l.EstimatedMortgageInsuranceScenario1__c != null && l.CancelMIAtS1__c != null) {
                Double guess = .01;
                Double future = 0;
                Double type = 0;
                Double periods = l.Term_Due__c * 12;
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
    public static void calcRate2(List<Lead> leads) {
        // first calc payment
        for(Lead l : leads) {
            System.debug('### caRate_Scenario_2__c: ' + l.Rate_Scenario_2__c);
            System.debug('### Term_Due_Scenario_2__c: ' + l.Term_Due_Scenario_2__c);
            System.debug('### First_Loan_Amount_Scenario_2__c: ' + l.First_Loan_Amount_Scenario_2__c);
            System.debug('### TotalFeesS2__c: ' + l.TotalFeesS2__c);
            if(l.Term_Due_Scenario_2__c != NULL && l.Rate_Scenario_2__c != NULL && l.TotalFeesS2__c != NULL && l.First_Loan_Amount_Scenario_2__c != NULL) {
                Double ir = (l.Rate_Scenario_2__c/100 )/ 12;
                Double np = l.Term_Due_Scenario_2__c * 12;
                Double pv = l.First_Loan_Amount_Scenario_2__c /*+ l.TotalFeesS2__c*/;
                Double fv = 0;
                Double type = 0;
                
                Double pmt, pvif;
                System.debug('### caRate_Scenario_2__c: ' + l.Rate_Scenario_2__c);
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
        for(Lead l : leads) {
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
    public static void calcRate3(List<Lead> leads) {
        // first calc payment
        for(Lead l : leads) {
            System.debug('### caRate_Scenario_3__c: ' + l.Rate_Scenario_3__c);
            System.debug('### Term_Due_Scenario_3__c: ' + l.Term_Due_Scenario_3__c);
            System.debug('### First_Loan_Amount_Scenario_3__c: ' + l.First_Loan_Amount_Scenario_3__c);
            System.debug('### TotalFeesS3__c: ' + l.TotalFeesS3__c);
            if(l.Term_Due_Scenario_3__c != NULL && l.Rate_Scenario_3__c != NULL && l.TotalFeesS3__c != NULL && l.First_Loan_Amount_Scenario_3__c != NULL) {
                Double ir = (l.Rate_Scenario_3__c/100 )/ 12;
                Double np = l.Term_Due_Scenario_3__c * 12;
                Double pv = l.First_Loan_Amount_Scenario_3__c /*+ l.TotalFeesS3__c*/;
                Double fv = 0;
                Double type = 0;
                
                Double pmt, pvif;
                System.debug('### caRate_Scenario_3__c: ' + l.Rate_Scenario_3__c);
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
        for(Lead l : leads) {
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

    public class RequestBodyHandler{
        public String PartnerLeadId;
        public String Salutation;
        public String FirstName;
        public String MiddleName;
        public String LastName;
        public String Suffix;
        public String Title;
        public String Street;
        public String City;
        public String State;
        public String Company;
        public String Country;
        public String PostalCode;
        public String Email;
        public String HomePhone;
        public String MobilePhone;
        public String WorkPhone;
        public String Website;
        public String CampaignName;
        public String LeadSource;
        public String UpdateStatus;
        public String LoanDesignation;
        public String LeadNote;
        public Integer LeadAge;
        public String ExpirationDate;
        public Integer AnnualSavings;
        public String HasTCPAConsent;
        public String LeadCreateDate;
    }
   
}