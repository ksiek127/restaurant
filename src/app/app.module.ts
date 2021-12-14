import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DishesComponent } from './dishes/dishes.component';
import { DishComponent } from './dish/dish.component';
import { OrderedMealsCounterComponent } from './ordered-meals-counter/ordered-meals-counter.component';
import { AddDishComponent } from './add-dish/add-dish.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from './rating/rating.component';
import { BasketComponent } from './basket/basket.component';
import { FilterComponent } from './filter/filter.component';
import { CurrencySwitchComponent } from './currency-switch/currency-switch.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavComponent } from './nav/nav.component';
import { DishBasicComponent } from './dish-basic/dish-basic.component';
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from '../environments/environment'; 
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MainpageComponent } from './mainpage/mainpage.component';


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
    CurrencySwitchComponent,
    PageNotFoundComponent,
    NavComponent,
    DishBasicComponent,
    MainpageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
