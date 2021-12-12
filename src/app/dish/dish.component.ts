import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { FirestoreService } from '../services/firestore.service';
import { ReviewUpdateService } from '../services/review-update.service';

export interface Dish{
  key: string,
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
  votes: number,
  reviews: Review[]
}

export interface Review{
  nickname: string,
  title: string,
  content: string,
  orderDate: Date | null
}

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {
  // @Input() dishData: Dish;
  @Input() cheapest: string;
  @Input() mostExpensive: string;
  @Input() currencySign: string;
  @Input() calculatedPrice: number;
  @Output() deleteDishEmitter = new EventEmitter();
  @Output() orderDishEmitter = new EventEmitter();
  @Output() resignEmitter = new EventEmitter();

  dishData: Dish;
  // dishList: Dish[] = [];
  orderBtnVisible = true;
  resignBtnVisible = false;
  unitsOrdered = 0;
  lastUnits = false;
  noneLeft = false;

  maxDate = new Date();
  reviewFormGroup: FormGroup = Object();
  nickname: FormControl = new FormControl("", Validators.required);
  title: FormControl = new FormControl("", Validators.required);
  reviewContent: FormControl = new FormControl("", Validators.required);
  orderDate: FormControl = new FormControl("");
  newReview: Review;

  constructor(private route: ActivatedRoute, private dbService: FirestoreService, private reviewUpdateService: ReviewUpdateService) {
    this.newReview = {
      nickname: "",
      title: "",
      content: "",
      orderDate: null
    }
    this.formInit();
  }

  ngOnInit(): void {
    this.formInit();
    // this.dishData = history.state;
    var key = this.route.snapshot.paramMap.get('id');
    this.getDish(key);
    // this.dishData.name = dish.name;
    // this.dishData.country = dish.country;
    // this.dishData.category = dish.category;
    // this.dishData.ingredients = dish.ingredients;
    // this.dishData.maxNo = dish.maxNo;
    // this.dishData.price = dish.price;
    // this.dishData.description = dish.description;
    // this.dishData.photos = dish.photos;
    // this.dishData.show = dish.show;
    // this.dishData.rating = dish.rating;
    // this.dishData.votes = dish.votes;
    // this.dishData.reviews = dish.reviews;
    if(this.dishData.maxNo <= 3){
      this.lastUnits = true;
    }
    this.getBorderColor();
    this.calculatedPrice = this.dishData.price;
  }

  getDish(key: string | null){
    this.dbService.getDishList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(dishes =>{
      dishes.forEach((dish) => {
        if(dish.key == key){
          this.dishData.name = dish.name;
          this.dishData.country = dish.country;
          this.dishData.category = dish.category;
          this.dishData.ingredients = dish.ingredients;
          this.dishData.maxNo = dish.maxNo;
          this.dishData.price = dish.price;
          this.dishData.description = dish.description;
          this.dishData.photos = dish.photos;
          this.dishData.show = dish.show;
          this.dishData.rating = dish.rating;
          this.dishData.votes = dish.votes;
          this.dishData.reviews = dish.reviews;
        }
      })
    });
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

  getBorderColor(){
    if(this.dishData.name == this.cheapest){
      return 'red';
    }else if(this.dishData.name == this.mostExpensive){
      return 'green';
    }
    return 'transparent';
  }

  formInit(){
    this.reviewFormGroup = new FormGroup({
      nickname: this.nickname,
      title: this.title,
      reviewContent: this.reviewContent,
      orderDate: this.orderDate
    });
  }

  onSubmit(){
    if(this.reviewFormGroup.valid){
      this.newReview.nickname = this.reviewFormGroup.value.nickname;
      this.newReview.title = this.reviewFormGroup.value.title;
      this.newReview.content = this.reviewFormGroup.value.reviewContent;
      this.newReview.orderDate = this.reviewFormGroup.value.orderDate;
      this.reviewUpdateService.addReview(this.dishData, this.newReview);
      this.reviewFormGroup.reset();
    }
  }
}
