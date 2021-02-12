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
                    this.renderList(this.sortByNewest(this.announcementsList)) 
                }
            })
            .catch( error => {
                throw new Error(error)
            })
    }

    filterList(type: String) {
        if (type === "exam") {
            this.sortOption!.style.display = "none"
            const filtered = this.announcementsList.filter( el => el.type === "exam")
            this.renderList(filtered)
        } else if (type === "important") {
            this.sortOption!.style.display = "none"
            const filtered = this.announcementsList.filter( el => el.type === "important")
            this.renderList(filtered)
        } else if (type === "normal") {
            this.sortOption!.style.display = "none"
            const filtered = this.announcementsList.filter( el => el.type === "normal")
            this.renderList(filtered)
        } else if (type === "all") {
            this.sortOption!.style.display = "block"
            this.renderList(this.announcementsList)
        }
        
    }

    renderList(list: Announcement[]) {
        this.announcementsContainer.textContent = ""
        list.forEach( announcement => {
            const announcementDiv = createElementWithClasses('div', 'announcement')
            const title = createElementWithInnerText('h2', (announcement.title as string),'announcement-title')
            const message = createElementWithInnerText('p', (announcement.message as string),'announcement-description')
            const type = createElementWithInnerText('p', (announcement.type as string).toUpperCase(), 'announcement-type')
            const created = createElementWithInnerText('p', `${new Date(announcement.timestamp as number).getDate()}/${new Date(announcement.timestamp as number).getMonth() + 1}/${new Date(announcement.timestamp as number).getFullYear()}`, 'announcement-created' )

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
        if (type === "Sort by newest") {
            this.renderList(this.sortByNewest(this.announcementsList))
        } else if (type === "Sort by oldest") {
            this.renderList(this.sortByOldest(this.announcementsList))
        } else if (type === "Sort by most important") {
            this.renderList(this.sortByMostImportant(this.announcementsList))
        } else if (type === "Sort by least important") {
            this.renderList(this.sortByLeastImportant(this.announcementsList))
        }
    }

    sortByNewest(list: Announcement[]) {
        return list.sort( (a, b) => {
                return (b.timestamp as number) - (a.timestamp as number)
        })
    }

    sortByOldest(list: Announcement[]) {
        return list.sort( (a, b) => {
            return (a.timestamp as number) - (b.timestamp as number)
        })
    }

    sortByMostImportant(list: Announcement[]) {
        return list.sort( (a, b) => {
            return b.getImportance() - a.getImportance()
         })
    }

    sortByLeastImportant(list: Announcement[]) {
        return list.sort( (a, b) => {
            return a.getImportance() - b.getImportance()
         })

    }
}