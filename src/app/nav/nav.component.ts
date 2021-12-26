import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLogged = false;
  email = '';

  constructor(private authService: AuthService) {
    this.authService.getLogged().subscribe(auth => {
      if(auth){
        this.isLogged = true;
        this.email = auth.email;
      }else{
        this.isLogged = false;
        this.email = '';
      }
    });
   }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }
}
