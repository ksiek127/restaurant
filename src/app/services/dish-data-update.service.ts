import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Dish } from '../dish/dish.component';
import { getDatabase, ref, set } from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class DishDataUpdateService {
  dishesRef: AngularFireList<Dish>;
  dishesPath = 'Dishes';

  constructor(db: AngularFireDatabase) {
    this.dishesRef = db.list(this.dishesPath);
   }

  addDish(dish: Dish){
    var newRef = this.dishesRef.push({...dish});
    var newKey = newRef.key;
    set(ref(getDatabase(), this.dishesPath + '/' + newKey), {
      key: newKey,
      name: dish.name,
      country: dish.country,
      category: dish.category,
      ingredients: dish.ingredients,
      maxNo: dish.maxNo,
      price: dish.price,
      description: dish.description,
      photos: dish.photos,
      show: dish.show,
      rating: 0,
      votes: 0,
      reviews: []
    });
  }

  updateDish(dish: Dish){
    set(ref(getDatabase(), this.dishesPath + '/' + dish.key), {
      key: dish.key,
      name: dish.name,
      country: dish.country,
      category: dish.category,
      ingredients: dish.ingredients,
      maxNo: dish.maxNo,
      price: dish.price,
      description: dish.description,
      photos: dish.photos,
      show: dish.show,
      rating: dish.rating,
      votes: dish.votes,
      reviews: dish.reviews
    });
  }
}

