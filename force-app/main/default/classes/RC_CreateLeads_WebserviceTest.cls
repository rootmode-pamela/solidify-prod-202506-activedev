@isTest
private class RC_CreateLeads_WebserviceTest {
    @isTest static void createSfLeadGet(){
        RestRequest req = new RestRequest();
        RestResponse res = new RestResponse();
        req.requestURI = '/leads/services/apexrest/createnewlead?Salutation=Mr.&FirstName=John&MiddleName=Micheal&LastName=Smith&Suffix=Jr.&Title=Developer&Street=123 Market Street&City=San Jose&State=CA&Company=Test Company&Country=USA&PostalCode=95008&Email=test@test.com&HomePhone=408-213-3333&MobilePhone=408-213-3333&WorkPhone=408-213-3333&Website=Test.com&CampaignName=TestCampaign&LeadSource=Website&LoanDesignation=Refinance&LeadNote=Lead Signed Up on Website&PartnerLeadId=12345&LeadAge=25&ExpirationDate=2020-12-12&AnnualSavings=20000&HasTCPAConsent=true';
        req.httpMethod = 'GET';
        
        RestContext.request = req;
        RestContext.response= res;
        
        Test.startTest();
        RC_CreateLeads_Webservice.getLead();
        Test.stopTest();
    }

    @isTest static void createSfLeadPost(){
        RestRequest req = new RestRequest();
        RestResponse res = new RestResponse();
        req.requestURI = '/leads/services/apexrest/createnewlead?Salutation=Mr.&FirstName=John&MiddleName=Micheal&LastName=Smith&Suffix=Jr.&Title=Developer&Street=123 Market Street&City=San Jose&State=CA&Company=Test Company&Country=USA&PostalCode=95008&Email=test@test.com&HomePhone=408-213-3333&MobilePhone=408-213-3333&WorkPhone=408-213-3333&Website=Test.com&CampaignName=TestCampaign&LeadSource=Website&LoanDesignation=Refinance&LeadNote=Lead Signed Up on Website&PartnerLeadId=12345&LeadAge=25&ExpirationDate=2020-12-12&AnnualSavings=20000&HasTCPAConsent=true';
        req.httpMethod = 'POST';
        req.params.put('Salutation', 'Mr');
        req.params.put('FirstName', 'John');
        req.params.put('MiddleName', 'Micheal');
        req.params.put('LastName', 'Smith');
        req.params.put('Suffix', 'Jr.');
        req.params.put('Title', 'Developer');
        req.params.put('Street', '123 Market Street');
        req.params.put('City', 'San Jose');
        req.params.put('State', 'CA');
        req.params.put('Company', 'Test Company');
        req.params.put('Country', 'USA');
        req.params.put('PostalCode', '95008');
        req.params.put('Email', 'test@test.com');
        req.params.put('HomePhone', '408-213-3333');
        req.params.put('MobilePhone', '408-213-3333');
        req.params.put('WorkPhone', '408-213-3333');
        req.params.put('Website', 'Test.com');
        req.params.put('CampaignName', 'TestCampaign');
        req.params.put('LeadSource', 'Website');
        req.params.put('LoanDesignation', 'Refinance');
        req.params.put('LeadNote', 'Lead Signed Up on Website');
        req.params.put('PartnerLeadId', '12345');
        req.params.put('LeadAge', '25');
        req.params.put('ExpirationDate', '2020-12-12');
        req.params.put('AnnualSavings', '20000');
        req.params.put('HasTCPAConsent', 'true');

        RestContext.request = req;
        RestContext.response= res;
        
        Test.startTest();
        RC_CreateLeads_Webservice.createLead();
        Test.stopTest();
    }
}