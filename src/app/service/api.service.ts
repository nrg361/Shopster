import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class ApiService {
  products: any;
  constructor(private http: HttpClient) { }

  getProduct(): any {
    if (!this.products) this.products = this.http.get("https://fakestoreapi.com/products").pipe(shareReplay(1));
    return this.products;
  }
}
