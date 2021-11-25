import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Dish } from '../dishes/dish/dish.component';

export interface Filter{
  countries: string[],
  ratings: number[],
  minCost: number,
  maxCost: number
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() dishes: Dish[] = [];
  @Output() filterEmitter = new EventEmitter;
  countries: string[] = [];
  ratings: number[] = [];
  minCost: number = 0;
  maxCost: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  setDefaultFilters(){
    for(let dish of this.dishes){
      if(!this.countries.includes(dish.country)){
        this.countries.push(dish.country);
      }
      if(!this.ratings.includes(dish.rating)){
        this.ratings.push(dish.rating);
      }
      if(this.minCost > dish.price){
        this.minCost = dish.price;
      }
      if(this.maxCost < dish.price){
        this.maxCost = dish.price;
      }
    }
  }

  resetFilters(){
    this.countries = [];
    this.ratings = [];
  }

  removeFilters(){
    for(let dish of this.dishes){
      dish.show = true;
    }
    this.resetFilters();
  }

  filterDishes(){
    for(let dish of this.dishes){
      if(this.countries.includes(dish.country) && this.ratings.includes(dish.rating) && dish.price >= this.minCost && dish.price <= this.maxCost){
        dish.show = true;
      }else{
        dish.show = false;
      }
    }
    this.filterEmitter.emit(this.dishes);
  }

}
