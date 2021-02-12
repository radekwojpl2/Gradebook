import axios from '../../../axios';
import {appendChildrenToElement, createElementWithClasses, createElementWithInnerText} from '../GlobalFunctions'
import {Announcement} from './Announcement'
import {ExamAnnouncement} from './ExamAnnouncement'

export class AnnouncementsList {
    private announcementsList: Announcement[];
    private announcementsContainer: Element;
    private allBtn: HTMLInputElement | null;
    private examsBtn: HTMLInputElement | null;
    private normalBtn: HTMLInputElement | null;
    private importantBtn: HTMLInputElement | null;
    constructor() {
        this.announcementsList = []
        this.getAnnouncements()
        this.announcementsContainer = document.querySelector('.announcements-container')!

        this.allBtn = document.querySelector('#all')
        this.examsBtn = document.querySelector('#exams')
        this.normalBtn = document.querySelector('#normal')
        this.importantBtn = document.querySelector('#important')

        this.allBtn!.checked = true;

        this.allBtn?.addEventListener('change', this.filterList.bind(this, "all"))
        this.examsBtn?.addEventListener('change', this.filterList.bind(this, "exam"))
        this.normalBtn?.addEventListener('change', this.filterList.bind(this, "normal"))
        this.importantBtn?.addEventListener('change', this.filterList.bind(this, "important"))

    }

    getAnnouncements() {
        axios
            .get('/announcements.json')
            .then( response => {
                const data = response.data
                console.log(data)
                for(let ann in data) {
                    if (data[ann].type === "exam") {
                        const examAnnouncement = new ExamAnnouncement(data[ann].title, data[ann].message, data[ann].timestamp, data[ann].type,  data[ann].name, data[ann].date)
                        this.announcementsList.push(examAnnouncement)
                    } else if (data[ann].type === "normal" || data[ann].type === "important") {
                        const examAnnouncement = new Announcement(data[ann].title, data[ann].message, data[ann].timestamp, data[ann].type, data[ann].name)
                        this.announcementsList.push(examAnnouncement)
                    }
                    this.renderList(this.announcementsList) 
                }
            })
            .catch( error => {
                throw new Error(error)
            })
    }

    filterList(type: String) {
        if (type === "exam") {
            const filtered = this.getExamType()
            this.renderList(filtered)
        } else if (type === "important") {
            const filtered = this.getImportantType()
            this.renderList(filtered)
        } else if (type === "normal") {
            const filtered = this.getNormalType()
            this.renderList(filtered)
        } else if (type === "all") {
            this.renderList(this.announcementsList)
        }
        
    }

    getExamType() {
        const filtered = this.announcementsList.filter( el => el.type === "exam")
        return filtered
    }

    getImportantType() {
        const filtered = this.announcementsList.filter( el => el.type === "important")
        return filtered
    }

    getNormalType() {
        const filtered = this.announcementsList.filter( el => el.type === "normal")
        return filtered
    }

    renderList(list: Announcement[]) {
        this.announcementsContainer.textContent = ""
        list.forEach( announcement => {
            const announcementDiv = createElementWithClasses('div', 'announcement')
            const title = createElementWithInnerText('h2', `${announcement.title}`,'announcement-title')
            const message = createElementWithInnerText('p', `${announcement.message}`,'announcement-description')
            const type = createElementWithInnerText('p', announcement.type.toUpperCase(), 'announcement-type')

            appendChildrenToElement(announcementDiv, title)
            if (announcement instanceof ExamAnnouncement) {
                type.style.color = "blue";
                const date = createElementWithInnerText('p', `Date: ${announcement.date}`,'exam-date')
                appendChildrenToElement(announcementDiv, date)
            } else if (announcement.type === "important") {
                type.style.color = "red";
            }
            appendChildrenToElement(announcementDiv, message, type)
            this.announcementsContainer.appendChild(announcementDiv)
        })    
    }
}