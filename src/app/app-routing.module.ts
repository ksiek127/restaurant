import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDishComponent } from './add-dish/add-dish.component';
import { BasketComponent } from './basket/basket.component';
import { DishComponent } from './dish/dish.component';
import { DishesComponent } from './dishes/dishes.component';
import { AdminGuard } from './guard/admin.guard';
import { AuthGuard } from './guard/auth.guard';
import { ManagerGuard } from './guard/manager.guard';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { RegisteredUsersComponent } from './registered-users/registered-users.component';
import { SwitchPersistenceComponent } from './switch-persistence/switch-persistence.component';

const routes: Routes = [
  { path: 'mainpage', component: MainpageComponent },
  { path: 'menu/:page', component: DishesComponent},
  { path: 'add', component: AddDishComponent, canActivate: [ManagerGuard, AdminGuard]},
  { path: 'basket', component: BasketComponent, canActivate: [AuthGuard]},
  { path: 'dish/:id', component: DishComponent, canActivate: [AuthGuard]},
  { path: 'registered-users', component: RegisteredUsersComponent, canActivate: [AdminGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'persistence', component: SwitchPersistenceComponent, canActivate: [AdminGuard]},
  { path: '', component: MainpageComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
