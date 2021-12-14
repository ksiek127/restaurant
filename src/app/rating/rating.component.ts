import { Component, Input, OnInit, Output } from '@angular/core';
import * as EventEmitter from 'events';
import { Dish } from '../dish/dish.component';
import { DishDataUpdateService } from '../services/dish-data-update.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() score: number;
  @Input() dish: Dish;
  @Output() addRating = new EventEmitter();

  constructor(private updateService: DishDataUpdateService) { }

  ngOnInit(): void {
  }

  rate(score: number){
    this.dish.rating = Math.round(((this.dish.rating * this.dish.votes + score) / (this.dish.votes + 1)) * 100) / 100;
    this.dish.votes = this.dish.votes + 1;
    this.updateService.updateDish(this.dish);
  }
}
