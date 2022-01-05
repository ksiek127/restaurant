import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { getDatabase, ref, set } from 'firebase/database';
import { map, Observable, switchMap } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { basketObject } from '../basket/basket.component';

export interface User{
  email: string;
  password: string;
  admin: boolean;
  manager: boolean;
  customer: boolean;
  banned: boolean;
  basket: basketObject[];
  totalCost: number;
  orderedDishes: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: Observable<any>;
  email = '';
  guest: boolean;
  customer: boolean;
  manager: boolean;
  admin: boolean;

  constructor(private fireAuth: AngularFireAuth, private db: AngularFireDatabase, private dbService: FirestoreService) { 
    this.authState = fireAuth.authState;
    fireAuth.authState.subscribe( user => {
      console.log(user);
      if(user && user.email){
        this.email = user.email;
      }else{
        this.email = '';
      }
      console.log(this.email);
    });
    this.getUserData();
  }

  getUserData(){
    this.dbService.getUser(this.email).subscribe(user => {
      this.customer = user.customer;
      this.manager = user.manager;
      this.admin = user.admin;
      if(!user.customer && !user.manager && !user.admin){
        this.guest = true;
      }
    });
  }

  isAdmin(){
    return this.admin;
  }

  login(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    var id;
    this.fireAuth.createUserWithEmailAndPassword(email, password)
    .then( credentials => {
      id = credentials.user?.uid;
    });
    set(ref(getDatabase(), 'users/' + email.replace(/\./g, '')), {
      email: email,
      password: password,
      customer: false,
      manager: false,
      admin: true,
      banned: false,
      basket: [],
      totalCost: 0,
      orderedDishes: 0
    });
  }

  logout() {
    return this.fireAuth.signOut();
  }

  setPersistence(s: string){
    this.fireAuth.setPersistence(s);
  }

  getLogged(): Observable<User> {
    return this.authState;
  }

  getEmail(){
    return this.email;
  }
}
