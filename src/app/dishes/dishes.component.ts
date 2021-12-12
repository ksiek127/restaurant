import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { basketObject } from '../basket/basket.component';
import { Dish } from '../dish/dish.component';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  dishList: Dish[] = [];
  mealsOrdered = 0;
  totalCost = 0;
  basket: basketObject[] = [];
  dish: Dish;
  mostExpensive: string;
  cheapest: string;
  multiplier = 1;
  currencySign: string;

  constructor(public dbService: FirestoreService){
    this.getDishList();
  }

  ngOnInit(){
    this.updateBorders();
  }

  getDishList(){
    this.dbService.getDishList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(dishes =>{
      this.dishList = dishes as Dish[];
    });
  }

  addToBasket(dish: Dish){
    this.mealsOrdered++;
    this.totalCost += dish.price;
    let inBasket = false;
    for(let item of this.basket){
      if(item.dishName == dish.name){
        item.howMany++;
        item.cost += dish.price;
        inBasket = true;
        break;
      }
    }
    if(!inBasket){
      this.basket.push({
        key: "aaa",
        dishName: dish.name,
        cost: dish.price,
        howMany: 1
      })
    }
  }

  removeFromBasket(dish: Dish){
    this.mealsOrdered--;
    this.totalCost -= dish.price;
    for(let i=0; i<this.basket.length; i++){
      if(this.basket[i].dishName == dish.name){
        this.basket[i].howMany--;
        if(this.basket[i].howMany == 0){
          this.basket.splice(i, 1);
        }
      }
    }
  }

  updateBorders(){
    let minPrice = this.dishList[0].price;
    let maxPrice = this.dishList[0].price;
    this.cheapest = this.dishList[0].name;
    this.mostExpensive = this.dishList[0].name;
    for(let d of this.dishList){
      if(d.price < minPrice){
        minPrice = d.price;
        this.cheapest = d.name;
      }else if(d.price > maxPrice){
        maxPrice = d.price;
        this.mostExpensive = d.name;
      }
    }
  }
}
