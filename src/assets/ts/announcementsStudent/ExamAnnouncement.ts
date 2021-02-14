import {Announcement} from './Announcement'

export class ExamAnnouncement extends Announcement {
    public date: String;
    constructor(title: String, content: String, timestamp: Number, type: String, name: String, date: String) {
        super(title, content, timestamp, type, name);
        this.date = date;
    }
}