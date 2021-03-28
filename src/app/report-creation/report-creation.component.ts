import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {WidgetInfo, WidgetTypes} from '../services/Chart';
import {Report} from '../../models/report';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EmployeesService} from '../services/employees.service';
import {ChartFactoryService} from '../services/chart-factory.service';
import {ReportsService} from '../services/reports.service';
import {FormControl, FormGroup} from '@angular/forms';
import {DatabaseService} from '../services/database-connection.service';
import { Database } from 'src/models/database';

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
    private dbService: DatabaseService) { }

  paramGroup = new FormGroup({});
  chartType = new FormGroup({});
  isFormCompleted = true;
  differentAxisValues = false;
  
  async ngOnInit(): Promise<void> {
    this.reports = await this.reportsService.readReports();
    console.log(this.reports);

    this.dbService.getDatabaseConnections().then(data => {
    this.databases = data;
    console.log(this.databases);
    });
  }

  updateFormGroup(): void{
    this.isFormCompleted = true;
    if (this.selectedDatabase === undefined) {return;}
    if (this.selectedReport === undefined) { return; }
    this.paramGroup = new FormGroup({});
    for (const param of this.selectedReport.input_params){
      this.paramGroup.addControl(param.name, new FormControl(''));
    }
    this.chartType = new FormGroup({});
    
    console.log(this.selectedDatabase);
    console.log(this.selectedReport);
  }


  onSubmit(): void{
    if (this.selectedReport === undefined) { return; }

    const values: string[] = [];
    // required field check because 'required' tag wasn't working
    for (const param of this.selectedReport.input_params){
      values.push(this.paramGroup.get(param.name).value);
    }
    this.isFormCompleted = !values.includes('');
    // close modal if form is completed
    if (this.isFormCompleted){
      this.processReport(values);
      this.modalService.dismissAll();
    }
  }

  private processReport(values: string[]): boolean{
    // replace sql identifiers with the inputted values
    let sql = this.selectedReport.sql;
    values.forEach(val => {
      // replace the delimiters with inputted values
      sql = sql.replace('@', val);
    });

    this.employeeService.getEmployeesReport(sql).then(data => {
      const widget = this.chartFactory.processChartType(this.selectedChartType, data,
        [this.selectedReport.display_name],
        ['Count']);
      this.outputEvent.emit(widget);
      console.log(widget);
    });
    return true;
  }
}
