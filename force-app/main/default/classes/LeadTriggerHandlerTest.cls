@isTest
private class LeadTriggerHandlerTest {
    @testSetup static void setup() {
        LeadApi__c ld_Api = new LeadApi__c();
        ld_Api.post_patch_endpoint__c = 'https://apibeta.rockfin.com/rccx-lead-submission-proxy/leads';
        ld_Api.client_secret__c = '3434323Fe';
        ld_Api.client_id__c = '8425705E';
        ld_Api.partner_vendorid__c = 'a01g0000008JYACAA5';
        insert ld_Api;
    }

    @isTest static void onCreateApi(){
        Test.startTest();

        StaticResourceCalloutMock mock = new StaticResourceCalloutMock();
        mock.setStaticResource('LeadApiResp');
        mock.setStatusCode(200);
        mock.setHeader('Content-Type', 'application/json');

        Test.setMock(HttpCalloutMock.class, mock);

        Lead l = new Lead (LastName = 'Test', FirstName = 'Teddy');
        l.Status = 'New';
        l.LeadSource = 'LMB';
        l.Term_Due__c = 2;
        l.Rate_Scenario_1__c = 2;
        l.First_Loan_Amount_Scenario_1__c = 2;
        l.Term_Due_Scenario_2__c = 2;
        l.Rate_Scenario_2__c = 2;
        l.First_Loan_Amount_Scenario_2__c =2;
        l.PaymentResultS2__c = 2;
        l.UFMIPFFS2__c = .22;
        l.EstimatedMortgageInsuranceScenario2__c = 2; 
        l.CancelMIAtS2__c = 2;
        l.First_Loan_Amount_Scenario_3__c =2;
        l.PaymentResultS3__c = 2;
        l.UFMIPFFS3__c = .2;
        l.PaymentResultS3__c = 2;
        l.UFMIPFFS3__c = .2;
        l.EstimatedMortgageInsuranceScenario3__c = 2; 
        l.CancelMIAtS3__c = 2;
        l.Term_Due_Scenario_3__c = 2;
        l.Rate_Scenario_3__c = 2;
        l.First_Loan_Amount_Scenario_3__c =2;
        insert l;
        Set<id> leadIds = new Set<Id>();
        leadIds.add(l.id);
        LeadTriggerHandler.postLeadsToRca(leadIds, 'GET');
        Test.stopTest();
    }


}