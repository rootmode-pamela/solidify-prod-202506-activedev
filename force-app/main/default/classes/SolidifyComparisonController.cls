/**
* @description       : 
* @author            : ChangeMeIn@UserSettingsUnder.SFDoc
* @group             : 
* @last modified on  : 10-06-2021
* @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
* Modifications Log 
* Ver   Date         Author                               Modification
* 1.0   04-23-2021   ChangeMeIn@UserSettingsUnder.SFDoc   Initial Version
**/
public without sharing class SolidifyComparisonController {
        
        @AuraEnabled(cacheable=true)
        public static Lead getLeadInfo(Id recordId){
                system.debug('***recordId = ' + recordId);
                Lead leadRec = [SELECT Id, IsDeleted, MasterRecordId, LastName, FirstName, Salutation, MiddleName, Suffix, Name, Title, Company, Street, 
                City, State, PostalCode, Country, Latitude, Longitude, GeocodeAccuracy, Address, Phone, MobilePhone, Fax, Email, Website, PhotoUrl, Description, 
                LeadSource, Status, Industry, Rating, AnnualRevenue, NumberOfEmployees, OwnerId, HasOptedOutOfEmail, IsConverted, ConvertedDate, ConvertedAccountId, 
                ConvertedContactId, ConvertedOpportunityId, IsUnreadByOwner, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, 
                LastActivityDate, DoNotCall, HasOptedOutOfFax, LastViewedDate, LastReferencedDate, LastTransferDate, Jigsaw, JigsawContactId, EmailBouncedReason, 
                EmailBouncedDate, IndividualId, Loan_Amount__c, Purpose__c, Occupancy__c, CoBorrower_FirstName__c, Cash_Out__c, Impounds__c, Loan_Type__c, 
                Price_Est_Value__c, Purpose_Scenario_1__c, CLTV__c, Self_Reported_Credit__c, Fico__c, Rate_Quoted__c, Loan_Program__c, Down_Payment__c, 
                Referred_By__c, LTV__c, Estimated_Value__c, Number_of_Units__c, Nickname__c, Subject_Property_Type__c, Veteran__c, COE__c, CoBorrower_Nickname__c, 
                Email_2__c, Home_Phone__c, Business_Phone__c, Subject_Property_City__c, Subject_Property_County__c, Next_Due_Activity__c, Subject_Property_State__c, 
                Subject_Property_Zip__c, Subject_Property_Street__c, Remarks__c, Lead_Time_Zone__c, MC4SF__MC_Subscriber__c, Employer__c, CalendlyCreated__c, 
                Household_Income_Range__c, Estimated_Income__c, Role__c, dupcheck__dc3DisableDuplicateCheck__c, dupcheck__dc3Index__c, dupcheck__dc3Web2Lead__c, 
                Ad_Description__c, Branch__c, Type_of_Property__c, Ad_Consented__c, pi__Needs_Score_Synced__c, pi__Pardot_Last_Scored_At__c, pi__campaign__c, 
                pi__comments__c, pi__conversion_date__c, pi__conversion_object_name__c, pi__conversion_object_type__c, pi__created_date__c, pi__first_activity__c, 
                pi__first_search_term__c, pi__first_search_type__c, pi__first_touch_url__c, pi__grade__c, pi__last_activity__c, pi__notes__c, pi__pardot_hard_bounced__c, pi__score__c, pi__url__c, pi__utm_campaign__c, pi__utm_content__c, pi__utm_medium__c, pi__utm_source__c, pi__utm_term__c, Loan_Originator_User__c, smagicinteract__SMSOptOut__c, Ad_Area__c, Ad_Hook__c, Ad_Content_Descriptor__c, Email_External_Id__c, Greeting_Name__c, Nurture_Reason__c, Archived_Reason__c, CoBorrower_LastName__c, Type__c, FeeScenario1__c, CoBorrower_Employer__c, CoBorrower_Est_Income__c, CoBorrower_Income_Sources__c, CoBorrower_Veteran__c, FeeScenario2__c, CoBorrower_Greeting_Name__c, Checking_Assets__c, CoBorrower_Greeting__c, CoBorrower_Mobile__c, Other_Monthly_Payments__c, Retirement_Assets__c, Savings_Assets__c, CoBorrower_Home_Phone__c, CoBorrower_Business_Phone__c, Timeline__c, First_Time_Homebuyer__c, Consent_Received__c, Grade__c, Priority_Sort__c, Last_Completed_Activity_Text__c, BK_Foreclosure_Past_7yrs__c, Recent_Task_Count__c, Future_Tasks__c, Future_Events__c, Borrower_PMOC__c, CoBorrower_PMOC__c, Realtor_Established__c, Price_Value_Range__c, Down_Payment_Range__c, Loan_Amt_Range_Refi__c, Type_of_Home__c, Future_Activities__c, Ad_Term__c, LeadNo__c, Created_Date_for_Automation__c, Convert_To_Contact__c, Convert_To_Loan__c, Convert_to_CoBorrower_Contact__c, Convert__c, Landing_Page__c, Lead_Timestamp__c, IP_Address__c, Device__c, Late_Mtg_Payments__c, Loan_Program_Scenario_1__c, Current_Program__c, Sub_Financing__c, Mo_Expenses__c, Current_FHA__c, Current_Balance__c, Current_Payment__c, First_Payment_Date__c, Original_Loan_Amount__c, First_Loan_Amount_Scenario_2__c, Term_Due__c, Monthly_Payment__c, Monthly_Payment_Savings__c, Current_Rate__c, Daily_Interest_Savings__c, Second_Loan_Amount__c, CLTV_Scenario_1__c, LTV_Scenario_1__c, First_Loan_Amount_Scenario_1__c, Rate_Scenario_1__c, Purpose_Scenario_2__c, Purpose_Scenario_3__c, First_Loan_Amount_Scenario_3__c, Rate_Scenario_2__c, Rate_Scenario_3__c, Second_Loan_Amount_Scenario_2__c, Second_Loan_Amount_Scenario_3__c, LTV_Scenario_2__c, LTV_Scenario_3__c, CLTV_Scenario_2__c, CLTV_Scenario_3__c, Term_Due_Scenario_2__c, Term_Due_Scenario_3__c, Monthly_Payment_Scenario_2__c, Monthly_Payment_Scenario_3__c, Monthly_Payment_Savings_Scenario_2__c, Monthly_Payment_Savings_Scenario_3__c, Daily_Interest_Savings_Scenario_2__c, Daily_Interest_Savings_Scenario_3__c, Loan_Originator__c, Loan_Program_Scenario_2__c, Loan_Program_Scenario_3__c, Current_Loan_Payments_Remaining__c, Lifetime_Savings_Scenario_1__c, Maturity_Reduction_Scenario_1__c, On_Pace_Savings_Scenario_1__c, Current_Term__c, Last_Payment_Date__c, Number_of_Payments_Made__c, Payments_Remaining_Scenario_1__c, On_Pace_Payment_Scenario_1__c, Current_Loan_Payments_Remaining_Text__c, Maturity_Reduction_Scenario_2__c, Maturity_Reduction_Scenario_3__c, On_Pace_Savings_Scenario_2__c, On_Pace_Savings_Scenario_3__c, Lifetime_Savings_Scenario_2__c, Lifetime_Savings_Scenario_3__c, Payments_Remaining_Scenario_2__c, Payments_Remaining_Scenario_3__c, On_Pace_Payment_Scenario_2__c, On_Pace_Payment_Scenario_3__c, Years_Remaining_on_Current_Loan__c, Years_Scenario_1__c, Years_Scenario_2__c, Years_Scenario_3__c, Liquid_Assets__c, CoBorrower_Fico__c, Total_Monthly_Income__c, Qualifying_Fico__c, Total_Interest_Scenario_1__c, Total_Interest_Scenario_2__c, Total_Interest_Scenario_3__c, Total_Interest_Remaining_on_Current_Loan__c, Purchase_Price__c, Income_Sources__c, CoBorrower_Role__c, FeeScenario3__c, CoBorrower_Income_Source_New__c, DownPaymentScenario1__c, DownPaymentScenario2__c, DownPaymentScenario3__c, EstimatedTaxesScenario1__c, EstimatedTaxesScenario2__c, EstimatedTaxesScenario3__c, EstimatedInsuranceScenario1__c, EstimatedInsuranceScenario2__c, EstimatedInsuranceScenario3__c, EstimatedMortgageInsuranceScenario1__c, EstimatedMortgageInsuranceScenario2__c, EstimatedMortgageInsuranceScenario3__c, EstimatedHOAScenario1__c, EstimatedHOAScenario2__c, EstimatedHOAScenario3__c, TotalMonthlyPaymentScenario1__c, TotalMonthlyPaymentScenario2__c, TotalMonthlyPaymentScenario3__c, EstimatedFundstoCloseScenario1__c, EstimatedFundstoCloseScenario2__c, EstimatedFundstoCloseScenario3__c, Property__c, SolidifyContact__c, ProgramNameS1__c, ProgramNameS2__c, ProgramNameS3__c, ProgramNameS1F__c, ProgramNameS2F__c, ProgramNameS3F__c, DiscountCreditS1__c, DiscountCreditS2__c, DiscountCreditS3__c, CreditReportFeeS1__c, CreditReportFeeS2__c, CreditReportFeeS3__c, LenderFeeS1__c, LenderFeeS2__c, LenderFeeS3__c, AppraisalFeeS1__c, AppraisalFeeS2__c, AppraisalFeeS3__c, EscrowFeesS1__c, EscrowFeesS2__c, EscrowFeesS3__c, TitleFeeS1__c, TitleFeeS2__c, TitleFeeS3__c, RecordingFeeS1__c, RecordingFeeS2__c, RecordingFeeS3__c, TotalFeesS1__c, TotalFeesS2__c, TotalFeesS3__c, AutofillTIIH__c, AutofillFees__c, UFMIPFFS1__c, UFMIPFFS2__c, UFMIPFFS3__c, LoanAmountwithUFMIPFFS1__c, LoanAmountwithUFMIPFFS2__c, LoanAmountwithUFMIPFFS3__c, CancelMIAtS1__c, CancelMIAtS2__c, CancelMIAtS3__c, APRScenario1__c, APRScenario2__c, APRScenario3__c, CopytoScenarios2and3__c, TBD__c, PaymentResultS1__c, Daily_Interest_Savings_Scenario_1__c, Monthly_Payment_Scenario_1__c, Monthly_Payment_Savings_Scenario_1__c, PaymentResultS2__c, PaymentResultS3__c,
                SolidifyContact__r.Name, SolidifyContact__r.MediumPhotoUrl, SolidifyContact__r.ApplyNowwebsiteLink__c, SolidifyContact__r.MobilePhone,
                SolidifyContact__r.Email, SolidifyContact__r.MLSNumber__c FROM Lead WHERE Id=:recordId];
                return leadRec;
        }
        @AuraEnabled(cacheable=true)
        public static Proposal__c getProposalInfo(Id recordId){
                system.debug('***recordId = ' + recordId);
                Proposal__c ProposalRec = [SELECT Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp,
                                           LastActivityDate, LastViewedDate, LastReferencedDate, Account__c, Borrower_Lead__c, Borrower__c, Current_Interest_Rate__c,
                                           Current_Loan_Amount__c, Current_Loan_Balance_Remaining__c, Current_Loan_First_Payment__c, Current_Loan_Last_Payment_Made__c,
                                           Current_Loan_Monthly_Payment__c, Current_Loan_Number_Payments_Made__c, Current_Loan_Payments_Remaining__c, Current_Loan_Term__c, 
                                           Description__c, Early_Payoff_Savings__c, Monthly_Payment_Savings__c, Most_Recent_Loan__c, New_Loan_Amount__c, New_Loan_Interest_Rate__c, 
                                           New_Loan_Monthly_Payment__c, New_Loan_Payment_To_Keep_Term__c, New_Loan_Term__c, Property__c, Same_Payment_Term_Reduction__c, Status__c,
                                           Loan_Type__c, X10_Yr_Treasury_Yield__c, Client_Link__c, Stay_On_Pace_Monthly_Savings__c, APR1__c, Stay_On_Pace_Monthly_Savings_Text__c, 
                                           Proposal_Name__c, Add_Fees_to_Loan_Balance__c, Adj_Price_1__c, Adj_Price_2__c, Adj_Price_3__c, Adj_Price_4__c, Adj_Price_5__c, 
                                           Adj_Price_6__c, Borrower_Name_Text__c, Current_Balance_Down_Payment__c, Est_Fees_Appraisal_Credit__c, Est_Fees_Lender__c, 
                                           Est_Fees_Title_Escrow__c, Est_First_Payment_Date__c, Estimate_Value__c, FICO_Score__c, Fixed_Term_Years__c, Global_Pricing_Adjuster__c, 
                                           Loan_Program__c, Lock_Period_Days__c, Monthly_PI_Pmt1__c, Monthly_PI_Pmt2__c, Monthly_PI_Pmt3__c, Monthly_PI_Pmt4__c, Monthly_PI_Pmt5__c,
                                           Monthly_PI_Pmt6__c, Orig__c, Origination_Fee__c, Prepared_Date__c, Price_1__c, Price_2__c, Price_3__c, Price_4__c, Price_5__c, 
                                           Price_6__c, APR2__c, Rate_1__c, Rate_2__c, Rate_3__c, Rate_4__c, Rate_5__c, Rate_6__c, Total_Cost_1__c, Total_Cost_2__c, Total_Cost_3__c, 
                                           Total_Cost_4__c, Total_Cost_5__c, Total_Cost_6__c, Total_Loan_Amount1__c, Total_Loan_Amount2__c, Total_Loan_Amount3__c, 
                                           Total_Loan_Amount4__c, Total_Loan_Amount5__c, Total_Loan_Amount6__c, APR3__c, Years_Until_BE1__c, Years_Until_BE2__c, Years_Until_BE3__c, 
                                           Years_Until_BE4__c, Years_Until_BE5__c, Years_Until_BE6__c, Years_Until_Breakeven1__c, Years_Until_Breakeven2__c, 
                                           Years_Until_Breakeven3__c, Years_Until_Breakeven4__c, Years_Until_Breakeven5__c, Property_State__c, Transaction_Type__c, APR4__c, APR5__c, 
                                           APR6__c, Purchase_Price__c, Appraised_Value__c, Override_Comp__c, Override_Min__c, Override_Max__c, Proposal_NameFRM__c, 
                                           Balance_Remaining_New__c, Years_Scenario_1__c, CLTV_Scenario_1__c, CLTV_Scenario_2__c, CLTV_Scenario_3__c, CoBorrower_Fico__c, 
                                           CoBorrower_Veteran__c, Current_Balance__c, Current_FHA__c, Current_Loan_Payments_Remaining_Text__c, Current_Payment__c, 
                                           Current_Program__c, Current_Rate__c, Current_Term__c, Daily_Interest_Savings_Scenario_1__c, Daily_Interest_Savings_Scenario_2__c, 
                                           Daily_Interest_Savings_Scenario_3__c, DownPaymentScenario1__c, DownPaymentScenario2__c, DownPaymentScenario3__c, 
                                           EstimatedFundstoCloseScenario1__c, EstimatedFundstoCloseScenario2__c, EstimatedFundstoCloseScenario3__c, EstimatedHOAScenario1__c, 
                                           EstimatedHOAScenario2__c, EstimatedHOAScenario3__c, EstimatedInsuranceScenario1__c, EstimatedInsuranceScenario2__c, 
                                           EstimatedInsuranceScenario3__c, EstimatedMortgageInsuranceScenario1__c, EstimatedMortgageInsuranceScenario2__c, 
                                           EstimatedMortgageInsuranceScenario3__c, EstimatedTaxesScenario1__c, EstimatedTaxesScenario2__c, EstimatedTaxesScenario3__c, 
                                           Estimated_Value__c, FeeScenario1__c, FeeScenario2__c, FeeScenario3__c, Fico__c, First_Loan_Amount_Scenario_1__c, 
                                           First_Loan_Amount_Scenario_2__c, First_Loan_Amount_Scenario_3__c, First_Time_Homebuyer__c, LTV_Scenario_1__c, LTV_Scenario_2__c, 
                                           LTV_Scenario_3__c, Lifetime_Savings_Scenario_1__c, Lifetime_Savings_Scenario_2__c, Lifetime_Savings_Scenario_3__c, 
                                           Loan_Program_Scenario_1__c, Loan_Program_Scenario_2__c, Loan_Program_Scenario_3__c, Maturity_Reduction_Scenario_1__c, 
                                           Maturity_Reduction_Scenario_2__c, Maturity_Reduction_Scenario_3__c, Monthly_Payment_Savings_Scenario_1__c, 
                                           Monthly_Payment_Savings_Scenario_2__c, Monthly_Payment_Savings_Scenario_3__c, Monthly_Payment_Scenario_1__c, Monthly_Payment_Scenario_2__c, 
                                           Monthly_Payment_Scenario_3__c, Number_of_Units__c, Occupancy__c, On_Pace_Payment_Scenario_1__c, On_Pace_Payment_Scenario_2__c, 
                                           On_Pace_Payment_Scenario_3__c, On_Pace_Savings_Scenario_1__c, On_Pace_Savings_Scenario_2__c, On_Pace_Savings_Scenario_3__c, 
                                           Payments_Remaining_Scenario_1__c, Payments_Remaining_Scenario_2__c, Payments_Remaining_Scenario_3__c, Purpose_Scenario_1__c, 
                                           Purpose_Scenario_2__c, Purpose_Scenario_3__c, Purpose__c, Qualifying_Fico__c, Rate_Scenario_1__c, Rate_Scenario_2__c, Rate_Scenario_3__c, 
                                           Second_Loan_Amount_Scenario_1__c, Second_Loan_Amount_Scenario_2__c, Second_Loan_Amount_Scenario_3__c, Subject_Property_Type__c, 
                                           Term_Due_Scenario_1__c, Term_Due_Scenario_2__c, Term_Due_Scenario_3__c, TotalMonthlyPaymentScenario1__c, TotalMonthlyPaymentScenario2__c, 
                                           TotalMonthlyPaymentScenario3__c, Total_Interest_Remaining_on_Current_Loan__c, Total_Interest_Scenario_1__c, Total_Interest_Scenario_2__c, 
                                           Total_Interest_Scenario_3__c, Veteran__c, Years_Remaining_on_Current_Loan__c, Years_Scenario_2__c, Years_Scenario_3__c, SolidifyContact__c, 
                                           NewMonthsPaidifcurrentpayment__c, Years_Until_Breakeven6__c, Scenario1Name__c, Scenario2Name__c, Scenario3Name__c, AppraisalFeeS1__c, 
                                           AppraisalFeeS2__c, AppraisalFeeS3__c, CreditReportFeeS1__c, CreditReportFeeS2__c, CreditReportFeeS3__c, DiscountCreditS1__c, 
                                           DiscountCreditS2__c, DiscountCreditS3__c, EscrowFeesS1__c, EscrowFeesS2__c, EscrowFeesS3__c, LenderFeeS1__c, LenderFeeS2__c, 
                                           LenderFeeS3__c, ProgramNameS1F__c, ProgramNameS1__c, ProgramNameS2F__c, ProgramNameS2__c, ProgramNameS3F__c, ProgramNameS3__c, 
                                           RecordingFeeS1__c, RecordingFeeS2__c, RecordingFeeS3__c, TitleFeeS1__c, TitleFeeS2__c, TitleFeeS3__c, TotalFeesS1__c, TotalFeesS2__c, 
                                           TotalFeesS3__c, APRScenario1__c, CancelMIAtS1__c, CancelMIAtS2__c, CancelMIAtS3__c, UFMIPFFS1__c, UFMIPFFS2__c, UFMIPFFS3__c, 
                                           AutofillFees__c, AutofillTIIH__c, LoanAmountwithUFMIPFFS1__c, LoanAmountwithUFMIPFFS2__c, LoanAmountwithUFMIPFFS3__c, APRScenario2__c, 
                                           APRScenario3__c, PaymentResultS1__c, PaymentResultS2__c, PaymentResultS3__c, CopytoScenarios2and3__c,
                                           SolidifyContact__r.Name, SolidifyContact__r.MediumPhotoUrl, SolidifyContact__r.ApplyNowwebsiteLink__c, SolidifyContact__r.MobilePhone, 
                                           ExcludeRate1__c, ExcludeRate2__c, ExcludeRate3__c,ExcludeRate4__c,ExcludeRate5__c,ExcludeRate6__c,
                                           PointsCredit1__c,PointsCredit2__c,PointsCredit3__c,PointsCredit4__c,PointsCredit5__c,PointsCredit6__c,StandardFees__c,
                                           RateCost1__c,RateCost2__c,RateCost3__c,RateCost4__c,RateCost5__c,RateCost6__c,
                                           SolidifyContact__r.Email, SolidifyContact__r.MLSNumber__c, Property__r.Property_Street__c, 
                                           TotalFees1__c, TotalFees2__c, TotalFees3__c, TotalFees4__c, TotalFees5__c, TotalFees6__c, 
                                           BorrowerName__c, PropertyAddressText__c, MI__c, MI_Percent__c, MI_CancelAtPercent__c, Escrow_Interest_Daily_Rate__c, 
                                           Escrow_Interest_Days__c, Escrow_Interest_Total__c, Escrow_Taxes_Monthly_Rate__c, Escrow_Taxes_Total__c, Escrow_Ins_Monthly_Rate__c, 
                                           Escrow_Ins_Months__c, Escrow_Insurance_Total__c, FFMIP__c,
                                           TotalLoanWithFFMIP1__c,TotalLoanWithFFMIP2__c,TotalLoanWithFFMIP3__c,TotalLoanWithFFMIP4__c,
                                           TotalLoanWithFFMIP5__c,TotalLoanWithFFMIP6__c, Hide_Funds_To_Close_Client_View__c,
                                           CashDeposit1__c, CashDeposit2__c, CashDeposit3__c, SellerCredit1__c, SellerCredit2__c, SellerCredit3__c,
                                           OtherDueAtCloseS1__c,OtherDueAtCloseS2__c,OtherDueAtCloseS3__c,
                                           Purchase_Price_S1__c, Purchase_Price_S2__c, Purchase_Price_S3__c,
                                           FFMIP1__c,FFMIP2__c,FFMIP3__c,FFMIP4__c,FFMIP5__c,FFMIP6__c,FF_MIP_Percent__c, Add_FFMIP_To_Loan__c, Escrow_Taxes_Months__c
            	FROM Proposal__c WHERE Id=:recordId];
                return proposalRec;
        }
        
        @AuraEnabled(cacheable=true)
        public static Proposal__c getRateAnalysisProposalInfo(Id recordId){
                system.debug('***recordId = ' + recordId);
                Proposal__c ProposalRec = [SELECT Id, OwnerId, Name, RecordTypeId, CreatedDate, CreatedById,  
                                           Account__c, Borrower_Lead__c, Borrower__c, Property__c, Status__c,
                                           Loan_Type__c, X10_Yr_Treasury_Yield__c, Purchase_Price__c, Appraised_Value__c, 
                                           Proposal_Name__c, Add_Fees_to_Loan_Balance__c, New_Loan_Amount__c,
                                           Adj_Price_1__c, Adj_Price_2__c, Adj_Price_3__c, Adj_Price_4__c, Adj_Price_5__c, 
                                           Adj_Price_6__c, Borrower_Name_Text__c, Current_Balance_Down_Payment__c, 
                                           Hide_Escrows_Client_View__c, Hide_Funds_To_Close_Client_View__c,
                                           Est_Fees_Appraisal_Credit__c, Est_Fees_Lender__c, Est_Fees_Title_Escrow__c, Est_First_Payment_Date__c, Estimate_Value__c, FICO_Score__c, Fixed_Term_Years__c, Global_Pricing_Adjuster__c, 
                                           Loan_Program__c, Lock_Period_Days__c, Monthly_PI_Pmt1__c, Monthly_PI_Pmt2__c, Monthly_PI_Pmt3__c, Monthly_PI_Pmt4__c, Monthly_PI_Pmt5__c,
                                           Monthly_PI_Pmt6__c, Orig__c, Origination_Fee__c, Prepared_Date__c, 
                                           Price_1__c, Price_2__c, Price_3__c, Price_4__c, Price_5__c, Price_6__c, 
                                           Rate_1__c, Rate_2__c, Rate_3__c, Rate_4__c, Rate_5__c, Rate_6__c, 
                                           Total_Cost_1__c, Total_Cost_2__c, Total_Cost_3__c, Total_Cost_4__c, Total_Cost_5__c, Total_Cost_6__c, 
                                           Total_Loan_Amount1__c, Total_Loan_Amount2__c, Total_Loan_Amount3__c, Total_Loan_Amount4__c, Total_Loan_Amount5__c, Total_Loan_Amount6__c, 
                                           Years_Until_BE1__c, Years_Until_BE2__c, Years_Until_BE3__c, Years_Until_BE4__c, Years_Until_BE5__c, Years_Until_BE6__c, 
                                           Years_Until_Breakeven1__c, Years_Until_Breakeven2__c, Years_Until_Breakeven3__c, Years_Until_Breakeven4__c, Years_Until_Breakeven5__c, Years_Until_Breakeven6__c, 
                                           Property_State__c, Transaction_Type__c, 
                                           APR1__c, APR2__c, APR3__c, APR4__c, APR5__c, APR6__c, 
                                           Override_Comp__c, Override_Min__c, Override_Max__c, 
                                           Balance_Remaining_New__c, Estimated_Value__c, Fico__c, Number_of_Units__c, Occupancy__c, Purpose__c, Qualifying_Fico__c, 
                                           Subject_Property_Type__c, 
                                           SolidifyContact__c, SolidifyContact__r.Name, SolidifyContact__r.MediumPhotoUrl, SolidifyContact__r.ApplyNowwebsiteLink__c, SolidifyContact__r.MobilePhone, 
                                           ExcludeRate1__c, ExcludeRate2__c, ExcludeRate3__c,ExcludeRate4__c,ExcludeRate5__c,ExcludeRate6__c,
                                           PointsCredit1__c,PointsCredit2__c,PointsCredit3__c,PointsCredit4__c,PointsCredit5__c,PointsCredit6__c,StandardFees__c,
                                           RateCost1__c,RateCost2__c,RateCost3__c,RateCost4__c,RateCost5__c,RateCost6__c,
                                           SolidifyContact__r.Email, SolidifyContact__r.MLSNumber__c, Property__r.Property_Street__c, 
                                           TotalFees1__c, TotalFees2__c, TotalFees3__c, TotalFees4__c, TotalFees5__c, TotalFees6__c, 
                                           BorrowerName__c, PropertyAddressText__c, MI__c, MI_Percent__c, MI_CancelAtPercent__c, Escrow_Interest_Daily_Rate__c, 
                                           Escrow_Interest_Days__c, Escrow_Interest_Total__c, Escrow_Taxes_Monthly_Rate__c, Escrow_Taxes_Total__c, Escrow_Ins_Monthly_Rate__c, 
                                           Escrow_Ins_Months__c, Escrow_Insurance_Total__c, FFMIP__c,
                                           TotalLoanWithFFMIP1__c,TotalLoanWithFFMIP2__c,TotalLoanWithFFMIP3__c,TotalLoanWithFFMIP4__c, TotalLoanWithFFMIP5__c,TotalLoanWithFFMIP6__c,
                                           FFMIP1__c,FFMIP2__c,FFMIP3__c,FFMIP4__c,FFMIP5__c,FFMIP6__c,FF_MIP_Percent__c, Add_FFMIP_To_Loan__c,
                                           Simple_Breakeven__c, Breakeven_Scenario1_Simple__c, Breakeven_Scenario2_Simple__c, Breakeven_Scenario3_Simple__c,
                                           Breakeven_Scenario4_Simple__c, Breakeven_Scenario5_Simple__c, Other__c
            	FROM Proposal__c WHERE Id=:recordId];
                return proposalRec;
        }

        @AuraEnabled(cacheable=true)
        public static Contact getContactInfo(Id recordId){
                system.debug('***recordId = ' + recordId);
                Contact contactRec = [SELECT Id, IsDeleted, MasterRecordId, AccountId, LastName, FirstName, Salutation, MiddleName, Suffix, Name, OtherStreet, OtherCity, OtherState, OtherPostalCode, OtherCountry, OtherLatitude, OtherLongitude, OtherGeocodeAccuracy, OtherAddress, MailingStreet, MailingCity, MailingState, MailingPostalCode, MailingCountry, MailingLatitude, MailingLongitude, MailingGeocodeAccuracy, MailingAddress, Phone, Fax, MobilePhone, HomePhone, OtherPhone, AssistantPhone, ReportsToId, Email, Title, Department, AssistantName, LeadSource, Birthdate, Description, OwnerId, HasOptedOutOfEmail, HasOptedOutOfFax, DoNotCall, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastCURequestDate, LastCUUpdateDate, LastViewedDate, LastReferencedDate, EmailBouncedReason, EmailBouncedDate, IsEmailBounced, PhotoUrl, Jigsaw, JigsawContactId, IndividualId, Employer_Name__c, Years_on_Job__c, Business_Phone__c, Nickname__c, Home_Phone__c, Referred_by__c, MC4SF__MC_Subscriber__c, FICO__c, Last_Completed_Activity_Text__c, Age__c, Role__c, Income__c, dupcheck__dc3DisableDuplicateCheck__c, dupcheck__dc3Index__c, Email_2__c, Type__c, CLTV_Scenario_1__c, rh2__Currency_Test__c, rh2__Describe__c, rh2__Formula_Test__c, rh2__Integer_Test__c, Veteran__c, Present_Address__c, Present_Address_City__c, Present_Address_State__c, Present_Address_Zip__c, Gender__c, Race__c, Ethnicity__c, Contact_Identifier__c, Next_Birthdate__c, zCurrent_Weekday__c, Days_Since_Last_Activity__c, HubSpot_Score__c, MD_Phone__c, MD_Email__c, MD_First_Name__c, MD_Last_Name__c, MD_Birthdate__c, MD_Date_of_Death__c, MD_Mailing_Street__c, MD_Mailing_City__c, MD_Mailing_State__c, MD_Mailing_Postal_Code__c, MD_Mailing_Country__c, Ad_Consented__c, pi__Needs_Score_Synced__c, pi__Pardot_Last_Scored_At__c, pi__campaign__c, pi__comments__c, pi__conversion_date__c, pi__conversion_object_name__c, pi__conversion_object_type__c, pi__created_date__c, pi__first_activity__c, pi__first_search_term__c, pi__first_search_type__c, pi__first_touch_url__c, pi__grade__c, pi__last_activity__c, pi__notes__c, pi__pardot_hard_bounced__c, pi__score__c, pi__url__c, pi__utm_campaign__c, pi__utm_content__c, pi__utm_medium__c, pi__utm_source__c, pi__utm_term__c, Loan_Originator_User__c, smagicinteract__SMSOptOut__c, Opt_Out_ECOA_Info__c, Years_in_Work__c, Service_Branch__c, Greeting_Name__c, Recent_Task_Count__c, Income_Sources__c, Future_Tasks__c, Future_Events__c, Zillow_Link__c, Solidify_Score__c, ContactNo__c, Last_Event_Description__c, Future_Activities__c, Contact_Status__c, Referred_By_Text_Value__c, LH__Currency_Test__c, LH__Formula_Test__c, AccountName__c, Loan_Originator__c, Current_Balance__c, Current_Loan_Payments_Remaining__c, Current_Payment__c, Current_Program__c, Current_Rate__c, Daily_Interest_Savings_Scenario_1__c, Estimated_Value__c, First_Loan_Amount_Scenario_1__c, LTV_Scenario_1__c, Lifetime_Savings_Scenario_1__c, Loan_Program_Scenario_1__c, Maturity_Reduction_Scenario_1__c, Monthly_Payment_Savings_Scenario_1__c, Monthly_Payment_Scenario_1__c, Number_of_Units__c, Occupancy__c, On_Pace_Payment_Scenario_1__c, On_Pace_Savings_Scenario_1__c, Payments_Remaining_Scenario_1__c, Purpose_Scenario_1__c, Purpose_Scenario_2__c, Purpose_Scenario_3__c, Rate_Scenario_1__c, Subject_Property_Type__c, Term_Due_Scenario_1__c, Years_Remaining_on_Current_Loan__c, CLTV_Scenario_2__c, CLTV_Scenario_3__c, Daily_Interest_Savings_Scenario_2__c, Daily_Interest_Savings_Scenario_3__c, LTV_Scenario_2__c, LTV_Scenario_3__c, Lifetime_Savings_Scenario_2__c, Lifetime_Savings_Scenario_3__c, Loan_Amount_Scenario_2__c, Loan_Amount_Scenario_3__c, Loan_Program_Scenario_2__c, Loan_Program_Scenario_3__c, Maturity_Reduction_Scenario_2__c, Maturity_Reduction_Scenario_3__c, Monthly_Payment_Savings_Scenario_2__c, Monthly_Payment_Savings_Scenario_3__c, Monthly_Payment_Scenario_2__c, Monthly_Payment_Scenario_3__c, On_Pace_Payment_Scenario_2__c, On_Pace_Payment_Scenario_3__c, On_Pace_Savings_Scenario_2__c, On_Pace_Savings_Scenario_3__c, Payments_Remaining_Scenario_2__c, Payments_Remaining_Scenario_3__c, AppraisalFeeS1__c, AppraisalFeeS2__c, Term_Due_Scenario_2__c, Term_Due_Scenario_3__c, ScenarioType__c, LoanComparison__c, SelectedProperty__c, PropertyOccupancy__c, PropertyType__c, PropertyNumberofUnits__c, PropertyEstimatedValue__c, PropertyPurpose__c, PropertyPurchasePrice__c, PropertyAppraisedValue__c, PropertyLoanAmountwithMIP__c, PropertyLTV__c, PropertyMostRecentClosing__c, PropertyDayssinceRecentClosing__c, PropertyLender__c, PropertyLoanProgram__c, PropertyRate__c, PropertyScheduledBalance__c, PropertyPaymentAmount__c, DownPaymentScenario1__c, DownPaymentScenario2__c, DownPaymentScenario3__c, EstimatedFundstoCloseScenario1__c, EstimatedFundstoCloseScenario2__c, EstimatedFundstoCloseScenario3__c, EstimatedHOAScenario1__c, EstimatedHOAScenario2__c, EstimatedHOAScenario3__c, EstimatedInsuranceScenario1__c, EstimatedInsuranceScenario2__c, EstimatedInsuranceScenario3__c, EstimatedMortgageInsuranceScenario1__c, EstimatedMortgageInsuranceScenario2__c, EstimatedMortgageInsuranceScenario3__c, EstimatedTaxesScenario1__c, EstimatedTaxesScenario2__c, EstimatedTaxesScenario3__c, FeeScenario1__c, FeeScenario2__c, FeeScenario3__c, TotalMonthlyPaymentScenario1__c, TotalMonthlyPaymentScenario2__c, TotalMonthlyPaymentScenario3__c, Total_Interest_Scenario_1__c, Total_Interest_Scenario_2__c, Total_Interest_Scenario_3__c, Purpose__c, RateScenario2__c, RateScenario3__c, AppraisalFeeS3__c, CreditReportFeeS1__c, CreditReportFeeS2__c, CreditReportFeeS3__c, DiscountCreditS1__c, DiscountCreditS2__c, DiscountCreditS3__c, EscrowFeesS1__c, EscrowFeesS2__c, EscrowFeesS3__c, LenderFeeS1__c, LenderFeeS2__c, LenderFeeS3__c, ProgramNameS1F__c, ProgramNameS1__c, ProgramNameS2F__c, ProgramNameS2__c, ProgramNameS3F__c, ProgramNameS3__c, RecordingFeeS1__c, RecordingFeeS2__c, RecordingFeeS3__c, TitleFeeS1__c, TitleFeeS2__c, TitleFeeS3__c, TotalFeesS1__c, TotalFeesS2__c, TotalFeesS3__c, AutofillFees__c, AutofillTIIH__c, CopytoScenarios2and3__c, APRScenario1__c, CancelMIAtS1__c, CancelMIAtS2__c, CancelMIAtS3__c, UFMIPFFS1__c, UFMIPFFS2__c, UFMIPFFS3__c, Years_Scenario_1__c, Years_Scenario_2__c, Years_Scenario_3__c, LoanAmountwithUFMIPFFS1__c, First_Loan_Amount_Scenario_2__c, First_Loan_Amount_Scenario_3__c, LoanAmountwithUFMIPFFS2__c, LoanAmountwithUFMIPFFS3__c, APRScenario2__c, APRScenario3__c, PaymentResultS1__c, PaymentResultS2__c, PaymentResultS3__c,
                SolidifyContact__r.Name, SolidifyContact__r.MediumPhotoUrl, SolidifyContact__r.ApplyNowwebsiteLink__c, SolidifyContact__c, SolidifyContact__r.MobilePhone,
                SolidifyContact__r.Email, selectedProperty__r.Property_Street__c, SolidifyContact__r.MLSNumber__c FROM Contact WHERE Id=:recordId];
                return contactRec;
        }
        
        @AuraEnabled(cacheable=true)
        public static Proposal__c getChartData(String recordId){
                Proposal__c returnChartData = [SELECT Id, Monthly_Payment_Scenario_1__c, EstimatedTaxesScenario1__c, 
                EstimatedInsuranceScenario1__c, EstimatedMortgageInsuranceScenario1__c, EstimatedHOAScenario1__c 
                FROM Proposal__c WHERE Id = :recordId];
                return returnChartData;
        }
        @AuraEnabled(cacheable=true)
        public static sObject getRecordForProp(String recordId, String rObject){
                system.debug('***recordId = ' + recordId);
                system.debug('***rObject = ' + rObject);
                if(rObject == 'Lead'){
                        List<sObject> recordData = Database.query('SELECT Id, Name, Status FROM '+rObject+'  WHERE Id = \'' + recordId + '\' LIMIT 1');
                        return recordData.get(0);
                }
                else if(rObject == 'Contact'){
                        List<sObject> recordData = Database.query('SELECT Id, Name FROM '+rObject+'  WHERE Id = \'' + recordId + '\' LIMIT 1');
                        return recordData.get(0);
                }
                else if(rObject == 'Opportunity'){
                        List<sObject> recordData =Database.query('SELECT Id, ContactId,Contact.Name, Opportunity.Subject_Property_Name__c FROM OpportunityContactRole WHERE OpportunityId = \'' + recordId + '\' AND Role=\'Borrower\' LIMIT 1');

                        return recordData.get(0);
                }
                return null;
        }
    
    	@AuraEnabled(cacheable=true)
        public static sObject getRecordDataProp(String recordId, String rObject){
                system.debug('***recordId = ' + recordId);
                system.debug('***rObject = ' + rObject);
                if(rObject == 'Lead'){
                        List<sObject> recordData = Database.query('SELECT Id, Name, Taxes__c, HOA__c, Hazard_Insurance__c, Purpose__c, Occupancy__c, Number_of_Units__c, Estimated_Value__c, Current_Program__c, Current_Balance__c, Current_Rate__c, Current_Payment__c FROM Lead  WHERE Id = \'' + recordId + '\' LIMIT 1');
                        return recordData.get(0);
                }
                /*else if(rObject == 'Contact'){
                        List<sObject> recordData = Database.query('SELECT Id, Name FROM Contact WHERE Id = \'' + recordId + '\' LIMIT 1');
                        return recordData.get(0);
                }
                else if(rObject == 'Opportunity'){
                        List<sObject> recordData =Database.query('SELECT Id, ContactId,Contact.Name FROM Opportunity WHERE Id = \'' + recordId + '\' LIMIT 1');

                        return recordData.get(0);
                }*/
                return null;
        }
 
 
}