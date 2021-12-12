import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/compat/database';
import { ref, set, getDatabase, get, update } from 'firebase/database';
import { map } from 'rxjs/operators';
import { Dish } from '../dish/dish.component';
import { basketObject } from '../basket/basket.component';
import { query } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  dishesPath = 'Dishes';
  basketPath = 'Basket';
  currencyPath = 'Currency';
  dishesRef: AngularFireList<Dish>;
  basketRef: AngularFireList<basketObject>;
  currencyRef: AngularFireObject<string>;
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
    set(ref(getDatabase(), this.basketPath + '/' + dish.key), {
      key: dish.key,
      dishName: dish.name,
      cost: dish.price,
      howMany: howMany
    });
  }

  getDish(key: string){
    var dish: Observable<any> = this.db.object(this.dishesPath + '/' + key).valueChanges();
    return dish;
  }

  getCurrency(){
    return this.currencyRef;
  }
}
