import '../css/gradesStudentsPanel.css';
import axios from '../../axios';
import { resolve } from 'path';
import { unlink } from 'fs';
import { emitKeypressEvents } from 'readline';
import { UsersInterface, GradesInterface } from "./models/gradesStudentsPanel"

let usersData : Array<UsersInterface> = [];
let gradesData : Array<GradesInterface> = [];
const button : HTMLElement | null = document.querySelector('.students > button');

button?.addEventListener('click', () => {
    const secret = (document.querySelector('.students > input') as HTMLTextAreaElement).value.trim();
    const user_id : number | boolean = getId(secret);
    console.log(user_id);

    console.log(gradesData)
    
    outputGrades(user_id);
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

function outputStudents(users : Object[]) : void {
    var ulStudentList : HTMLElement | any = document.querySelector("#studentList");
    var outputStudentList : string = ""
   
    users.forEach((element : Object | any)=> {
        outputStudentList += `<li>${element.firstName}</li>`;
    });
    ulStudentList.innerHTML = outputStudentList;
}

function outputGrades(id : number | boolean) : void {
    var ulStudentList : HTMLElement | any = document.querySelector("#studentGrades");
    var outputList : string = ""

    gradesData.forEach((element)=> {                
        if(element.user_id  === id) {
            outputList += `<li>${element.title} ${element.grade}</li>`;
            console.log(element.user_id  === id);
        }
    });
    if(outputList === "") {
        outputList = "Podaj poprawny sekret";
    }

    ulStudentList.innerHTML = outputList;
}
