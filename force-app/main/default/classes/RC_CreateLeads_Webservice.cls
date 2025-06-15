@RestResource(urlMapping='/createnewlead')
global without sharing class RC_CreateLeads_Webservice {
    
    @HttpGet
    global static String getLead() {
        // query for lead and return
        try {
        String PartnerLeadId = RestContext.request.params.get('PartnerLeadId');
        Lead leadrec = [SELECT Id, Salutation, FirstName, MiddleName, LastName From LEAD WHERE PartnerLeadId__c = :PartnerLeadId];
        return String.valueOf(leadrec);
        }
        catch(exception e) {
            return e.getMessage();
        }
    }
    
    // The endpoint will be this: https://proposals-solidify.cs203.force.com/leads/services/apexrest/createnewlead?name=test&key_1=sadfsda
    // plus whatever other parameters they want at the end 
    // this will change when you move environments
    // see "Lead Generation" custom site in setup
    @HttpPost
    global static String createLead() {
        try {
            // grab additional field from the key value pairs in the params
            String PartnerLeadId = RestContext.request.params.get('PartnerLeadId');
            String Salutation = RestContext.request.params.get('Salutation');
            String FirstName = RestContext.request.params.get('FirstName');
            String MiddleName = RestContext.request.params.get('MiddleName');
        	String LastName = RestContext.request.params.get('LastName');
            String Suffix = RestContext.request.params.get('Suffix');
            String Title = RestContext.request.params.get('Title');
            String Street = RestContext.request.params.get('Street');
            String City = RestContext.request.params.get('City');
            String State = RestContext.request.params.get('State');
            String Company = RestContext.request.params.get('Company');
            String Country = RestContext.request.params.get('Country');
            String PostalCode = RestContext.request.params.get('PostalCode');
            String Email = RestContext.request.params.get('Email');
            String Phone = RestContext.request.params.get('HomePhone');
            String MobilePhone = RestContext.request.params.get('MobilePhone');
            String BusinessPhone = RestContext.request.params.get('WorkPhone');
            String Website = RestContext.request.params.get('Website');
            String CampaignName = RestContext.request.params.get('CampaignName');
            String LeadSource = RestContext.request.params.get('LeadSource');
            String LoanDesignation = RestContext.request.params.get('LoanDesignation');
            String Disposition = RestContext.request.params.get('Disposition');
            String FirstTimeHomeBuyer = RestContext.request.params.get('FirstTimeHomeBuyer');
            String CurrentProgramRateBalance = RestContext.request.params.get('CurrentProgramRateBalance');
            String CreditScore = RestContext.request.params.get('CreditScore');
            String CashoutOrRefi = RestContext.request.params.get('CashoutOrRefi');
            String Military = RestContext.request.params.get('Military');
            String PriceRange = RestContext.request.params.get('PriceRange');
            String RCDisposition = RestContext.request.params.get('RCDisposition');
            String LeadNote = RestContext.request.params.get('LeadNote');
            String Occupancy = RestContext.request.params.get('Occupancy');
            //String UpdateStatus = RestContext.request.params.get('UpdateStatus');
            Decimal CurrentRate = (RestContext.request.params.get('CurrentRate') != null) ? Decimal.valueOf(RestContext.request.params.get('CurrentRate')) : null;
            Decimal CurrentBalance = (RestContext.request.params.get('CurrentBalance') != null) ? Decimal.valueOf(RestContext.request.params.get('CurrentBalance')) : null;
            String CurrentProgram = RestContext.request.params.get('CurrentProgram');
            String Veteran = RestContext.request.params.get('Veteran');
            String LeadAge = RestContext.request.params.get('LeadAge');
            //Decimal LeadAge = (RestContext.request.params.get('LeadAge') != null) ? Decimal.valueOf(RestContext.request.params.get('LeadAge')) : null;
            Date ExpirationDate = (RestContext.request.params.get('ExpirationDate') != null) ? Date.valueOf(RestContext.request.params.get('ExpirationDate')) : null;
            Decimal AnnualSavings = (RestContext.request.params.get('AnnualSavings') != null) ? Decimal.valueOf(RestContext.request.params.get('AnnualSavings')) : null;
            Boolean HasTCPAConsent = (RestContext.request.params.get('HasTCPAConsent') != null) ? Boolean.valueOf(RestContext.request.params.get('HasTCPAConsent')) : false;

            Lead l = new Lead();
            
            System.debug('@@@PartnerLeadId: ' + PartnerLeadId);
            if(isValid(PartnerLeadId)){
                l.PartnerLeadId__c = PartnerLeadId;
            }
			
            System.debug('@@@Salutation: ' + Salutation);
            if(isValid(Salutation)){
                l.Salutation = Salutation;
            }

            if(isValid(FirstName)){
                l.FirstName = FirstName;
            }

            if(isValid(MiddleName)){
                l.MiddleName = MiddleName;
            }

            if(isValid(LastName)){
                l.LastName = LastName;
            }

            if(isValid(Suffix)){
                l.Suffix = Suffix;
            }

            if(isValid(Title)){
                l.Title = Title;
            }

            if(isValid(Street)){
                l.Street = Street;
            }

            if(isValid(City)){
                l.City = City;
            }

            if(isValid(State)){
                l.State = State;
            }

            if(isValid(Company)){
                l.Employer__c = Company;
            }

            if(isValid(Country)){
                l.Country = Country;
            }

            if(isValid(PostalCode)){
                l.PostalCode = PostalCode;
            }

            if(isValid(Email)){
                l.Email = Email;
            }

            if(isValid(Phone)){
                l.Phone = Phone;
            }

            if(isValid(MobilePhone)){
                l.MobilePhone = MobilePhone;
            }

            if(isValid(BusinessPhone)){
                l.Business_Phone__c = BusinessPhone;
            }

            if(isValid(Website)){
                l.Website = Website;
            }

            if(isValid(CampaignName)){
                l.CampaignName__c = CampaignName;
            }

            if(isValid(LeadSource)){
                l.LeadSource = LeadSource;
            }

            if(isValid(LoanDesignation)){
                l.LoanDesignation__c = LoanDesignation;
            }

            if(isValid(Disposition)){
                l.Disposition__c = Disposition;
            }

            if(isValid(FirstTimeHomeBuyer)){
                l.First_Time_Homebuyer__c = FirstTimeHomeBuyer;
            }

            if(isValid(CurrentProgramRateBalance)){
                l.CurrentProgramRateBalance__c = CurrentProgramRateBalance;
            }

            if(isValid(CreditScore)){
                l.Self_Reported_Credit__c = CreditScore;
            }

            if(isValid(CashoutOrRefi)){
                l.Purpose__c = CashoutOrRefi;
            }

            if(isValid(Military)){
                l.Veteran__c = Military;
            }

            if(isValid(PriceRange)){
                l.Price_Value_Range__c = PriceRange;
            }

            if(isValid(RCDisposition)){
                l.RCDisposition__c = RCDisposition;
            }

            if(isValid(LeadNote)){
                l.LeadNote__c = LeadNote;
            }
            
            if(isValid(Occupancy)){
                l.Occupancy__c = Occupancy;
            }
            
            /*if(isValid(UpdateStatus)){
                l.UpdateStatus__c = UpdateStatus;
            }*/
            
            if(isValid(CurrentProgram)){
                l.Current_Program__c = CurrentProgram;
            }
            
            if(isValid(CurrentRate)){
                l.Current_Rate__c = CurrentRate;
            }
            
            if(isValid(CurrentBalance)){
                l.Current_Balance__c = CurrentBalance;
            }
            
            if(isValid(Veteran)){
                l.Veteran__c = Veteran;
            }

            if(isValid(LeadAge)){
                l.LeadAgeText__c = LeadAge;
            }

            if(isValid(ExpirationDate)){
                l.ExpirationDate__c = ExpirationDate;
            }

            if(isValid(HasTCPAConsent)){
                l.HasTCPAConsent__c = HasTCPAConsent;
            }

            upsert l PartnerLeadId__c;
            return 'Success';    
        } catch(exception e) {
            return e.getMessage();
        }
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
}