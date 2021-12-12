import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDishComponent } from './add-dish/add-dish.component';
import { AppComponent } from './app.component';
import { BasketComponent } from './basket/basket.component';
import { DishComponent } from './dish/dish.component';
import { DishesComponent } from './dishes/dishes.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'mainpage', component: MainpageComponent },
  { path: 'menu', component: DishesComponent},
  { path: 'add', component: AddDishComponent},
  { path: 'basket', component: BasketComponent},
  { path: 'dish/:id', component: DishComponent},
  { path: '', component: MainpageComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
