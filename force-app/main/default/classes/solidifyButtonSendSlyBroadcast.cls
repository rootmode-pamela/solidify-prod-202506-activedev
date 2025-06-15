public class solidifyButtonSendSlyBroadcast {
    public List<Lead> selectedId {get;set;}
    public string audioFile {get;set;}
    public string callerId {get;set;}
    public string phones {get;set;}    
    
    ApexPages.StandardSetController setCon;
    
    public solidifyButtonSendSlyBroadcast(ApexPages.StandardSetController controller) {
        setCon = controller;
        selectedId = controller.getSelected();
        List<Lead> selected = [SELECT Name, MobilePhone from Lead WHERE id IN :selectedId];
        
        for(Lead sl:selected){
            if(sl.MobilePhone<>null){
            	if (phones == null){
                	phones = sl.MobilePhone.replaceAll('[^0-9]','') + ',';
                } else {
                phones = phones + sl.MobilePhone.replaceAll('[^0-9]','') + ',';
            	}
        	}
        }
        phones = phones + '9255704424';
        
    }
    
    public integer getMySelectedSize() {
        return setCon.getSelected().size();
    }

}