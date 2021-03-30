import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {WidgetInfo, WidgetTypes} from '../services/Chart';
import {Report} from '../../models/report';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EmployeesService} from '../services/employees.service';
import {ChartFactoryService} from '../services/chart-factory.service';
import {ReportsService} from '../services/reports.service';
import {FormControl, FormGroup} from '@angular/forms';
import {UsersService} from '../services/users.service';
import {Observable, Subscription} from 'rxjs';
import {DatabaseService} from '../services/database-connection.service';
import { Database } from 'src/models/database';
import {AuthService} from '../auth.service';



@Component({
  selector: 'app-report-creation',
  templateUrl: './report-creation.component.html',
  styleUrls: ['./report-creation.component.css']
})
export class ReportCreationComponent implements OnInit {


  @Output() outputEvent = new EventEmitter<WidgetInfo>();

  selectedReport: Report;
  selectedDatabase: Database;
  selectedChartType: string;
  chartTypes = WidgetTypes;
  reports: Report[] = [];
  databases: Database[] = [];
  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private employeeService: EmployeesService,
    private chartFactory: ChartFactoryService,
    private reportsService: ReportsService,
    private userService: UsersService,
    private dbService: DatabaseService,
    private auth: AuthService){}


  paramGroup = new FormGroup({});
  chartType = new FormGroup({});
  isFormCompleted = true;
  differentAxisValues = false;
  dataList = []; // Temp. var for reports.
  async ngOnInit(): Promise<void> {
    this.dbService.getDatabaseConnections().then(data => {
    this.databases = data;
    });
    this.dataList = await this.reportsService.readReports();
  }

  async upadateReportType() : Promise<void> {
    this.reports = [];
    for (let i = 0; i < this.dataList.length; i++) {
      if (this.selectedDatabase.id === this.dataList[i].database_connection_fk) {
        this.reports[i] = this.dataList[i];
    }
  }

  }

  updateFormGroup(): void{
    this.isFormCompleted = true;
    if (this.selectedDatabase === undefined || this.selectedReport === undefined) {return; }
    this.paramGroup = new FormGroup({});
    for (const param of this.selectedReport.input_params){
      this.paramGroup.addControl(param.name, new FormControl(''));
    }
    this.chartType = new FormGroup({});
  }


  onSubmit(): Promise<void>{
    if (this.selectedReport === undefined) { return; }

    const values: string[] = [];
    let userReportParams = '{"params": [';
    let params = '';
    // required field check because 'required' tag wasn't working
    for (const param of this.selectedReport.input_params){
      values.push(this.paramGroup.get(param.name).value);
      params += ('{"' + param.name + '": ' + '"' + this.paramGroup.get(param.name).value + '"},');
    }
    this.isFormCompleted = !values.includes('');
    // close modal if form is completed
    if (this.isFormCompleted){
      this.userService.createUserReport(this.selectedReport.id, this.selectedReport.input_params).then(res => {
        console.log('HERE');
        this.generateUserReport(this.selectedReport.id + '', this.selectedDatabase.id + '');
      this.processReport(values);
      params = params.substring(0, params.length - 1);
      userReportParams += params + ']}';
      this.userReportsService.createUserReport(this.selectedReport.id, userReportParams).then(data => {
        console.log('created user report');
      });

    }
  }

  private generateUserReport(reportId: string, dbConnId: string) : void{
    this.userService.getUserGeneratedReport(reportId, dbConnId).then(data => {
      const widget = this.chartFactory.processChartType(this.selectedChartType, data,
        [this.selectedReport.display_name],
        ['Count']);
      this.outputEvent.emit(widget);
      console.log(widget);
    });

  }

}
