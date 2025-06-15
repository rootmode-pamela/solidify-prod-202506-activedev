public with sharing class ResearchSearchController {
//test by solidify_researchSearchController_Test
//
    @AuraEnabled
    public static list<Properties__c> getPropertyLoans(String LoanType, String LoanProg, String InterestRate, String MinFico, String MaxFico, String MinSchedBal, String MaxSchedBal, String LoanPurpose, String LoanOccupancy, String LoanOriginator, String EarliestDate, String LatestDate, String MinDaysClosed, String sortby, String sortOrder){
        system.debug(LoanType);
        system.debug(EarliestDate);
        system.debug(LatestDate);
        String query = 'SELECT Id, Name, Household__c, Household__r.Name, Most_Recent_Closed_Opportunity__c, Most_Recent_Closed_Opportunity__r.Name, Most_Recent_Closed_Opportunity__r.Subject_Prop_Street__c, Most_Recent_Closed_Opportunity__r.Occupancy__c, '
            + 'Property_Type__c , Number_of_Units__c , Most_Recent_Closed_Opportunity__r.Loan_Type__c, Most_Recent_Closed_Opportunity__r.Loan_Program__c, Most_Recent_Closed_Opportunity__r.Current_Schedule_Balance__c, ' 
            + 'Most_Recent_Closed_Opportunity__r.Interest_Rate__c , Qual_Fico__c, LTV_of_Most_Recent_Closing__c, CLTV_of_Most_Recent_Closed_Loan__c, ' 
            + 'Lender_of_Most_Recent_Closing__c , Most_Recent_Closed_Opportunity__r.Days_Closed__c, Most_Recent_Closed_Opportunity__r.CloseDate, Most_Recent_Closed_Opportunity__r.First_Payment__c, ' 
            + 'Most_Recent_Closed_Opportunity__r.Borrower_Record__c, Most_Recent_Closed_Opportunity__r.Borrower_Record__r.Name '
            + 'FROM Properties__c '
            + 'WHERE Most_Recent_Closed_Opportunity__r.StageName = \'Closed Won\' AND Property_Disposition__c != \'Pending Sale\' AND Property_Disposition__c != \'Sold\'';
            system.debug(query);
        /*
		String query = 'SELECT Id, Name, Property_Disposition__c, Household__r.Name, Most_Recent_Closed_Opportunity__c, Most_Recent_Closed_Opportunity__r.CloseDate,' 
            + 'Most_Recent_Closed_Opportunity__r.Loan_Type__c, Most_Recent_Closed_Opportunity__r.Purpose__c, Most_Recent_Closed_Opportunity__r.Occupancy__c,' 
            + 'Most_Recent_Closed_Opportunity__r.Loan_Amount__c, Most_Recent_Closed_Opportunity__r.Interest_Rate__c, Most_Recent_Closed_Opportunity__r.Loan_Originator__c, '
            + 'Most_Recent_Closed_Opportunity__r.Current_Schedule_Balance__c, Most_Recent_Closed_Opportunity__r.Borrower_Fico__c '
            + 'Most_Recent_Closed_Opportunity__r.Borrower_Record__c, Most_Recent_Closed_Opportunity__r.Borrower_Record__r.Name '
            + 'FROM Properties__c '
            + 'WHERE Most_Recent_Closed_Opportunity__r.StageName = \'Closed Won\' AND Property_Disposition__c != \'Sold\'';
            system.debug(query);'
		*/
        if (!(String.IsBlank(LoanType) && String.IsBlank(LoanProg) && String.IsBlank(InterestRate) && String.IsBlank(LoanPurpose) && String.IsBlank(LoanOccupancy) &&
              String.IsBlank(MinFico) && String.IsBlank(MaxFico) && String.IsBlank(MinSchedBal) && String.IsBlank(MaxSchedBal) &&
              String.IsBlank(LoanOriginator) && String.IsBlank(EarliestDate) && String.IsBlank(LatestDate))) {
                  system.debug('adding to query');
            if (!String.IsBlank(LoanType) ){
                query = query + ' AND Most_Recent_Closed_Opportunity__r.Loan_Type__c = :LoanType ';
            }
            if (!String.IsBlank(LoanProg) ){
                query = query + ' AND Most_Recent_Closed_Opportunity__r.Loan_Program__c = :LoanProg ';
            }
            if (!String.IsBlank(LoanPurpose)){
                query = query + ' AND Most_Recent_Closed_Opportunity__r.Purpose__c = :LoanPurpose ';
            }
            if (!String.IsBlank(LoanOccupancy)){
                system.debug(LoanOccupancy);
                query = query + ' AND Most_Recent_Closed_Opportunity__r.Occupancy__c = :LoanOccupancy ';
            }
            if (!String.IsBlank(LoanOriginator)){
                query = query + ' AND Most_Recent_Closed_Opportunity__r.Loan_Originator__c = :LoanOriginator ';
            }
            if (!String.IsBlank(InterestRate)){
                system.debug(InterestRate);
                decimal IR = decimal.valueOf(InterestRate);
                query = query + ' AND Most_Recent_Closed_Opportunity__r.Interest_Rate__c >= :IR ';
            }
            if (!String.IsBlank(MinFico)){
                integer mnFico = integer.valueOf(MinFico);
                query = query + ' AND Most_Recent_Closed_Opportunity__r.Borrower_Fico__c >= :MnFico ';
            }
            if (!String.IsBlank(MaxFico)){
                integer mxFico = integer.valueOf(MaxFico);
                query = query + ' AND Most_Recent_Closed_Opportunity__r.Borrower_Fico__c <= :MxFico ';
            }
            if (!String.IsBlank(MinSchedBal)){
                integer mnBal = integer.valueOf(MinSchedBal);
                query = query + ' AND Most_Recent_Closed_Opportunity__r.Current_Schedule_Balance__c >= :MnBal ';
            }
            if (!String.IsBlank(MaxSchedBal)){
                integer mxBal = integer.valueOf(MaxSchedBal);
                query = query + ' AND Most_Recent_Closed_Opportunity__r.Current_Schedule_Balance__c <= :MxBal ';
            }
            if (!String.IsBlank(EarliestDate)){
                system.debug(EarliestDate);
                date Earliest = Date.valueOf(EarliestDate);
                query = query + ' AND Most_Recent_Closed_Opportunity__r.CloseDate >= :Earliest ';
            }
            if (!String.IsBlank(LatestDate) ){
                date Latest = Date.valueOf(LatestDate);
                query = query + ' AND Most_Recent_Closed_Opportunity__r.CloseDate <= :Latest ';
            }
            if (!String.IsBlank(MinDaysClosed) ){
                integer minClose = integer.valueOf(MinDaysClosed);
                query = query + ' AND Most_Recent_Closed_Opportunity__r.Days_Closed__c >= :minClose ';
            }
        }

        System.debug('@@@ sortOrder: ' + sortOrder);
        System.debug('@@@ sortby: ' + sortby);
        if( sortby != NULL && sortOrder != NULL  ){
            String finalSortBy = getSoryByField(sortby);
            query += ' ORDER BY '+ finalSortBy+' '+ sortOrder+' NULLS LAST';

            System.debug('@@@ query: ' + query);
        }

        return Database.query(query);
    }

    public static String getSoryByField(String sortby){
        switch on sortby {
            when 'householdName' {
                return 'Household__r.Name';
            }
            when 'loanFileName' {
                return 'Most_Recent_Closed_Opportunity__r.Name';
            }
            when 'subjectPropStreet' {
                return 'Most_Recent_Closed_Opportunity__r.Subject_Prop_Street__c';
            }
            when 'occupancy' {
                return 'Most_Recent_Closed_Opportunity__r.Occupancy__c';
            }
            when 'loanType' {
                return 'Most_Recent_Closed_Opportunity__r.Loan_Type__c';
            }
            when 'loanProgram' {
                return 'Most_Recent_Closed_Opportunity__r.Loan_Program__c';
            }
            when 'scheduleBal' {
                return 'Most_Recent_Closed_Opportunity__r.Current_Schedule_Balance__c';
            }
            when 'interestRate' {
                return 'Most_Recent_Closed_Opportunity__r.Interest_Rate__c';
            }
            when 'daysClosed' {
                return 'Most_Recent_Closed_Opportunity__r.Days_Closed__c';
            }
            when 'closeDate' {
                return 'Most_Recent_Closed_Opportunity__r.CloseDate';
            }
            when 'firstPayment' {
                return 'Most_Recent_Closed_Opportunity__r.First_Payment__c';
            }
            when 'Property_Type__c' {
                return 'Property_Type__c';
            }
            when 'Number_of_Units__c' {
                return 'Number_of_Units__c';
            }
            when 'Qual_Fico__c' {
                return 'Qual_Fico__c';
            }
            when 'Lender_of_Most_Recent_Closing__c' {
                return 'Lender_of_Most_Recent_Closing__c';
            }
            when else {
                return 'Household__r.Name';
            }
        }
    }
    
    @AuraEnabled
    public static list<String> getProposalTypes(){
        list<String> proposalTypes = new list<string>();
        proposalTypes.add('Refi');
        
        return proposalTypes;
    }
    
    @AuraEnabled
    public static list<String> getLoanTypes(){
        list<String> pickListValuesList = new list<String>();
        Schema.DescribeFieldResult fieldResult = Opportunity.Loan_Type__c.getDescribe();
		List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
		for( Schema.PicklistEntry pickListVal : ple){
			pickListValuesList.add(pickListVal.getLabel());
		}     
		return pickListValuesList;

    }
    
    @AuraEnabled
    public static list<String> getLoanPrograms(){
        list<String> pickListValuesList = new list<String>();
        Schema.DescribeFieldResult fieldResult = Opportunity.Loan_Program__c .getDescribe();
		List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
		for( Schema.PicklistEntry pickListVal : ple){
			pickListValuesList.add(pickListVal.getLabel());
		}     
		return pickListValuesList;

    }
    
    @AuraEnabled
    public static list<String> getLoanPurposes(){
        list<String> pickListValuesList = new list<String>();
        Schema.DescribeFieldResult fieldResult = Opportunity.Purpose__c.getDescribe();
		List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
		for( Schema.PicklistEntry pickListVal : ple){
			pickListValuesList.add(pickListVal.getLabel());
		}     
		return pickListValuesList;
    }
    
    @AuraEnabled
    public static list<String> getLoanOccupancies(){
       list<String> pickListValuesList = new list<String>();
        Schema.DescribeFieldResult fieldResult = Opportunity.Occupancy__c.getDescribe();
		List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
		for( Schema.PicklistEntry pickListVal : ple){
			pickListValuesList.add(pickListVal.getLabel());
		}     
		return pickListValuesList;
    }
    
    @auraEnabled
    public static list<String> getLoanOriginators(){
      list<String> pickListValuesList = new list<String>();
   /*      Schema.DescribeFieldResult fieldResult = Opportunity.Loan_Originator__c.getDescribe();
		List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
		for( Schema.PicklistEntry pickListVal : ple){
			pickListValuesList.add(pickListVal.getLabel());
		}     */
        List<AggregateResult> results = [SELECT Loan_Originator__c FROM Opportunity GROUP BY Loan_Originator__c];
        for (AggregateResult r: results){
           pickListValuesList.add((String)r.get('Loan_Originator__c'));
        }
		return pickListValuesList;
    }
    
}