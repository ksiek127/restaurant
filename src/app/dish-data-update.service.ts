import { Injectable } from '@angular/core';
import { Dish } from './dishes/dish/dish.component';
import { dishes } from './dishes';

@Injectable({
  providedIn: 'root'
})
export class DishDataUpdateService {

  constructor() { }

  static addDish(dish: Dish){ // pozniej tutaj bedzie dodawanie do bazy danych
    dishes.push(dish);
  }
}

