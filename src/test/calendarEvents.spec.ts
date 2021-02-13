import CalendarEvents from '../assets/ts/lib/Calendar/calendarEvents';
import {EventsData} from '../assets/ts/lib/Calendar/generalData';

describe('CalendarEvents class', () => {
    document.body.innerHTML = '<div id="calendar"></div>';
    const events:EventsData ={
        data: [{id: '1', topic: "mathematic : Functions", timestamp: 1612475664}],
        className: 'test'
    } 
    it('should append class test to 4/02/2021', () => {
        new CalendarEvents([events], '2021-02-04')
        const day = document.querySelector('.test') as HTMLElement;
        expect(day.innerHTML).toEqual('4<div class="tip">mathematic : Functions</div>') 
    })
})