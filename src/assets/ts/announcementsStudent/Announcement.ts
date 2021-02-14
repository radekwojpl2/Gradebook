export class Announcement {
    public title: String;
    public message: String;
    public timestamp: Number;
    public type: String;
    public name: String

    constructor(title: String, message: String, timestamp: Number, type: String, name: String) {
        this.title = title,
        this.message = message,
        this.timestamp = timestamp,
        this.type = type,
        this.name = name
    }

    getImportance() {
        if(this.type === "important") return 3
        else if (this.type === "exam") return 2
        else return 1
    }
}