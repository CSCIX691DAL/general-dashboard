import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database-connection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loginState = true;

  constructor(public conn: DatabaseService) {}

  ngOnInit(): void {}

  switchLoginState() {
    this.loginState = !this.loginState;
  }


}

