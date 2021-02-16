import Calendar from './calendar';
import { EventsData } from './generalData';
interface addEvents {
    events: EventsData[];
}
declare class CalendarEvents extends Calendar implements addEvents {
    events: EventsData[];
    constructor(events: EventsData[], date?: string);
    private addEventsToCalendar;
}
export default CalendarEvents;
