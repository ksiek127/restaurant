import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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


  constructor(private auth: AuthService) {
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
    this.auth.register(this.login.value, this.password.value).catch(err => console.log(err.message));
  }
}
