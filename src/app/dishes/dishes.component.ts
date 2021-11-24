import { Component, Input, OnInit } from '@angular/core';
import {Dish} from '../dish/dish.component';
import { dishes } from '../dishes';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  @Input() dishData: Dish;

  constructor() { }

  ngOnInit(): void {
  }

}
