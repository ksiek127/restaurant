import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { dishes } from '../dishes';

export interface Dish{
  name: string,
  country: string,
  category: string,
  ingredients: string[],
  maxNo: number,
  price: number,
  description: string,
  photos: string[],
  show: boolean,
  rating: number,
  votes: number
}

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {
  @Input() dishData: Dish;
  @Input() cheapest: string;
  @Input() mostExpensive: string;
  @Input() currencySign: string;
  @Input() calculatedPrice: number;
  @Output() deleteDishEmitter = new EventEmitter();
  @Output() orderDishEmitter = new EventEmitter();
  @Output() resignEmitter = new EventEmitter();

  orderBtnVisible = true;
  resignBtnVisible = false;
  unitsOrdered = 0;
  lastUnits = false;
  noneLeft = false;
  // calculatedPrice: number;
  // mostExpensive: string;
  // cheapest: string;
  // borderColor: string;

  constructor() {
   }

  ngOnInit(): void {
    if(this.dishData.maxNo <= 3){
      this.lastUnits = true;
    }
    // this.getCheapestAndMostExpensive();
    this.getBorderColor();
    this.calculatedPrice = this.dishData.price;
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
    }
  }

  deleteDish(name: string){
    for(let i=0; i<dishes.length; i++){
      if(dishes[i].name == name){
        dishes.splice(i, 1);
        while(this.unitsOrdered > 0){
          this.removeOrderedDish();
        }
        this.dishData.show = false;
        this.deleteDishEmitter.emit(name);
      }
    }
    this.getBorderColor();
    // this.getCheapestAndMostExpensive();
  }

  // getCheapestAndMostExpensive(){
  //   let minPrice = dishes[0].price;
  //   let maxPrice = dishes[0].price;
  //   this.cheapest = dishes[0].name;
  //   this.mostExpensive = dishes[0].name;
  //   for(let d of dishes){
  //     if(d.price < minPrice){
  //       minPrice = d.price;
  //       this.cheapest = d.name;
  //     }else if(d.price > maxPrice){
  //       maxPrice = d.price;
  //       this.mostExpensive = d.name;
  //     }
  //   }
  //   if(this.dishData.name == this.cheapest){
  //     this.borderColor = "red";
  //   }else if(this.dishData.name == this.mostExpensive){
  //     this.borderColor = "green";
  //   }
  // }
  getBorderColor(){
    // if(this.dishData.name == this.cheapest){
    //   this.borderColor = 'red';
    // }else if(this.dishData.name == this.mostExpensive){
    //   this.borderColor = 'green';
    // }else{
    //   this.borderColor = 'white';
    // }
    if(this.dishData.name == this.cheapest){
      return 'red';
    }else if(this.dishData.name == this.mostExpensive){
      return 'green';
    }
    return 'transparent';
  }

  // calculatePrice(){
  //   if(this.currency == "eur"){
  //     this.calculatedPrice = Math.round(this.dishData.price * 89) / 100;
  //   }else{
  //     this.calculatedPrice = this.dishData.price;
  //   }
  // }
}
