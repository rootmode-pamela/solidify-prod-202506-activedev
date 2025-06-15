({
   selectRecord : function(component, event, helper){       
      var getSelectRecord = component.get("v.propRecord"); 
      var compEvent = component.getEvent("propRecordEvent");  
         compEvent.setParams({"recordByEvent" : getSelectRecord });  
         compEvent.fire();
    },
})