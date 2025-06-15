({
    handleLoad : function(component, event, helper) {
        console.log('handle handleLoad');
        component.set("v.showSpinner", false);
    },
    
    handleSaveRecord: function(component, event, helper) {
        console.log("saving record...");
        component.set("v.showSpinner", false);
        component.find("leadLoanScenarioForm").submit();
    },
    
    highlightChangedField: function(component, event, helper){
        var field = event.getSource().getLocalId();
        
        var matchCount = 0;
        var dirtyFields = component.get('v.dirtyFields');
        let dirty = dirtyFields.map(function(a) { return a.value});
        console.log('current Field: ' + field);
        for(var i in dirty){
            if(dirty[i] == field){
                matchCount = matchCount + 1;
            }
        }
       
        if(matchCount === 0){
            dirtyFields.push( { value: field} );
            component.set('v.dirtyFields', dirtyFields);
            var target = component.find(field);
            $A.util.addClass(target, 'changeHighlight');
            var saveButton = component.find('submitButton');
            saveButton.set('v.disabled', false);
            $A.util.addClass(saveButton, 'changeHighlight');
        }
    },
    
    handleSuccess : function(component, event, helper) {
        console.log('record updated successfully');    
        component.set("v.showSpinner", false);
        
        var dirtyFields = component.get('v.dirtyFields');
        let dirty = dirtyFields.map(function(a) { return a.value});
                      
        for(var i in dirty){
            console.log(dirty[i]);
            var d = component.find(dirty[i]);
            $A.util.removeClass(d, 'changeHighlight');
            dirtyFields.splice(i, 1);
        }; 
        
        component.set('v.dirtyFields', dirtyFields);
        
        var saveButton = component.find('submitButton');
        saveButton.set('v.disabled', true);
        $A.util.removeClass(saveButton, 'changeHighlight');
        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type": "success",
            "title": "Success!",
            "message": "Lead record has been updated successfully."
        });
        toastEvent.fire();
        
    },
    
    
})