import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css']
})
export class RegisteredUsersComponent implements OnInit {
  users: User[];

  constructor(public dbService: FirestoreService) {
    this.getUsers();
   }

  ngOnInit(): void {
  }

  getUsers(){
    this.dbService.getUsers().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(users =>{
      this.users = users as User[];
    });
  }

  ban(user: User){
    ;
  }
}
