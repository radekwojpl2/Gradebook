import moment, {Moment} from 'moment';
import {MONTHS} from './generalData';
import '../../../css/calendar.css';


class Calendar  {
    protected date: Moment;
    protected parentElement: HTMLElement;

    constructor(date?:string) {
        this.date = moment(date);
        this.parentElement = document.querySelector('#calendar') as HTMLElement;
        this.init();

        this.parentElement.addEventListener( 'click', element => {
            const target = element.target as HTMLElement;
            if (target.id === 'prev' || target.id === 'next') {
                this.changeView(target.id);
            }
        })
    }

    //building calendar and map data
    private init() {
        const calendarConstruction:string = `<nav>
                                                <span id="prev">
                                                    <
                                                </span>
                                                <span id="month">
                                                    ${this.setMonth()}
                                                </span>
                                                <span id="year">
                                                    ${this.date.year()}
                                                </span><span id="next">
                                                    >
                                                </span>
                                            </nav>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Mon</th>
                                                        <th>Tue</th>
                                                        <th>Wed</th>
                                                        <th>Thu</th>
                                                        <th>Fri</th>
                                                        <th>Sat</th>
                                                        <th>Sun</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    ${this.mapDaysData()}
                                                </tbody>
                                            </table>`
        this.parentElement.innerHTML = calendarConstruction;
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
    private mapDaysData () : string {
        const weeksArray = this.preperDaysData();

        const mapData:string = weeksArray.map( (data) => {
            return `<tr>
                ${data.map( el => `<td>${el}</td>`).join(' ')}
                    </tr>`
        }).join(' ');

        return mapData;
    }

    //set month and year in navigation
    private setMonth () : string {
        const months = moment.months()
        const monthIndex = this.date.month()
        return `${months[monthIndex]}`;
    }

    //function to change month and year in calendar
    protected changeView (id:string) {
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
        this.init();

    }

}

export default Calendar