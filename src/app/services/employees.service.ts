import { Injectable } from '@angular/core';
import { DatabaseService } from './database-connection.service';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../models/employee';
import {Observable} from 'rxjs';
import {Report} from '../../models/report';

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
        // tslint:disable-next-line:forin
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

  public setReport(report: Report): void{
    this.selectedReport = report;
  }

  public getSelectedReport(): Report{
    return this.selectedReport;
  }
}
