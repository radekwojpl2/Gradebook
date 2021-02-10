export class Announcement {
    public title: String;
    public content: String;
    public timestamp: Number;
    public type: String;

    constructor(title: String, content: String, timestamp: Number, type: String) {
        this.title = title,
        this.content = content,
        this.timestamp = timestamp,
        this.type = type
    }
}