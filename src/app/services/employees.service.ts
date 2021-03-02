import { Injectable } from '@angular/core';
import { DatabaseService } from '../services/database-connection.service';
import { HttpClient } from '@angular/common/http';
import { Employee } from "../models/employee";
import {Report} from '../modal-basic/Report';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private employees = [];
  private selectedReport: Report;
  constructor(private conn: DatabaseService, h: HttpClient) {
    this.getAllEmployees();
   }

   getAllEmployees() {
    this.conn.getAllEmployees().subscribe(data => {
      for (let item of data) {
        let itemAttr = [];
        for(let key in item){
          itemAttr.push(item[key]);
        }
        this.employees.push(new Employee(itemAttr));
      }
    });
    return this.employees;
  }

  getEmployeesGender(){
    return this.conn.getEmployeesGender();
  }

  getEmployeesReport(sql: string){
    const empReport = [];
    this.conn.getEmployeesReport(sql).subscribe(data => {
      for (let item of data) {
        let itemAttr = [];
        for(let key in item){
          itemAttr.push(item[key]);
        }
        empReport.push(new Employee(itemAttr));
      }
    });
    return empReport;
  }

  public setReport(report: Report){
    this.selectedReport = report;
  }

  public getSelectedReport(){
    return this.selectedReport;
  }
}
