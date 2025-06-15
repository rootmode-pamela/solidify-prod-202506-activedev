@isTest
public class soldify_picklistController_Test {

    @isTest
    public static void testAll(){
        
        list<String> s = solidify_picklistController.getPickListValuesIntoList('Lead', 'Status');
        
        system.assert(s.size()>0);
        
    }
    
}