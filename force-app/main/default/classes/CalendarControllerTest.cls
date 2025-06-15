@isTest
public class CalendarControllerTest {

	@TestSetup
	static void setup() {
		insert new Opportunity(Name = 'Test Account', StageName = 'Won', COE__c = Date.today().addDays(5));
	}


	@isTest
	static void validateGetOpportunityDeadlines() {
		Opportunity opportunity = [SELECT Id, Name FROM Opportunity WHERE Name =: 'Test Account'];
		List<CalendarController.EventDto> eventDtoList = CalendarController.getOpportunityDeadlines(opportunity.Id);
		System.assertEquals(1, eventDtoList.size());
		System.assertEquals(opportunity.Name, eventDtoList[0].subject);
	}
}