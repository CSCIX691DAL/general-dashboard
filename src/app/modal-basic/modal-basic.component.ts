import {Component, OnInit, Output, EventEmitter} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import {EmployeesService} from '../services/employees.service';
import {ChartInfo, WidgetTypes, WidgetInfo} from '../services/Chart';
import {ChartFactoryService} from '../services/chart-factory.service';
import {Report} from '../../models/report';
import {ReportsService} from '../services/reports.service';

@Component({
  selector: 'app-modal-basic',
  templateUrl: './modal-basic.component.html',
  styleUrls: ['./modal-basic.component.css']
})
export class ModalBasicComponent implements OnInit {
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
              private reportsService: ReportsService) { }

  paramGroup = new FormGroup({});
  chartType = new FormGroup({});
  isFormCompleted = true;
  differentAxisValues = false;
  async ngOnInit(): Promise<void> {
    this.reports = await this.reportsService.readReports();
  }

  open(content): void {
    // reset variables
    this.selectedReport = null;
    this.isFormCompleted = true;
    this.modalService.open(content, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
  checkAxisValues(): void{
    const xAxisSelect = document.getElementById('0') as HTMLSelectElement;
    const xAxis = xAxisSelect.value;
    const yAxisSelect = document.getElementById('1') as HTMLSelectElement;
    const yAxis = yAxisSelect.value;
    this.differentAxisValues = !(xAxis === yAxis);
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
