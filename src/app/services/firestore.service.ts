import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/compat/database';
import { ref, set, getDatabase } from 'firebase/database';
import { map } from 'rxjs/operators';
import { Dish } from '../dish/dish.component';
import { basketObject } from '../basket/basket.component';
import { Observable } from 'rxjs';
import { User } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  dishesPath = 'Dishes';
  basketPath = 'Basket';
  currencyPath = 'Currency';
  usersPath = 'users';
  dishesRef: AngularFireList<Dish>;
  basketRef: AngularFireList<basketObject>;
  currencyRef: AngularFireObject<string>;
  usersRef: AngularFireList<User>;
  dishes: Dish[] = [];

  constructor(private db: AngularFireDatabase) {
    this.dishesRef = db.list(this.dishesPath);
    this.basketRef = db.list(this.basketPath);
    this.currencyRef = db.object(this.currencyPath);
    this.updateCurrency("$");
   }

  updateCurrency(currency: string){
    set(ref(getDatabase(), this.currencyPath), currency);
  }

  updateLocalDishList(){
    this.dishesRef.snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(dish => {
      this.dishes = dish as Dish[];
    });
  }

  getDishList(){
    return this.dishesRef;
  }

  removeDish(key: string){
    this.dishesRef.remove(key);
  }

  getBasket(){
    return this.basketRef;
  }

  removeFromBasket(key: string){
    this.basketRef.remove(key);
  }

  updateBasket(dish: Dish, howMany: number){
    if(howMany == 0){
      this.basketRef.remove(dish.key);
    }else{
      set(ref(getDatabase(), this.basketPath + '/' + dish.key), {
        key: dish.key,
        dishName: dish.name,
        cost: dish.price,
        howMany: howMany
      });
    }
  }

  getDish(key: string){
    var dish: Observable<any> = this.db.object(this.dishesPath + '/' + key).valueChanges();
    return dish;
  }

  getCurrency(){
    return this.currencyRef;
  }

  getUsers(){
    return this.usersRef;
  }

  getUser(email: string){
    var user: Observable<any> = this.db.object(this.usersPath + '/' + email.replace(/\./g, '')).valueChanges();
    return user;
  }
}
