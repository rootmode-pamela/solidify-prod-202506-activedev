public class fieldHistoryController {

    @auraEnabled
    public static List<sObject> getFieldHistory(string sObjectName, string recordId, string fieldName, string commaDelimitedFieldNames, string additionalFilter, integer returnLimit) {
       	String additionalFilterText;
        String limitText;
        String sObjectFieldHistoryName;
        String sObjectIdName;
        
        if (additionalFilterText==''){
        	additionalFilterText = 'AND ' + additionalFilter;    
        } else {
            additionalFilterText = '';}
        if (returnLimit==null){
               limitText = '';
        } else {
        	limitText = 'LIMIT ' + String.valueOf(returnLimit); 
        } 
        sObjectFieldHistoryName = sobjectName + 'FieldHistory';
        sObjectIdName = sObjectName + 'Id';
                
        String query = 'SELECT ' + commaDelimitedFieldNames + ' FROM ' + sObjectFieldHistoryName + 
            ' WHERE ' + sObjectIdName + ' = ' + '\'' + recordId + '\'' + 
            'AND field = \'' + fieldName + '\' ' + additionalFilterText + ' ORDER BY CreatedDate DESC ' + LimitText ;
        
            system.debug(query);
        
        List<sObject> records = Database.query(query);

        if(Test.isRunningTest()){  //if TEST, create dummy OpportunityHistory
        	List<OpportunityFieldHistory> oh;
            oh = new List<OpportunityFieldHistory>{}; //OldValue, NewValue not writeable
        	oh.add(new OpportunityFieldHistory(OpportunityId=recordId, Field='Amount'));
            oh.add(new OpportunityFieldHistory(OpportunityId=recordId, Field='Amount'));
     	return oh;
        }
     	
        return records;
    }
    
}