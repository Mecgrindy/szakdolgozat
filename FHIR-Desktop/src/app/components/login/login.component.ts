import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  logForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.logForm = new FormGroup({
      'email': new FormControl(this.email, [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl(this.password, [Validators.required])
    });
  }
  getErrorMessage(el: any) {
    return el.hasError('required') ? 'You must enter a value' :
      el.hasError('email') ? 'Not a valid email' :
        '';
  }
  onSubmit() {
    console.log(this.logForm);
  }

}
