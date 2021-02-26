import { Component, OnInit } from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Report, Reports} from './Report';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-modal-basic',
  templateUrl: './modal-basic.component.html',
  styleUrls: ['./modal-basic.component.css']
})
export class ModalBasicComponent implements OnInit {
  selectedReport: Report;
  reports: Report[] = Reports;
  closeResult = '';
  constructor(private modalService: NgbModal) { }
  paramGroup = new FormGroup({});
  chartType = new FormGroup({});
  isFormCompleted = true;
  ngOnInit(): void {
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
    for (const param of this.selectedReport.params){
      this.paramGroup.addControl(param.name, new FormControl(''));
    }
    this.chartType = new FormGroup({});
    for (const chart of this.selectedReport.charts){
      this.paramGroup.addControl(chart.name, new FormControl(''));
    }
  }
  updateChartOptions(): void{
  }

  onSubmit(): void{
    if (this.selectedReport === undefined) { return; }
    const values: string[] = [];
    // required field check because 'required' tag wasn't working
    for (const param of this.selectedReport.params){
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
    console.log(values);
    // replace sql identifiers with the inputted values
    let str = this.selectedReport.sql;
    values.forEach(val => {
      const index = str.indexOf('@');
      // this is basically a string.replace
      str = str.replace('@', val);
      // str = str.substr(0, index + 1).replace('@', val) + str.substr(index + 1, str.length);
    });
    alert(str);
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
