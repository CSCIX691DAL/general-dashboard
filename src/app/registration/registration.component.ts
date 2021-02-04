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

  constructor(private router: Router, private conn: DatabaseService) { }

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
  passwords = new FormGroup({password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
      Validators.pattern(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/),
      Validators.pattern(/\d/),
      Validators.pattern(/[a-zA-Z]/)
    ]), confirmPassword: new FormControl('', [
      Validators.required,
    ])});
  /**
   * This allows the html file to call the users
   * email to check its status in the form
   */
  // tslint:disable-next-line:typedef
  getUserEmail(){
    return this.userEmail.get('email');
  }
  /**
   * This allows the html file to call the users
   * password to check its status in the form
   */
  // tslint:disable-next-line:typedef
  getUserPassword(){
    return this.passwords.get('password');
  }
  /**
   * This allows the html file to call the confirm
   * password to check its status in the form
   */
  // tslint:disable-next-line:typedef
  getConfirmPassword(){
    return this.passwords.get('confirmPassword');
  }

  ngOnInit(): void {
  }

  /**
   * @desc Triggers when register button is clicked on Registration page
   * determines whether or not to route user to Login page by ensuring all form input
   * is validated
   */
  onClick(): void{
    if (this.getUserPassword().valid && this.getUserEmail().valid && this.getUserPassword().value === this.getConfirmPassword().value){
      this.createUser(this.getUserEmail().value, this.getUserPassword().value);
      this.router.navigate(['/login']).then(response => {
        console.log(response);
      });
    }
    else{
      alert('Expected something different, please try again.');
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

}
