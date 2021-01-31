import Tooltip from '../assets/ts/lib/calendar/tooltip';

describe('Tooltip class', () => {
    describe('Create tooltip for parent elemenent', () => {
        const message = "Hello world!";
        const parentElement = document.createElement('div');
        const tooltip = new Tooltip(parentElement, message);
        tooltip.init();

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
    })
})