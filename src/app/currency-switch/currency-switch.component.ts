import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { format } from 'path';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-currency-switch',
  templateUrl: './currency-switch.component.html',
  styleUrls: ['./currency-switch.component.css']
})
export class CurrencySwitchComponent implements OnInit {

  constructor(private db: FirestoreService) { }

  ngOnInit(): void {
  }

  updateCurrency(currency: string){
    this.db.updateCurrency(currency);
  }

}
