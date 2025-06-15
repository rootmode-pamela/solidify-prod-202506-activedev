public with sharing class scenarioTriggerHandler {
    public static void beforeUpdate(List<scenario__c> newScenarios) {

        for(Scenario__c s: newScenarios){
            if(s.CopyToScenarios2And3__c){
                s.Purpose_Scenario_2__c =s.Purpose_Scenario_1__c;
                s.DownPaymentScenario2__c = s.DownPaymentScenario1__c;
                s.Loan_Program_Scenario_2__c=s.Loan_Program_Scenario_1__c;
                s.Term_Due_Scenario_2__c = s.Term_Due__c;
                s.First_Loan_Amount_Scenario_2__c = s.First_Loan_Amount_Scenario_1__c;
                s.Rate_Scenario_2__c = s.Rate_Scenario_1__c;
                s.EstimatedTaxesScenario2__c = s.EstimatedTaxesScenario1__c;
                s.EstimatedInsuranceScenario2__c = s.EstimatedInsuranceScenario1__c;
                s.EstimatedMortgageInsuranceScenario2__c =s.EstimatedMortgageInsuranceScenario1__c;
                s.EstimatedHOAScenario2__c = s.EstimatedHOAScenario1__c;
                s.DiscountCreditS2__c = s.DiscountCreditS1__c;
                s.LenderFeeS2__c = s.LenderFeeS1__c;
                s.AppraisalFeeS2__c = s.AppraisalFeeS1__c;
                s.CreditReportFeeS2__c = s.CreditReportFeeS1__c;
                s.EscrowFeesS2__c = s.EscrowFeesS1__c;
                s.TitleFeeS2__c = s.TitleFeeS1__c;
                s.RecordingFeeS2__c = s.RecordingFeeS1__c;

                s.Purpose_Scenario_3__c =s.Purpose_Scenario_1__c;
                s.DownPaymentScenario3__c = s.DownPaymentScenario1__c;
                s.Loan_Program_Scenario_3__c=s.Loan_Program_Scenario_1__c;
                s.Term_Due_Scenario_3__c = s.Term_Due__c;
                s.First_Loan_Amount_Scenario_3__c = s.First_Loan_Amount_Scenario_1__c;
                s.Rate_Scenario_3__c = s.Rate_Scenario_1__c;
                s.EstimatedTaxesScenario3__c = s.EstimatedTaxesScenario1__c;
                s.EstimatedInsuranceScenario3__c = s.EstimatedInsuranceScenario1__c;
                s.EstimatedMortgageInsuranceScenario3__c =s.EstimatedMortgageInsuranceScenario1__c;
                s.EstimatedHOAScenario3__c = s.EstimatedHOAScenario1__c;
                s.DiscountCreditS3__c = s.DiscountCreditS1__c;
                s.LenderFeeS3__c = s.LenderFeeS1__c;
                s.AppraisalFeeS3__c = s.AppraisalFeeS1__c;
                s.CreditReportFeeS3__c = s.CreditReportFeeS1__c;
                s.EscrowFeesS3__c = s.EscrowFeesS1__c;
                s.TitleFeeS3__c = s.TitleFeeS1__c;
                s.RecordingFeeS3__c = s.RecordingFeeS1__c;

                s.CopyToScenarios2And3__c = false;
            }
        }

    }
}