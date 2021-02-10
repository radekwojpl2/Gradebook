import '../css/announcementsStudent.css'
import axios from '../../axios';


class AnnouncementsList {
    announcementsList: Object[];
    announcementsContainer: Element
    constructor() {
        this.announcementsList = []
        this.getAnnouncements()

        this.announcementsContainer = document.querySelector('.announcements-container')!
    }

    getAnnouncements() {
        axios
            .get('/announcements.json')
            .then( response => {
                const data = response.data
                console.log(data)
                for (let i = 0; Object.keys(data).length; i++) {
                    if (data[i].type === "exam") {
                        const examAnnouncement = new ExamAnnouncement(data[i].title, data[i].content, data[i].timestamp, data[i].date, data[i].topic)
                        this.announcementsList.push(examAnnouncement)
                    } else if (data[i].type === "general") {
                        const examAnnouncement = new Announcement(data[i].title, data[i].content, data[i].timestamp)
                        this.announcementsList.push(examAnnouncement)
                    }
                    console.log(this.announcementsList)
                }
                
            })
            .catch( error => {
                console.log(error)
                // throw new Error(error)
            })
    }
}

class Announcement {
    protected title: String;
    protected content: String;
    protected timestamp: Number;

    constructor(title: String, content: String, timestamp: Number) {
        this.title = title,
        this.content = content,
        this.timestamp = timestamp
    }
}

class ExamAnnouncement extends Announcement {
    private date: String;
    private topic: String;
    constructor(title: String, content: String, timestamp: Number, date: String, topic: String) {
        super(title, content, timestamp);
        this.date = date;
        this.topic = topic;
    }

}

const ann = new AnnouncementsList()
