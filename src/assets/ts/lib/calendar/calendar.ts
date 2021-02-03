import moment from 'moment';
import CalendarData from './calendarData';
import {MONTHS} from './monthData';
import '../../../css/calendar.css';

class Calendar extends CalendarData {
    private prev: HTMLSpanElement;
    private next: HTMLSpanElement;
    public extraData?: string;

    constructor(extraData?:string, date=moment()) {
        super(date)
        this.prev = document.querySelector('#prev') as HTMLSpanElement;
        this.next = document.querySelector('#next') as HTMLSpanElement;
        this.extraData = extraData;

        this.prev.addEventListener( 'click', () => {this.changeView('prev')});
        this.next.addEventListener( 'click', () => {this.changeView('next')});

        document.addEventListener('DOMContentLoaded', () => {
            this.mapDataToCalendar(this.extraData)
        })
    };

    private changeView (id:string) {
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
        this.mapDataToCalendar(this.extraData);

    }
};

export default Calendar