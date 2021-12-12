import { Component, Input, OnInit } from '@angular/core';
import { getDatabase, ref, set } from 'firebase/database';
import { map } from 'rxjs';
import { Dish } from '../dish/dish.component';
import { FirestoreService } from '../services/firestore.service';

export interface basketObject{
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
  // @Input() basket: basketObject[] = [];
  // totalCost: number = 0;
  currencySign: string;
  basket: basketObject[];

  constructor(private dbService: FirestoreService) {
    this.getBasket();
   }

  ngOnInit(): void {
  }

  getBasket(){
    this.dbService.getBasket().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(basket =>{
      this.basket = basket as basketObject[];
    });
  }

  getTotalCost(){
    var totalCost = 0;
    for(var b of this.basket){
      totalCost += b.cost * b.howMany;
    }
    return totalCost;
  }

  orderedDishesCount(){
    var counter = 0;
    for(var b of this.basket){
      counter += b.howMany;
    }
    return counter;
  }
}
