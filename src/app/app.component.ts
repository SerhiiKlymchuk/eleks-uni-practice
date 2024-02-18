import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Currency } from './interfaces/currency.interface';

import { CurrencyServiceComponent } from './services/currency-service/currency-service.service';
import { HistoryModalComponent } from './modals/history-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {

  public isDataAvailable = false;
  
  public failedToLoad = false;
  
  private _from;
  
  private to;
  
  public amount_value;
  
  @ViewChild('from') fromCmp;
  
  @ViewChild('to') toCmp;
  
  @ViewChild('amount_input', { static: false }) amount_input;
  
  @ViewChild('submitBtn', { static: false }) submitBtn;
  
  @ViewChild('formExchange', { static: false }) formExchange;

  public resultFrom;
  
  public resultTo;
  
  public resultInfo;
  
  public isResult = false;
  
  get from_symbol() {
    return this._from.symbol;
  }

  constructor(
    private modalService: NgbModal,
    public service: CurrencyServiceComponent
  ) {}


  public selectFrom = (currency: Currency): void => {
    this._from = currency;
    if (this.isResult) this.exchange();
  };

  public selectTo = (currency: Currency): void => {
    this.to = currency;
    if (this.isResult) this.exchange();
  };

  changeAmountValue() {
    this.amount_value = (Math.round(this.amount_value * 100) / 100).toFixed(2);
    localStorage.setItem('amount', this.amount_value);
    if (this.isResult) this.exchange();
  }

  public switchCurrencies() {
    let temp: Currency = this._from;
    this.fromCmp.selectCurrency(this.to);
    this.toCmp.selectCurrency(temp);
    if (this.isResult) this.exchange();
  }

  public exchange() {
    let rateBase = this.to.rate / this._from.rate;
    let result = this.amount_value * rateBase;
  
    this.resultFrom = this.amount_value + ' ' + (this._from.full_name ? this._from.full_name : this._from.name) + ' =';
    this.resultTo = result.toFixed(5) + ' ' + (this.to.full_name ? this.to.full_name : this.to.name);
    this.resultInfo = (1).toFixed(2) + ' ' + this._from.name + ' = ' + rateBase.toFixed(6) + ' ' + this.to.name + '\n ' + (1).toFixed(2) + ' ' + this.to.name + ' = ' + (1 / rateBase).toFixed(6) + ' ' + this._from.name;

    const info = {
      from: this._from.name,
      to: this.to.name,
      amount: this.amount_value,
      rate: rateBase.toFixed(4),
      result: result.toFixed(4),
      date: new Date().toISOString()
    }

    this.saveHistoryToLs(info);
  }


  public saveHistoryToLs(info: any) {
    const history: any[] = this.getHistory();
    
    history.unshift(info);
    
    localStorage.setItem('exchangeHistory', JSON.stringify(history));
  }

  public getHistory(){
    let history = [];

    try {
      history = JSON.parse(localStorage.getItem('exchangeHistory') || '[]');
    } catch (e) { }

    return history;
  }

  public openHistory() {
    const modalRef = this.modalService.open(HistoryModalComponent, { size: 'lg' });

    modalRef.componentInstance.history = this.getHistory()
  }

  onSubmit(): void {
    this.exchange();
    this.isResult = true;
  }

  ngOnInit(): void {
    this.service.getCurrenciesPromise().then(
      (data) => {
        this._from = data[0];
        this.to = data[1];
        this.isDataAvailable = true;
      },
      () => {
        this.failedToLoad = true;
      }
    );

    let localAmount = localStorage.getItem('amount');
    this.amount_value = localAmount ? localAmount : (1).toFixed(2);
  }

  windowResize(): void {
    this.submitBtn.nativeElement.style.width =
    this.formExchange.nativeElement.style.width;
  }

  ngAfterViewInit(): void {}
}
