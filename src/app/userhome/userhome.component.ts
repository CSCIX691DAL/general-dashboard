import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeesService } from '../services/employees.service';
import { Chart } from 'chart.js';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {ChartFactoryService} from '../services/chart-factory.service';
import {ChartInfo} from '../services/Chart';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  private employees = [];
  private genderMap = new Map();
  public chartInfo: ChartInfo;
  constructor(private employee: EmployeesService, private chartFactory: ChartFactoryService) {
  }

  ngOnInit(): void {
    this.employees = this.employee.getAllEmployees();
    this.employee.getEmployeesGender().subscribe(data => {
      for (const item of data) {
        this.genderMap.set(item.gender, item.SumOfGender);
      }
      this.chartInfo = this.chartFactory.generateBar(
        [this.genderMap.get('M'), this.genderMap.get('F')],
        ['Male', 'Female'],
        ['Gender']);

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
