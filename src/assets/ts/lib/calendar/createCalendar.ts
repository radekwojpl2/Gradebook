import axios from 'axios';
import {Event, EventsData} from './generalData';
import CalendarEvents from './/calendarEvents';

export const Calendar = () => {
    axios.get<{exams: {id: string, topic:string, subject:string, timestamp:string}[],
        holidays: {id: string, holiday:string, timestamp:string}[]}>('data.json')
        .then(response => {
            const {exams, holidays} = response.data;

            const examsToMap = exams.map( exam => {
                return <Event>{
                    id: exam.id,
                    topic: `${exam.subject} : ${exam.topic}`,
                    timestamp: Number(exam.timestamp),
                }
            });;


            const examsCalendar:EventsData = {
                data: examsToMap,
                className: 'exams'
            }

            const holidaysToMap = holidays.map( holiday => {
                return <Event> {
                    id: holiday.id,
                    topic: holiday.holiday,
                    timestamp: Number(holiday.timestamp),
                }
            } )

            const holidaysCalendar:EventsData = {
                data: holidaysToMap,
                className: 'holidays'
            }

            new CalendarEvents([examsCalendar, holidaysCalendar])
        })
        .catch(error => console.log(error))

}