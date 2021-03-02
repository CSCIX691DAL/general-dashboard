import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';


export interface ChartInfo {
  chartType: ChartType;
  labels: Label[];
  data: ChartDataSets[];
  chartOptions: ChartOptions;
  showLegends: boolean;
}


export const baseOptions: ChartOptions = {
  responsive: true,
    scales: { xAxes: [
      {ticks: {beginAtZero: true}}
      ],
      yAxes: [
        {ticks: {beginAtZero: true}}
        ] },
  plugins: {
    datalabels: {
      anchor: 'end',
        align: 'end',
    }
  }
};






