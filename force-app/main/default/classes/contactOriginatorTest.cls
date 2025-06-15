@isTest
public class contactOriginatorTest {
    @isTest
    public static void testInsert() {        
        Contact con = new Contact(FirstName = 'Test', LastName = 'Tester', Loan_Originator__c = 'Dusty Broderick');
        insert con;
        Contact newCon = [SELECT Id, Loan_Originator_User__c FROM Contact WHERE FirstName = 'Test'];
        User newUser = [SELECT ID FROM User WHERE FirstName = 'Dusty' AND LastName = 'Broderick'];
        System.assertEquals(newUser.Id, newCon.Loan_Originator_User__c);
    }
    @isTest
    public static void testUpdate() {
        Contact con = new Contact(FirstName = 'Test', LastName = 'Tester');
        insert con;
        con.Loan_Originator__c = 'Dusty Broderick';
        update con;
        Contact newCon = [SELECT Id, Loan_Originator_User__c FROM Contact WHERE FirstName = 'Test'];
        User newUser = [SELECT ID FROM User WHERE FirstName = 'Dusty' AND LastName = 'Broderick'];
        System.assertEquals(newUser.Id, newCon.Loan_Originator_User__c);
    }
    
}