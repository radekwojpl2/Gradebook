import { chartData } from './generalData';
declare class DrawChart {
    private element;
    chartData: chartData;
    constructor(id: string, data: chartData);
    private drawChart;
}
export default DrawChart;
