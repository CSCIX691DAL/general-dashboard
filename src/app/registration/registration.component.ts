import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import {DatabaseService} from '../services/database-connection.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private router: Router, private conn: DatabaseService, private auth: AuthService) {
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
  alreadyExists = false;

  /**
   * This allows the html file to call the users
   * email to check its status in the form
   */
  getUserEmail(): AbstractControl {
    return this.userEmail.get('email');
  }

  /**
   * This allows the html file to call the users
   * password to check its status in the form
   */
  getPassword(): AbstractControl {
    return this.passwords.get('password');
  }

  /**
   * This allows the html file to call the confirm
   * password to check its status in the form
   */
  getConfirmPassword(): AbstractControl {
    return this.passwords.get('confirmPassword');
  }
  getAdminAccount(): boolean{
    const adminAccount = document.getElementById('adminAccount')as HTMLInputElement;
    return adminAccount.checked;
  }

  ngOnInit(): void {
  }

  /**
   * @desc Triggers when register button is clicked on Registration page
   */
  register(): void {
    this.alreadyExists = false;
    const emailInputTag = this.getUserEmail();
    const passwordInputTag = this.getPassword();
    const confirmPasswordInputTag = this.getConfirmPassword();
    const emailString = emailInputTag.value;
    const passwordString = passwordInputTag.value;
    const confirmPasswordString = confirmPasswordInputTag.value;
    const adminAccount = this.getAdminAccount();
    // Ensures all form data is validated, if so calls existingUser to either create new user
    // or notify user that this email is already in use by another user
    if (passwordInputTag.valid && emailInputTag.valid &&
      passwordString === confirmPasswordString) {
      this.auth.register(emailString, passwordString, adminAccount).then(() => {
        this.router.navigate(['/userhome']).catch(e => console.error(e));
      }, reason => {
        console.log(reason);
        this.alreadyExists = true;
      });
    }
    else{
      alert('Please fill all input fields according to specifications in red text');
    }
  }
}
