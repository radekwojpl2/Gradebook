import Tooltip from '../assets/ts/lib/Calendar/tooltip';
import Calendar from '../assets/ts/lib/Calendar/calendar'

describe('Tooltip class', () => {
    describe('Create tooltip for parent elemenent', () => {
        const message = "Hello world!";
        const parentElement = document.createElement('div');
        const tooltip = new Tooltip(parentElement, message);
        console.log(parentElement)

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
    const parentElement = document.createElement('div');
    parentElement.setAttribute('id', 'calendar')
    parentElement.innerHTML = '';

    it('should create calendar with today date', () => {
        const calendar = new Calendar();
        expect(parentElement.children.length).toEqual(1);
        
    })


})


