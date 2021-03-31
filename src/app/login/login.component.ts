import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  valid = true;
  error_msg = '';

  constructor(private router: Router, private auth: AuthService) {
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
      // Validators.minLength(4),
      // Validators.maxLength(12),
      // Validators.pattern(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/),
      // Validators.pattern(/\d/),
      // Validators.pattern(/[a-zA-Z]/)
    ]), confirmPassword: new FormControl('', [
      Validators.required,
    ])
  });

  getUserEmail(): AbstractControl {
    return this.userEmail.get('email');
  }

  getUserPassword(): AbstractControl {
    return this.passwords.get('password');
  }

  ngOnInit(): void {
  }

  signIn(): void {
    const login = this;
    const form = document.getElementById('logInForm');
    if (this.validForm(form)) {
        this.auth.authenticate(this.getUserEmail().value, this.getUserPassword().value).then(() => {
          login.valid = true;
          this.router.navigate(['/userhome']).then(() => {}).catch(e => console.error(e));
        }, rej => {
			console.error(rej);
			login.error_msg = '';
			login.valid = false;
			switch(rej.status) {
				case 403:
					login.error_msg = 'Invalid Credentials';
				default:
					login.error_msg = `Server Error: ${rej.status} ${rej.statusText}`;
				break;
			}
		}).catch(err => {
			console.error(err);
			login.error_msg = JSON.stringify(err);
			login.valid = false;
		});
	}
  }

  validForm(form): boolean {
    // Add form validation criteria here
    const inputFields = form.getElementsByTagName('input');
    for (const item of inputFields) {
      if (item.hasAttribute('required')) {
        if (item.value === '') {
          return false;
        }
      }
    }

    if (this.getUserPassword().valid && this.getUserEmail().valid) {
      return true;
    }
  }
}
