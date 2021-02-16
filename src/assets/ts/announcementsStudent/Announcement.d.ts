export declare class Announcement {
    title: String;
    message: String;
    timestamp: Number;
    type: String;
    name: String;
    constructor(title: String, message: String, timestamp: Number, type: String, name: String);
    getImportance(): 1 | 2 | 3;
}
