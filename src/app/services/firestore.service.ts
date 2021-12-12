import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/compat/database';
import { ref, set, getDatabase, get } from 'firebase/database';
import { map } from 'rxjs/operators';
import { Dish } from '../dish/dish.component';
import { basketObject } from '../basket/basket.component';
import { query } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  dishesPath = 'Dishes';
  basketPath = 'Basket';
  dishesRef: AngularFireList<Dish>;
  basketRef: AngularFireList<basketObject>;
  dishes: Dish[] = [];

  constructor(private db: AngularFireDatabase) {
    this.dishesRef = db.list(this.dishesPath);
    this.basketRef = db.list(this.basketPath);
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
}
