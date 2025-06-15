public with sharing class CalendarController {

	@AuraEnabled
	public static List<EventDto> getOpportunityDeadlines(String opportunityId ) {
		Opportunity opportunity = [
				SELECT Id, Name, Next_Deadline__c
				FROM Opportunity
				WHERE Id =: opportunityId
		];

		return new List<EventDto> {
				new EventDto(opportunityId, opportunity.Name, opportunity.Next_Deadline__c, opportunity.Next_Deadline__c, true)
				};
	}

	public class EventDto {

		@AuraEnabled
		public String id;

		@AuraEnabled
		public String subject;

		@AuraEnabled
		public Datetime startDateTime;

		@AuraEnabled
		public Datetime endDateTime;

		@AuraEnabled
		public Boolean isAllDayEvent;

		public EventDto(String id, String subject, Datetime startDateTime, Datetime endDateTime, Boolean isAllDayEvent) {
			this.id = id;
			this.subject = subject;
			this.startDateTime = startDateTime;
			this.endDateTime = endDateTime;
			this.isAllDayEvent = isAllDayEvent;
		}
	}
}