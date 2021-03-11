import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router ) { }

  ngOnInit(): void {
  }

  logout(): void {
    if (confirm('Are you sure you wish to logout?\nYou will be taken to the home page')) {
      this.auth.removeToken();
      this.router.navigate(['/home']).catch(e => console.error(e));
    }
  }
}
