import moment, {Moment} from 'moment';
import Tooltip from './tooltip';
import {MONTHS} from './monthData';
import '../../../css/calendar.css';

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

interface Exam {
    id: string,
    subject: string,
    topic: string,
    timestamp: number
}

class Calendar  {
    date: Moment;
    parentElement: HTMLElement;

    constructor(date?:string) {
        this.date = moment(date);
        this.parentElement = document.querySelector('#calendar') as HTMLElement;
        this.init();
        this.addEvents();

        this.parentElement.addEventListener( 'click', element => {
            const target = element.target as HTMLElement;
            if (target.id === 'prev' || target.id === 'next') {
                this.changeView(target.id);
                this.addEvents();
            }
        })
    }

    protected init() {
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

    // private async getExtraData (path:string | undefined) {
    //     if (path !== undefined) {
    //     axios.get<{exams: Exam[]}>(path)
    //     .then(response => {
    //         const exams = response.data.exams;
    //         this.addExamsToCalendar(exams)
    //     })
    //     .catch(error => console.log(error))}
    //     else {
    //         return 
    //     }
    // }

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

    // //set month and year in navigation
    private setMonth () : string {
        const months = moment.months()
        const monthIndex = this.date.month()
        return `${months[monthIndex]}`;
    }

    // //add data about events to calendar from database
    private addEvents () {
        const days: HTMLTableCellElement[] = Array.from(document.querySelectorAll('tbody td'));
        const month = this.date.month() ;
        const year = this.date.year();

        const holidaysToMap = holidays[year];

        if (holidaysToMap !== undefined) {
            const monthToMap = holidaysToMap[month];

            if (monthToMap !== undefined) {
                Object.keys(monthToMap).forEach( holidayDay => {
                    const dayWithHoliday = days.filter( day => day.innerText === holidayDay)
                    dayWithHoliday.forEach(day => {
                        day.classList.add('active')
                        new Tooltip(day, monthToMap[holidayDay])
                    })
                }) 
            }
        }
    }

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
        this.init();

    }

    // addExamsToCalendar (data:Exam[]) {
    //     const days: HTMLTableCellElement[] = Array.from(document.querySelectorAll('tbody td'));
    //     data.forEach( exam => {
    //         const examDate = moment.unix(exam.timestamp);
    //         if (examDate.month() === this.date.month() && examDate.year() === this.date.year()) {
    //             const examDay = days.filter(day => Number(day.innerText) === examDate.date());
    //             examDay[0].classList.add('exam');
    //             new Tooltip(examDay[0], `${exam.subject}: ${exam.topic}`)
    //         }
    //     })
    // }

    // mapDataToCalendar (data?:string) {
    //     this.setNavigationData();
    //     this.mapDaysData();
    //     this.addEvents();
    //     this.getExtraData(data)
    // }
}

export default Calendar