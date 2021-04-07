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
import {ReportsService} from '../services/reports.service';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  private employees = [];
  private genderMap = new Map();
  public widgets: WidgetInfo[] = [];

  constructor(private reportService: ReportsService, private userService: UsersService,
    private employee: EmployeesService, private chartFactory: ChartFactoryService) {
  }

  ngOnInit(): void {
    // function taken from:  https://therichpost.com/how-to-make-simple-sidebar-template-with-bootstrap-4-and-angular-9/
    // tslint:disable-next-line:only-arrow-functions
    $('#menu-toggle').click(function(e) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });
    $('#menu-toggle').click(function(event) {
      event.preventDefault();
      $('#barRight').toggle();
      $('#barLeft').toggle();
    });
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

    this.userService.getUserGeneratedReportsByUserId().then(r => {
      console.log(r);
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
