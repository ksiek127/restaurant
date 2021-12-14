import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  key: string,
  nickname: string,
  title: string,
  content: string,
  orderDate: Date | null,
  dishKey: string
}

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {
  @Input() cheapest: string;
  @Input() mostExpensive: string;
  @Output() deleteDishEmitter = new EventEmitter();
  @Output() orderDishEmitter = new EventEmitter();
  @Output() resignEmitter = new EventEmitter();

  dishData: Dish;
  currency: string;
  orderBtnVisible = true;
  resignBtnVisible = false;
  unitsOrdered = 0;
  lastUnits = false;
  noneLeft = false;
  reviews: Review[];
  calculatedPrice: number;

  maxDate = new Date();
  reviewFormGroup: FormGroup = Object();
  nickname: FormControl = new FormControl("", Validators.required);
  title: FormControl = new FormControl("", Validators.required);
  reviewContent: FormControl = new FormControl("", Validators.required);
  orderDate: FormControl = new FormControl("");
  newReview: Review;

  constructor(private route: ActivatedRoute, private dbService: FirestoreService, private reviewUpdateService: ReviewUpdateService) {
    this.newReview = {
      key: "",
      nickname: "",
      title: "",
      content: "",
      orderDate: null,
      dishKey: ""
    }
    this.formInit();
    this.getReviews();
    this.getCurrency();
    var key = this.route.snapshot.paramMap.get('id');
    if(key != null){
      this.getDish(key);
    }
  }

  ngOnInit(): void {
    this.formInit();
  }

  getCurrency(){
    this.dbService.getCurrency().valueChanges().subscribe(currency => {
      if(currency != null){
        this.currency = currency;
      }
    })
  }

  getPrice(){
    this.calculatedPrice = this.dishData.price;
    if(this.currency == "€"){
      this.calculatedPrice *= 0.88;
    }
  }

  getDish(key: string){
    this.dbService.getDish(key).subscribe(dish => {
      this.dishData = dish;
      if(dish.maxNo <= 3){
        this.lastUnits = true;
      }
      this.getPrice();
      this.getBorderColor();
    })
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
      this.newReview.dishKey = this.dishData.key;
      this.reviewUpdateService.addReview(this.newReview);
      this.reviewFormGroup.reset();
    }
  }

  getReviews(){
    this.reviewUpdateService.getReviews().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    ).subscribe(reviews =>{
      this.reviews = reviews as Review[];
    });
  }
}
