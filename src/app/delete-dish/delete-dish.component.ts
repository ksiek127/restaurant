import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dish } from '../dish/dish.component';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-delete-dish',
  templateUrl: './delete-dish.component.html',
  styleUrls: ['./delete-dish.component.css']
})
export class DeleteDishComponent implements OnInit {
  dishName: string;

  constructor(private dbService: FirestoreService, private route: ActivatedRoute) {
    var key = this.route.snapshot.paramMap.get('id');
    if(key != null){
      this.getDishName(key);
    }
   }

  ngOnInit(): void {
  }

  getDishName(key: string){
    this.dbService.getDish(key).subscribe(dish => {
      this.dishName = dish.name;
    })
  }
}
