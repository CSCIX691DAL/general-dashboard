import {Injectable} from '@angular/core';
import {baseOptions, ChartInfo, Table, WidgetInfo} from './Chart';
import {ChartDataSets, ChartType} from 'chart.js';
import {UserGeneratedReport} from '../../models/userGeneratedReport';

@Injectable({
  providedIn: 'root'
})
export class ChartFactoryService {
  constructor() { }

  private generateBaseChart(type: ChartType, data: ChartDataSets[], labels: string[]): ChartInfo {
    return {
      name: 'chart',
      data,
      chartType: type,
      labels,
      chartOptions: baseOptions,
      showLegends: true
    };
  }

  // private convertToChartDataSet(data: number[], seriesLabels: string[]): ChartDataSets[]{
  //
  //   const dataSets: ChartDataSets[] = [];
  //
  //   for (let i = 0; i < data.length; i++) {
  //     console.log('Data: ' + data[i]);
  //     console.log('Label: ' + seriesLabels[i]);
  //
  //     dataSets.push({data: [data[i]], label: seriesLabels[i]});
  //   }
  //   console.log(dataSets);
  //   return dataSets;
  // }

  // CONFIGURE DIFFERENT CHART OPTIONS HERE
  // public generateBar(data: number[],
  //                    seriesLabel: string[],
  //                    labels: string[]): ChartInfo {
  //   const type: ChartType = 'bar';
  //   const dataSet = this.convertToChartDataSet(data, seriesLabel);
  //   return this.generateBaseChart(type, dataSet, labels);
  // }

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

  public processChartType(chartType: string,
                          data: number[],
                          seriesLabel: string[],
                          labels: string[]): WidgetInfo {

    switch (chartType){
      case 'bar':
        return this.generateBar(data, seriesLabel, labels);
      case 'doughnut':
        return this.generateDoughnut(data, seriesLabel, labels);
      case 'table':
        return this.generateTable(data);
    }
    return null;

  }

  public generateBar(data: number[],
                     seriesLabel: string[],
                     labels: string[]): ChartInfo {
    console.log('DATA:: ' + data);
    const type: ChartType = 'bar';
    // TODO: change [data.length] as this is hard coding a count of the data
    const dataSet = this.convertToChartDataSet([data.length], seriesLabel);
    return this.generateBaseChart(type, dataSet, labels);
  }

  public generateTable(data: any[]): Table {
    // Currently we don't need to do anything for tables
    return {name: 'table', data};
  }

  public generateDoughnut(data: number[], seriesLabel: string[], labels: string[]): ChartInfo {
    const type: ChartType = 'doughnut';
    // TODO: change [data.length] as this is hard coding a count of the data
    const dataSet = this.convertToChartDataSet([data.length], seriesLabel);
    return this.generateBaseChart(type, dataSet, labels);
  }

}
