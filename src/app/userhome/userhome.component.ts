import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeesService } from '../services/employees.service';
import { Chart } from 'chart.js';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  private employees = [];
  private genderMap = new Map();

  constructor(private employee: EmployeesService) {
  }

  graph(): void {
    const ctx = document.getElementById('empGraph');
    const empGraph = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: ['Gender'],
        datasets: [
          {
            label: 'Female',
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
            label: 'Male',
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

  ngOnInit(): void {
    this.employees = this.employee.getAllEmployees();
    this.employee.getEmployeesGender().subscribe(data => {
      for (const item of data) {
        this.genderMap.set(item.gender, item.SumOfGender);
      }
      this.graph();
    });
  }

  printEmployees(): void {
    for (const emp of this.employees) {
      console.log(emp);
    }
  }

  // for test purpose
  printGenderMap(): void {
    for (const entry of this.genderMap) {
      console.log(entry);
    }
  }
  getMessage(): void{
    console.log('Hey');
  }
}
