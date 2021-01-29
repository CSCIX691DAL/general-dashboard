import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onClick(): void{
    // Put validation checks here
    const bool = true;
    // If validation checks pass then route user to login page
    if (bool){
      this.router.navigate(['/login']).then(response => {
        console.log(response);
      });
    }
    else{
      alert('Incorrect info');
    }
  }
}
