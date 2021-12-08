import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { format } from 'path';

@Component({
  selector: 'app-currency-switch',
  templateUrl: './currency-switch.component.html',
  styleUrls: ['./currency-switch.component.css']
})
export class CurrencySwitchComponent implements OnInit {
  @Output() currencyEmitter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  updateCurrency(currency: string){
    this.currencyEmitter.emit(currency);
  }

}
