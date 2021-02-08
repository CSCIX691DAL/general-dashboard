import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import { DatabaseService } from '../services/database-connection.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public signedIn = false;
  private valid = false;
  private usernameExisted = false;
  private correctPassword;
  private usernames = [];
  private passwordList = [];

  constructor(private router: Router, private conn: DatabaseService, h: HttpClient) {
    this.getUsers();
  }

  /**
 * @desc Login username and password validation follows rules of registration
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

  signIn(): void {
    const form = document.getElementById('logInForm');
    this.valid = this.validForm(form);
    this.checkUsernameExistence(this.getUserEmail().value);
    this.checkPassword(this.getUserEmail().value, this.getUserPassword().value)
    if (this.usernameExisted == true && this.correctPassword == true){
      this.signedIn=true;
      this.updateUI();
    }
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

  /**
   * @desc Fills an array with the passwords for each of the saved users
   */
  getPasswords() {
    this.conn.getUsers().subscribe(data => {
      for (let element of data) {
        this.passwordList.push(element.Password);
      }
    });
  }

  /**
   * @dec Takes in the email and password from the form, then populates two arrays and checks the corresponding indexes
   * make sure that inputted password is the correct password
   * @param email
   * @param password
   */
  checkPassword(email: string, password: string): void {
    this.getUsers()
    this.getPasswords()

    if (password == (this.passwordList[this.usernames.indexOf(email)])){
      this.correctPassword = true;
    }
    else {
      this.correctPassword = false;
    }
  }
}
