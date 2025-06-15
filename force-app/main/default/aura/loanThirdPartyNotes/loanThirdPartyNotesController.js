({
    handleSuccess: function (component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "Notes have been saved.",
            "type": "success"
        });
        toastEvent.fire();
        var fieldHistoryComp = component.find("fieldHistoryComponent");
        fieldHistoryComp.refresh();
    }
})