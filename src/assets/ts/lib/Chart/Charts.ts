import {chartData, Students, GENDER, COLOR} from './generalData';
import DrawChart from './drawChart';
import axios from 'axios';
import '../../../css/charts.css';


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
            ],
            title: "Amount of females and males"
        };

        let radarChartData:chartData = {
            type: 'radar',
            labels: ['spanish', 'german', 'italian', 'french', 'chinese'],
            datasets: [
                {data: [0,0,0,0,0],
                backgroundColor: [COLOR.MALE],
                label: GENDER.MALE
                },
                {data: [0,0,0,0,0],
                backgroundColor: [COLOR.FEMALE],
                label: GENDER.FEMALE
                }
            ],
            title: "As second language we are learning:"
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
        new DrawChart('#languagesChart', radarChartData);
    })
    .catch( error => {
        const documents = Array.from(document.querySelectorAll('article div')) as HTMLDivElement[];
        documents.forEach( doc => doc.innerText = 'Ups... Something went wrong')
    });
}