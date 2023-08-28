import { Component, OnInit } from '@angular/core';
import { CurrencyServiceComponent } from './currency-service/currency-service.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public service: CurrencyServiceComponent) {}
  ngOnInit(): void {
    this.service.getCurrenciesPromise().then();
    }
}
