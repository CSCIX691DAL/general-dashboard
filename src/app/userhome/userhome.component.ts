import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { EmployeesService } from '../services/employees.service';
import { Chart } from 'chart.js';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {ChartFactoryService} from '../services/chart-factory.service';
import {baseOptions, ChartInfo, WidgetInfo, Table} from '../services/Chart';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  private employees = [];
  private genderMap = new Map();
  public widgets: WidgetInfo[] = [];

  constructor(private employee: EmployeesService, private chartFactory: ChartFactoryService) {
  }

  ngOnInit(): void {
    this.employees = this.employee.getAllEmployees();
    this.employee.getEmployeesGender().subscribe(data => {
      for (const item of data) {
        this.genderMap.set(item.gender, item.SumOfGender);
      }

      // example Charts (to test flexgrid)
      for (let i = 0; i < 4; i++){
        // example chart for genders
        this.widgets.push({
          name: 'chart',
          chartOptions: baseOptions,
          labels: ['Count'],
          data: [
            {data: [this.genderMap.get('M')], label: 'Male'},
            {data: [this.genderMap.get('F')], label: 'Female'},
          ],
          chartType: 'bar',
          showLegends: true
        });
      }
    });
  }

  printEmployees(): void {
    for (const emp of this.employees) {
      console.log(emp);
    }
  }

  // for test purpose
  printGenderMap(): void {
    for (const entry of this.genderMap) {
      console.log(entry);
    }
  }


}
