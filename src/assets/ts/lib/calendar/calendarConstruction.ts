import {Moment} from 'moment';

export interface CalendarConstruction {
    date: Moment;
    monthBox: HTMLSpanElement;
    yearBox: HTMLSpanElement;
    daysTable: HTMLTableSectionElement;
    mapDataToCalendar():void;
}
