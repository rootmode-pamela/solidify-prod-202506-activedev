({
	getLoanTypes: function(component) {
        console.log('helper');
		var action = component.get('c.getLoanTypes');
        action.setCallback(this, function(response){
            if (response.getState() === 'SUCCESS') {
                component.set('v.loanTypes', response.getReturnValue());
                console.log('helper loan types: ' + response.getReturnValue());
            } else {
                console.log('Error retrieving Loan Types');
            }
        });
        $A.enqueueAction(action); 
	},
    
    getLoanPrograms: function(component) {
        console.log('helper');
		var action = component.get('c.getLoanPrograms');
        action.setCallback(this, function(response){
            if (response.getState() === 'SUCCESS') {
                component.set('v.loanPrograms', response.getReturnValue());
                console.log('helper loan programs: ' + response.getReturnValue());
            } else {
                console.log('Error retrieving Loan Programs');
            }
        });
        $A.enqueueAction(action); 
	},
    
    getLoanPurposes: function(component) {
        console.log('helper');
		var action = component.get('c.getLoanPurposes');
        action.setCallback(this, function(response){
            if (response.getState() === 'SUCCESS') {
                component.set('v.loanPurposes', response.getReturnValue());
                console.log('helper purposes: ' + response.getReturnValue());
            } else {
                console.log('Error retrieving Purposes');
            }
        });
        $A.enqueueAction(action); 
	},
    
    getLoanOccupancies: function(component) {
        console.log('helper');
		var action = component.get('c.getLoanOccupancies');
        action.setCallback(this, function(response){
            if (response.getState() === 'SUCCESS') {
                component.set('v.loanOccupancies', response.getReturnValue());
                console.log('helper occupancies: ' + response.getReturnValue());
            } else {
                console.log('Error retrieving Occupancies');
            }
        });
        $A.enqueueAction(action); 
	},
    
    getLoanOriginators: function(component) {
        console.log('helper');
		var action = component.get('c.getLoanOriginators');
        action.setCallback(this, function(response){
            if (response.getState() === 'SUCCESS') {
                component.set('v.loanOriginators', response.getReturnValue());
                console.log('helper purposes: ' + response.getReturnValue());
            } else {
                console.log('Error retrieving Originators');
            }
        });
        $A.enqueueAction(action); 
	},

    getProposalTypes: function(component) {
        console.log('helper');
		var action = component.get('c.getProposalTypes');
        action.setCallback(this, function(response){
            if (response.getState() === 'SUCCESS') {
                component.set('v.proposalTypes', response.getReturnValue());
                console.log('helper proposal types: ' + response.getReturnValue());
            } else {
                console.log('Error retrieving Proposal Types');
            }
        });
        $A.enqueueAction(action); 
	}
    
})