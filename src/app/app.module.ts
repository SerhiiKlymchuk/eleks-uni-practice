import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyServiceComponent } from './services/currency-service/currency-service.service';
import { CurrenciesComponent } from './components/currency-selector/currencies/currencies.component';
import { CurrencySelectorComponent } from './components/currency-selector/currency-selector.component';
import { HistoryModalComponent } from './modals/history-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    CurrenciesComponent,
    CurrencySelectorComponent,
    HistoryModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    NgbPaginationModule,
    HttpClientModule
  ],
  providers: [CurrencyServiceComponent, HistoryModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
