import { Component, Input, OnInit, Output } from '@angular/core';
import * as EventEmitter from 'events';
import { Dish } from '../dishes/dish/dish.component';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() score: number;
  @Input() dish: Dish;
  @Output() addRating = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  rate(score: number){
    this.dish.rating = Math.round(((this.dish.rating * this.dish.votes + score) / (this.dish.votes + 1)) * 100) / 100;
    this.dish.votes++;
    // this.addRating.emit(this.dish.name);
  }
}
