({
	openEmail : function(component, event, helper) {
        var email = component.get("v.simpleRecord.BA_Email__c");       
		var url = 'mailto:'+email+'&subject=Test Subject';
		window.location.href = url;
	},
    
        goToLender : function(component, event, helper){
        var record = component.get("v.simpleRecord.Lender_AE__c");
        var navEvt = $A.get("e.force:navigateToSObject");
    		navEvt.setParams({
      		"recordId": record
    });
    navEvt.fire();
        },
    
            goToEscrow : function(component, event, helper){
        var record = component.get("v.simpleRecord.Escrow_Contact__c");
        var navEvt = $A.get("e.force:navigateToSObject");
    		navEvt.setParams({
      		"recordId": record
    });
    navEvt.fire();
        },
    
            goToBuyer : function(component, event, helper){
        var record = component.get("v.simpleRecord.Buyers_Agent__c");
        var navEvt = $A.get("e.force:navigateToSObject");
    		navEvt.setParams({
      		"recordId": record
    });
    navEvt.fire();
        },
    
            goToLister : function(component, event, helper){
        var record = component.get("v.simpleRecord.Sellers_Agent__c");
        var navEvt = $A.get("e.force:navigateToSObject");
    		navEvt.setParams({
      		"recordId": record
    });
    navEvt.fire();
        }
})