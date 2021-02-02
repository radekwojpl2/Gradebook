import Chart from 'chart.js';
import { chartData } from './types';

class DonoughtChart {
    element: HTMLCanvasElement;
    chartData: chartData;

    constructor(id: string, data: chartData) {
        this.element = document.querySelector(`${id}`) as HTMLCanvasElement;
        this.chartData = data;
        this.doughnutChart()
    }

    doughnutChart () {
        new Chart( this.element , {
            type: 'polarArea',
            data: {
                datasets: [{
                    data: this.chartData.data,
                    backgroundColor: this.chartData.colors
                }],
                labels: this.chartData.labels,

            },
            options: {
                cutoutPercentage: 50,
            }
        })
    }
}

export default DonoughtChart





