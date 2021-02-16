declare type SubPage = {
    subpage: string;
    student: string;
    teacher: string;
};
interface MenuInterface {
    subPages: SubPage[];
}
export declare class Menu implements MenuInterface {
    subPages: SubPage[];
    constructor(subPages: SubPage[]);
    createMenu(type: string, selectInput: HTMLElement): HTMLElement;
    renderMenu(type: string): void;
}
export {};
