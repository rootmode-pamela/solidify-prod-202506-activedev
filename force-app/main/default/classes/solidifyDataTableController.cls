public class solidifyDataTableController {
    /*
	Method Name	: getRecords
	Purpose		: To get the wrapper of Columns and Headers
	*/
    @AuraEnabled
    public static DataTableResponse getRecords(String strObjectName, String strFieldSetName, String strAmountField, String strQueryParams){                
       	
        system.debug(strObjectName);
        system.debug(strFieldSetName);
        system.debug(strQueryParams);
        
        //Get the fields from FieldSet
        Schema.SObjectType SObjectTypeObj = Schema.getGlobalDescribe().get(strObjectName);
        Schema.DescribeSObjectResult DescribeSObjectResultObj = SObjectTypeObj.getDescribe();            
        Schema.FieldSet fieldSetObj = DescribeSObjectResultObj.FieldSets.getMap().get(strFieldSetName);
        system.debug(fieldSetObj);
        
        //To hold the table headers 
        List<DataTableColumns> lstDataColumns = new List<DataTableColumns>();
        
        //Field to be queried - fetched from fieldset
        List<String> lstFieldsToQuery = new List<String>();
        
        //The final wrapper response to return to component
        DataTableResponse response = new DataTableResponse();
        
        for( Schema.FieldSetMember eachFieldSetMember : fieldSetObj.getFields() ){
            String dataType = String.valueOf(eachFieldSetMember.getType()).toLowerCase();
            String field = String.valueOf(eachFieldSetMember.getFieldPath());
            //This way we can set the type of a column
            //We do not get the exact type from schema object which matches to lightning:datatable component structure
            if(dataType == 'datetime'){
                dataType = 'date';
            }
            
            //Create a wrapper instance and store label, fieldname and type.
            DataTableColumns datacolumns = new DataTableColumns( String.valueOf(eachFieldSetMember.getLabel()) , 
                                                                String.valueOf(eachFieldSetMember.getFieldPath()), 
                                                                dataType );
			lstDataColumns.add(datacolumns);
            lstFieldsToQuery.add(field);
        }
        
        //Form an SOQL to fetch the data - Set the wrapper instance and return as response
        if(! lstDataColumns.isEmpty()){            
            response.lstDataTableColumns = lstDataColumns;
            String query = 'SELECT Id,' + String.join(lstFieldsToQuery, ',') + ' FROM ' + strObjectName + ' WHERE ' + strQueryParams;
            System.debug(query);
            response.lstDataTableData = Database.query(query);
            system.debug(response);
            
            if (response.lstDataTableData !=null){
                for (sObject record : response.lstDataTableData){     
                    decimal amt = (decimal) record.get(strAmountField);
                    response.intDataTableRecordCount = response.intDataTableRecordCount + 1;
                    if(amt!=null){
                    	response.decDataTableTotalAmount = response.decDataTableTotalAmount + amt;
                    }
                } 
            }
        }
        
        return response;
    }
    
    //Wrapper class to hold Columns with headers
    public class DataTableColumns {
        @AuraEnabled
        public String label {get;set;}
        @AuraEnabled       
        public String fieldName {get;set;}
        @AuraEnabled
        public String type {get;set;}
        
        //Create and set three variables label, fieldname and type as required by the lightning:datatable
        public DataTableColumns(String label, String fieldName, String type){
            this.label = label;
            this.fieldName = fieldName;
            this.type = type;            
        }
    }
    
    //Wrapper calss to hold response - This response is used in the lightning:datatable component
    public class DataTableResponse {
        @AuraEnabled
        public List<DataTableColumns> lstDataTableColumns {get;set;}
        @AuraEnabled
        public List<sObject> lstDataTableData {get;set;}  
        @AuraEnabled 
        public Decimal decDataTableTotalAmount {get;set;}
        @AuraEnabled
        public Integer intDataTableRecordCount {get;set;}

        
        public DataTableResponse(){
            lstDataTableColumns = new List<DataTableColumns>();
            lstDataTableData = new List<sObject>();
            decDataTableTotalAmount = 0;
            intDataTableRecordCount = 0;
        }
    }
}