/**
 * @description       : Handles trigger processing for all Proposal recordtypes.
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 05-09-2022
 * @last modified by  : Pamela White
 * Change log         : Consolidated all triggers and handlers, moved calculations to Util function, ripped out redundant code 
**/
public class ProposalTriggerHandler {
    
    public static void afterInsertUpdate(Set<Id> proposalIds, Map<Id, Proposal__c> oldProposalMap){
        List<Proposal__c> proposals = [SELECT Id, RecordType.DeveloperName FROM Proposal__c WHERE Id IN: proposalIds];
        
        List<String> refis = new List<String>();
        List<String> rateAnalyses = new List<String>();
        List<String> loanComparison = new List<String>();
        for(Proposal__c p: proposals){
            system.debug(p.recordTypeId);
            if(p.recordTypeId == Constants.REFI_PROPOSAL_RECORDTYPEID){
                refis.add(p.id);
            }
            if(p.recordTypeId == Constants.RATE_ANALYSIS_RECORDTYPEID){
                rateAnalyses.add(p.id);
            }
            if(p.recordTypeId == Constants.LOAN_COMP_RECORDTYPEID ){
                loanComparison.add(p.id);
            }
        }
        if(refis.size()>0){
           solidifyRefiAnalysisCalcs.afterCalcs(refis);  
        }
        if(rateAnalyses.size()>0){
	        solidifyRateAnalysisCalcs.afterCalcs(rateAnalyses);
        }
        if(loanComparison.size()>0){
            solidifyLoanComparisonCalcs.afterCalcs(loanComparison);
        }
   }
    
    public static void beforeUpdate(List<Proposal__c> proposals ){
        //calculations for refi proposals
        List<Proposal__c> refiProposals = new List<Proposal__c>();
        List<Proposal__c> rateAnalyses = new List<Proposal__c>();
        List<Proposal__c> loanComps = new List<Proposal__c>();
        for(Proposal__c p:proposals){
            system.debug(p.recordTypeId);
            if(p.recordTypeId == Constants.REFI_PROPOSAL_RECORDTYPEID){
                refiProposals.add(p);
            } else if (p.recordTypeId == Constants.LOAN_COMP_RECORDTYPEID ) {
                loanComps.add(p);
            } else if (p.recordTypeId == Constants.RATE_ANALYSIS_RECORDTYPEID) {
                rateAnalyses.add(p);
            }
        }

        if(trigger.IsInsert && loanComps.size()>0){
            loanComps = solidifyLoanComparisonCalcs.beforeInsertCalcs(loanComps);
        } else if(loanComps.size()>0){
            loanComps = solidifyLoanComparisonCalcs.beforeUpdateCalcs(loanComps);
        }
        
        if(refiProposals.size()>0){
            refiProposals = solidifyRefiAnalysisCalcs.beforeCalcs(refiProposals);
        }
        
        if(rateAnalyses.size()>0){
            rateAnalyses = solidifyRateAnalysisCalcs.beforeCalcs(rateAnalyses);
        }

    }

    public static void beforeInsert(List<proposal__c> proposals){

        List<String> borrowerIds = new List<String>();
        List<String> leadIds = new List<String>();
        List<String> oppIds = new List<String>();
        Map<String, RecordType> recordTypeMap = new Map<String, RecordType>([SELECT Id, Name FROM RecordType WHERE SobjectType = 'Proposal__c']);

        for (Proposal__c p: proposals){
            borrowerIds.add(p.Borrower__c);
            leadIds.add(p.Borrower_Lead__c);
            oppIds.add(p.Most_Recent_Loan__c);
        }
        
        Map<String, Contact> contacts;
        Map<String, Lead> leads;
        Map<String, OpportunityContactRole> loanContacts = new Map<String, OpportunityContactRole>();
        Map<String, Opportunity> opps = new Map<String, Opportunity>([SELECT Id,Current_Schedule_Balance__c FROM Opportunity WHERE Id IN :oppIds]);

        if(OppIds.size()>0){
            for( OpportunityContactRole ocr :[SELECT Id, OpportunityId, ContactId FROM OpportunityContactRole WHERE Role = 'Borrower' AND OpportunityId IN :oppIds]){
                 loanContacts.put(ocr.OpportunityId, ocr);
                 BorrowerIds.add(ocr.ContactId);
            }
        }

        if(BorrowerIds.size()>0){
            contacts = new Map<String, Contact>([SELECT Id, LastName, AccountId FROM Contact WHERE Id IN :borrowerIds]);
        }
        if(LeadIds.size()>0){
            leads = new Map<String, Lead>([SELECT Id, LastName FROM Lead WHERE Id IN :leadIds]);
        }

        for (Proposal__c p:proposals){
            String LastName = '';

            if(p.Most_Recent_Loan__c !=null && (p.RecordTypeId == Constants.RATE_ANALYSIS_RECORDTYPEID || p.RecordTypeId == Constants.LOAN_COMP_RECORDTYPEID )){
                p = transferDataFromLoan_CompAnalysis(p);
            }

            if(p.Borrower__c!=null){
                LastName = contacts.get(p.Borrower__c).LastName;
                p.Account__c = contacts.get(p.Borrower__c).AccountId;
            } else if (p.Most_Recent_Loan__c != null && loanContacts.containsKey(p.Most_Recent_Loan__c) ){
                LastName = contacts.get( loanContacts.get(p.Most_Recent_Loan__c).ContactId ).LastName;
                p.Account__c = contacts.get( loanContacts.get(p.Most_Recent_Loan__c).ContactId ).AccountId;
                p.New_Loan_Amount__c = opps.get( p.Most_Recent_Loan__c).Current_Schedule_Balance__c;
                p.First_Loan_Amount_Scenario_1__c = opps.get( p.Most_Recent_Loan__c).Current_Schedule_Balance__c;
                p.Total_Loan_Amount1__c =  opps.get( p.Most_Recent_Loan__c).Current_Schedule_Balance__c;
            } else if (p.Borrower_Lead__c !=null){
                LastName = leads.get(p.Borrower_Lead__c).LastName;
            } 
            
            if(p.Name == null || p.Name == String.valueOf(p.Id)){
                p.Name = LastName + ' - ' + recordTypeMap.get(p.recordTypeId).Name  + ' - ' + String.valueOf(Date.TODAY()) ;
            }

        }
    }

    public static Proposal__c transferDataFromLoan_CompAnalysis(Proposal__c p){
        List<ProposalSetting__mdt> settings = [SELECT Id, Value_1__c, Value_2__c 
                FROM ProposalSetting__mdt 
                WHERE Setting_Type__c = 'ComparisonAnalysisDefaultMapping'];
        Set<String> opportunityFields = new Set<String>();
        for(ProposalSetting__mdt s: settings){
                opportunityFields.add(s.Value_1__c);
        }
        String queryString = 'SELECT Id, ' + String.join(New List<String>(opportunityFields), ', ').removeEnd(', ') + ' FROM Opportunity WHERE Id = \'' + p.Most_Recent_Loan__c +'\'';
        system.debug(queryString);
        Opportunity loan = Database.Query(queryString);

        for(ProposalSetting__mdt s: settings){
            if(p.get(s.Value_2__c) == null || p.get(s.Value_2__c) == '' || p.get(s.Value_2__c)==0){
                p.put(s.Value_2__c, loan.get(s.Value_1__c));
            }
        }

        return p;

    }
}