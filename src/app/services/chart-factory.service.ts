import {Injectable} from '@angular/core';
import {baseOptions, ChartInfo} from './Chart';
import {ChartDataSets, ChartType} from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartFactoryService {
  constructor() { }

  private generateBaseChart(type: ChartType, data: ChartDataSets[], labels: string[]): ChartInfo {
    return {
      data,
      chartType: type,
      labels,
      chartOptions: baseOptions,
      showLegends: true
    };
  }

  private convertToChartDataSet(data: number[], seriesLabels: string[]): ChartDataSets[]{

    const dataSets: ChartDataSets[] = [];

    for (let i = 0; i < data.length; i++) {
      console.log('Data: ' + data[i]);
      console.log('Label: ' + seriesLabels[i]);

      dataSets.push({data: [data[i]], label: seriesLabels[i]});
    }
    console.log(dataSets);
    return dataSets;
  }

  // CONFIGURE DIFFERENT CHART OPTIONS HERE
  public generateBar(data: number[], seriesLabel: string[], labels: string[]): ChartInfo {
    const type: ChartType = 'bar';
    const dataSet = this.convertToChartDataSet(data, seriesLabel);
    return this.generateBaseChart(type, dataSet, labels);
  }

  public generateLine(data: number[], seriesLabel: string[], labels: string[]): ChartInfo {
    const type: ChartType = 'line';
    const dataSet = this.convertToChartDataSet(data, seriesLabel);
    return this.generateBaseChart(type, dataSet, labels);
  }

  public generateRadar(data: number[], seriesLabel: string[], labels: string[]): ChartInfo {
    const type: ChartType = 'radar';
    const dataSet = this.convertToChartDataSet(data, seriesLabel);
    return this.generateBaseChart(type, dataSet, labels);
  }
}
