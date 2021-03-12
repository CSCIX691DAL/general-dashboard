import { Injectable } from '@angular/core';
import { DatabaseService } from './database-connection.service';
import { HttpClient } from '@angular/common/http';
import {Employee} from '../../models/employee';
import {Report} from '../modal-basic/Report';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private employees = [];
  private selectedReport: Report;
  constructor(private conn: DatabaseService, h: HttpClient) {
    this.getAllEmployees();
   }

   getAllEmployees(): any[] {
    this.conn.getAllEmployees().subscribe(data => {
      for (const item of data) {
        const itemAttr = [];
        for (const key in item){
          itemAttr.push(item[key]);
        }
        this.employees.push(new Employee(itemAttr));
      }
    });
    return this.employees;
  }

  getEmployeesGender(): Observable<any>{
    return this.conn.getEmployeesGender();
  }

  getEmployeesReport(sql: string): Promise<any[]>{
    const empReport = [];
    return new Promise<any>((resolve, reject) => this.conn.getEmployeesReport(sql).subscribe(data => {
      for (const item of data) {
        const itemAttr = [];
        for (const key in item){
          itemAttr.push(item[key]);
        }
        empReport.push(new Employee(itemAttr));
      }
      resolve(empReport);
    }));
  }

  public setReport(report: Report): void{
    this.selectedReport = report;
  }

  public getSelectedReport(): Report{
    return this.selectedReport;
  }
}
