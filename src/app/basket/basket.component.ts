import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
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
  currency: string;
  basket: basketObject[];

  constructor(private dbService: FirestoreService) {
    this.getBasket();
    this.getCurrency();
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
    if(this.currency == "€"){
      totalCost *= 0.88;
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

  getCurrency(){
    this.dbService.getCurrency().valueChanges().subscribe(currency => {
      if(currency != null){
        this.currency = currency;
      }
    })
  }
}
