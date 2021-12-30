import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationFormGroup: FormGroup = Object();
  login: FormControl = new FormControl("", Validators.required);
  password: FormControl = new FormControl("", Validators.required);


  constructor(private auth: AuthService, private router: Router) {
    this.formInit();
   }

  ngOnInit(): void {
    this.formInit();
  }

  formInit(){
    this.registrationFormGroup = new FormGroup({
      login: this.login,
      password: this.password
    });
  }

  onSubmit(){
    this.auth.register(this.login.value, this.password.value);
    this.router.navigate(['/mainpage']);
  }
}
