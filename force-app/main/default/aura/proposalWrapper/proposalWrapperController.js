({
	doInit : function(component, event, helper) {
        var type = component.find("test").get("v.value");
        console.log("type: " + type);
        if(type == null){
            component.set("v.isRefi", true);
        }
		
	}
})