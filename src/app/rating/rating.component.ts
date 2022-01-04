import { Component, Input, OnInit, Output } from '@angular/core';
import * as EventEmitter from 'events';
import { take, map, tap } from 'rxjs';
import { Dish } from '../dish/dish.component';
import { AuthService } from '../services/auth.service';
import { DishDataUpdateService } from '../services/dish-data-update.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() score: number;
  @Input() dish: Dish;
  @Output() addRating = new EventEmitter();

  constructor(private updateService: DishDataUpdateService, private authService: AuthService, private dbService: FirestoreService) { }

  ngOnInit(): void {
  }

  rate(score: number){
    this.dish.rating = Math.round(((this.dish.rating * this.dish.votes + score) / (this.dish.votes + 1)) * 100) / 100;
    this.dish.votes = this.dish.votes + 1;
    this.updateService.updateDish(this.dish);
    this.dbService.getUser(this.authService.getEmail()).pipe(
      take(1),
      map(user => user.basket),
      tap(basket => {
        for(let b of basket){
          if(b.dishName == this.dish.name){
            this.dbService.updateBasket(this.dish, b.howMany, true, this.authService.getEmail());
          }
        }
      })
    )
  }

  canRate(){
    this.dbService.getUser(this.authService.getEmail()).pipe(
      take(1),
      map(user => user.basket),
      tap(basket => {
        for(let b of basket){
          if(b.dishName == this.dish.name){ // czy danie bylo zamowione
            return !b.voted; // czy juz byl glos oddany
          }
        }
        return false;
      })
    )
  }
}
