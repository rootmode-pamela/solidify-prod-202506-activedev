({
    helperMethod : function() {

    },

    getPicklistValues: function(component, event) {
        let action = component.get("c.getPropertyTypePicklist");
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                let result = response.getReturnValue();
                let fieldMap = [];
                for(let key in result){
                    fieldMap.push({key: key, value: result[key]});
                }
                component.set("v.propertyTypePicklist", fieldMap);
            }
        });
        $A.enqueueAction(action);
    },
})