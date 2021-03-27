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

@Component({
  selector: 'app-report-creation',
  templateUrl: './report-creation.component.html',
  styleUrls: ['./report-creation.component.css']
})
export class ReportCreationComponent implements OnInit {


  @Output() outputEvent = new EventEmitter<WidgetInfo>();

  selectedReport: Report;
  selectedChartType: string;
  chartTypes = WidgetTypes;
  reports: Report[] = [];
  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private employeeService: EmployeesService,
    private chartFactory: ChartFactoryService,
    private reportsService: ReportsService,
    private usersService : UsersService) { }

  paramGroup = new FormGroup({});
  chartType = new FormGroup({});
  isFormCompleted = true;
  differentAxisValues = false;
  async ngOnInit(): Promise<void> {
    this.reports = await this.reportsService.readReports();
  }

  updateFormGroup(): void{
    this.isFormCompleted = true;
    if (this.selectedReport === undefined) { return; }
    this.paramGroup = new FormGroup({});
    for (const param of this.selectedReport.input_params){
      this.paramGroup.addControl(param.name, new FormControl(''));
    }
    this.chartType = new FormGroup({});

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
      // @Todo need to replace the hardcoded userId and reportId
      this.generateUserReport('5', '4');
      this.modalService.dismissAll();
    }
  }

  private generateUserReport(userId: string, reportId: string) : void{
    this.usersService.getUserGeneratedReport(userId, reportId, '2').then(data => {
      const widget = this.chartFactory.processChartType(this.selectedChartType, data,
        [this.selectedReport.display_name],
        ['Count']);
      this.outputEvent.emit(widget);
      console.log(widget);

    });
  }
}
