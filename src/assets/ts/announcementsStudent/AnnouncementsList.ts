import { normalize } from 'path';
import axios from '../../../axios';
import {appendChildrenToElement, createElementWithClasses, createElementWithInnerText} from '../GlobalFunctions'
import {Announcement} from './Announcement'
import {ExamAnnouncement} from './ExamAnnouncement'

enum AnnouncementType {
    normal,
    exam,
    important
}

export class AnnouncementsList {
    private announcementsList: Announcement[];
    private announcementsContainer: Element;
    private allBtn: HTMLInputElement | null;
    private examsBtn: HTMLInputElement | null;
    private normalBtn: HTMLInputElement | null;
    private importantBtn: HTMLInputElement | null;
    private sortOption: HTMLElement | null
    constructor() {
        this.announcementsList = []
        this.getAnnouncements()
        this.announcementsContainer = document.querySelector('.announcements-container')!

        this.allBtn = document.querySelector('#all')
        this.examsBtn = document.querySelector('#exams')
        this.normalBtn = document.querySelector('#normal')
        this.importantBtn = document.querySelector('#important')
        this.sortOption = document.querySelector('#sort-input')

        console.log(this.sortOption)

        this.allBtn!.checked = true;

        this.allBtn?.addEventListener('click', this.filterList.bind(this, "all"))
        this.examsBtn?.addEventListener('click', this.filterList.bind(this, "exam"))
        this.normalBtn?.addEventListener('click', this.filterList.bind(this, "normal"))
        this.importantBtn?.addEventListener('click', this.filterList.bind(this, "important"))
        this.sortOption?.addEventListener('change', (e) => this.sortAnnouncements((e.target as any).value))

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
            const filtered = this.announcementsList.filter( el => el.type === "exam")
            this.renderList(filtered)
        } else if (type === "important") {
            const filtered = this.announcementsList.filter( el => el.type === "important")
            this.renderList(filtered)
        } else if (type === "normal") {
            const filtered = this.announcementsList.filter( el => el.type === "normal")
            this.renderList(filtered)
        } else if (type === "all") {
            this.renderList(this.announcementsList)
        }
        
    }

    renderList(list: Announcement[]) {
        this.announcementsContainer.textContent = ""
        // const sorted = this.sortByNewest(list)
        list.forEach( announcement => {
            const announcementDiv = createElementWithClasses('div', 'announcement')
            const title = createElementWithInnerText('h2', `${announcement.title}`,'announcement-title')
            const message = createElementWithInnerText('p', `${announcement.message}`,'announcement-description')
            const type = createElementWithInnerText('p', announcement.type.toUpperCase(), 'announcement-type')
            const created = createElementWithInnerText('p', `${new Date(+announcement.timestamp).getDay()}/${new Date(+announcement.timestamp).getMonth()}/${new Date(+announcement.timestamp).getFullYear()}`, 'announcement-created' )

            appendChildrenToElement(announcementDiv, title)
            if (announcement instanceof ExamAnnouncement) {
                type.style.color = "blue";
                const date = createElementWithInnerText('p', `Date: ${announcement.date}`,'exam-date')
                appendChildrenToElement(announcementDiv, date)
            } else if (announcement.type === "important") {
                type.style.color = "red";
            }
            appendChildrenToElement(announcementDiv, message, type, created)
            this.announcementsContainer.appendChild(announcementDiv)
        })    
    }

    sortAnnouncements(type: String) {
        this.allBtn!.checked = true;
        console.log(type)
        if (type === "Sort by newest") {
            console.log('n', this.announcementsList)
            const sorted = this.sortByNewest(this.announcementsList)
            this.renderList(sorted)
        } else if (type === "Sort by oldest") {
            console.log('o')
            this.renderList(this.sortByOldest(this.announcementsList))
        }
    }

    sortByNewest(list: Announcement[]) {
        const sorted = list.sort( (a, b) => {
                return +b.timestamp - +a.timestamp
        })
        return sorted
    }

    sortByOldest(list: Announcement[]) {
        const sorted = list.sort( (a, b) => {
            return +a.timestamp - +b.timestamp
        })
        return sorted
    }

    sortByMostImportant(list: Announcement[]) {
        // const sorted = list.sort( (a, b) => {
        //     let aEnum = 0
        //     if (a.type === AnnouncementType[0]) {
        //         aEnum =
        //     }
        // })
    }
}