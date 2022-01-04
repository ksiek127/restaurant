import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private dbService: FirestoreService, private fireAuth: AngularFireAuth){
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
    // if (this.admin) {
    //   return true;
    // }
    // this.router.navigate(['mainpage']);
    // return false;
    // this.router.navigate(['mainpage']);
    // return false;
    // return this.authService.getLogged().pipe(
    //   take(1),
    //   map(user => user && user.admin ? true : false),
    //   tap(isAdmin => {
    //     if (!isAdmin) {
    //       this.router.navigate(['mainpage']);
    //     }
    //   })
    // );
  }
  
}