import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  email: string;
  password: string;
  rePassword: string;
  regForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.regForm = new FormGroup({
      'email': new FormControl(this.email, [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl(this.password, [Validators.required]),
      'rePassword': new FormControl(this.rePassword, Validators.required)
    });
  }

  getErrorMessage(el: any) {
    return el.hasError('required') ? 'You must enter a value' :
      el.hasError('email') ? 'Not a valid email' :
        '';
  }
  onSubmit() {
    console.log(this.regForm);
  }

}

/*export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if (password !== confirmPassword) {
      console.log('false');
      AC.get('confirmPassword').setErrors({ MatchPassword: true });
    } else {
      console.log('true');
      return null;
    }
  }
}*/
