({
	recordUpdate : function(component, event, helper) {
         $A.get("e.force:refreshView").fire();
	},
    
    handleblur: function(component, event, helper) {
        console.log("blur recorded...");
        
 	},
    
    giveFocus: function(component, event, helper) {
        console.log("focus recorded...");
        
 	},
    
    handleSaveRecord: function(component, event, helper) {
        console.log("saving record...");
        component.find("loanDetailForm").submit();
 	},
        
    showContactDetails: function(component, event, helper) {
        var con = component.get("v.Opportunity"), param;
        param = { sobjectType: 'Opportunity', Id: con.Id, Name: con.Name, Phone: con.Buyers_Agent__r.MobilePhone}; 
        console.log(param.Name);
        console.log(param.Phone);
        contactPhone = param.Phone;
        var modalBody;
        $A.createComponent("c:solidifyMiniContactDetails", {"contactPhone":contactPhone},
                           function(content, status) {
                               if (status === "SUCCESS") {
                                   modalBody = content;
                                   component.find('overlayLib').showCustomModal({
                                       header: "Contact Details",
                                       body: modalBody, 
                                       showCloseButton: true,
                                       cssClass: "mymodal",
                                       closeCallback: function() {
                                           alert('You closed the alert!');
                                       }
                                   })
                                   
                               }
                               
                           });
    }
    
})