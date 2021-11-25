import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { format } from 'path';

@Component({
  selector: 'app-currency-switch',
  templateUrl: './currency-switch.component.html',
  styleUrls: ['./currency-switch.component.css']
})
export class CurrencySwitchComponent implements OnInit {
  @Output() currencyEmitter = new EventEmitter();
  // currency: string = "usd";
  // euro: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  updateCurrency(currency: string){
    // if(this.euro){
    //   this.currency = "eur";
    // }else{
    //   this.currency = "usd";
    // }
    // this.currencyEmitter.emit(this.currency);
    this.currencyEmitter.emit(currency);
  }

}
