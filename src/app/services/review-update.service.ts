import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { getDatabase, ref, set } from 'firebase/database';
import { Dish, Review } from '../dish/dish.component';
import { DishDataUpdateService } from './dish-data-update.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewUpdateService {
  reviewsRef: AngularFireList<Review>;
  reviewsPath = 'Reviews';

  constructor(private db: AngularFireDatabase) { 
    this.reviewsRef = db.list(this.reviewsPath);
  }

  addReview(review: Review){
    var newRef = this.reviewsRef.push({...review});
    var newKey = newRef.key;
    // this.dishesRef.update(newKey, {key: newKey});
    set(ref(getDatabase(), this.reviewsPath + '/' + newKey), {
      key: newKey,
      nickname: review.nickname,
      title: review.title,
      content: review.content,
      orderDate: review.orderDate,
      dishKey: review.dishKey
    });
    // var updatedReviews = dish.reviews;
    // updatedReviews.push(review);
    // set(ref(getDatabase(), this.dishesPath + '/' + dish.key), {
    //   key: dish.key,
    //   name: dish.name,
    //   country: dish.country,
    //   category: dish.category,
    //   ingredients: dish.ingredients,
    //   maxNo: dish.maxNo,
    //   price: dish.price,
    //   description: dish.description,
    //   photos: dish.photos,
    //   show: dish.show,
    //   rating: dish.rating,
    //   votes: dish.votes,
    //   reviews: dish.reviews
    // });
  }

  getReviews(){
    // var ref = this.db.database.ref(this.reviewsPath);
    // ref.orderByChild("dishKey").equalTo(dish.key);
    // return ref;
    // return this.db.list(this.reviewsPath, ref => ref.orderByChild("dishKey").equalTo(dish.key));
    return this.reviewsRef;
  }
}
