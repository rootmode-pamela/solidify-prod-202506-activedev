({ 

	
init : function(cmp, event, helper) {
        var navService = cmp.find("navService");
    var oldId = cmp.get('v.recordId');
        var pageReference = {
            
            type: "standard__component",
            attributes: {
                componentName: "c__rateAnalysisClone"    
            },    
            state: {
                c__oldId: oldId    
            }
        };
    
        cmp.set("v.pageReference", pageReference);
        var defaultUrl = "#";
        navService.generateUrl(pageReference)
        .then($A.getCallback(function(url) {
            cmp.set("v.url", url ? url : defaultUrl);
        }), $A.getCallback(function(error) {
            cmp.set("v.url", defaultUrl);
        }));
    },
    
    navToPage: function(cmp, event, helper) {
        var navService = cmp.find("navService");
        // Uses the pageReference definition in the init handler
        var pageReference = cmp.get("v.pageReference");
        event.preventDefault();
        navService.navigate(pageReference);
    }
})