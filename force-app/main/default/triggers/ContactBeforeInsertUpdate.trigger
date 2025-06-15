trigger ContactBeforeInsertUpdate on Contact (before insert) {
    
    list<Contact> mailingAddrContacts = new list<Contact>();
    for(Contact c: trigger.new){
        if(c.MailingState!=null && c.MailingState.length()>2){
            c.MailingState = solidifyUtil.abbreviateMailingState(c.MailingState);
            if (c.MailingState.length()>2){
                c.MailingState.addError('Invalid State');
            }
        }
    }


}