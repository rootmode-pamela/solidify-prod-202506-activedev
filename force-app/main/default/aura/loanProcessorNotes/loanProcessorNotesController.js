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
    },

    openEditSummaryNote: function (component, event, helper) {
        component.set("v.editSummaryNote", true);
    },
    openEditSubmissionNote: function (component, event, helper) {
        component.set("v.editSubmissionNote", true);
    },

    handleCancelModal: function (component, event, helper) {
        component.set("v.editSummaryNote", false);
        component.set("v.editSubmissionNote", false);
    },

    handleSuccessSummaryNote: function (component, event, helper) {
        component.set("v.editSummaryNote", false);
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The Summary note has been saved.",
            "type": "success"
        });
        toastEvent.fire();

    },
    handleSuccessSubmissionNote: function (component, event, helper) {
        component.set("v.editSubmissionNote", false);
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The Submission note has been saved.",
            "type": "success"
        });
        toastEvent.fire();

    }
})