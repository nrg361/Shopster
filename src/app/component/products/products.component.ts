import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productList: any;
  public filterCategory: any
  searchKey: string = "";
  public cartProducts: any;
  constructor(private api: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.api.getProduct()
      .subscribe((res: any) => {
        this.productList = res;
        this.productList.forEach((a: any) => {
          if (a.category === "women's clothing" || a.category === "men's clothing") {
            a.category = "fashion";
          }
          a.price = Math.floor(a.price);
          Object.assign(a, { quantity: 1, total: a.price });
        });
        this.filterCategory = this.productList;
      });

    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    })

    this.cartService.getProducts()
      .subscribe(res => {
        this.cartProducts = res;
      });
  }
  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }
  filter(category: string) {
    const result: any = [];
    this.productList.forEach((a: any) => {
      if (a.category == category || category == "") {
        result.push(a);
      }
    });
    this.filterCategory = result;
  }
  has(item: any): boolean {
    let f = false;
    this.cartProducts.forEach((a: any) => {
      if (a.id === item.id) {
        f = true;
      }
    });
    return f;
  }
}
