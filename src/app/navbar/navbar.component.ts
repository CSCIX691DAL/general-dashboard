import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  links: string[] = ['Home', 'Login', 'Register'];

  constructor() { }

  ngOnInit(): void {
  }

}
