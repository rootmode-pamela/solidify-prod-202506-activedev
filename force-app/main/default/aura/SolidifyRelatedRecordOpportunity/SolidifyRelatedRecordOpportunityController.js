({
    fieldChanged: function(cmp, event, helper) {
        cmp.set('v.fieldsChanged', true);
    },
    showSuccess: function (cmp, event, helper) {
        helper.showToastSuccess(cmp, 'Record updated!', helper);
    },
    submit: function (cmp, event, helper) {prop
        cmp.set('v.fieldsChanged', false);
        cmp.find('recordEditForm').submit();
    }
})