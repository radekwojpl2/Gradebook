import '../css/TopPanel.css';
import {Menu} from './Menu'
import {subPages} from './SubPagesData'
import {createElementWithClasses, createElementWithInnerText, appendChildrenToElement} from './GlobalFunctions'


const toggleMenuBtn = (navBox: HTMLElement) => {
    navBox.classList.toggle('navigationBoxHidden');
}

export const TopPanel = () => {
    const menu = createElementWithClasses('nav', 'menu');
    const logo = createElementWithInnerText('div', 'GRADEBOOK', 'logo');
    const selectInput = createElementWithClasses('select', 'select-type');
    const studentOption = createElementWithInnerText('option', 'student');
    const teacherOption = createElementWithInnerText('option', 'teacher');
    //button to show and hide menu on mobile
    const menuBtn = createElementWithInnerText('button', 'Click', 'navigationBtn');
    const navBox = createElementWithClasses('div', 'navigationBox', 'navigationBoxHidden')!;
    const menuComponent = new Menu(subPages);

    appendChildrenToElement(selectInput, studentOption, teacherOption);

    const type = localStorage.getItem('type') || 'student';
    const navList = menuComponent.createMenu(type, selectInput);
    
    appendChildrenToElement(navBox, navList, selectInput);
    appendChildrenToElement(menu, logo, navBox, menuBtn);

    const placeToAppend = document.body.firstChild;
    document.body.insertBefore(menu, placeToAppend);

    logo.addEventListener('click', () => window.location.href = 'index.html');
    selectInput.addEventListener('change', (e) => menuComponent.renderMenu((e.target as any).value));
    menuBtn.addEventListener('click', () => toggleMenuBtn(navBox));
}