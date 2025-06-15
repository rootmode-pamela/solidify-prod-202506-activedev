import { LightningElement,api,track } from 'lwc';
import FullCalendarJS from '@salesforce/resourceUrl/FullCalendar';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getOpportunityDeadlines from '@salesforce/apex/CalendarController.getOpportunityDeadlines';

export default class LoanDeadlineCalendar extends LightningElement {
    @api events;
    @api recordId;
    connectedCallback() {
        console.log(this.recordId)
        Promise.all([
            loadScript(this, FullCalendarJS + '/FullCalenderV3/jquery.min.js'),
            loadScript(this, FullCalendarJS + '/FullCalenderV3/moment.min.js'),
            loadScript(this, FullCalendarJS + '/FullCalenderV3/fullcalendar.min.js'),
            loadStyle(this, FullCalendarJS + '/FullCalenderV3/fullcalendar.min.css')
        ])
            .then(() => {
                this.loadOpportunityDeadlines();
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error!',
                        message: 'Error occurs while loading calendar',
                        variant: 'error'
                    }))
            })
    }

    initialiseCalendarJs() {
        const ele = this.template.querySelector('div.fullcalendarjs');
        //Use jQuery to instantiate fullcalender JS
        $(ele).fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,basicWeek,basicDay'
            },
            defaultDate: new Date(),
            navLinks: true,
            editable: true,
            eventLimit: true,
            events: this.events,
            dragScroll:true,
            droppable:true,
            weekNumbers:true,
            selectable:true
        });
    }

    loadOpportunityDeadlines() {
        getOpportunityDeadlines({
            opportunityId: this.recordId
        }).then(result => {
            if (result) {
                this.events = result.map(event => {
                    return { Id : event.id,
                        title : event.subject,
                        start : event.startDateTime,
                        end : event.endDateTime,
                        allDay : event.isAllDayEvent};
                });

                this.initialiseCalendarJs();
                this.error = undefined;
            }
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error!',
                    message: 'Error occurs while loading deadline events',
                    variant: 'error'
                }))
        })
    }
}