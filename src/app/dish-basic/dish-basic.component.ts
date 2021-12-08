import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dish } from '../dish/dish.component';
import { dishes } from '../dishes';

@Component({
  selector: 'app-dish-basic',
  templateUrl: './dish-basic.component.html',
  styleUrls: ['./dish-basic.component.css']
})
export class DishBasicComponent implements OnInit {

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

  constructor() {
   }

  ngOnInit(): void {
    if(this.dishData.maxNo <= 3){
      this.lastUnits = true;
    }
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
  }

  getBorderColor(){
    if(this.dishData.name == this.cheapest){
      return 'red';
    }else if(this.dishData.name == this.mostExpensive){
      return 'green';
    }
    return 'transparent';
  }

}
