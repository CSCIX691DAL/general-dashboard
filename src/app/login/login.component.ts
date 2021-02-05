import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DatabaseService } from '../services/database-connection.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private signedIn = false;
  private valid = false;
  private usernameExisted = false;
  private usernames = [];

  constructor(private router: Router, private conn: DatabaseService) {
    this.getUsers();
  }

  /**
 * @desc Login username and password validation follows rules of registriation
 */
  userEmail = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}')
    ]),
  });

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

  getUserEmail() {
    return this.userEmail.get('email');
  }

  getUserPassword() {
    return this.passwords.get('password');
  }

  ngOnInit(): void {
  }

  Signin(): void {
    const form = document.getElementById('logInForm');
    this.valid = this.validForm(form);
    this.checkUsernameExistence(this.getUserEmail().value);
    this.updateUI();
  }

  validForm(form): boolean {
    // Add form validation criteria here
    const inputFields = form.getElementsByTagName('input');
    for (let i = 0; i < inputFields.length; i++) {
      if (inputFields[i].hasAttribute('required')) {
        if (inputFields[i].value === '') {
          return false;
        }
      }
    }

    if (this.getUserPassword().valid && this.getUserEmail().valid) {
      return true;
    }
  }

  //check if the username exists in the db
  checkUsernameExistence(id: string): void {
    if (this.usernames.indexOf(id) != -1) {
      this.usernameExisted = true;
    }
  }

  updateUI() {
    if (this.valid && this.usernameExisted) {
      this.router.navigate(['/userhome']).then(response => {
        console.log(response);
      });
    }
  }

  getUsers() {
    this.conn.getUsers().subscribe(data => {
      for (let element of data) {
        this.usernames.push(element.ID);
      }
    });
  }
}
