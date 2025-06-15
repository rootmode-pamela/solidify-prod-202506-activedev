public class LeadTriggerHelper {

    
    public static Lead replaceCompany(Lead l){
         if(String.IsBlank(l.CoBorrower_FirstName__c) && String.IsBlank(l.CoBorrower_LastName__c)){
                    l.Company = l.FirstName + ' ' + l.LastName + ' - Household';
                } else {
                    l.Company = l.FirstName + ' ' + l.LastName + ' - ' +  l.CoBorrower_FirstName__c + ' ' + l.CoBorrower_LastName__c + ' Household' ;
                }
        return l;
    }
    
}