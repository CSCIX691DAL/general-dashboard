import { Component, Input, OnInit} from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import {ChartInfo, WidgetTypes} from '../services/Chart';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() chartInfo: ChartInfo;

  public AllowedCharts = WidgetTypes;

  public options: ChartOptions;
  public xAxisLabels: Label[];
  public chartType: ChartType;
  public showLegend: boolean;
  public plugins = [pluginDataLabels];
  public data: ChartDataSets[];
  constructor() {
  }

  ngOnInit(): void {
      if (this.chartInfo){
        this.data = this.chartInfo.data;
        this.xAxisLabels = this.chartInfo.labels;
        this.options = this.chartInfo.chartOptions;
        this.chartType = this.chartInfo.chartType;
        this.showLegend = this.chartInfo.showLegends;
      }
  }




}
