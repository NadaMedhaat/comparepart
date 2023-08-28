import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency } from 'src/app/Currency';

@Injectable({
  providedIn: 'root',
})
export class CurrencyServiceComponent {
  private currencies: Currency[] = [];
  private lastUpdate;

  constructor(private http: HttpClient) {}

  public getCurrencies() {
    return this.currencies;
  }

  public getLastUpdate() {
    return this.lastUpdate;
  }

  public getCurrenciesPromise() {
    return new Promise<any>((resolve, reject) => {
      if (this.currencies.length === 0) {
        this.http.get<any>('https://open.er-api.com/v6/latest/USD').subscribe(
          (data) => {
            const rates = data.rates;
            const rateKeys = Object.keys(rates).slice(0, 10); // Get first 10 currency codes

            this.http
              .get<any>('https://restcountries.com/v3.1/all?fields=currencies')
              .subscribe(
                (countriesData) => {
                  rateKeys.forEach((currencyCode) => {
                    const currencyData = countriesData.find(
                      (country) =>
                        country.currencies &&
                        country.currencies[currencyCode]
                    );
                    if (currencyData) {
                      const currency = {
                        rate: rates[currencyCode],
                        full_name: currencyData.currencies[currencyCode].name,
                        name: currencyCode,
                      };
                      this.currencies.push(currency);
                    }
                  });

                  this.lastUpdate = data.time_last_update_utc;
                  resolve(this.currencies);
                },
                () => {
                  reject();
                }
              );
          },
          () => {
            reject();
          }
        );
      } else {
        resolve(this.currencies);
      }
    });
  }
}