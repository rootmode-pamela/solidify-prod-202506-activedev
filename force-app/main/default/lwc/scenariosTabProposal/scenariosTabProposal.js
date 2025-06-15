import { LightningElement, api, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import PROPOSAL_OBJECT from '@salesforce/schema/Proposal__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getFieldValue, getRecord, updateRecord } from 'lightning/uiRecordApi';

import ProposalId_Field from '@salesforce/schema/Proposal__c.Id';
import Occupancy_Field from '@salesforce/schema/Proposal__c.Occupancy__c';
import Subject_Property_Type_Field from '@salesforce/schema/Proposal__c.Subject_Property_Type__c';
import Number_of_Units_Field from '@salesforce/schema/Proposal__c.Number_of_Units__c';
import Estimated_Value_Field from '@salesforce/schema/Proposal__c.Estimated_Value__c';
import Current_Program_Field from '@salesforce/schema/Proposal__c.Current_Program__c';
import Current_Balance_Field from '@salesforce/schema/Proposal__c.Current_Balance__c';
import Current_Rate_Field from '@salesforce/schema/Proposal__c.Current_Rate__c';
import Current_Payment_Field from '@salesforce/schema/Proposal__c.Current_Payment__c';
import Years_Remaining_on_Current_Loan_Field from '@salesforce/schema/Proposal__c.Years_Remaining_on_Current_Loan__c';
import Total_Interest_Remaining_on_Current_Loan_Field from '@salesforce/schema/Proposal__c.Total_Interest_Remaining_on_Current_Loan__c';

import PURPOSE_FIELD from '@salesforce/schema/Proposal__c.Purpose__c';

import Scenario1Name from '@salesforce/schema/Proposal__c.Scenario1Name__c';
import Scenario2Name from '@salesforce/schema/Proposal__c.Scenario2Name__c';
import Scenario3Name from '@salesforce/schema/Proposal__c.Scenario3Name__c';
import Purpose_S1 from '@salesforce/schema/Proposal__c.Purpose_Scenario_1__c';
import Purpose_S2 from '@salesforce/schema/Proposal__c.Purpose_Scenario_2__c';
import Purpose_S3 from '@salesforce/schema/Proposal__c.Purpose_Scenario_3__c';
import DownPaymentScenario1 from '@salesforce/schema/Proposal__c.DownPaymentScenario1__c';
import DownPaymentScenario2 from '@salesforce/schema/Proposal__c.DownPaymentScenario2__c';
import DownPaymentScenario3 from '@salesforce/schema/Proposal__c.DownPaymentScenario3__c';
import Loan_Program_S1 from '@salesforce/schema/Proposal__c.Loan_Program_Scenario_1__c';
import Loan_Program_S2 from '@salesforce/schema/Proposal__c.Loan_Program_Scenario_2__c';
import Loan_Program_S3 from '@salesforce/schema/Proposal__c.Loan_Program_Scenario_3__c';
import TermDue_S1 from '@salesforce/schema/Proposal__c.Term_Due_Scenario_1__c';
import TermDue_S2 from '@salesforce/schema/Proposal__c.Term_Due_Scenario_2__c';
import TermDue_S3 from '@salesforce/schema/Proposal__c.Term_Due_Scenario_3__c';
import Fees_S1 from '@salesforce/schema/Proposal__c.TotalFeesS1__c';
import Fees_S2 from '@salesforce/schema/Proposal__c.TotalFeesS2__c';
import Fees_S3 from '@salesforce/schema/Proposal__c.TotalFeesS3__c';
import LoanAmt_S1 from '@salesforce/schema/Proposal__c.First_Loan_Amount_Scenario_1__c';
import LoanAmt_S2 from '@salesforce/schema/Proposal__c.First_Loan_Amount_Scenario_2__c';
import LoanAmt_S3 from '@salesforce/schema/Proposal__c.First_Loan_Amount_Scenario_3__c';
import RateScenario_S1 from '@salesforce/schema/Proposal__c.Rate_Scenario_1__c';
import RateScenario_S2 from '@salesforce/schema/Proposal__c.Rate_Scenario_2__c';
import RateScenario_S3 from '@salesforce/schema/Proposal__c.Rate_Scenario_3__c';
import LTV_S1 from '@salesforce/schema/Proposal__c.LTV_Scenario_1__c';
import LTV_S2 from '@salesforce/schema/Proposal__c.LTV_Scenario_2__c';
import LTV_S3 from '@salesforce/schema/Proposal__c.LTV_Scenario_3__c';
import CLTV_S1 from '@salesforce/schema/Proposal__c.CLTV_Scenario_1__c';
import CLTV_S2 from '@salesforce/schema/Proposal__c.CLTV_Scenario_2__c';
import CLTV_S3 from '@salesforce/schema/Proposal__c.CLTV_Scenario_3__c';
import MonthlyPayment_S1 from '@salesforce/schema/Proposal__c.Monthly_Payment_Scenario_1__c';
import MonthlyPayment_S2 from '@salesforce/schema/Proposal__c.Monthly_Payment_Scenario_2__c';
import MonthlyPayment_S3 from '@salesforce/schema/Proposal__c.Monthly_Payment_Scenario_3__c';
import EstTaxesS1 from '@salesforce/schema/Proposal__c.EstimatedTaxesScenario1__c';
import EstTaxesS2 from '@salesforce/schema/Proposal__c.EstimatedTaxesScenario2__c';
import EstTaxesS3 from '@salesforce/schema/Proposal__c.EstimatedTaxesScenario3__c';
import EscrowTaxesMonths from '@salesforce/schema/Proposal__c.Escrow_Taxes_Months__c';
import EstInsuranceS1 from '@salesforce/schema/Proposal__c.EstimatedInsuranceScenario1__c';
import EstInsuranceS2 from '@salesforce/schema/Proposal__c.EstimatedInsuranceScenario2__c';
import EstInsuranceS3 from '@salesforce/schema/Proposal__c.EstimatedInsuranceScenario3__c';
import EscrowInsMonths from '@salesforce/schema/Proposal__c.Escrow_Ins_Months__c';
import EstMtgInsuranceS1 from '@salesforce/schema/Proposal__c.EstimatedMortgageInsuranceScenario1__c';
import EstMtgInsuranceS2 from '@salesforce/schema/Proposal__c.EstimatedMortgageInsuranceScenario2__c';
import EstMtgInsuranceS3 from '@salesforce/schema/Proposal__c.EstimatedMortgageInsuranceScenario3__c';
import EstHoaS1 from '@salesforce/schema/Proposal__c.EstimatedHOAScenario1__c';
import EstHoaS2 from '@salesforce/schema/Proposal__c.EstimatedHOAScenario2__c';
import EstHoaS3 from '@salesforce/schema/Proposal__c.EstimatedHOAScenario3__c';
import TotalMonthlyPaymentS1 from '@salesforce/schema/Proposal__c.TotalMonthlyPaymentScenario1__c';
import TotalMonthlyPaymentS2 from '@salesforce/schema/Proposal__c.TotalMonthlyPaymentScenario2__c';
import TotalMonthlyPaymentS3 from '@salesforce/schema/Proposal__c.TotalMonthlyPaymentScenario3__c';
import TotalInterest_S1 from '@salesforce/schema/Proposal__c.Total_Interest_Scenario_1__c';
import TotalInterest_S2 from '@salesforce/schema/Proposal__c.Total_Interest_Scenario_2__c';
import TotalInterest_S3 from '@salesforce/schema/Proposal__c.Total_Interest_Scenario_3__c';
import EstimatedFundstoCloseScenario1 from '@salesforce/schema/Proposal__c.EstimatedFundstoCloseScenario1__c';
import EstimatedFundstoCloseScenario2 from '@salesforce/schema/Proposal__c.EstimatedFundstoCloseScenario2__c';
import EstimatedFundstoCloseScenario3 from '@salesforce/schema/Proposal__c.EstimatedFundstoCloseScenario3__c';
import MonthlySavings_S1 from '@salesforce/schema/Proposal__c.Monthly_Payment_Savings_Scenario_1__c';
import MonthlySavings_S2 from '@salesforce/schema/Proposal__c.Monthly_Payment_Savings_Scenario_2__c';
import MonthlySavings_S3 from '@salesforce/schema/Proposal__c.Monthly_Payment_Savings_Scenario_3__c';
import InterestSavings_S1 from '@salesforce/schema/Proposal__c.Daily_Interest_Savings_Scenario_1__c';
import InterestSavings_S2 from '@salesforce/schema/Proposal__c.Daily_Interest_Savings_Scenario_2__c';
import InterestSavings_S3 from '@salesforce/schema/Proposal__c.Daily_Interest_Savings_Scenario_3__c';
import OnPacePayment_S1 from '@salesforce/schema/Proposal__c.On_Pace_Payment_Scenario_1__c';
import OnPacePayment_S2 from '@salesforce/schema/Proposal__c.On_Pace_Payment_Scenario_2__c';
import OnPacePayment_S3 from '@salesforce/schema/Proposal__c.On_Pace_Payment_Scenario_3__c';
import OnPaceSavings_S1 from '@salesforce/schema/Proposal__c.On_Pace_Savings_Scenario_1__c';
import OnPaceSavings_S2 from '@salesforce/schema/Proposal__c.On_Pace_Savings_Scenario_2__c';
import OnPaceSavings_S3 from '@salesforce/schema/Proposal__c.On_Pace_Savings_Scenario_3__c';
import MaturityReduction_S1 from '@salesforce/schema/Proposal__c.Maturity_Reduction_Scenario_1__c';
import MaturityReduction_S2 from '@salesforce/schema/Proposal__c.Maturity_Reduction_Scenario_2__c';
import MaturityReduction_S3 from '@salesforce/schema/Proposal__c.Maturity_Reduction_Scenario_3__c';
import LifetimeSavings_S1 from '@salesforce/schema/Proposal__c.Lifetime_Savings_Scenario_1__c';
import LifetimeSavings_S2 from '@salesforce/schema/Proposal__c.Lifetime_Savings_Scenario_2__c';
import LifetimeSavings_S3 from '@salesforce/schema/Proposal__c.Lifetime_Savings_Scenario_3__c';

import SolidifyContact from '@salesforce/schema/Proposal__c.SolidifyContact__c';
import Borrower_Name_Text from '@salesforce/schema/Proposal__c.Borrower_Name_Text__c';
import Fixed_Term_Years from '@salesforce/schema/Proposal__c.Fixed_Term_Years__c';
import Prepared_Date from '@salesforce/schema/Proposal__c.Prepared_Date__c';
import New_Loan_Amount from '@salesforce/schema/Proposal__c.New_Loan_Amount__c';
import Estimate_Value from '@salesforce/schema/Proposal__c.Estimate_Value__c';
import FICO_Score from '@salesforce/schema/Proposal__c.FICO_Score__c';
import Lock_Period_Days from '@salesforce/schema/Proposal__c.Lock_Period_Days__c';

import Rate_1 from '@salesforce/schema/Proposal__c.Rate_1__c';
import APR1 from '@salesforce/schema/Proposal__c.APR1__c';
import APRScenario1 from '@salesforce/schema/Proposal__c.APRScenario1__c';
import Total_Cost_1 from '@salesforce/schema/Proposal__c.Total_Cost_1__c';
import Total_Loan_Amount1 from '@salesforce/schema/Proposal__c.Total_Loan_Amount1__c';
import Monthly_PI_Pmt1 from '@salesforce/schema/Proposal__c.Monthly_PI_Pmt1__c';
import Years_Until_Breakeven1 from '@salesforce/schema/Proposal__c.Years_Until_Breakeven1__c';
import Rate_2 from '@salesforce/schema/Proposal__c.Rate_2__c';
import APR2 from '@salesforce/schema/Proposal__c.APR2__c';
import APRScenario2 from '@salesforce/schema/Proposal__c.APRScenario2__c';
import Total_Cost_2 from '@salesforce/schema/Proposal__c.Total_Cost_2__c';
import Total_Loan_Amount2 from '@salesforce/schema/Proposal__c.Total_Loan_Amount2__c';
import Monthly_PI_Pmt2 from '@salesforce/schema/Proposal__c.Monthly_PI_Pmt2__c';
import Years_Until_Breakeven2 from '@salesforce/schema/Proposal__c.Years_Until_Breakeven2__c';
import Rate_3 from '@salesforce/schema/Proposal__c.Rate_3__c';
import APR3 from '@salesforce/schema/Proposal__c.APR3__c';
import APRScenario3 from '@salesforce/schema/Proposal__c.APRScenario3__c';
import Total_Cost_3 from '@salesforce/schema/Proposal__c.Total_Cost_3__c';
import Total_Loan_Amount3 from '@salesforce/schema/Proposal__c.Total_Loan_Amount3__c';
import Monthly_PI_Pmt3 from '@salesforce/schema/Proposal__c.Monthly_PI_Pmt3__c';
import Years_Until_Breakeven3 from '@salesforce/schema/Proposal__c.Years_Until_Breakeven3__c';
import Rate_4 from '@salesforce/schema/Proposal__c.Rate_4__c';
import APR4 from '@salesforce/schema/Proposal__c.APR4__c';
import Total_Cost_4 from '@salesforce/schema/Proposal__c.Total_Cost_4__c';
import Total_Loan_Amount4 from '@salesforce/schema/Proposal__c.Total_Loan_Amount4__c';
import Monthly_PI_Pmt4 from '@salesforce/schema/Proposal__c.Monthly_PI_Pmt4__c';
import Years_Until_Breakeven4 from '@salesforce/schema/Proposal__c.Years_Until_Breakeven4__c';
import Rate_5 from '@salesforce/schema/Proposal__c.Rate_5__c';
import APR5 from '@salesforce/schema/Proposal__c.APR5__c';
import Total_Cost_5 from '@salesforce/schema/Proposal__c.Total_Cost_5__c';
import Total_Loan_Amount5 from '@salesforce/schema/Proposal__c.Total_Loan_Amount5__c';
import Monthly_PI_Pmt5 from '@salesforce/schema/Proposal__c.Monthly_PI_Pmt5__c';
import Years_Until_Breakeven5 from '@salesforce/schema/Proposal__c.Years_Until_Breakeven5__c';
import Rate_6 from '@salesforce/schema/Proposal__c.Rate_6__c';
import APR6 from '@salesforce/schema/Proposal__c.APR6__c';
import Total_Cost_6 from '@salesforce/schema/Proposal__c.Total_Cost_6__c';
import Total_Loan_Amount6 from '@salesforce/schema/Proposal__c.Total_Loan_Amount6__c';
import Monthly_PI_Pmt6 from '@salesforce/schema/Proposal__c.Monthly_PI_Pmt6__c';
/*import Years_Until_Breakeven6 from '@salesforce/schema/Proposal__c.Years_Until_Breakeven6__c';*/ 
import DiscountCreditS1 from '@salesforce/schema/Proposal__c.DiscountCreditS1__c';
import LenderFeeS1 from '@salesforce/schema/Proposal__c.LenderFeeS1__c';
import AppraisalFeeS1 from '@salesforce/schema/Proposal__c.AppraisalFeeS1__c';
import CreditReportFeeS1 from '@salesforce/schema/Proposal__c.CreditReportFeeS1__c';
import EscrowFeesS1 from '@salesforce/schema/Proposal__c.EscrowFeesS1__c';
import TitleFeeS1 from '@salesforce/schema/Proposal__c.TitleFeeS1__c';
import RecordingFeeS1 from '@salesforce/schema/Proposal__c.RecordingFeeS1__c';

import DiscountCreditS2 from '@salesforce/schema/Proposal__c.DiscountCreditS2__c';
import LenderFeeS2 from '@salesforce/schema/Proposal__c.LenderFeeS2__c';
import AppraisalFeeS2 from '@salesforce/schema/Proposal__c.AppraisalFeeS2__c';
import CreditReportFeeS2 from '@salesforce/schema/Proposal__c.CreditReportFeeS2__c';
import EscrowFeesS2 from '@salesforce/schema/Proposal__c.EscrowFeesS2__c';
import TitleFeeS2 from '@salesforce/schema/Proposal__c.TitleFeeS2__c';
import RecordingFeeS2 from '@salesforce/schema/Proposal__c.RecordingFeeS2__c';

import DiscountCreditS3 from '@salesforce/schema/Proposal__c.DiscountCreditS3__c';
import LenderFeeS3 from '@salesforce/schema/Proposal__c.LenderFeeS3__c';
import AppraisalFeeS3 from '@salesforce/schema/Proposal__c.AppraisalFeeS3__c';
import CreditReportFeeS3 from '@salesforce/schema/Proposal__c.CreditReportFeeS3__c';
import EscrowFeesS3 from '@salesforce/schema/Proposal__c.EscrowFeesS3__c';
import TitleFeeS3 from '@salesforce/schema/Proposal__c.TitleFeeS3__c';
import RecordingFeeS3 from '@salesforce/schema/Proposal__c.RecordingFeeS3__c';

import UFMIPFFS1 from '@salesforce/schema/Proposal__c.UFMIPFFS1__c';
import UFMIPFFS2 from '@salesforce/schema/Proposal__c.UFMIPFFS2__c';
import UFMIPFFS3 from '@salesforce/schema/Proposal__c.UFMIPFFS3__c';

import CancelMIAtS1 from '@salesforce/schema/Proposal__c.CancelMIAtS1__c';
import CancelMIAtS2 from '@salesforce/schema/Proposal__c.CancelMIAtS2__c';
import CancelMIAtS3 from '@salesforce/schema/Proposal__c.CancelMIAtS3__c';

import CopytoS1And2 from '@salesforce/schema/Proposal__c.CopytoScenarios2and3__c';
import PurchasePrice from '@salesforce/schema/Proposal__c.Purchase_Price__c';
import PurchasePriceS1 from '@salesforce/schema/Proposal__c.Purchase_Price_S1__c';
import PurchasePriceS2 from '@salesforce/schema/Proposal__c.Purchase_Price_S2__c';
import PurchasePriceS3 from '@salesforce/schema/Proposal__c.Purchase_Price_S3__c';

import SellerCredit1 from '@salesforce/schema/Proposal__c.SellerCredit1__c';
import SellerCredit2 from '@salesforce/schema/Proposal__c.SellerCredit2__c';
import SellerCredit3 from '@salesforce/schema/Proposal__c.SellerCredit3__c';
import CashDeposit1 from '@salesforce/schema/Proposal__c.CashDeposit1__c';
import CashDeposit2 from '@salesforce/schema/Proposal__c.CashDeposit2__c';
import CashDeposit3 from '@salesforce/schema/Proposal__c.CashDeposit3__c';
import HideFundsToClose from '@salesforce/schema/Proposal__c.Hide_Funds_To_Close_Client_View__c';
import OtherToCloseS1 from '@salesforce/schema/Proposal__c.OtherDueAtCloseS1__c';
import OtherToCloseS2 from '@salesforce/schema/Proposal__c.OtherDueAtCloseS2__c';
import OtherToCloseS3 from '@salesforce/schema/Proposal__c.OtherDueAtCloseS3__c';

const SUCCESS_TITLE = 'Loan Information Saved!';
const SUCCESS_VARIANT = 'success';
const FIELDS = [
    'Proposal__c.Purpose__c',
    'Proposal__c.RecordTypeId',
    'Proposal__c.Loan_Program_Scenario_1__c',
    'Proposal__c.Loan_Program_Scenario_2__c',
    'Proposal__c.Loan_Program_Scenario_3__c',
    'Proposal__c.LTV_Scenario_1__c',
    'Proposal__c.LTV_Scenario_2__c',
    'Proposal__c.LTV_Scenario_3__c',
    'Proposal__c.Purchase_Price__c',
    'Proposal__c.Purchase_Price_S1__c',
    'Proposal__c.Purchase_Price_S2__c',
    'Proposal__c.Purchase_Price_S3__c',
    'Proposal__c.Most_Recent_Loan__c',
];




export default class ScenariosTabProposal extends NavigationMixin(LightningElement) {

    @track proposalRecord;

    SolidifyContact = SolidifyContact;
    CopytoS1And2 = CopytoS1And2;

    UFMIPFFS1 = UFMIPFFS1;
    UFMIPFFS2 = UFMIPFFS2;
    UFMIPFFS3 = UFMIPFFS3;
    CancelMIAtS1 = CancelMIAtS1;
    CancelMIAtS2 = CancelMIAtS2;
    CancelMIAtS3 = CancelMIAtS3;
    HideFundsToClose = HideFundsToClose;
    OtherToCloseS1 = OtherToCloseS1;
    OtherToCloseS2 = OtherToCloseS2;
    OtherToCloseS3 = OtherToCloseS3;

    
    DiscountCreditS1 = DiscountCreditS1;
    LenderFeeS1 = LenderFeeS1;
    AppraisalFeeS1 = AppraisalFeeS1;
    CreditReportFeeS1 = CreditReportFeeS1;
    EscrowFeesS1 = EscrowFeesS1;
    TitleFeeS1 = TitleFeeS1;
    RecordingFeeS1 = RecordingFeeS1;

    DiscountCreditS2 = DiscountCreditS2;
    LenderFeeS2 = LenderFeeS2;
    AppraisalFeeS2 = AppraisalFeeS2;
    CreditReportFeeS2 = CreditReportFeeS2;
    EscrowFeesS2 = EscrowFeesS2;
    TitleFeeS2 = TitleFeeS2;
    RecordingFeeS2 = RecordingFeeS2;

    DiscountCreditS3 = DiscountCreditS3;
    LenderFeeS3 = LenderFeeS3;
    AppraisalFeeS3 = AppraisalFeeS3;
    CreditReportFeeS3 = CreditReportFeeS3;
    EscrowFeesS3 = EscrowFeesS3;
    TitleFeeS3 = TitleFeeS3;
    RecordingFeeS3 = RecordingFeeS3;
    
    Occupancy = Occupancy_Field;
    SubjectPropertyType = Subject_Property_Type_Field;
    NumberOfUnits = Number_of_Units_Field;
    EstimatedValue = Estimated_Value_Field;
    CurrentProgram = Current_Program_Field;
    CurrentBalance = Current_Balance_Field;
    CurrentRate = Current_Rate_Field;
    CurrentPayment = Current_Payment_Field;
    YearsRemainingOnCurrentLoan = Years_Remaining_on_Current_Loan_Field;
    TotalInterestRemainingOnCurrentLoanField = Total_Interest_Remaining_on_Current_Loan_Field;
    
    Purpose = PURPOSE_FIELD;
    Scenario1Name = Scenario1Name;
    Scenario2Name = Scenario2Name;
    Scenario3Name = Scenario3Name;
    DwnPaymentS1 = DownPaymentScenario1;
    DwnPaymentS2 = DownPaymentScenario2;
    DwnPaymentS3 = DownPaymentScenario3;
    PurposeS1 = Purpose_S1;
    PurposeS2 = Purpose_S2;
    PurposeS3 = Purpose_S3;
    LoanProgramS1 = Loan_Program_S1;
    LoanProgramS2 = Loan_Program_S2;
    LoanProgramS3 = Loan_Program_S3;
    TermDueS1 = TermDue_S1;
    TermDueS2 = TermDue_S2;
    TermDueS3 = TermDue_S3;
    FeesS1 = Fees_S1;
    FeesS2 = Fees_S2;
    FeesS3 = Fees_S3;
    LoanAmtS1 = LoanAmt_S1;
    LoanAmtS2 = LoanAmt_S2;
    LoanAmtS3 = LoanAmt_S3;
    RateScenarioS1 = RateScenario_S1;
    RateScenarioS2 = RateScenario_S2;
    RateScenarioS3 = RateScenario_S3;
    LTVS1 = LTV_S1;
    LTVS2 = LTV_S2;
    LTVS3 = LTV_S3;
    CLTVS1 = CLTV_S1;
    CLTVS2 = CLTV_S2;
    CLTVS3 = CLTV_S3;
    MonthlyPaymentS1 = MonthlyPayment_S1;
    MonthlyPaymentS2 = MonthlyPayment_S2;
    MonthlyPaymentS3 = MonthlyPayment_S3;
    EstimatedTaxS1 = EstTaxesS1;
    EstimatedTaxS2 = EstTaxesS2;
    EstimatedTaxS3 = EstTaxesS3;
    EstimatedInsuranceS1 = EstInsuranceS1;
    EstimatedInsuranceS2 = EstInsuranceS2;
    EstimatedInsuranceS3 = EstInsuranceS3;
    EstMortgageInsuranceS1 = EstMtgInsuranceS1;
    EstMortgageInsuranceS2 = EstMtgInsuranceS2;
    EstMortgageInsuranceS3 = EstMtgInsuranceS3;
    EstimatedHoaS1 = EstHoaS1;
    EstimatedHoaS2 = EstHoaS2;
    EstimatedHoaS3 = EstHoaS3;
    TotalMonthPayS1 = TotalMonthlyPaymentS1;
    TotalMonthPayS2 = TotalMonthlyPaymentS2;
    TotalMonthPayS3 = TotalMonthlyPaymentS3;
    TotalInterestS1 = TotalInterest_S1;
    TotalInterestS2 = TotalInterest_S2;
    TotalInterestS3 = TotalInterest_S3;
    EstFunds2CloseS1 = EstimatedFundstoCloseScenario1;
    EstFunds2CloseS2 = EstimatedFundstoCloseScenario2;
    EstFunds2CloseS3 = EstimatedFundstoCloseScenario3;
    MonthlySavingsS1 = MonthlySavings_S1;
    MonthlySavingsS2 = MonthlySavings_S2;
    MonthlySavingsS3 = MonthlySavings_S3;
    InterestSavingsS1 = InterestSavings_S1;
    InterestSavingsS2 = InterestSavings_S2;
    InterestSavingsS3 = InterestSavings_S3;
    OnPacePaymentS1 = OnPacePayment_S1;
    OnPacePaymentS2 = OnPacePayment_S2;
    OnPacePaymentS3 = OnPacePayment_S3;
    OnPaceSavingsS1 = OnPaceSavings_S1;
    OnPaceSavingsS2 = OnPaceSavings_S2;
    OnPaceSavingsS3 = OnPaceSavings_S3;
    MaturityReductionS1 = MaturityReduction_S1;
    MaturityReductionS2 = MaturityReduction_S2;
    MaturityReductionS3 = MaturityReduction_S3;
    LifetimeSavingsS1 = LifetimeSavings_S1;
    LifetimeSavingsS2 = LifetimeSavings_S2;
    LifetimeSavingsS3 = LifetimeSavings_S3;

    SellerCredit1 = SellerCredit1;
    SellerCredit2 = SellerCredit2;
    SellerCredit3 = SellerCredit3;
    CashDeposit1 = CashDeposit1;
    CashDeposit2 = CashDeposit2;
    CashDeposit3 = CashDeposit3;

    SolidifyContact = SolidifyContact;
    BorrowerNameText = Borrower_Name_Text;
    FixedTermYears = Fixed_Term_Years;
    PreparedDate = Prepared_Date;
    NewLoanAmount = New_Loan_Amount;
    EstimateValue = Estimate_Value;
    FICOScore = FICO_Score;
    LockPeriodDays = Lock_Period_Days;
    EscrowTaxesMonths = EscrowTaxesMonths;
    EscrowInsMonths = EscrowInsMonths;
    Rate1 = Rate_1;
    APR1 = APR1;
    APRScenario1 = APRScenario1;
    TotalCost1 = Total_Cost_1;
    TotalLoanAmount1 = Total_Loan_Amount1
    MonthlyPIPmt1 = Monthly_PI_Pmt1;
    YearsUntilBreakeven1 = Years_Until_Breakeven1;
    Rate2 = Rate_2;
    APR2 = APR2;
    APRScenario2 = APRScenario2;
    TotalCost2 = Total_Cost_2;
    TotalLoanAmount2 = Total_Loan_Amount2
    MonthlyPIPmt2 = Monthly_PI_Pmt2;
    YearsUntilBreakeven2 = Years_Until_Breakeven2;
    Rate3 = Rate_3;
    APR3 = APR3;
    APRScenario3 = APRScenario3;
    TotalCost3 = Total_Cost_3;
    TotalLoanAmount3 = Total_Loan_Amount3
    MonthlyPIPmt3 = Monthly_PI_Pmt3;
    YearsUntilBreakeven3 = Years_Until_Breakeven3;
    Rate4 = Rate_4;
    APR4 = APR4;
    TotalCost4 = Total_Cost_4;
    TotalLoanAmount4 = Total_Loan_Amount4
    MonthlyPIPmt4 = Monthly_PI_Pmt4;
    YearsUntilBreakeven4 = Years_Until_Breakeven4;
    Rate5 = Rate_5;
    APR5 = APR5;
    TotalCost5 = Total_Cost_5;
    TotalLoanAmount5 = Total_Loan_Amount5
    MonthlyPIPmt5 = Monthly_PI_Pmt5;
    YearsUntilBreakeven5 = Years_Until_Breakeven5;
    Rate6 = Rate_6;
    APR6 = APR6;
    TotalCost6 = Total_Cost_6;
    TotalLoanAmount6 = Total_Loan_Amount6
    MonthlyPIPmt6 = Monthly_PI_Pmt6;
    /*YearsUntilBreakeven6 = Years_Until_Breakeven6;*/

    purchasePrice = PurchasePrice;
    purchasePriceS1 = PurchasePriceS1;
    purchasePriceS2 = PurchasePriceS2;
    purchasePriceS3 = PurchasePriceS3;

    ProposalId;
    ProposalObject = PROPOSAL_OBJECT;
    @api objectApiName;
    
    @api
    get recordId() {
        return this.ProposalId;
    }
    
    set recordId(value) {
        //sets ProposalId attribute
        this.setAttribute('ProposalId', value);
        //sets ProposalId assignment
        this.ProposalId = value;
    }
    
    @track isRefinance = true;
    @track isUFMIP1 = true;
    @track isCancel1 = true;
    @track isUFMIP2 = true;
    @track isCancel2 = true;
    @track isUFMIP3 = true;
    @track isCancel3 = true;

    @track isRefiAnalysis = false;
    @track isRateAnalysis = false;
    @track isComparisonAnalysis = false;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS }) 
    record({ error, data }) {
        if (error) {
            console.log('***error = ', error);
        }
        else if (data) {
            this.proposalRecord = data;
            if(this.objectApiName == 'Proposal__c') {
                console.log('Proposal__c', data.fields)
                this.isRefinance = false;
                this.isUFMIP1 = false;
                this.isCancel1 = false;
                this.isUFMIP2 = false;
                this.isCancel2 = false;
                this.isUFMIP3 = false;
                this.isCancel3 = false;
                this.loanId = data.fields?.Most_Recent_Loan__c?.value;
                if(data.fields.Purpose__c.value !== null){
                    if(data.fields.Purpose__c.value == 'Purchase'){
                        this.isRefinance = false;
                    } else {
                        this.isRefinance = true;
                    }
                
                }
                if(data.fields.Loan_Program_Scenario_1__c.value !== null) {
                    if(data.fields.Loan_Program_Scenario_1__c.value.includes("FHA") || data.fields.Loan_Program_Scenario_1__c.value.includes("VA")){
                        this.isUFMIP1 = true;
                    }}
                if(data.fields.Loan_Program_Scenario_2__c.value !== null){
                    if(data.fields.Loan_Program_Scenario_2__c.value.includes("FHA") || data.fields.Loan_Program_Scenario_2__c.value.includes("VA")){
                        this.isUFMIP2 = true;
                    }}
                if(data.fields.Loan_Program_Scenario_3__c.value !== null){
                    if(data.fields.Loan_Program_Scenario_3__c.value.includes("FHA") || data.fields.Loan_Program_Scenario_3__c.value.includes("VA")){
                        this.isUFMIP3 = true;
                    }}
                if(data.fields.LTV_Scenario_1__c.value > 80){
                    this.isCancel1 = true;
                }
                if(data.fields.LTV_Scenario_2__c.value > 80){
                    this.isCancel2 = true;
                }
                if(data.fields.LTV_Scenario_3__c.value > 80){
                    this.isCancel3 = true;
                }
                if(data.fields.RecordTypeId.value == '012f4000000OatvAAC'){
                    this.isRefiAnalysis = true;
                } else if(data.fields.RecordTypeId.value == '012f4000000ObpJAAS'){
                    this.isRateAnalysis = true;
                } else if(data.fields.RecordTypeId.value == '0127c0000000tYQAAY'){
                    this.isComparisonAnalysis = true;
                }

            }

        }
    }

    changePurpose(event){
        const purpose = event.target.value;
        if(purpose !== null){
            if(purpose == 'Purchase'){
                this.isRefinance = false;
            } else {
                this.isRefinance = true;
            }
        }
    }

    async handleSubmit(event) {
            event.preventDefault();
            const fields = event.detail.fields;
            fields.Proposal__c = this.ProposalId;
            console.log('handleSubmit', fields);
            console.log(fields.CopytoScenarios2and3__c);
            if(fields.CopytoScenarios2and3__c){
                console.log('copying new');
                fields.Loan_Program_Scenario_2__c = fields.Loan_Program_Scenario_1__c;
                fields.Loan_Program_Scenario_3__c = fields.Loan_Program_Scenario_1__c;
                fields.Term_Due_Scenario_2__c = fields.Term_Due_Scenario_1__c;
                fields.Term_Due_Scenario_3__c = fields.Term_Due_Scenario_1__c;
                fields.DownPaymentScenario_2__c = fields.DownPaymentScenario_1__c;
                fields.DownPaymentScenario_3__c = fields.DownPaymentScenario_1__c;  
                fields.First_Loan_Amount_Scenario_2__c = fields.First_Loan_Amount_Scenario_1__c;
                fields.First_Loan_Amount_Scenario_3__c = fields.First_Loan_Amount_Scenario_1__c;
                fields.Rate_Scenario_2__c = fields.Rate_Scenario_1__c;
                fields.Rate_Scenario_3__c = fields.Rate_Scenario_1__c;
                fields.DiscountCreditS2__c = fields.DiscountCreditS1__c;
                fields.DiscountCreditS3__c = fields.DiscountCreditS1__c;
                fields.SellerCredit2__c = fields.SellerCredit1__c;
                fields.SellerCredit3__c = fields.SellerCredit1__c;
                fields.CashDeposit2__c = fields.CashDeposit1__c;
                fields.CashDeposit3__c = fields.CashDeposit1__c;
                fields.LenderFeeS2__c = fields.LenderFeeS1__c;
                fields.LenderFeeS3__c = fields.LenderFeeS1__c;
                fields.AppraisalFeeS2__c = fields.AppraisalFeeS1__c;
                fields.AppraisalFeeS3__c = fields.AppraisalFeeS1__c;
                fields.CreditReportFeeS2__c = fields.CreditReportFeeS1__c;
                fields.CreditReportFeeS3__c = fields.CreditReportFeeS1__c;
                fields.EscrowFeesS2__c = fields.EscrowFeesS1__c;
                fields.EscrowFeesS3__c = fields.EscrowFeesS1__c;
                fields.TitleFeeS2__c = fields.TitleFeeS1__c
                fields.TitleFeeS3__c = fields.TitleFeeS1__c;
                fields.RecordingFeeS2__c = fields.RecordingFeeS1__c;
                fields.RecordingFeeS2__c = fields.RecordingFeeS1__c;
                fields.OtherToCloseS2 = fields.OtherToCloseS1;
                fields.OtherToCloseS3 = fields.OtherToCloseS1;  
            }
            this.template.querySelector('lightning-record-edit-form').submit(fields);
    }

    handleSuccess() {
        // TODO: dispatch the custom event and show the success message
        console.log('handleSuccess');
        this.dispatchEvent(new ShowToastEvent({
            title: SUCCESS_TITLE,
            variant: SUCCESS_VARIANT
        }))
        this.dispatchEvent(new CustomEvent('createreview', { detail: {} }));
    }

    @api
    get purpose() {
        return getFieldValue(this.ProposalId, PURPOSE_FIELD);
    }

    get isPurchase() {
        return this.proposalRecord?.fields?.Purpose__c?.value === 'Purchase';
    }
    
    //Navigate to visualforce page
    navigateToVFPage() {
        let windowOrigin = window.location.origin;
        let generatedUrl = 'https://solidify.secure.force.com/Proposal?id=' + this.ProposalId
        window.open(generatedUrl);
    }


    handleActive() {
        console.log();
    }

    get escrowsCalcS1() {
        console.log('Escrows1' + EstimatedTaxS1 + '*' + Escrow_Taxes_Months__c + ' + ' + this.EstimatedInsuranceS1 + '*' + Escrow_Ins_Months__c );
        return (this.EstimatedTaxS1*Escrow_Taxes_Months__c) + (EstimatedInsuranceScenario1__c * Escrow_Ins_Months__c)
    }

    get escrowsCalcS2() {
        return (this.EstimatedTaxS2*Escrow_Taxes_Months__c) + (EstimatedInsuranceScenario2__c * Escrow_Ins_Months__c)
    }

    get escrowsCalcS3() {   
        return (EstimatedTaxS3*Escrow_Taxes_Months__c) + (EstimatedInsuranceScenario3__c * Escrow_Ins_Months__c)
    }
}