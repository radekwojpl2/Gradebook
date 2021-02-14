import '../css/gradesTeacher.css';
import axios from '../../axios';
import {User} from './User';
import {Grade} from './Grade';
import {Subject} from './Subject';
import {TopPanel} from './TopPanel';

//import menu
TopPanel();
let subjectList = document.getElementById("subjectList") as HTMLSelectElement;
let container = document.getElementById("container") as HTMLElement;
let grades:Array<Grade>;
subjectList.addEventListener('change',changeSubject)

async function fetchAllData(){
    await Promise.all([
        fetchGrades(),
        fetchSubjects()
    ])
     fetchUsers()
}
fetchAllData()

// GradeLIST
async function fetchGrades(){
    await axios.get('/grades.json')
    .then(response =>{ 
            if(response.status != 200){
        throw new Error("Something went wront while fetching data")
        }
    grades = Object.values(response.data) as Array<Grade>;
    return grades;
    })
    .catch( error => {
        alert (error.message) 
    })
}
    
// SubjectsLIST
function fetchSubjects(){
    axios.get('/subjects.json')
    .then(response =>{ 
    if(response.status != 200){
    throw new Error("Something went wront while fetching data")
        }
    return response.data as Array<Subject>;
    })
    .then(data=> {
    data.forEach( s => {
        createSubjectList(s.subject, subjectList);
        })
    })
    .catch( error => {
    alert (error.message) 
    })
}

// USERSLIST
function fetchUsers(){
    axios.get('/users.json')
   .then(response =>
        { if(response.status != 200){
       throw new Error("Something went wront while fetching data")
            }
   return response.data as Array<User>;
        })
   .then(data=> {
       data.forEach( u => {
           createUserGradeMap(u);
            })
        })
   .then(()=>{ 
       createUserRow(subjectList.value)})
   .catch( error => {
      alert (error.message) 
   })
}
   
function createSubjectList(subject: string, parentElement:HTMLElement) {
    const option = <HTMLInputElement>createElement("option");
    option.value = subject;
    option.innerHTML = subject;
    parentElement.appendChild(option)
    return option;
}

function changeSubject() {
    document.querySelectorAll(".userRow").forEach(row => row.remove())
    createUserRow(subjectList.value)
    }
    
function createUserName(name:string, parentElement:HTMLElement) {
    const userName = createElementWithClass("div","userName");
    userName.innerHTML = name;
    parentElement.appendChild(userName)
    return userName;
}

function createGrade(grade: Array<Grade>, parentElement:HTMLElement) {
    const newGrade = createElementWithClass("div","grade");
    newGrade.innerHTML = String(grade.map(g => g.grade))
    parentElement.appendChild(newGrade)
    return newGrade;
}

function createUserRow(subject:string) {
    userMap.forEach((value: Array<Grade>, key: User) => {
            const userRow = createElementWithClass("div","userRow");
            const wrapper1 = createElementWithClass("div","wrapper")
            const wrapper2 = createElementWithClass("div","wrapper")
            userRow.appendChild(wrapper1);
            userRow.appendChild(wrapper2)
            userRow.setAttribute("id", key.user_id.toString())
            container.appendChild(userRow)


            createUserName(key.firstName + " " + key.secondName, wrapper1)
            let gradesBySubject = userMap.get(key)?.filter(g => g.subject === subject)
            createGrade( gradesBySubject || [],wrapper1);

            createGradesDropdown(wrapper2)
            createGradeTitle(wrapper2)
            createPlusButton(wrapper2)
            })
}

// CREATE MAP of users and grades
let userMap: Map<User,Array<Grade>> = new Map()
function createUserGradeMap (user:User) {
    userMap.set( user, grades.filter(grade => grade.user_id === user.user_id ))
}

// CREATE GRADE INPUT
function createGradesDropdown(parentElement:HTMLElement) {
    const grades: Array<string> = ["2","3","4","5"]
    const select = <HTMLInputElement>createElementWithClass("select","inputs");
    const defaultOption = <HTMLInputElement>createElement("option");
    defaultOption.value = "";
    defaultOption.setAttribute("selected", "selected");
    defaultOption.innerHTML = "Wybierz ocenę";
    select.appendChild(defaultOption)
    grades.forEach(g => {
        const option = <HTMLInputElement>createElement("option");
        option.value = g;
        option.innerHTML = g;
        select.appendChild(option)
    })
    parentElement.appendChild(select)
    return select 
}

function createPlusButton(parentElement:HTMLElement){
    let button = createElementWithClass("button","button") 
    button.addEventListener("click", addNewGrade)
    button.innerHTML = "+"
    parentElement.appendChild(button)
}

function createGradeTitle(parentElement:HTMLElement){
    const input = <HTMLInputElement>createElementWithClass("input","inputs");
    input.placeholder = "Wprowadź tytuł"
    parentElement.appendChild(input)
}

function addNewGrade(e:MouseEvent) {
    let button = <HTMLElement> e.target;
    let select = <HTMLInputElement> button.parentNode?.childNodes[0];
    let gradeTitle = <HTMLInputElement> button.parentNode?.childNodes[1];
    let parentNode = <HTMLElement> button.parentNode?.parentNode;
    
    if ([2,3,4,5].includes(+select.value) && gradeTitle.value !="") {
        const newGrade:Grade = <Grade> {
        date: new Date().toLocaleDateString('en-ZA'),
        grade: +select.value,
        subject: subjectList.value,
        title: gradeTitle.value,
        user_id: +parentNode.id
        }
    axios.post('/grades.json', newGrade)
    .then ( response => 
    {window.location.reload()});    
    }
    else alert("Wprowadź brakujące dane");
}

function createElementWithClass(element:string, elementClass?:string) {
    let newElement = createElement(element)
    if (elementClass !== undefined) {newElement.classList.add(elementClass)};
    return newElement;
}

function createElement(element:string) {
    let newElement = document.createElement(element);
    return newElement;
}



