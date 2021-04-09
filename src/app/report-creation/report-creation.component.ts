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
  isLoading = false;

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

  async ngOnInit(): Promise<void> {
    this.dbService.getDatabaseConnections().then(data => {
    this.databases = data;
    });
  }

  async updateReportType() : Promise<void> {
    this.reportsService.readReportsForDatabase(this.selectedDatabase.id)
      .then(reports => this.reports = reports)
      .catch(err => console.log(err));
  }


  updateFormGroup(): void{
    this.isFormCompleted = true;
    if (this.selectedDatabase === undefined || this.selectedReport === undefined) {return; }
    this.paramGroup = new FormGroup({});
    for (const param of this.selectedReport.input_params){
      this.paramGroup.addControl(param.name, new FormControl(''));
    }
    this.chartType = new FormGroup({});
    console.log(this.selectedReport); // Useful Debugging line.
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

    // Module checks if all parameters as well as a chart type to suit are selected and updates form completion check.
    if ((this.isFormCompleted = !values.includes('')) === true && this.selectedChartType) {
      this.isFormCompleted = true;
    }
    else {this.isFormCompleted = false;}

    // close modal if form is completed
    if (this.isFormCompleted){

      params = params.substring(0, params.length - 1);
      userReportParams += params + ']}';
      this.isLoading = true;

      this.userService.createUserReport(this.selectedReport.id, userReportParams, this.selectedChartType).then(data => {
        this.generateUserReport(this.selectedReport.id + '');

      });
    }
  }

  private generateUserReport(reportId: string) : void{
    this.userService.executeUserGeneratedReport(reportId).then(data => {
      const widget = this.chartFactory.processChartType(this.selectedChartType, data,
        [this.selectedReport.display_name],
        ['Count']);
      this.outputEvent.emit(widget);
      this.isLoading = false;
      console.log(widget);
    });

  }

}
