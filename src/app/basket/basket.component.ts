import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})

export interface basketObject{
  [x: string]: any,
  key: string,
  dishName: string,
  cost: number,
  howMany: number
}

export class BasketComponent implements OnInit {
  @Input() basket: basketObject[] = [];
  @Input() totalCost: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
