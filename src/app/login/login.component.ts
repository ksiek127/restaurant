import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup = Object();
  login: FormControl = new FormControl("", Validators.required);
  password: FormControl = new FormControl("", Validators.required);

  constructor(private auth: AuthService, private router: Router) {
    this.formInit();
   }

  ngOnInit(): void {
    this.formInit();
  }

  formInit(){
    this.loginFormGroup = new FormGroup({
      login: this.login,
      password: this.password
    });
  }

  onSubmit(){
    this.auth.login(this.login.value, this.password.value).catch((err) => console.log(err.message));
    this.router.navigate(['/mainpage']);
  }
}
