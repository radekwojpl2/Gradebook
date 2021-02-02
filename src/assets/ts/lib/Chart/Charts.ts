import {chartData} from './types';
import DonoughtChart from './donoughtChart';
import axios from 'axios';

type Student = {
    id: number,
    gender: string,
    languages: string[]
}

type Students = {
    students: Student[]
}

export const Charts = () => {
    
    axios.get<Students>('data.json')
    .then( response => {
        const students = response.data.students;

        let doughnutChartData:chartData = {
            labels: ['female', 'male'],
            data: [0, 0],
            colors: []
        };

        students.forEach( student => {
            if (student.gender === doughnutChartData.labels[0]) {
                doughnutChartData.data[0] += 1
            } else {
                doughnutChartData.data[1] += 1
            }
        })

        console.log(doughnutChartData)
        new DonoughtChart('#classChart', doughnutChartData)
    })
    .catch( error => {throw 'Ups something went wrong'});
}