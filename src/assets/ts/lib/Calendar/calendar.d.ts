import { Moment } from 'moment';
import '../../../css/calendar.css';
declare class Calendar {
    protected date: Moment;
    protected parentElement: HTMLElement;
    constructor(date?: string);
    private init;
    private preperDaysData;
    private mapDaysData;
    private setMonth;
    protected changeView(id: string): void;
}
export default Calendar;
