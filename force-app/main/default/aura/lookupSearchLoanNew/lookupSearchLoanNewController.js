({
   selectRecord : function(component, event, helper){       
      var getSelectRecord = component.get("v.loanRecord"); 
      var compEvent = component.getEvent("loanRecordEvent");  
         compEvent.setParams({"recordByEvent" : getSelectRecord });  
         compEvent.fire();
    },
})