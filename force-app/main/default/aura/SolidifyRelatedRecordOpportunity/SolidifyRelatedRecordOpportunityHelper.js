({
    helperMethod: function () {

    },
    showToastSuccess : function(cmp, message, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": message,
            "type": "success"
        });
        toastEvent.fire();
    },
})