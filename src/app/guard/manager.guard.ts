import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private dbService: FirestoreService){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var email = this.authService.getEmail();
      return this.dbService.getUser(email).pipe(
        take(1),
        map(user => user && user.admin ? true: false),
        tap(isAdmin => {
          if(!isAdmin){
            this.router.navigate(['mainpage']);
          }
        })
      )
  }
  
}
