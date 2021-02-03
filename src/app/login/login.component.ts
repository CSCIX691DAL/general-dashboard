import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  Validate(): void {
    const form = document.getElementById('logInForm');
    const valid = this.validForm(form); // TODO: Validate against database looking for existing user
    if (valid) { // TODO: Add the bool check instead of true, looking for existing users
      this.router.navigate(['/userhome']).then(response => {
        console.log(response);
      });
    }
    // TODO: Log that this user does not exist
    else {
      // alert('The username/password does not match any existing user');
    }
  }
  validForm(form): boolean{
    // Add form validation criteria here
    const inputFields = form.getElementsByTagName('input');
    for (let i = 0; i < inputFields.length; i++){
      if (inputFields[i].hasAttribute('required')){
        if (inputFields[i].value === ''){
          return false;
        }
      }
    }
    return true;
  }
}
