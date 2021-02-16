import moment from 'moment';
import Calendar from './calendar';
import Tooltip from './tooltip';
import {EventsData} from './generalData'

interface addEvents {
    events: EventsData[]
}

class CalendarEvents extends Calendar implements addEvents {

    events: EventsData[];

    constructor(events: EventsData[], date?:string) {
        super(date)
        this.events = events;

        this.events.forEach(events => this.addEventsToCalendar(events))

        this.parentElement.addEventListener( 'click', element => {
            const target = element.target as HTMLElement;
            if ((target.id === 'prev' || target.id === 'next') && this.events ) {
                this.events.forEach(events => this.addEventsToCalendar(events))
            }
        })
    }

    private addEventsToCalendar (data:EventsData) {
        const days: HTMLTableCellElement[] = Array.from(document.querySelectorAll('tbody td'));
        data.data.forEach( event => {
            console.log(event)
            const eventDate = moment.unix(event.timestamp);
            if (eventDate.month() === this.date.month() && eventDate.year() === this.date.year()) {
                const eventDay = days.filter(day => Number(day.innerHTML) === eventDate.date());
                eventDay[0].classList.add(data.className);
                new Tooltip(eventDay[0], `${event.topic}`)
            }
        })
    }

};

export default CalendarEvents