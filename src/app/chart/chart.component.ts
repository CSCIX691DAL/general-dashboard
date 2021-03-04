import { Component, Input, OnInit} from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import {ChartInfo} from '../services/Chart';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() chartInfo: ChartInfo;

  public AllowedCharts = [ 'bar', 'line', 'doughnut'];

  public barChartOptions: ChartOptions;
  public barChartLabels: Label[];
  public barChartType: ChartType;
  public barChartLegend: boolean;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[];

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.chartInfo);
    this.barChartData = this.chartInfo.data;
    this.barChartLabels = this.chartInfo.labels;
    this.barChartOptions = this.chartInfo.chartOptions;
    this.barChartType = this.chartInfo.chartType;
    this.barChartLegend = this.chartInfo.showLegends;
  }



}
