import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-databases-page',
  templateUrl: './admin-databases-page.component.html',
  styleUrls: ['./admin-databases-page.component.css']
})
export class AdminDatabasesPageComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) {
    if (auth.isAdmin() === false){
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
  }

}
