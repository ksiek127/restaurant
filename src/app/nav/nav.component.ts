import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLogged = false;
  email = '';
  role = 'guest';

  constructor(private authService: AuthService, private dbService: FirestoreService, private router: Router) {
    this.authService.getLogged().subscribe(auth => {
      if(auth){
        this.isLogged = true;
        this.email = auth.email;
        this.dbService.getUser(auth.email).subscribe(user => {
          this.role = "guest";
        });
      }else{
        this.isLogged = false;
        this.email = '';
        this.role = 'guest';
      }
    });
   }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['mainpage']);
  }
}
