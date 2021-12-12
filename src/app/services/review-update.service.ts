import { Injectable } from '@angular/core';
import { Dish, Review } from '../dish/dish.component';
import { DishDataUpdateService } from './dish-data-update.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewUpdateService {

  constructor(private updateService: DishDataUpdateService) { }

  addReview(dish: Dish, review: Review){
    dish.reviews.push(review);
    this.updateService.updateDish(dish);
  }
}
