({
   handleSaveRecord: function(component, event, helper) {
        console.log("saving record...");
        component.find("loanDetailForm").submit();
 	},
    recordUpdate : function(component, event, helper) {
         $A.get("e.force:refreshView").fire();
	},
    handleOnLoad : function(component,event,helper){
        console.log('loanChecklistOnLoad');
        component.set("v.condo", component.find('condo').get('v.value'));
   },
})