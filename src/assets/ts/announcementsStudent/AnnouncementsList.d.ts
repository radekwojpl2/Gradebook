import { Announcement } from './Announcement';
export declare class AnnouncementsList {
    private announcementsList;
    private announcementsContainer;
    private allBtn;
    private examsBtn;
    private normalBtn;
    private importantBtn;
    private sortOption;
    constructor();
    getAnnouncements(): void;
    filterList(type: String): void;
    renderList(list: Announcement[]): void;
    sortAnnouncements(type: String): void;
    sortByNewest(list: Announcement[]): Announcement[];
    sortByOldest(list: Announcement[]): Announcement[];
    sortByMostImportant(list: Announcement[]): Announcement[];
    sortByLeastImportant(list: Announcement[]): Announcement[];
}
