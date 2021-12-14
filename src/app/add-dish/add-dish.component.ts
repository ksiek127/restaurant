import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dish } from '../dish/dish.component';
import { DishDataUpdateService } from '../services/dish-data-update.service';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})

export class AddDishComponent implements OnInit {
  addDishFormGroup: FormGroup = Object();
  name: FormControl = new FormControl("", Validators.required);
  country: FormControl = new FormControl("", Validators.required);
  category: FormControl = new FormControl("", Validators.required);
  ingredients: FormControl = new FormControl("", Validators.required);
  maxNo: FormControl = new FormControl("", [Validators.required, Validators.min(0)]);
  price: FormControl = new FormControl("", [Validators.required, Validators.min(0)]);
  description: FormControl = new FormControl("", Validators.required);
  photos: FormControl = new FormControl("", Validators.required);

  constructor(private updateService: DishDataUpdateService) {
    this.formInit();
   }

  ngOnInit(): void {
    this.formInit();
  }

  newDish: Dish = {
    key: "",
    name: "",
    country: "",
    category: "",
    ingredients: [],
    maxNo: 0,
    price: 0,
    description: "",
    photos: [],
    show: true,
    rating: 0,
    votes: 0,
    reviews: []
  }

  formInit(){
    this.addDishFormGroup = new FormGroup({
      name: this.name,
      country: this.country,
      category: this.category,
      ingredients: this.ingredients,
      maxNo: this.maxNo,
      price: this.price,
      description: this.description,
      photos: this.photos
    });
  }

  onSubmit(){
    if(this.addDishFormGroup.valid){
      this.newDish.name = this.addDishFormGroup.value.name;
      this.newDish.country = this.addDishFormGroup.value.country,
      this.newDish.category = this.addDishFormGroup.value.category,
      this.newDish.ingredients = this.addDishFormGroup.value.ingredients,
      this.newDish.maxNo = this.addDishFormGroup.value.maxNo,
      this.newDish.price = this.addDishFormGroup.value.price,
      this.newDish.description = this.addDishFormGroup.value.description,
      this.newDish.photos = this.addDishFormGroup.value.photos.split(','),
      this.newDish.show = true;
      this.newDish.rating = 0;
      this.newDish.votes = 0;
      this.updateService.addDish(this.newDish);
      this.addDishFormGroup.reset();
    }
  }
}