import { Injectable } from '@angular/core';
import { DatabaseService } from '../services/database-connection.service';
import { HttpClient } from '@angular/common/http';
import { Employee } from "../models/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private employees = [];
  constructor(private conn: DatabaseService, h: HttpClient) {
    this.getEmployees();
   }

  getEmployees() {
    this.conn.getEmployees().subscribe(data => {
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
  
}