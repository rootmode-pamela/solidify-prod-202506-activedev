({
		callServer : function(component,method,callback,params) {
        var action = component.get(method);
        if (params) {        
            action.setParams(params);
        }
        
        action.setCallback(this,function(response) {            
            var state = response.getState();
            if (state === "SUCCESS") { 
                // pass returned value to callback function
                callback.call(this,response.getReturnValue());   
            } else if (state === "ERROR") {
                // generic error handler
                var errors = response.getError();
                if (errors) {
                    console.log("Errors", errors);
                    if (errors[0] && errors[0].message) {
                        throw new Error("Error" + errors[0].message);
                    }
                } else {
                    throw new Error("Unknown Error");
                }
            }
        });
        
        $A.enqueueAction(action);
    },
    
    extractAddressComponent : function(components, type, short){
    	for (var i=0; i<components.length; i++)
        	for (var j=0; j<components[i].types.length; j++)
             //  console.log(components[i].types[j] + ":" + components[i].long_name + " / " +  components[i].short_name);
        		if (components[i].types[j]==type) {
            		if (short=="short"){
                		return components[i].short_name;}
            		else
            			{return components[i].long_name;}
        		} 
    	return "";
	}, 
 
})