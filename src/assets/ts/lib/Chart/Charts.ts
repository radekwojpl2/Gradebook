import {chartData} from './types';
import DrawChart from './drawChart';
import axios from 'axios';
import '../../../css/charts.css';

type Student = {
    id: number,
    gender: string,
    secondLanguage: string
}

type Students = {
    students: Student[]
}

enum GENDER {
    MALE = 'male',
    FEMALE = 'female'
}

enum COLOR {
    MALE = 'rgba(66, 185, 245, 0.6)',
    FEMALE = 'rgba(193, 109, 242, 0.6)'
}

export const Charts = () => {
    
    axios.get<Students>('data.json')
    .then( response => {
        const students = response.data.students;

        let polarChartData:chartData = {
            type: 'polarArea',
            labels: [GENDER.MALE, GENDER.FEMALE],
            datasets: [
                {data: [0,0],
                backgroundColor: [
                    COLOR.MALE,
                    COLOR.FEMALE
                ]}
            ]
        };

        let radarChartData:chartData = {
            type: 'radar',
            labels: ['spanish', 'german', 'italian', 'french', 'chinese'],
            datasets: [
                {data: [0,0,0,0,0],
                backgroundColor: [COLOR.MALE]},
                {data: [0,0,0,0,0],
                backgroundColor: [COLOR.FEMALE]}
            ]
        }

        students.forEach( student => {
            const secondLanguage = radarChartData.labels.indexOf(student.secondLanguage);
            console.log(student.secondLanguage ,secondLanguage)
            if (student.gender === GENDER.MALE) {
                polarChartData.datasets[0].data[0] += 1;
                radarChartData.datasets[0].data[secondLanguage] += 1
            } else {
                polarChartData.datasets[0].data[1] += 1;
                radarChartData.datasets[1].data[secondLanguage] += 1
            }
        })
        new DrawChart('#classChart', polarChartData);
        new DrawChart('#languagesChart', radarChartData)

    })
    .catch( error => {throw 'Ups something went wrong'});
}