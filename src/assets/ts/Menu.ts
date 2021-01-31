import {createElementWithClasses} from './TopPanel'

type SubPage = {
    subpage: string;
    student: string;
    teacher: string;
}

interface MenuInterface {
    subPages: SubPage[]
}

export class Menu implements MenuInterface{
    subPages: SubPage[];
    constructor(subPages: SubPage[]) {
        this.subPages = subPages;
    }

    createMenu(type: string, selectInput: HTMLElement) {
        const navList = createElementWithClasses('ul', 'navigationList');
        for (let subPage in this.subPages) {
            const listElement = createElementWithClasses('li', 'navigationItem');
            if (type === 'student') {
                listElement.innerHTML = `<a href=${this.subPages[subPage].student}>${this.subPages[subPage].subpage}</a>`
            } else if (type === 'teacher') {
                listElement.innerHTML = `<a href=${this.subPages[subPage].teacher}>${this.subPages[subPage].subpage}</a>`
            }
            navList.appendChild(listElement)
        }
        if (type === 'student') {
            (selectInput as any).value = type;
        } else if (type === 'teacher') {
            (selectInput as any).value = type;
        }
        return navList
    }

    renderMenu(type: string) {
        const lisLinks = document.querySelectorAll('.navigationList>li>a')
        lisLinks.forEach( (li, index) => {
            if (type === 'student') {
                li.setAttribute('href', this.subPages[index].student)
            } else if (type === 'teacher') {
                li.setAttribute('href', this.subPages[index].teacher)
            }   
        });
        localStorage.setItem('type', type);
        window.location.href = 'index.html'
    }
}