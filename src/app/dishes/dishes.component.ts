import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take, tap } from 'rxjs/operators';
import { basketObject } from '../basket/basket.component';
import { Dish } from '../dish/dish.component';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  dishList: Dish[] = [];
  mealsOrdered = 0;
  totalCost = 0;
  basket: basketObject[] = [];
  dish: Dish;
  mostExpensive: string;
  cheapest: string;
  multiplier = 1;
  currencySign: string;
  pageNo = 1;
  itemsPerPage = 3;
  dishesToShow: Dish[];
  prevButtonVisible: boolean;
  nextButtonVisible: boolean;

  constructor(public dbService: FirestoreService, private route: ActivatedRoute, private authService: AuthService){
    this.dbService.getUser(this.authService.getEmail()).pipe(
      take(1),
      map(user => user.basket),
      tap(basket => {
        this.basket = basket;
      })
    )
    this.getDishList();
    var pageNo = this.route.snapshot.paramMap.get('page');
    if(pageNo != null){
      this.pageNo = parseInt(pageNo);
    }
    if(this.pageNo > 1){
      this.prevButtonVisible = true;
    }
  }

  ngOnInit(){
  }

  getDishList(){
    this.dbService.getDishList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(dishes =>{
      this.dishList = dishes as Dish[];
      this.updatePage();
      this.updateBorders();
    });
  }

  addToBasket(dish: Dish){
    this.mealsOrdered++;
    this.totalCost += dish.price;
    let inBasket = false;
    var howMany = 1;
    var voted = false;
    for(let item of this.basket){
      if(item.dishName == dish.name){
        item.howMany++;
        item.cost += dish.price;
        inBasket = true;
        howMany = item.howMany;
        voted = item.voted;
        break;
      }
    }
    this.dbService.updateBasket(dish, howMany, voted, this.authService.getEmail());
  }

  removeFromBasket(dish: Dish){
    this.mealsOrdered--;
    this.totalCost -= dish.price;
    for(let i=0; i<this.basket.length; i++){
      if(this.basket[i].dishName == dish.name){
        this.basket[i].howMany--;
        if(this.basket[i].howMany == 0){
          this.basket.splice(i, 1);
        }
      }
    }
  }

  updateBorders(){
    var cheapest = this.dishList[0];
    var mostExpensive = this.dishList[0];
    for(let dish of this.dishList){
      if(dish.price < cheapest.price){
        cheapest = dish;
      }else if(dish.price > mostExpensive.price){
        mostExpensive = dish;
      }
    }
    this.cheapest = cheapest.name;
    this.mostExpensive = mostExpensive.name;
  }

  prevPage(){
    this.pageNo--;
    this.updatePage();
    if(this.pageNo == 1){
      this.prevButtonVisible = false;
    }
  }

  isNextBtnVisible(){
    if(this.pageNo * this.itemsPerPage >= this.dishList.length){
      this.nextButtonVisible = false;
    }else{
      this.nextButtonVisible = true;
    }
  }

  nextPage(){
    this.pageNo++;
    this.updatePage();
    this.prevButtonVisible = true;
  }

  updatePage(){
    while((this.pageNo - 1) * this.itemsPerPage >= this.dishList.length){
      this.pageNo--;
    }
    if(this.pageNo == 1){
      this.prevButtonVisible = false;
    }
    this.dishesToShow = [];
      for(var i=(this.pageNo - 1) * this.itemsPerPage; i<this.pageNo * this.itemsPerPage; i++){
        if(i < this.dishList.length){
          this.dishesToShow.push(this.dishList[i]);
        }
      }
      this.isNextBtnVisible();
  }
}
