import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { EmployeesService } from '../services/employees.service';
import { Chart } from 'chart.js';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {ChartFactoryService} from '../services/chart-factory.service';
import {baseOptions, ChartInfo, WidgetInfo, Table} from '../services/Chart';
import {SequelizeService} from '../services/sequelize.service';
import {DatabaseService} from '../services/database-connection.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  private employees = [];
  private genderMap = new Map();
  public widgets: WidgetInfo[] = [];

  constructor(private test: DatabaseService,
    private seqService: SequelizeService, private employee: EmployeesService, private chartFactory: ChartFactoryService) {
  }

  ngOnInit(): void {
    this.employees = this.employee.getAllEmployees();
    this.employee.getEmployeesGender().subscribe(data => {
      for (const item of data) {
        this.genderMap.set(item.gender, item.SumOfGender);
      }

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

  test1(): void{
    this.seqService.generateModels().subscribe(data => console.log(data));
  }
  test2(): void{
  }
  test3(): void{
    this.seqService.getModels().subscribe(data => console.log(data));
  }

  testExecuteReport(): void{
    this.test.getDatabaseConnections().then(data => {
      console.log(data[0].host_name);
      console.log(data[0].id);
      console.log(data[0].password);
      console.log(data[0].port);
      console.log(data[0].schema);
    });
  }

}
