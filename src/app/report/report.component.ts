import { Component, OnInit } from '@angular/core';
import {EmployeesService} from '../services/employees.service';
import {Report} from '../modal-basic/Report';
import {Employee} from '../models/employee';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  selectedReport: Report;
  employees: Employee[];
  constructor(private employeeService: EmployeesService) { }

  ngOnInit(): void {
    this.selectedReport = this.employeeService.getSelectedReport();
    this.employees = this.employeeService.getEmployeesReport(this.selectedReport.sql);
  }

}
