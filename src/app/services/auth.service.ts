import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

export interface User{
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: Observable<any>;

  constructor(private fireAuth: AngularFireAuth) { 
    this.authState = fireAuth.authState;
    this.authState.subscribe( auth => {
      console.log(auth);
    });
  }

  login(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.fireAuth.signOut();
  }

  setPersistence(s: string){
    this.fireAuth.setPersistence(s);
  }

  getLogged() {
    return this.authState; 
  }

  getCurrentUser(){
    return this.fireAuth.currentUser;
  }
}
