import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { getDatabase, ref, set } from 'firebase/database';
import { Review } from '../dish/dish.component';

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
    set(ref(getDatabase(), this.reviewsPath + '/' + newKey), {
      key: newKey,
      nickname: review.nickname,
      title: review.title,
      content: review.content,
      orderDate: review.orderDate,
      dishKey: review.dishKey
    });
  }

  getReviews(){
    return this.reviewsRef;
  }
}
