import { Component, OnInit } from '@angular/core';
import { map, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';

export interface basketObject{
  dishName: string,
  cost: number,
  howMany: number,
  voted: false
}

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})

export class BasketComponent implements OnInit {
  currency: string;
  basket: basketObject[];

  constructor(private dbService: FirestoreService, private authService: AuthService) {
    this.getBasket();
    this.getCurrency();
   }

  ngOnInit(): void {
  }

  getBasket(){
    this.dbService.getUser(this.authService.getEmail()).pipe(
      take(1),
      map(user => user.basket),
      tap(basket => {
        this.basket = basket;
      })
    )
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
