import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import {DatabaseService} from '../services/database-connection.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private router: Router, private conn: DatabaseService) {
  }

  /**
   * @desc This is what will take the users input and checks it against the pattern
   * that most to all email address' follow
   */
  userEmail = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}')
    ]),
  });

  /**
   * @desc This will take the user input in password and confirm password fields and checks it against the corresponding
   * lengths and patterns
   */
  passwords = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
      Validators.pattern(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/),
      Validators.pattern(/\d/),
      Validators.pattern(/[a-zA-Z]/)
    ]), confirmPassword: new FormControl('', [
      Validators.required,
    ])
  });
  /**
   * @desc Hides div which displays error message if user exists in database
   */
  isVisible = false;

  /**
   * This allows the html file to call the users
   * email to check its status in the form
   */
  // tslint:disable-next-line:typedef
  getUserEmail() {
    return this.userEmail.get('email');
  }

  /**
   * This allows the html file to call the users
   * password to check its status in the form
   */
  // tslint:disable-next-line:typedef
  getPassword() {
    return this.passwords.get('password');
  }

  /**
   * This allows the html file to call the confirm
   * password to check its status in the form
   */
  // tslint:disable-next-line:typedef
  getConfirmPassword() {
    return this.passwords.get('confirmPassword');
  }

  ngOnInit(): void {
  }

  /**
   * @desc Triggers when register button is clicked on Registration page
   * determines whether or not to route user to Login page by ensuring all form input
   * is valid. Then calls 'existingUser' method to check email against database which
   * determines whether or not to create new user.
   */
  // tslint:disable-next-line:typedef
  validate(): void {
    const emailInputTag = this.getUserEmail();
    const passwordInputTag = this.getPassword();
    const confirmPasswordInputTag = this.getConfirmPassword();
    const emailString = emailInputTag.value;
    const passwordString = passwordInputTag.value;
    const confirmPasswordString = confirmPasswordInputTag.value;
    // Ensures all form data is validated, if so calls existingUser to either create new user
    // or notify user that this email is already in use by another user
    if (passwordInputTag.valid && emailInputTag.valid &&
      passwordString === confirmPasswordString) {
      this.existingUser(emailString, passwordString).then(result => {
        console.log(result);
      });
    }
    else{
      alert('Please fill all input fields according to specifications in red text');
    }
  }
  /**
   * @desc Creates new user and stores in MySQL db. Called by the onClick() method
   * after register button is pushed on registration page.
   * @param id: email address entered by User
   * @param password: the password entered by User
   */
  createUser(id: string, password: string): void{
    this.conn.createUser(id, password).subscribe(data => {
      console.log(data); // Can remove this, but keeping for testing purposes for now
    });
  }

  /**
   * @desc Checks a given email against the database. If no matching email is found, a new user is created.
   * and password, and the user is redirected to login page. Otherwise, error message is presented.
   * @param id string containing the email address given by the user in username input field of form on registration page
   * @param password string containing the password given by the user in password input field of form on registration page
   */
  async existingUser(id, password): Promise<any>{
    await new Promise(resolve => {
      this.conn.getUser(id).subscribe(data => {
        // If no match is found i.e. email not stored in database
        console.log(data[0]);
        if (data[0] == null){
          this.createUser(id, password);
          this.router.navigate(['/login']).then(response => {
            console.log(response);
          });
        }
        else{
          // Display error message
          this.isVisible = true;
        }
        resolve(data[0]);
      });
    });
  }
}
