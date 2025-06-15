({
    doInit : function(component, event, helper) {
        var myPageRef = component.get("v.pageReference");
        var recordId = myPageRef.state.c__recordId;
        component.set("v.recordId", recordId);
    }
})