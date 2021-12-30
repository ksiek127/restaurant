import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDishComponent } from './add-dish/add-dish.component';
import { BasketComponent } from './basket/basket.component';
import { DeleteDishComponent } from './delete-dish/delete-dish.component';
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
  { path: 'delete-dish/:id', component: DeleteDishComponent, canActivate: [ManagerGuard, AdminGuard]},
  { path: 'add', component: AddDishComponent},
  { path: 'basket', component: BasketComponent},
  { path: 'dish/:id', component: DishComponent, canActivate: [AuthGuard]},
  { path: 'users', component: RegisteredUsersComponent, canActivate: [AdminGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'persistence', component: SwitchPersistenceComponent},
  { path: '', component: MainpageComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
