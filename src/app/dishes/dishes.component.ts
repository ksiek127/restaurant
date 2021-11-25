import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { basketObject } from '../basket/basket.component';
import {Dish} from './dish/dish.component';
import { dishes } from '../dishes';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  // @Output() cheapestEmitter = new EventEmitter();
  // @Output() mostExpensiveEmitter = new EventEmitter();
  // dishData: Dish[] = dishes;
  // mealsOrdered = 0;
  // totalCost = 0;
  // basket: basketObject[] = [];
  // mostExpensive: string;
  // cheapest: string;

  constructor(){
    // this.dishData = dishes;
    // this.updateBorders();
  }

  ngOnInit(){
    
  }

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
  //   this.cheapestEmitter.emit(this.cheapest);
  //   this.mostExpensiveEmitter.emit(this.mostExpensive);
  // }
}
