import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { RouterLink } from '@angular/router';
import { getDatabase, ref, set } from 'firebase/database';
import { Observable } from 'rxjs';

export interface User{
  email: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: Observable<any>;

  constructor(private fireAuth: AngularFireAuth, private db: AngularFireDatabase) { 
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
    // var id;
    // this.fireAuth.createUserWithEmailAndPassword(email, password)
    // .then( credentials => {
    //   id = credentials.user?.uid;
    // });
    // set(ref(getDatabase(), 'users/' + email.replace(/\./g, '')), {
    //   email: email,
    //   password: password,
    //   role: "customer"
    // });
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

  // getCurrentUser(){
  //   return this.fireAuth.currentUser;
  // }
}
