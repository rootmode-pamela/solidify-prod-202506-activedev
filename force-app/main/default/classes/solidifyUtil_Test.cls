@isTest
public class solidifyUtil_Test {

    @isTest
    public static void testFormulas(){
   
	test.startTest();
        
        decimal payment = solidifyUtil.payment(346500, 04.250, 30);
        system.assertEquals(1704.57, payment, 'Payment miscalculated');
        
        decimal balance = solidifyUtil.balance(346500, 4.250, 21, 1704.57);
        system.assertEquals(336111.82, balance, 'Balance miscalculated');
        
        integer numberPayments = solidifyUtil.numberPayments(336100, 3.990, 1704.67);
        system.assertEquals(321, numberPayments);
        
        integer numberPayments2 = solidifyUtil.numberPayments(500000, 2.87, 1800.00);
        system.assertEquals(457, numberPayments2);
      
        solidifyUtil.balanceInputs i = new solidifyUtil.balanceInputs( );
        i.loanAmt = 346500;
        i.interestRate= 4.250;
        i.numberPayments = 21;
        i.payment = 1704.57;
        list<solidifyUtil.balanceInputs> inputs = new list<solidifyUtil.balanceInputs>();
        inputs.add(i);
        List<decimal> decs = solidifyUtil.balance(inputs);
        system.assertEquals(336111.82, decs[0]);
        
      //  getBreakevenPayment(Double loanAmt, Integer term, Double rateBase, Double rateComp, Double closingCostBase, Double closingCostComp
         double b = solidifyUtil.getBreakevenPayment(1743.64,1667.03,376500,383042.00,360,3.75,3.25,0,6542);
        system.assertEquals(48, b);
          
    test.stopTest();    
        
    }
    
    @isTest
    static void testEffectiveAPR(){
        decimal effectiveRate = solidifyUtil.effectiveRate(30, 1666.42, 313335, 2.45 );
        system.assertEquals(4.918, effectiveRate);
    }

    
    @isTest
    public static void testContactMailingStateUpdate(){
        List<StateCode__mdt> sc = [SELECT Abbreviation__c FROM StateCode__mdt WHERE DeveloperName = 'california'];
        system.assert(sc.size()>0, 'Test state code (for california) does not exist');
        
        insert new Contact(LastName = 'TestState', MailingState = 'California');
        
        Contact c = [SELECT MailingState from CONTACT WHERE LastName = 'TestState' LIMIT 1];
        
        System.assertEquals(c.MailingState, 'CA', 'State not changed to right code');
        
    }
}