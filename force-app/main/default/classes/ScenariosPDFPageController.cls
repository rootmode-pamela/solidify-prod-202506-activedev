/************************************************************************************************************
* @description : Controller of ScenariosPDFPage
* @author      : Capital S
* @date        : 2021-04-13
* **********************************************************************************************************/
public class ScenariosPDFPageController {
    public Lead leadRecord{get;set;}
    public Boolean isRefinance{get;set;}
    public String leftTableWidth{get;set;}
    public String rightTableWidth{get;set;}
    
    public ScenariosPDFPageController() {
        String recordId = ApexPages.CurrentPage().getparameters().get('id');
        leftTableWidth = 'width:0%';
        rightTableWidth = 'width:100%';
        isRefinance = false;

        if(!String.isEmpty(recordId)){
            leadRecord = [SELECT Id,Purpose__c,Occupancy__c,Subject_Property_Type__c,Number_of_Units__c,
            Estimated_Value__c,Current_Program__c,Current_Balance__c,Current_Rate__c,Current_Payment__c,
            Purpose_Scenario_1__c,Purpose_Scenario_2__c,Purpose_Scenario_3__c,
            Loan_Program_Scenario_1__c,Loan_Program_Scenario_2__c,Loan_Program_Scenario_3__c,
            Term_Due__c,Term_Due_Scenario_2__c,Term_Due_Scenario_3__c,
            First_Loan_Amount_Scenario_1__c,First_Loan_Amount_Scenario_2__c,First_Loan_Amount_Scenario_3__c,
            Rate_Scenario_1__c,Rate_Scenario_2__c,Rate_Scenario_3__c,
            LTV_Scenario_1__c,LTV_Scenario_2__c,LTV_Scenario_3__c,
            CLTV_Scenario_1__c,CLTV_Scenario_2__c,CLTV_Scenario_3__c,
            Monthly_Payment__c,Monthly_Payment_Scenario_2__c,Monthly_Payment_Scenario_3__c,
            Total_Interest_Scenario_1__c,Total_Interest_Scenario_2__c,Total_Interest_Scenario_3__c,
            Monthly_Payment_Savings__c,Monthly_Payment_Savings_Scenario_2__c,Monthly_Payment_Savings_Scenario_3__c,
            Daily_Interest_Savings__c,Daily_Interest_Savings_Scenario_2__c,Daily_Interest_Savings_Scenario_3__c,
            On_Pace_Payment_Scenario_1__c,On_Pace_Payment_Scenario_2__c,On_Pace_Payment_Scenario_3__c,
            On_Pace_Savings_Scenario_1__c,On_Pace_Savings_Scenario_2__c,On_Pace_Savings_Scenario_3__c,
            Maturity_Reduction_Scenario_1__c,Maturity_Reduction_Scenario_2__c,Maturity_Reduction_Scenario_3__c,
            Lifetime_Savings_Scenario_1__c,Lifetime_Savings_Scenario_2__c,Lifetime_Savings_Scenario_3__c
            FROM Lead WHERE Id =:recordId];
            
            if(leadRecord.Purpose__c == 'Refinance' || leadRecord.Purpose__c == 'Refi_No_Cashout' || leadRecord.Purpose__c == 'Refi_Cashout'){
                isRefinance = true;
                leftTableWidth = 'width:30%';
                rightTableWidth = 'width:70%';
            }
        }
    }
}