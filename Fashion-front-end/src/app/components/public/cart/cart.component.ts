import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../../models/product';
import {CartItem} from '../../../models/cart-item';
import {ProductDetail} from '../../../models/productDetail';
import {Observable, Subscription} from 'rxjs';
import {ShoppingCart} from '../../../models/shopping-cart';
import {ProductService} from '../../../services/product.service';
import {ProductDetailService} from '../../../services/product-detail.service';
import {OrderService} from '../../../services/order.service';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {Router} from '@angular/router';
import {StorageService} from '../../../services/storage.service';
import {Order} from '../../../models/order';
// interface ICartItemWithProduct extends CartItem {
//   product: Product;
//   totalCost: number;
// }
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  message: string;
  product: Product;
  count = 0;
  order: Order;
  cart: ProductDetail[];
  listStorage = [];

  constructor(private orderService: OrderService,
              private productDetailService: ProductDetailService,
              private productService: ProductService,
              private token: TokenStorageService,
              private router: Router,
              private storage: StorageService) {
  }

  ngOnInit() {
    if (this.token.getToken()) {
      this.orderService.getCart(this.token.getUserId()).subscribe(next => {
        this.order = next;
        this.productDetailService.findByOrderId(this.order.id).subscribe(next2 => {
          this.cart = next2;
          console.log(next2);
          this.count = this.cart.length;
          console.log(this.count);
          document.getElementById('countCart').innerHTML = next2.length;
        });
      }, error => {
        this.orderService.createItem({
          user: {id: this.token.getUserId()}
        }).subscribe(newOrder => {
        }, errorOder => console.log(errorOder));
      });
    }
    if (this.storage.getCart()) {
      this.productDetailService.findByOrderId(this.storage.getCart()).subscribe(next => {
        this.cart = next;
        console.log((next));
        this.count = this.cart.length;
        document.getElementById('countCart').innerHTML = next.length;
      }, error => {
        console.log(error);
      });
    } else {
      this.orderService.createItem({}).subscribe(newOrder => {
        console.log(newOrder);
        this.storage.saveCart(newOrder);
      }, errorOrder => {
        console.log(errorOrder);
      });
    }
  }

  addCart(idProduct) {
    if (this.token.getToken()) {
      this.orderService.getCart(this.token.getUserId()).subscribe(next => {
        this.order = next;
        this.productDetailService.findByProduct_IdAndOrder_Id(idProduct, this.order.id).subscribe(next1 => {
          console.log(next1);
        }, error => {
          console.log(error);
          this.productDetailService.createProductDetail({
            product: {id: idProduct},
            order: {id: this.order.id}
          }).subscribe(next2 => {
            console.log(next2);
            this.ngOnInit();
          }, error2 => {
            console.log(error2);
          });
        });
      }, error1 => {
        console.log(error1);
      });
    } else {
      this.productDetailService.findByProduct_IdAndOrder_Id(idProduct, this.storage.getCart()).subscribe(next => {
        console.log(next);
      }, error => {
        console.log(error);
        this.productDetailService.createProductDetail({
          product: {id: idProduct},
          order: {id: this.storage.getCart()}
        }).subscribe(next1 => {
          console.log((next1));
          this.ngOnInit();
        }, error1 => {
          console.log(error1);
        });
      });
    }
  }
}

