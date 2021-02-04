import moment from 'moment';
import Calendar from './calendar';
import Tooltip from './tooltip';
import {EventsData} from './generalData'

interface addEvents {
    readonly events: EventsData[]
}

class CalendarEvents extends Calendar implements addEvents {

    readonly events: EventsData[];

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
        data.data.forEach( exam => {
            const examDate = moment.unix(exam.timestamp);
            if (examDate.month() === this.date.month() && examDate.year() === this.date.year()) {
                const examDay = days.filter(day => Number(day.innerText) === examDate.date());
                examDay[0].classList.add(data.className);
                new Tooltip(examDay[0], `${exam.topic}`)
            }
        })
    }

};

export default CalendarEvents