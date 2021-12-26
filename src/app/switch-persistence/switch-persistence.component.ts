import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-switch-persistence',
  templateUrl: './switch-persistence.component.html',
  styleUrls: ['./switch-persistence.component.css']
})
export class SwitchPersistenceComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  changePersistence(persistenceType: string){
    this.auth.setPersistence(persistenceType);
  }

}
