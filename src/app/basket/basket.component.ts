import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
