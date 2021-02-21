import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeesService } from '../services/employees.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  private employees = [];
  private genderMap = new Map();

  constructor(private _employee: EmployeesService) {

  }

  graph() {
    let ctx = document.getElementById('empGraph');
    let empGraph = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: ['Gender'],
        datasets: [
          {
            label: "Female",
            fillColor: 'rgba(255, 99, 132, 0.2)',
            strokeColor: 'rgba(255, 99, 132, 0.2)',
            highlightFill: 'rgba(255, 99, 132, 0.2)',
            highlightStroke: 'rgba(255, 99, 132, 0.2)',
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)'],
            borderColor: [
              'rgba(255, 99, 132, 1)'],
            data: [this.genderMap.get('F')]
          },
          {
            label: "Male",
            fillColor: 'rgba(54, 162, 235, 0.2)',
            strokeColor: 'rgba(54, 162, 235, 0.2)',
            highlightFill: 'rgba(54, 162, 235, 0.2)',
            highlightStroke: 'rgba(54, 162, 235, 0.2)',
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)'],
            borderColor: [
              'rgba(54, 162, 235, 0.2)'],
            data: [this.genderMap.get('M')]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Gender of Employees'
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  ngOnInit() {
    this.employees = this._employee.getAllEmployees();
    this._employee.getEmployeesGender().subscribe(data => {
      for (let item of data) {
        this.genderMap.set(item['gender'], item['SumOfGender']);
      }
      this.graph();
    });
  }

  printEmployees() {
    for (let emp of this.employees) {
      console.log(emp);
    }
  }

  //for test purpose
  printGenderMap() {
    for (let entry of this.genderMap) {
      console.log(entry);
    }
  }
}
