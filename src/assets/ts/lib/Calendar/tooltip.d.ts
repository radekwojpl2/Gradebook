import '../../../css/tooltip.css';
declare class Tooltip<T extends Node> {
    private element;
    message: string;
    constructor(element: T, message: string);
    init(): void;
}
export default Tooltip;
