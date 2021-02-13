import '../css/gradesStudentsPanel.css';
import axios from '../../axios';
import { UsersInterface, GradesInterface, GradesArrayInterface } from "./models/gradesStudentsPanel";
import { TopPanel } from './TopPanel';
TopPanel();

let usersData : Array<UsersInterface> = [];
let gradesData : Array<GradesInterface> = [];

var interval = () => {
    const button : HTMLElement | null = document.querySelector('.gradesPanel > button');

    button?.addEventListener('click', () => {
        const secret = (document.querySelector('.gradesPanel > input') as HTMLTextAreaElement).value.trim();
        const user_id : number | boolean = getId(secret);
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
        gradesData = response.data;
    })
    .catch( (error) => { console.error(error) });

    function getId(secret : string) : number | boolean {
        let id : number | null = null;
        usersData.forEach((element) => {
            if(element.secret == secret)  {
                id = element.user_id;
            }
        });
        if(id !== null) return id;
        return false;
    }
}

interval();
setInterval(interval, 30000);

function outputStudents(users : Object[]) : void {
    var ulStudentList : HTMLElement | any = document.querySelector("#studentList");
    var outputStudentList : string = ""
   
    users.forEach((element : Object | any)=> {
        outputStudentList += `<li>${element.firstName} ${element.secondName}</li>`;
    });
    ulStudentList.innerHTML = outputStudentList;
}

function outputGrades(id : number | boolean, isSecret : boolean) : void {
    var ulStudentList : HTMLElement | any = document.querySelector("#studentGrades");
    var outputList : string = ""
    var outputGrades : string = ""
    var gradesArray : Array<GradesArrayInterface> = [
        { subject: "math", grades: [] },
        { subject: "english", grades: [] },
        { subject: "physics", grades: [] },
        { subject: "biology", grades: [] },
        { subject: "chemistry", grades: [] },
        { subject: "french", grades: [] },
        { subject: "pe", grades: [] },
        { subject: "it", grades: [] }
    ]

    gradesData.forEach((element)=> {  
        if(isSecret){
            if(element.user_id  === id) {
                gradesArray.forEach((el) => {              
                    if(el.subject.toLowerCase() == element.subject) {
                        el.grades.push(element.grade)
                    }
                })
            }
        } else {
            outputList = "Podaj dobry secret"
        }
    });

    if(isSecret) {
        gradesArray.forEach((object) => {
            object.grades.forEach ((grade) => {
                outputGrades += `<li>${grade}</li>`
            })
            outputList += `<span>${object.subject}: <ul id="gradesList">${outputGrades}</ul></span> `;
            outputGrades = ""
        })
    }

    ulStudentList.innerHTML = outputList;
}
