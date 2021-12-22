import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  logged: Observable<any>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.logged = this.authService.getLogged();
  }

  logout(){
    this.authService.logout();
  }
}
