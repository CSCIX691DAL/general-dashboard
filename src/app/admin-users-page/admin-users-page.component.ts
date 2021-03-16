import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-users-page',
  templateUrl: './admin-users-page.component.html',
  styleUrls: ['./admin-users-page.component.css']
})
export class AdminUsersPageComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) {
    if (auth.isAdmin() === false){
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
  }
}
