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

    //preper array of days with empty strings at beginning if month starts from different day than Monday
    private preperDaysData () : string[][] {
        const amountOfDaysInMonth:number = this.date.daysInMonth();
        //days in moment starts from Sunday - we want from Monday so we need to substract one day
        const firstDayOfMonth:number = parseInt(this.date.startOf('month').format('d')) - 1;

        //blank cells at the beggining of month
        let blankCells = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            blankCells.push('')
        }
        
        let daysCells = [];
        for (let i = 1; i <= amountOfDaysInMonth; i++) {
            daysCells.push(`${i}`)
        }
        
        //array of days in month 
        const daysArray: (string)[] =  [...blankCells, ...daysCells];
        //create array of weeks in month
        const weeksArray:(string)[][] = [];
        daysArray.forEach( (el, index) => {
            if ((index + 7) % 7 === 0) {
                const newArray = daysArray.slice(index, index + 7);
                weeksArray.push(newArray)
            }
        })

        return weeksArray
    }

    //map weeks into table
    private mapDaysData () : void {
        const weeksArray = this.preperDaysData();

        const mapData:string = weeksArray.map( (data) => {
            return `<tr>
                ${data.map( el => `<td>${el}</td>`).join(' ')}
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