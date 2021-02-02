import moment, {Moment} from 'moment';
import {CalendarConstruction} from './calendarConstruction';
import Tooltip from './tooltip';

function  indexAccess <T,K extends keyof T> (obj: T, key:K) {
    return obj[key]
}

type calendarHolidays = {
    [props:string] : {
        [props:string] : {
            [props:string] : string
        }
    }
}
const holidays:calendarHolidays = {
    '2021': {
        '0': {'1': 'Nowy rok',
            '6': '3 króli'},
        '1': {'14': 'Walentynki'},
        '2': {},
        '3': {'2': 'Wielki Piątek',
            '3': 'Wielka Sobota',
            '4': 'Niedziela Wielkanocna'
        }
    }
}

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

    //set month and year in navigation
    private setNavigationData () : void {
        const months = moment.months()
        const monthIndex = this.date.month()
        this.monthBox.innerText = `${months[monthIndex]}`;
        this.yearBox.innerText = `${this.date.year()}`;
    }

    //add data about events to calendar from database
    private addEvents () {
        const days: HTMLTableCellElement[] = Array.from(document.querySelectorAll('tbody td'));
        const month = String(this.date.month()) ;
        const year = String(this.date.year());

        const holidaysToMap = indexAccess(holidays, year);

        if (holidaysToMap !== undefined) {
            const monthToMap = indexAccess(holidaysToMap, month);

            if (monthToMap !== undefined) {
                Object.keys(monthToMap).forEach( holidayDay => {
                    const dayWithHoliday = days.filter( day => day.innerText === holidayDay)
                    dayWithHoliday.forEach(day => {
                        day.classList.add('active')
                        new Tooltip(day, indexAccess(monthToMap, holidayDay))
                    })
                }) 
            }
        }
    }

    mapDataToCalendar () : void {
        this.setNavigationData();
        this.mapDaysData();
        this.addEvents()
    }
}

export default CalendarData