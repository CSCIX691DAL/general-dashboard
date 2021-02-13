import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password = '';
  username = '';

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
  }

  Login(): void {
    this.authService.Authenticate(this.username, this.password).subscribe(v => {
      console.log('Login Success!');
      console.log(v);
    }, e => {
      console.error('Login Failure:');
      console.error(e);
    });
  }

}
