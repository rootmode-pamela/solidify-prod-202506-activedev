@isTest
public class lookupFieldControllerTest {
	@isTest
    public static void testOne() {
        List<String> fields = new List<String>();
        fields.add('Name');
        lookupfieldController.GetRecentRecords('Account', fields,1);
    }
    @isTest
    public static void testTwo(){
        List<String> fields = new List<String>();
        fields.add('Name');
        List<SOBject> objects = lookupfieldController.SearchRecords('Account', fields, fields, NULL, NULL, NULL, 1, NULL);
    }
    @isTest
    public static void testThree() {
        Account act = new Account(Name = 'Test');
        insert act;
        List<String> fields = new List<String>();
        fields.add('Name');
        lookupfieldController.GetRecord('Account', fields, act.Id);
        
    }
    @isTest
    public static void testFour(){
        lookupfieldController.findObjectIcon('Account');
    }
    @isTest
    public static void testFive(){
        lookupfieldController.getObjectDetails('Account');
    }
}