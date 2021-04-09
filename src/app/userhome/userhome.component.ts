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
import {Report} from '../../models/report';
import {UserGeneratedReport} from '../../models/userGeneratedReport';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  public allUserGeneratedReports: any[];
  public activeUserGeneratedReports: any[];
  public displayedWidgets: WidgetInfo[] = [];
  constructor(private reportService: ReportsService,
              private userService: UsersService,
              private chartFactory: ChartFactoryService) {
  }

  ngOnInit(): void {
    // function taken from:  https://therichpost.com/how-to-make-simple-sidebar-template-with-bootstrap-4-and-angular-9/
    // tslint:disable-next-line:only-arrow-functions
    $('#menu-toggle').click(e => {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });
    $('#menu-toggle').click(e => {
      event.preventDefault();
      $('#barRight').toggle();
      $('#barLeft').toggle();
    });

    this.userService.getUserGeneratedReportsByUserId().then(reports => {
      this.allUserGeneratedReports = reports;
      this.activeUserGeneratedReports = reports.filter(report => report.isActive === 1);

      this.executeReports(this.activeUserGeneratedReports);
    });

  }

  private executeReports(reports: any[]): void{
    reports.forEach(report => {
        this.userService.executeUserGeneratedReport(report.report_id_fk + '').then(data => {
          if (data.length > 5){
            data = data.slice(0, 5);
          }
          const widget = this.chartFactory.processChartType(report.chart_type, data,
            [report['reports_model.display_name']],
            ['Count']);
          this.displayedWidgets.push(widget);
        });
    });

  }


  isTable(obj: WidgetInfo): boolean{
    return obj.name === 'table';
  }

  test(): void{
    console.log(this.displayedWidgets);
  }
}

