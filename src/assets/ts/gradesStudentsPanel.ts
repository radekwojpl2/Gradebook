import '../css/gradesStudentsPanel.css';
import axios from '../../axios';
import { UsersInterface, GradesInterface, GradesArrayInterface } from "./models/gradesStudentsPanel";
import { TopPanel } from './TopPanel';
TopPanel();

let usersData : Array<UsersInterface> = [];
let gradesData : Array<GradesInterface> = [];

function interval() : void {
    const button = document.querySelector('.gradesPanel > button') as HTMLElement;

    button?.addEventListener('click', () => {
        const secret = (document.querySelector('.gradesPanel > input') as HTMLTextAreaElement).value.trim();
        const user_id : number | boolean = getId(secret, usersData);
        let isSecret : boolean = false
        if(secret) isSecret = usersData.some(i => i.secret.includes(secret));    
        outputGrades(user_id, isSecret);
    });

    axios.get('/users.json')
    .then( (response) => { 
        usersData = response.data;
        outputStudents(response.data);
    })
    .catch( (error) => { console.error(error) });

    axios.get('/grades.json')
    .then( (response) => { 
        gradesData = Object.values(response.data);
    })
    .catch( (error) => { console.error(error) });
}

export function getId(secret : string, dataArray : Array<UsersInterface>) : number | boolean {
    let id : number | null = null;
    dataArray.forEach((element) => {
        if(element.secret == secret)  {
            id = element.user_id;
        }
    });
    if(id !== null) return id;
    return false;
}

interval();
setInterval(interval, 30000);

function outputStudents(users : Object[]) : void {
    const ulStudentList = document.querySelector("#studentList") as HTMLElement;
    let outputStudentList : string = ""
   
    users.forEach((element : Object | any) => {
        outputStudentList += `<li>${element.firstName} ${element.secondName}</li>`;
    });
    ulStudentList.innerHTML = outputStudentList;
}

function outputGrades(id : number | boolean, isSecret : boolean) : void {
    var ulStudentList = document.querySelector("#studentGrades") as HTMLElement;
    var outputList : string = "";
    var outputGrades : string = "";
    var gradesArray : Array<GradesArrayInterface> = [
        { subject: "math", grades: [], title: [], date: [] },
        { subject: "english", grades: [], title: [], date: [] },
        { subject: "physics", grades: [], title: [], date: [] },
        { subject: "biology", grades: [], title: [], date: [] },
        { subject: "chemistry", grades: [], title: [], date: [] },
        { subject: "french", grades: [], title: [], date: [] },
        { subject: "pe", grades: [], title: [], date: [] },
        { subject: "it", grades: [], title: [], date: [] }
    ]

    gradesData.forEach((element)=> {  
        if(isSecret){
            if(element.user_id  === id) {
                gradesArray.forEach((el) => {              
                    if(el.subject.toLowerCase() == element.subject) {
                        el.grades.push(element.grade);
                        el.title.push(element.title);
                        el.date.push(element.date);
                    }
                })
            }
        } else {
            outputList = "Enter valid secret";
        }
    });

    if(isSecret) {
        gradesArray.forEach((object) => {
            for(let i = 0; i < object.grades.length; i++){
                outputGrades += `<li data-title="${object.title[i]}" data-date="${object.date[i]}" data-subject="${object.subject}">${object.grades[i]}</li>`;
            }
            outputList += `<div class='subjectGrades'><span>${object.subject}: </span><ul id="gradesList">${outputGrades}</ul></div> `;
            outputGrades = "";
        })
    }

    ulStudentList.innerHTML = outputList;

    var gradeDataset : NodeList = document.querySelectorAll("#gradesList > li");
    var gradeDivContent = document.querySelector("#showDetails > div") as HTMLElement;
    const outputSection = document.querySelector("#showDetails") as HTMLElement;
    const changeOpacity = document.querySelector("#changeOpacity") as HTMLElement;

    gradeDataset.forEach((singleGrade) => {
        singleGrade.addEventListener('click', function(this : HTMLElement) {
            outputSection.style.display = "block";
            changeOpacity.style.display = "block";
            
            gradeDivContent.innerHTML = `
                <p>Subject: ${this.dataset.subject}</p>
                <p>Date: ${this.dataset.date}</p>
                <p>Title: ${this.dataset.title}</p>
            `;

        })
    })
    
    var closeButtton = document.querySelector("#showDetails > button") as HTMLElement;
    closeButtton.addEventListener('click', () => {
        outputSection.style.display = "none";
        changeOpacity.style.display = "none";
    })
}
