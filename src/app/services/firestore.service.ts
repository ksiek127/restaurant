import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/compat/database';
import { ref, set, getDatabase, get } from 'firebase/database';
import { map } from 'rxjs/operators';
import { Dish } from '../dish/dish.component';
import { basketObject } from '../basket/basket.component';
import { Observable } from 'rxjs';
import { AuthService, User } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  dishesPath = 'Dishes';
  currencyPath = 'Currency';
  usersPath = 'users';
  // basketPath: string;
  dishesRef: AngularFireList<Dish>;
  // basketRef: AngularFireList<basketObject>;
  currencyRef: AngularFireObject<string>;
  usersRef: AngularFireList<User>;
  // email: string;

  constructor(private db: AngularFireDatabase) {
    this.dishesRef = db.list(this.dishesPath);
    this.currencyRef = db.object(this.currencyPath);
    this.usersRef = db.list(this.usersPath);
    this.updateCurrency("$");
    // this.basketPath = this.usersPath + '/' + this.email.replace(/\./g, '') + '/basket';
    // this.basketRef = db.list(this.basketPath);
   }

  updateCurrency(currency: string){
    set(ref(getDatabase(), this.currencyPath), currency);
  }

  getDishList(){
    return this.dishesRef;
  }

  removeDish(key: string){
    this.dishesRef.remove(key);
  }

  getBasket(email: string){
    var basketPath = this.usersPath + '/' + email.replace(/\./g, '') + '/basket';
    var basketRef = this.db.list(basketPath);
    var basket: Observable<any> = basketRef.valueChanges();
    return basket;
  }

  getTotalCost(email: string){
    var costPath = this.usersPath + '/' + email.replace(/\./g, '') + '/totalCost';
    var costRef = this.db.object(costPath);
    var cost: Observable<any> = costRef.valueChanges();
    return cost;
  }

  getOrderedDishesCount(email: string){
    var countPath = this.usersPath + '/' + email.replace(/\./g, '') + '/orderedDishes';
    var count: Observable<any> = this.db.object(countPath).valueChanges();
    return count;
  }

  removeFromBasket(key: string, email: string){
    var basketPath = this.usersPath + '/' + email.replace(/\./g, '') + '/basket';
    var basketRef = this.db.list(basketPath);
    basketRef.remove(key);
  }

  updateBasket(dish: Dish, howMany: number, voted: boolean, email: string){
    var basketPath = this.usersPath + '/' + email.replace(/\./g, '') + '/basket';
    var basketRef = this.db.list(basketPath);
    if(howMany == 0){
      basketRef.remove(dish.key);
    }else{
      set(ref(getDatabase(), basketPath + '/' + dish.key), {
        key: dish.key,
        dishName: dish.name,
        cost: dish.price,
        howMany: howMany,
        voted: voted
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

  updateDishesCount(count: number, email: string){
    set(ref(getDatabase(), 'users/' + email.replace(/\./g, '')), {
      orderedDishes: count
    });
  }

  updateTotalCost(cost: number, email: string){
    set(ref(getDatabase(), 'users/' + email.replace(/\./g, '') + '/orderedDishes'), {
      cost
    });
  }

  makeAdmin(user: User){
    var basket: basketObject[] = [];
    if(user.basket){
      basket = user.basket;
    }
    set(ref(getDatabase(), 'users/' + user.email.replace(/\./g, '')), {
      email: user.email,
      password: user.password,
      customer: user.customer,
      manager: user.manager,
      admin: true,
      banned: user.banned,
      basket: basket,
      totalCost: user.totalCost,
      orderedDishes: user.orderedDishes
    });
  }

  makeManager(user: User){
    var basket: basketObject[] = [];
    if(user.basket){
      basket = user.basket;
    }
    set(ref(getDatabase(), 'users/' + user.email.replace(/\./g, '')), {
      email: user.email,
      password: user.password,
      customer: user.customer,
      manager: true,
      admin: user.admin,
      banned: user.banned,
      basket: basket,
      totalCost: user.totalCost,
      orderedDishes: user.orderedDishes
    });
  }

  ban(user: User){
    var basket: basketObject[] = [];
    if(user.basket){
      basket = user.basket;
    }
    set(ref(getDatabase(), 'users/' + user.email.replace(/\./g, '')), {
      email: user.email,
      password: user.password,
      customer: user.customer,
      manager: user.manager,
      admin: user.admin,
      banned: true,
      basket: basket,
      totalCost: user.totalCost,
      orderedDishes: user.orderedDishes
    });
  }

  unban(user: User){
    var basket: basketObject[] = [];
    if(user.basket){
      basket = user.basket;
    }
    set(ref(getDatabase(), 'users/' + user.email.replace(/\./g, '')), {
      email: user.email,
      password: user.password,
      customer: user.customer,
      manager: user.manager,
      admin: user.admin,
      banned: false,
      basket: basket,
      totalCost: user.totalCost,
      orderedDishes: user.orderedDishes
    });
  }

  // getUserAsObject(email: string){
  //   var user: AngularFireObject<User> = this.db.object(this.usersPath + '/' + email.replace(/\./g, ''));
  //   return user;
  // }
}
