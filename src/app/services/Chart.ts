import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {Employee} from '../models/employee';

// need this for typeof because typescript can't handle custom types easily
export interface TypeName {
  name: string;
}

export interface ChartInfo extends TypeName{
  chartType: ChartType;
  labels: Label[];
  data: ChartDataSets[];
  chartOptions: ChartOptions;
  showLegends: boolean;
}

export interface Table extends TypeName{
  data: Employee[];
}

export type WidgetInfo = ChartInfo | Table;

export const WidgetTypes: string[] = ['bar', 'doughnut', 'table'];

export const baseOptions: ChartOptions = {
  responsive: true,
    scales: { xAxes: [
      {ticks: {suggestedMax: 200000,
        beginAtZero: true}}
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






