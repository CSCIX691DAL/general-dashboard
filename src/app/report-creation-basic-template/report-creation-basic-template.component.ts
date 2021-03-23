import { Component, OnInit } from '@angular/core';
import {SequelizeService} from '../services/sequelize.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Json} from 'sequelize/types/lib/utils';
import {Parameter} from '../../models/report';
import {col} from 'sequelize';

@Component({
  selector: 'app-report-creation-basic-template',
  templateUrl: './report-creation-basic-template.component.html',
  styleUrls: ['./report-creation-basic-template.component.css']
})
export class ReportCreationBasicTemplateComponent implements OnInit {

  models: string[];
  closeResult = '';
  selectedModel: string;
  selectedModelStructure: string[];
  functions = ['All', 'Distinct', 'Sum'];
  selectedFunc: string;
  selectedForFunc: string;
  constructor(private seq: SequelizeService, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.seq.getModels().subscribe(data => {
      this.models = data;
    });
  }

  open(content): void {
    // reset variables
    this.modalService.open(content, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  onModelChange(): void{
    if (!this.selectedModel){ return; }

    this.seq.getModel(this.selectedModel).then(data => {
      this.selectedModelStructure = [];
      for (const key in data){
        if (data.hasOwnProperty(key)) {
          this.selectedModelStructure.push(key);
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
    else {
      sql += ' * ';
    }

    sql += ' FROM ' + this.selectedModel.replace('.js', '') + ' ';

    sql += this.parseInputParams();

    console.log(this.selectColumns());
    console.log(this.parseInputParams());
    console.log(sql);

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

}
