import { Component, OnInit } from '@angular/core';
import { map, Observable, of, take, tap } from 'rxjs';
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
  basket: Observable<basketObject[]>;
  totalCost: Observable<number>;
  orderedDishes: Observable<number>;

  constructor(private dbService: FirestoreService, private authService: AuthService) {
    // this.getBasket();
    // this.dbService.getUser(this.authService.getEmail()).pipe(
    //   take(1),
    //   map(user => user.basket),
    //   tap(basket => {
    //     this.basket = basket;
    //   })
    // )
    this.basket = this.dbService.getBasket(this.authService.getEmail());
    // this.getTotalCost();
    this.totalCost = this.dbService.getTotalCost(this.authService.getEmail());
    this.orderedDishes = this.dbService.getOrderedDishesCount(this.authService.getEmail());
    this.getCurrency();
   }

  ngOnInit(): void {
  }

  orderedDishesCount(){
    var counter = 0;
    this.dbService.getUser(this.authService.getEmail()).pipe(
      take(1),
      map(user => user.basket),
      tap(basket => {
        for(var b of basket){
          counter += b.howMany;
        }
      })
    )
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
