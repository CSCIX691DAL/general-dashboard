import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database-connection.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loginState = true;
  isLoggedin = false;

  constructor(public conn: DatabaseService, public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.validateToken().then(() => {
      this.isLoggedin = true;
    })
    .catch(() => {
      this.isLoggedin = false;
    });
  }

  switchLoginState() {
    this.loginState = !this.loginState;
  }
}