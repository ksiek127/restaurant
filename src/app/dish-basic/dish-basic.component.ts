import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take, map, tap } from 'rxjs';
import { Dish } from '../dish/dish.component';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-dish-basic',
  templateUrl: './dish-basic.component.html',
  styleUrls: ['./dish-basic.component.css']
})
export class DishBasicComponent implements OnInit {

  @Input() dishData: Dish;
  @Input() cheapest: string;
  @Input() mostExpensive: string;
  @Output() deleteDishEmitter = new EventEmitter();
  @Output() orderDishEmitter = new EventEmitter();
  @Output() resignEmitter = new EventEmitter();

  dishList: Dish[] = [];
  orderBtnVisible = true;
  resignBtnVisible = false;
  unitsOrdered = 0;
  lastUnits = false;
  noneLeft = false;
  currency: string;
  calculatedPrice: number;

  constructor(private dbService: FirestoreService, private authService: AuthService) {
    this.getCurrency();
   }

  ngOnInit(): void {
    if(this.dishData.maxNo <= 3){
      this.lastUnits = true;
    }
    this.getBorderColor();
  }

  getCurrency(){
    this.dbService.getCurrency().valueChanges().subscribe(currency => {
      if(currency != null){
        this.currency = currency;
        this.getPrice();
      }
    })
  }

  getPrice(){
    this.calculatedPrice = this.dishData.price;
    if(this.currency == "€"){
      this.calculatedPrice *= 0.88;
    }
  }

  checkIfLastUnits(){
    if(this.dishData.maxNo - this.unitsOrdered <= 3){
      this.lastUnits = true;
    }else{
      this.lastUnits = false;
    }
  }

  orderDish(){
    if(this.unitsOrdered < this.dishData.maxNo){
      this.unitsOrdered++;
      this.orderDishEmitter.emit(this.dishData);
      if(this.unitsOrdered > 0){
        this.resignBtnVisible = true;
      }
      if(this.unitsOrdered == this.dishData.maxNo){
        this.orderBtnVisible = false;
      }
      this.checkIfLastUnits();
      if(this.dishData.maxNo == this.unitsOrdered){
        this.noneLeft = true;
      }
      var email = this.authService.getEmail();
      this.dbService.getUser(email).pipe(
        take(1),
        map(user => user.basket),
        tap(basket => {
          this.dbService.updateBasket(this.dishData, this.unitsOrdered, basket.voted, this.authService.getEmail());
        })
      )
      this.dbService.getOrderedDishesCount(email).pipe(
        take(1),
        map(count => {
          this.dbService.updateDishesCount(count + 1, email);
        })
      )
      this.dbService.getTotalCost(email).pipe(
        take(1),
        map(cost => {
          this.dbService.updateTotalCost(cost + this.dishData.price, email);
        })
      )
    }
  }

  removeOrderedDish(){
    if(this.unitsOrdered > 0){
      this.unitsOrdered--;
      this.resignEmitter.emit(this.dishData);
      if(this.unitsOrdered == 0){
        this.resignBtnVisible = false;
      }
      if(this.unitsOrdered < this.dishData.maxNo){
        this.orderBtnVisible = true;
      }
      this.checkIfLastUnits();
      this.noneLeft = false;
      this.dbService.getUser(this.authService.getEmail()).pipe(
        take(1),
        map(user => user.basket),
        tap(basket => {
          this.dbService.updateBasket(this.dishData, this.unitsOrdered, basket.voted, this.authService.getEmail());
        })
      )
    }
  }

  getBorderColor(){
    if(this.dishData.name == this.cheapest){
      return 'red';
    }else if(this.dishData.name == this.mostExpensive){
      return 'green';
    }
    return 'transparent';
  }

  deleteDish(){
    while(this.unitsOrdered > 0){
      this.removeOrderedDish();
    }
    this.deleteDishEmitter.emit(this.dishData.name);
    this.dbService.removeDish(this.dishData.key);
  }
}
