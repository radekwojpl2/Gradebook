import {Announcement} from './Announcement'

export class ExamAnnouncement extends Announcement {
    public date: String;
    public topic: String;
    constructor(title: String, content: String, timestamp: Number, type: String, date: String, topic: String) {
        super(title, content, timestamp, type);
        this.date = date;
        this.topic = topic;
    }
}