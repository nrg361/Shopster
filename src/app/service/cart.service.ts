import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() {
    let x = localStorage.getItem('cart');
    if (x) {
      let localCartData = JSON.parse(x);
      if (localCartData) this.cartItemList = localCartData;
      console.log(this.cartItemList);
      this.productList.next(this.cartItemList);

    }
  }
  getProducts() {
    let x = localStorage.getItem('cart');
    if (x) {
      let localCartData = JSON.parse(x);
      if (localCartData) this.cartItemList = localCartData;
      console.log(this.cartItemList);
      this.productList.next(this.cartItemList);

    }
    return this.productList.asObservable();
  }
  addtoCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    localStorage.setItem('cart', JSON.stringify(this.cartItemList));
  }
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total * a.quantity;
    })
    return grandTotal;
  }
  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
    localStorage.setItem('cart', JSON.stringify(this.cartItemList));
  }
  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    localStorage.setItem('cart', JSON.stringify(this.cartItemList));
  }
  update(item: any, val: number) {
    // not working correctly
    let result: any = [];
    this.cartItemList.forEach((a: any) => {
      if (a.id === item.id) {
        a.quantity = val;
      }
      result.push(a);
    });
    this.cartItemList = result;
    this.productList.next(this.cartItemList);
    localStorage.setItem('cart', JSON.stringify(this.cartItemList));
  }
}
