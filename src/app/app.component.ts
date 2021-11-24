import { Component } from '@angular/core';
import { basketObject } from './basket/basket.component';
import { Dish } from './dish/dish.component';
import {dishes} from './dishes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'restaurant';
  dishData: Dish[] = dishes;
  mealsOrdered = 0;
  totalCost = 0;
  basket: basketObject[] = [];

  constructor(){
    this.dishData = dishes;
  }

  addToBasket(dish: Dish){
    this.mealsOrdered++;
    this.totalCost += dish.price;
    let inBasket = false;
    for(let item of this.basket){
      if(item.dishName == dish.name){
        item.howMany++;
        item.cost += dish.price;
        inBasket = true;
        break;
      }
    }
    if(!inBasket){
      this.basket.push({
        x: [],
        key: "aaa",
        dishName: dish.name,
        cost: dish.price,
        howMany: 1
      })
    }
  }

  removeFromBasket(dish: Dish){
    this.mealsOrdered--;
    this.totalCost -= dish.price;
    for(let i=0; i<this.basket.length; i++){
      if(this.basket[i].dishName == dish.name){
        this.basket[i].howMany--;
        if(this.basket[i].howMany == 0){
          this.basket.splice(i, 1);
        }
      }
    }
  }
}
