import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-report-page',
  templateUrl: './admin-report-page.component.html',
  styleUrls: ['./admin-report-page.component.css']
})
export class AdminReportPageComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) {
    if (auth.isAdmin() === false){
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
  }

}
