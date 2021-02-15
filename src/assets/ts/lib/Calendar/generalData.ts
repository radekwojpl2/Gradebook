export enum MONTHS {
    JANUARY,
    FEBRUARY,
    MARCH,
    APRIL,
    MAY,
    JUNE,
    JULY,
    AUGUST,
    SEPTEMPER,
    OCTOBER,
    NOVEMBER,
    DECEMBER
}

export interface Event {
    id: string,
    topic: string,
    timestamp: number,
}

export interface Events {
    data: Event[]
}

export interface EventsData extends Events{
    className: string
}


