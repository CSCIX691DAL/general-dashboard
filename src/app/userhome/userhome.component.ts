import { Component, OnInit } from '@angular/core';
import { Employee } from "../models/employee";
import { EmployeesService } from '../services/employees.service'

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  private employees = [];

  constructor(private _employee: EmployeesService) {
    
  }

  ngOnInit(): void {
    this.employees = this._employee.getEmployees();
  }

  

  printEmployees() {
    for (let emp of this.employees) {
      console.log(emp)
    }
  }
}
