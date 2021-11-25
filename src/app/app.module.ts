import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DishesComponent } from './dishes/dishes.component';
import { DishComponent } from './dishes/dish/dish.component';
import { OrderedMealsCounterComponent } from './ordered-meals-counter/ordered-meals-counter.component';
import { AddDishComponent } from './add-dish/add-dish.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from './rating/rating.component';
import { BasketComponent } from './basket/basket.component';
import { FilterComponent } from './filter/filter.component';
import { CurrencySwitchComponent } from './currency-switch/currency-switch.component';

@NgModule({
  declarations: [
    AppComponent,
    DishesComponent,
    DishComponent,
    OrderedMealsCounterComponent,
    AddDishComponent,
    RatingComponent,
    BasketComponent,
    FilterComponent,
    CurrencySwitchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
