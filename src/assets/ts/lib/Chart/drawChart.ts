import Chart from 'chart.js';
import { chartData } from './types';

class DrawChart {
    element: HTMLCanvasElement;
    chartData: chartData;

    constructor(id: string, data: chartData) {
        this.element = document.querySelector(`${id}`) as HTMLCanvasElement;
        this.chartData = data;
        this.drawChart()
    }

    private drawChart () {
        new Chart( this.element , {
            type: this.chartData.type,
            data: {
                datasets: this.chartData.datasets,
                labels: this.chartData.labels,

            },
        })
    }
}

export default DrawChart





