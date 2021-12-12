import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dish } from '../dish/dish.component';
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
  // @Input() currencySign: string;
  // @Input() calculatedPrice: number;
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

  constructor(private dbService: FirestoreService) {
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
      this.dbService.updateBasket(this.dishData, this.unitsOrdered);
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
      this.dbService.updateBasket(this.dishData, this.unitsOrdered);
    }
  }

  // deleteDish(name: string){
  //   for(let i=0; i<this.dishList.length; i++){
  //     if(this.dishList[i].name == name){
  //       this.dishList.splice(i, 1);
  //       while(this.unitsOrdered > 0){
  //         this.removeOrderedDish();
  //       }
  //       this.dishData.show = false;
  //       this.deleteDishEmitter.emit(name);
  //     }
  //   }
  //   this.getBorderColor();
  // }

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
    // this.getBorderColor();
  }
}
