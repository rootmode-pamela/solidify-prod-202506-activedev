public with sharing class solidify_leadConvert {

    private Lead currentLead;
    public Boolean noMatchingOpp{get; set;}
    public Boolean showOppFoundPanel{get;set;}
    public Boolean showAccountMatchPanel{get;set;}
    public Id selectedAccount{get;set;}
    public List<SelectOption> matchingAccountList{get;set;}
    public List<SelectOption> matchingContactsList{get;set;}
    public List<SelectOption> matchingOppsList{get;set;}
   	public String userInput{get;set;}
  	public Id selectedContact{get;set;}
    public Id selectedOppId{get;set;}
    public String accountName{get;set;}
    public String oppName{get;set;}
    public Boolean showLoanNameInput{get;set;}
    public String loanInput{get;set;}
    ApexPages.StandardController controller;

	public solidify_leadConvert(ApexPages.StandardController controller) {
    	this.controller = controller;
        showAccountMatchPanel= true;
        noMatchingOpp = false;
        showOppFoundPanel = false;
        String currentId = (String)Controller.getId();
   		currentLead = [SELECT Id, OwnerId, Name, DoNotCall, HasOptedOutOfEmail,HasOptedOutOfFax, Phone, Email, Fax, Company, Address,Description,MobilePhone, LeadSource, Title FROM Lead WHERE Id = :currentId];
    	userInput = currentLead.Company;
        String input = '%' + userInput + '%';
        List<Account> matching = [SELECT Id, Name FROM Account WHERE Name LIKE :userInput ];
        
        system.debug(matching);
        
        if(matching.size()==0){
            userInput = '';
            noMatchingOpp = true;
            showAccountMatchPanel = false;
        } else if(matching.size()==1){
            showLoanNameInput = false;
            selectedAccount = matching[0].id;
            matchingAccountList = new List<SelectOption>();
            matchingAccountList.add(new SelectOption (selectedAccount, matching[0].Name));
        	matchingOppsList = accountOpps(selectedAccount);
            
            if(matchingOppsList.size()==0){
            	noMatchingOpp = true;
                showAccountMatchPanel = false;
                userInput = '';
            } else {
            	matchingContactsList = accountContacts(selectedAccount);
            	system.debug(selectedAccount);
            	system.debug(matchingAccountList);
            }
        } else if (matching.size()>1){ 
            for(Account a: matching){
                matchingAccountList.add(new SelectOption(a.Id, a.Name));
            }
        }
    
    }
    
	public PageReference DoConvert(){
   		String sServerName = ApexPages.currentPage().getHeaders().get('Host');
    	sServerName = 'https://' + sServerName + '/';
    	System.debug(userInput);
     	Database.LeadConvert lc = new database.LeadConvert();
    	lc.setLeadId(currentLead.Id);
    	lc.setAccountId(selectedAccount);
    	LeadStatus convertStatus = [SELECT Id, MasterLabel FROM LeadStatus WHERE IsConverted=true LIMIT 1];
    	lc.setConvertedStatus(convertStatus.MasterLabel);
        lc.setOpportunityId(selectedOppId);
        lc.setContactId(selectedContact);
 
       	Database.LeadConvertResult lcr = Database.convertLead(lc);
        Id oId= lcr.getOpportunityId();
        PageReference pr = new PageReference(sServerName+oId);
          pr.setRedirect(true);
          return pr;
    }

	public static List<SelectOption> accountOpps(Id accountId){
        system.debug('accountOpps');
        List<SelectOption> oppSelections = new List<SelectOption>();
    	List<Opportunity> accountOpps = [SELECT Id, Name FROM Opportunity WHERE AccountId = :accountId AND IsClosed = False];    
            if(accountOpps.size()>0){
                for(Opportunity o: accountOpps){
                    oppSelections.add(new SelectOption(o.id, o.Name));
                }
			}
        system.debug(oppSelections);
        return oppSelections;
	}
    
   	public static List<SelectOption> accountContacts(Id accountId){
        List<SelectOption> conSelections = new List<SelectOption>();
    	List<Contact> contacts = [SELECT Id, Name FROM Contact WHERE AccountId = :accountId];   
            if(contacts.size()>0){
                for(Contact c: contacts){
                    conSelections.add(new SelectOption(c.id, c.Name));
                }
   
		}
        return conSelections;
	}
    
    public void doLoanSearch(){
        Opportunity[] opps = [SELECT Id, Name, AccountId, Account.Name, StageName FROM Opportunity WHERE Opportunity_Identifier__c = :userInput LIMIT 1];
        if(!(opps.size()==0)){
                noMatchingOpp = false;
            	showAccountMatchPanel = false;
            	showOppFoundPanel = true;
            	selectedOppId = opps[0].Id;
				selectedAccount = opps[0].AccountId;
            	oppName = opps[0].Name;
            	accountName = opps[0].Account.Name;
			    matchingContactsList = accountContacts(opps[0].AccountId);  
            } else {
                
            }
    }
}