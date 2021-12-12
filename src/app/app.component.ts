import { Component, EventEmitter, Output } from '@angular/core';
import { basketObject } from './basket/basket.component';
import { Dish } from './dish/dish.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'restaurant';
  // dishData: Dish[] = dishes;
  // mealsOrdered = 0;
  // totalCost = 0;
  // basket: basketObject[] = [];
  // dish: Dish;
  // mostExpensive: string;
  // cheapest: string;
  // multiplier = 1;
  // currencySign = "$";

  constructor(){
  }

  ngOnInit(): void {
    // this.updateBorders();
  }

  // addToBasket(dish: Dish){
  //   this.mealsOrdered++;
  //   this.totalCost += dish.price;
  //   let inBasket = false;
  //   for(let item of this.basket){
  //     if(item.dishName == dish.name){
  //       item.howMany++;
  //       item.cost += dish.price;
  //       inBasket = true;
  //       break;
  //     }
  //   }
  //   if(!inBasket){
  //     this.basket.push({
  //       x: [],
  //       key: "aaa",
  //       dishName: dish.name,
  //       cost: dish.price,
  //       howMany: 1
  //     })
  //   }
  // }

  // removeFromBasket(dish: Dish){
  //   this.mealsOrdered--;
  //   this.totalCost -= dish.price;
  //   for(let i=0; i<this.basket.length; i++){
  //     if(this.basket[i].dishName == dish.name){
  //       this.basket[i].howMany--;
  //       if(this.basket[i].howMany == 0){
  //         this.basket.splice(i, 1);
  //       }
  //     }
  //   }
  // }

  // updateBorders(){
  //   let minPrice = dishes[0].price;
  //   let maxPrice = dishes[0].price;
  //   this.cheapest = dishes[0].name;
  //   this.mostExpensive = dishes[0].name;
  //   for(let d of dishes){
  //     if(d.price < minPrice){
  //       minPrice = d.price;
  //       this.cheapest = d.name;
  //     }else if(d.price > maxPrice){
  //       maxPrice = d.price;
  //       this.mostExpensive = d.name;
  //     }
  //   }
  // }

  // changeCurrency(currency: string){
  //   if(currency == "eur"){
  //     this.multiplier = 0.89;
  //     this.currencySign = "€";
  //   }else{
  //     this.multiplier = 1;
  //     this.currencySign = "$";
  //   }
  // }
}
