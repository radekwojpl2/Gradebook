export declare enum MONTHS {
    JANUARY = 0,
    FEBRUARY = 1,
    MARCH = 2,
    APRIL = 3,
    MAY = 4,
    JUNE = 5,
    JULY = 6,
    AUGUST = 7,
    SEPTEMPER = 8,
    OCTOBER = 9,
    NOVEMBER = 10,
    DECEMBER = 11
}
export interface Event {
    id: string;
    topic: string;
    timestamp: number;
}
export interface Events {
    data: Event[];
}
export interface EventsData extends Events {
    className: string;
}
