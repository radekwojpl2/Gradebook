import Tooltip from '../assets/ts/lib/Calendar/tooltip';
import Calendar from '../assets/ts/lib/Calendar/calendar';
import moment from 'moment';

describe('Tooltip class', () => {
    describe('Create tooltip for parent elemenent', () => {
        const message = "Hello world!";
        const parentElement = document.createElement('div');
        const tooltip = new Tooltip(parentElement, message);

        it('should append tooltip with "Hello world!" message to parentElement', () => {
            expect(tooltip.message).toBe("Hello world!")
            expect(parentElement.children.length).toEqual(1);
            expect(parentElement.innerHTML).toEqual('<div class="tip">Hello world!</div>');
        });
        it('should change message "Hello world!" in tooltip to "Goodbye"', () => {
            tooltip.message = "Goodbye";
            expect(tooltip.message).not.toBe("Hello world!");
            expect(tooltip.message).toBe("Goodbye");
        });
    });
});


describe('Calendar class', () => {
    document.body.innerHTML = '<div id="calendar"></div>';
    const parentElement = document.getElementById("calendar") as HTMLElement
    it('should create calendar with today date', () => {
        const today = moment();
        const months = moment.months();
        const year = today.year();
        const month = months[today.month()].toLocaleLowerCase();
        new Calendar();
        const nav = document.querySelector('nav') as HTMLElement
        expect(parentElement.children.length).toEqual(2);
        expect(nav.children[1].innerHTML.toLocaleLowerCase().trim()).toEqual(month);
        expect(nav.children[2].innerHTML.toLocaleLowerCase().trim()).toEqual(`${year}`)

    });
    it('should create calendar with data march 2018', () => {
        new Calendar('2018-03-01');
        const nav = document.querySelector('nav') as HTMLElement
        expect(nav.children[1].innerHTML.toLocaleLowerCase().trim()).toEqual('march');
        expect(nav.children[2].innerHTML.toLocaleLowerCase().trim()).toEqual('2018')
    });
})


