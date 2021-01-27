import moment, {Moment} from 'moment';
import {CalendarConstruction} from './calendarConstruction';

class CalendarData implements CalendarConstruction {
    date: Moment;
    monthBox: HTMLSpanElement;
    yearBox: HTMLSpanElement;
    daysTable: HTMLTableSectionElement;


    constructor(date:Moment) {
        this.monthBox = document.querySelector('#month') as HTMLSpanElement;
        this.yearBox = document.querySelector('#year') as HTMLSpanElement;
        this.daysTable = document.querySelector('tbody') as HTMLTableSectionElement;
        this.date = date;
    }

    private preperDaysData () : string[][] {
        const amountOfDaysInMonth:number = this.date.daysInMonth();
        const firstDayOfMonth:number = parseInt(this.date.startOf('month').format('d')) - 1;
        let blankCells = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            blankCells.push('')
        }
        
        let daysCells = [];
        for (let i = 1; i <= amountOfDaysInMonth; i++) {
            daysCells.push(`${i}`)
        }
        
        const daysArray: (string)[] =  [...blankCells, ...daysCells];
        const weeksArray:(string)[][] = [];
        daysArray.forEach( (el, index) => {
            if ((index + 7) % 7 === 0) {
                const newArray = daysArray.slice(index, index + 7);
                weeksArray.push(newArray)
            }
        })

        return weeksArray
    }

    private mapDaysData () : void {
        const weeksArray = this.preperDaysData();

        const mapData:string = weeksArray.map( (data, index) => {
            return `<tr key=${index}>
                ${data.map( (el, el_index) => `<td key=${el_index}>${el}</td>`).join(' ')}
                    </tr>`
        }).join(' ');

        this.daysTable.innerHTML = mapData;
    }

    private setNavigationData () : void {
        const months = moment.months()
        const monthIndex = this.date.month()
        this.monthBox.innerText = `${months[monthIndex]}`;
        this.yearBox.innerText = `${this.date.year()}`;
    }

    mapDataToCalendar () : void {
        this.setNavigationData();
        this.mapDaysData();
    }
}

export default CalendarData