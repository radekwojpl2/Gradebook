import moment from 'moment';
import CalendarData from './calendarData';
import {MONTHS} from './monthData';
import '../../../css/calendar.css';

class Calendar extends CalendarData {
    prev: HTMLSpanElement;
    next: HTMLSpanElement;

    constructor(date=moment()) {
        super(date)
        this.prev = document.querySelector('#prev') as HTMLSpanElement;
        this.next = document.querySelector('#next') as HTMLSpanElement;

        this.prev.addEventListener( 'click', () => {this.changeView('prev')});
        this.next.addEventListener( 'click', () => {this.changeView('next')});

        document.addEventListener('DOMContentLoaded', () => {
            this.mapDataToCalendar()
        })
    };

    changeView (id:string) {
        const month = this.date.month();
        const year = this.date.year();

        if (id === 'prev') {
            if (month !== MONTHS.JANUARY) {
                moment(this.date.month(month-1))
            } else {
                moment(this.date.month(MONTHS.DECEMBER).year(year-1))
            }
        } else {
            if (month !== MONTHS.DECEMBER) {
                moment(this.date.month(month+1))
            } else {
                moment(this.date.month(0).year(year+1))
            }
        };
        this.mapDataToCalendar()
    }
};

export default Calendar