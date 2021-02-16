import { Announcement } from './Announcement';
export declare class ExamAnnouncement extends Announcement {
    date: String;
    constructor(title: String, content: String, timestamp: Number, type: String, name: String, date: String);
}
