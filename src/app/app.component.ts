import { Component, EventEmitter, Output } from '@angular/core';
import { basketObject } from './basket/basket.component';
import { Dish } from './dish/dish.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'restaurant';

  constructor(){
  }

  ngOnInit(): void {

  }

}
