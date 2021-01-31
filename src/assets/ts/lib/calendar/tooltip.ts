import '../../../css/tooltip.css';

class Tooltip <T extends Node> {

    element: T;
    message: string;

    // tworzymy zmienne
    constructor (element: T, message:string) {
        this.element = element;
        this.message = message;
    }

    // tworzymy element blokowy i nadajemy efekt
    init() {
        const tip = document.createElement('div');
        tip.classList.add('tip');
        tip.textContent = this.message;
        this.element.appendChild(tip);

        this.element.addEventListener('mouseover', () => {
            tip.classList.add('active');
        });

        this.element.addEventListener('mouseleave', () =>{
            tip.classList.remove('active');
        });
    }
}

export default Tooltip