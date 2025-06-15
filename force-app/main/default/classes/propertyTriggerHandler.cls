public class propertyTriggerHandler {
    
    public static void afterInsert(Set<id> propertyIds){
        /* --- Trigger is to solve a Point sync issue where a change in details on the Property creates a new Property
         * but cannot associate it with the Loan.  The result looks as though Property details do not sync since they're 
         * sync'ing to a newer un-associated Property record. ---*/
        Set<Id> accountIds = new Set<Id>();
        List<Opportunity> loansToUpdate = new List<Opportunity>();
        Map<String, Properties__c> newPropertiesMap = new Map<String, Properties__c>();
        List<Properties__c> newProperties  = [SELECT Id, Property_Street__c, HOusehold__c FROM Properties__c WHERE Id IN :propertyIds];
        List<Properties__c> propertiesToDelete = new List<Properties__c>();
        For(Properties__c prop: newProperties){
            accountIds.add(prop.Household__c);
            newPropertiesMap.put(prop.Property_Street__c, prop);
        }
       
        //get a list of potentially duplicate Properties - same accounts, different property Ids
        //create a map of Address, Property for comparison
        Map<String, Properties__c> existingPropertyMap = new Map<String, Properties__c>();
        Set<Id> existingPropertyIds = new Set<Id>();
        for(Properties__c prop : [SELECT Id, Property_Street__c, Household__c FROM Properties__c 
                                  WHERE Id NOT IN :PropertyIds AND Household__c IN :accountIds]){
                                      existingPropertyMap.put(prop.Property_Street__c, prop);
                                      existingPropertyIds.add(prop.id);
                                  }
        
        if(existingPropertyMap.size()>0){
            //create a map of PropertyId, related Opportunities for the potentially duplicated Properties
            Map<String, List<Opportunity>> propertyLoansMap = new Map<String, List<Opportunity>>();
            For (Opportunity opp: [SELECT Id, Subject_Property_Name__c FROM Opportunity WHERE Subject_Property_Name__c IN :existingPropertyIds AND IsClosed = FALSE]
        ){
            if(propertyLoansMap.containsKey(opp.Subject_Property_Name__c)){
                //get the list of loans from propertyLoansMap and add this Opp
                List<opportunity> loanOpps = propertyLoansMap.get(opp.Subject_Property_Name__c);
                loanOpps.add(opp);
                propertyLoansMap.put(opp.Subject_Property_Name__c, loanOpps);
            } else {
                List<Opportunity> loanOpps = new LIst<Opportunity>();
                loanOpps.add(opp);
                propertyLoansMap.put(opp.Subject_Property_Name__c, loanOpps);
            }
                
        }
        
            //For each existing property, if a new prop with matching street exists and there are loans,
            //replace the loan Subject Property.  And then delete the old property.
        	For(properties__c prop: existingPropertyMap.values()){
           		if(propertyLoansMap.containsKey(prop.Id) && newPropertiesMap.containsKey(prop.Property_Street__c)){
                    for(Opportunity o: propertyLoansMap.get(prop.id)){
                        o.Subject_Property_Name__c = newPropertiesMap.get(prop.Property_Street__c).Id;
                        loansToUpdate.add(o);
                        prop.Current_Opportunity__c = o.id;
                    }
                	propertiesToDelete.add(existingPropertyMap.get(prop.Property_Street__c));
					
            	}
            }
            try{
            	update loansToUpdate;
            	delete propertiesToDelete;             
            }
            catch (exception e){
                system.debug(e.getMessage());
            }
           }
        
    }

}