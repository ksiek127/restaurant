import { Component, Input, OnInit } from '@angular/core';
import { Dish } from '../dishes/dish/dish.component';

export interface basketObject{
  [x: string]: any,
  key: string,
  dishName: string,
  cost: number,
  howMany: number
}

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})

export class BasketComponent implements OnInit {
  @Input() basket: basketObject[] = [];
  @Input() totalCost: number = 0;
  @Input() currencySign: string;

  constructor() { }

  ngOnInit(): void {
  }

}
