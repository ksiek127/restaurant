import { Component } from '@angular/core';
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

  constructor(){
    this.dishData = dishes;
  }
}
