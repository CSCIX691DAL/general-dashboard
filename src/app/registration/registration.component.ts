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

  /**
   * @desc Triggers when register button is clicked on Registration page
   * determines whether or not to route user to Login page by calling validForm(form) method
   * and redirects user based on the returned boolean
   */
  onClick(): void{
    // Add other validation checks to validForm() method (below this method)
    const form = document.getElementById('registerForm');
    const bool = this.validForm(form);
    // If validation checks pass then route user to login page
    if (bool){
      this.router.navigate(['/login']).then(response => {
        console.log(response);
      });
    }
    // Display some sort of error message, for now it will display the required fields auto message
    else{
    }
  }

  /**
   * @desc Called by the onClick method to check whether or not the registration form
   * has valid data in each input field and also checking if password inputs match (checks if Field is
   * empty for now add more validation criteria to this method).
   * @param form - the form element in registration.component.html which contains all the input fields
   */
  validForm(form): boolean {
    // Add form validation criteria here
    const inputFields = form.getElementsByTagName('input');

    for (let i = 0; i < inputFields.length; i++) {
      if (inputFields[i].hasAttribute('required')) {
        if (inputFields[i].value === '') {
          return false;
        }
        // Password match check
        if (i === 2) {
          const password = inputFields[i - 1].value;
          if (password !== inputFields[i].value) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
