import { Component, OnInit, ViewChild,EventEmitter,Output } from '@angular/core';
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
import { User } from 'src/models/users';
import { Database } from 'src/models/database';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {WidgetTypes} from '../services/Chart';
import {FormControl} from '@angular/forms';

import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  @Output() outputEvent = new EventEmitter<WidgetInfo>();

  public allUserGeneratedReports: any[];
  public activeUserGeneratedReports: any[];
  public displayedWidgets: WidgetInfo[] = [];

  models: string[];
  closeResult = '';
  selectedModel: string;
  selectedModelStructure: any[] = [];
  functions = ['All', 'Distinct', 'Count'];
  selectedFunc: string;
  selectedForFunc: string;
  databases: Database[] = [];
  selectedDatabase: Database;
  reportName: string;
  reportDisplayName: string;
  form: FormGroup;
  //start
  selectedReport: Report;
  selectedChartType: string;
  chartTypes = WidgetTypes;
  reports: Report[] = [];
  isLoading = false;

  selectedUserInputs: string[] = [];
  dropdownSettings = {};
  dropdownList = [];

  constructor(
    private employeeService: EmployeesService,
    private reportService: ReportsService,
    private reportsService: ReportsService, 
    private userService: UsersService, 
    private chartFactory: ChartFactoryService, 
    private dbService: DatabaseService,
    private seq: SequelizeService, 
    private modalService: NgbModal,
     private auth: AuthService) {}
     
  paramGroup = new FormGroup({});
  chartType = new FormGroup({});
  isFormCompleted = true;
  differentAxisValues = false;

  async ngOnInit(): Promise<void> {

    this.databases = await this.dbService.getDatabaseConnections();
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

    this.dropdownList = [
      {"id":1,"itemName":"India"},
      {"id":2,"itemName":"Singapore"},
      {"id":3,"itemName":"Australia"},
      {"id":4,"itemName":"Canada"},
      {"id":5,"itemName":"South Korea"},
      {"id":6,"itemName":"Germany"},
      {"id":7,"itemName":"France"},
      {"id":8,"itemName":"Russia"},
      {"id":9,"itemName":"Italy"},
      {"id":10,"itemName":"Sweden"}
    ];

    this.dropdownSettings = { 
      singleSelection: false, 
      text:"Please Select Columns",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true
    }; 
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

    //end of report creation modal ts

  private executeReports(reports: any[]): void{
    reports.forEach(report => {
        this.userService.executeUserGeneratedReport(report.report_id_fk + '').then(data => {
          if (data.length > 5 && report.chart_type === 'table'){
            data = data.slice(0, 5);
          }
          const widget = this.chartFactory.processChartType(report.chart_type, data,
            [report['reports_model.display_name']],
            ['Count']);
          widget.displayName = report['reports_model.display_name'];
          this.displayedWidgets.push(widget);
        });
    });

  }
  async deleteWidgets(report: UserGeneratedReport): Promise<void> {
    await this.userService.deleteUserReport(report.report_id_fk)
    .catch(err => console.log(err));
    location.reload();
  }

  public addWidget(report: any): void{
    // check if report is already added
    if (!this.activeUserGeneratedReports.includes(report)){
      // update active status in db
      this.userService.updateIsActive(report.id, 1).then(resp => {
        this.activeUserGeneratedReports.push(report);
        // execute report
        this.executeReports([report]);
      }).catch(err => {
        console.log(err);
      });
    }
  }
  public setReportInactive(selectedReport: UserGeneratedReport): void{
    this.userService.updateIsActive(selectedReport.id, 0).then(r => console.log(r));
    location.reload();
  }

  isTable(obj: WidgetInfo): boolean{
    return obj.name === 'table';
  }

  open(content): void {
    this.modalService.open(content, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
  }

  async databaseChange(event: any): Promise<void>{
    this.selectedDatabase = event;
    this.models = await this.seq.getModels(this.selectedDatabase.id);
  }

  onModelChange(): void{
    if (!this.selectedModel){ return; }

    this.seq.getModel(this.selectedDatabase.id, this.selectedModel).then(data => {
      this.selectedModelStructure = [];
      var i = 1;
      for (const key in data){
        if (data.hasOwnProperty(key)) {
          this.selectedModelStructure.push({id: i, itemName: key});
          i = i + 1;
        }
      }
    });
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

  submit(): void{
    let sql = 'SELECT ';
    if (this.selectedFunc === 'Distinct'){
      sql += this.selectColumns().replace(this.selectedForFunc,  'DISTINCT ' + this.selectedForFunc);
    }
    else if (this.selectedFunc === 'Count'){
      sql += 'count(' + this.selectedForFunc + ')';
    }
    else {
      sql += ' * ';
    }

    sql += ' FROM ' + this.selectedModel.replace('.js', '') + ' ';

    sql += this.parseInputParams();

    console.log(this.selectColumns());
    console.log(this.parseInputParams());
    console.log(sql);

    this.reportService.createReport(this.reportName,
      this.reportDisplayName,
      sql,
      this.createInputParamsJsonString(),
      this.selectedModel,
      this.selectedDatabase.id).then(resp => {
        alert('report has been created');
        this.modalService.dismissAll();
        this.resetModal();
    })
      .catch(err => {
      alert(err.msg);
    });
    
  }

  resetModal(): void{
    this.selectedModel = ("");
    this.selectedModelStructure = [];
    this.selectedFunc = ("");
    this.selectedForFunc = ("");
    this.selectedDatabase = (null);
    this.reportDisplayName = ("");
    this.reportName = ("");
  }

  private selectColumns(): string {
    let cols = '';

    // start off with correct param at front
    if (this.selectedForFunc){
      cols = this.selectedForFunc + ' ';
    }

    this.selectedModelStructure.forEach(param => {
      // skip our selected param because its at the front
      if (param !== this.selectedForFunc){
        if (cols === ''){
          cols += param;
        }
        else {
          cols += ',' + param;
        }
      }
    });
    return cols;
  }


  private parseInputParams(): string {
    let str = '';
    for (const param of this.selectedModelStructure){
      const element = document.getElementById(param) as HTMLInputElement;
      if (element.checked){

        // handle starting 'and'
        if (str === '') {
          str += param + ' = @ ';
        }
        else {
          str += ' AND ' + param + ' = @ ';
        }
      }
    }
    if (str !== ''){
      str = ' WHERE ' + str;
    }
    return str;
  }

  createInputParamsJsonString(): string{
    let str = '{"params": [';
    let count = 0;
    for (const param of this.selectedModelStructure){
      const element = document.getElementById(param) as HTMLInputElement;
      if (element.checked){
        str += '{"name":"' + param + '","type":"text"},';
        count++;
      }
    }
    if (count > 0){
      str = str.substring(0, str.length - 1) + ']}';
    }
    else {
      str += ']}';
    }
    return str;
  }









}

function reason(reason: any) {
  throw new Error('Function not implemented.');
}