import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordered-meals-counter',
  templateUrl: './ordered-meals-counter.component.html',
  styleUrls: ['./ordered-meals-counter.component.css']
})
export class OrderedMealsCounterComponent implements OnInit {
  @Input() mealsOrdered: number;

  constructor() { 
    this.mealsOrdered = 0;
  }

  ngOnInit(): void {
  }

}
