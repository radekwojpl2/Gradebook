import axios from '../../../axios';
import {appendChildrenToElement, createElementWithClasses, createElementWithInnerText} from '../GlobalFunctions'
import {Announcement} from './Announcement'
import {ExamAnnouncement} from './ExamAnnouncement'

export class AnnouncementsList {
    announcementsList: Announcement[];
    announcementsContainer: Element
    constructor() {
        this.announcementsList = []
        this.getAnnouncements()
        this.announcementsContainer = document.querySelector('.announcements-container')!

        const showExamsBtn = document.querySelector('.show-exams')
        const showGeneralBtn = document.querySelector('.show-general')
        const showAllBtn = document.querySelector('.show-all')

        showExamsBtn!.addEventListener('click', this.filterList.bind(this, 'exam'))
        showGeneralBtn!.addEventListener('click', this.filterList.bind(this, 'general'))
        showAllBtn!.addEventListener('click', this.renderList.bind(this, this.announcementsList))
    }

    getAnnouncements() {
        axios
            .get('/announcements.json')
            .then( response => {
                const data = response.data
                console.log(data)
                for (let i = 0; Object.keys(data).length; i++) {
                    if (data[i].type === "exam") {
                        const examAnnouncement = new ExamAnnouncement(data[i].title, data[i].content, data[i].timestamp, data[i].type, data[i].date, data[i].topic)
                        this.announcementsList.push(examAnnouncement)
                    } else if (data[i].type === "general") {
                        const examAnnouncement = new Announcement(data[i].title, data[i].content, data[i].timestamp, data[i].type)
                        this.announcementsList.push(examAnnouncement)
                    }
                    this.renderList(this.announcementsList) 
                }
            })
            .catch( error => {
                console.log(error)
                // throw new Error(error)
            })
    }

    filterList(type: String) {
        if (type === "exam") {
            const filtered = this.getExamType()
            this.renderList(filtered)
        } else if (type === "general") {
            const filtered = this.getGeneralType()
            this.renderList(filtered)
        }
        
    }

    getExamType() {
        const filtered = this.announcementsList.filter( el => el.type === "exam")
        return filtered
    }

    getGeneralType() {
        const filtered = this.announcementsList.filter( el => el.type === "general")
        return filtered
    }

    renderList(list: Announcement[]) {
        this.announcementsContainer.textContent = ""
        list.forEach( announcement => {
            const announcementDiv = createElementWithClasses('div', 'announcement')
            const title = createElementWithInnerText('h2', `${announcement.title}`,'announcement-title')
            const content = createElementWithInnerText('p', `${announcement.content}`,'announcement-description')

            appendChildrenToElement(announcementDiv, title)
            if (announcement instanceof ExamAnnouncement) {
                const date = createElementWithInnerText('p', `Date: ${announcement.date}`,'exam-date')
                const topic = createElementWithInnerText('p', `Topic: ${announcement.topic}`,'exam-topic')
                appendChildrenToElement(announcementDiv, date, topic)
            }
            appendChildrenToElement(announcementDiv, content)
            this.announcementsContainer.appendChild(announcementDiv)
        })    
    }
}