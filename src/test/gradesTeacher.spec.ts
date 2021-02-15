import {createElementWithClass, createElement,createUserName,createGrade, createPlusButton,createGradeTitle,createSubjectList }from '../../src/assets/ts/gradesTeacher';

describe('gradesTeacher testing', () => {
it ('should create new element with given classes', () => {
    
    const domElement = createElementWithClass('div', 'class-a');
    
    expect(domElement.tagName.toLowerCase()).toEqual('div');
    expect(domElement.classList.length).toEqual(1);
    expect(domElement.classList[0]).toEqual('class-a');
});

it ('should create new element', () => {
    
    const domElement = createElement('option');
    
    expect(domElement.tagName.toLowerCase()).toEqual('option');
    
});

it('should create users names', () => {
    const parentElement = document.createElement('div');
    const userName = createUserName('Bogdan', parentElement);

    expect(userName.tagName.toLowerCase()).toEqual('div');
    expect(userName.classList.length).toEqual(1)
    expect(userName.classList[0]).toEqual('userName')
    expect(userName.innerHTML).toEqual('Bogdan')
    expect(parentElement.children[0]).toEqual(userName)
});

it('should create users grades', () => {
    const parentElement = document.createElement('div');
    const grade = createGrade( [{ 
        date: "2020/02/02",
        grade:2,
        subject: "math",
        title: "test z geometrii",
        user_id: 0 }  ],
        parentElement)

    expect(grade.tagName.toLowerCase()).toEqual('div');
    expect(grade.classList.length).toEqual(1)
    expect(grade.classList[0]).toEqual('grade')
    expect(grade.innerHTML).toEqual("2")
    expect(parentElement.children[0]).toEqual(grade)
});

it('should create button', () => {
    const parentElement = document.createElement('div');
    const button = createPlusButton(parentElement);

    expect(button.tagName.toLowerCase()).toEqual("button");
    expect(button.classList.length).toEqual(1)
    expect(button.classList[0]).toEqual("button")
    expect(button.innerHTML).toEqual("+")
    expect(parentElement.children[0]).toEqual(button)
});

it('should create grade title', () => {
    const parentElement = document.createElement('div');
    const gradeTitle = createGradeTitle(parentElement);

    expect(gradeTitle.tagName.toLowerCase()).toEqual('input');
    expect(gradeTitle.classList.length).toEqual(1)
    expect(gradeTitle.classList[0]).toEqual('inputs')
    expect(gradeTitle.placeholder).toEqual("Wprowadź tytuł")
    expect(parentElement.children[0]).toEqual(gradeTitle)
});

it('should create list of subjects', () => {
    const parentElement = document.createElement('div');
    const subjectList = createSubjectList ("math", parentElement)

    expect(subjectList.tagName.toLowerCase()).toEqual('option');
    expect(subjectList.value).toEqual("math")
    expect(subjectList.innerHTML).toEqual("math")
    expect(parentElement.children[0]).toEqual(subjectList)
});


})