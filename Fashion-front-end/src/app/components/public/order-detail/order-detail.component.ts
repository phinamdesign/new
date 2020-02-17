import { Component, OnInit } from '@angular/core';
import {Order} from '../../../models/order';
import {OrderService} from '../../../services/order.service';
import {ProductDetailService} from '../../../services/product-detail.service';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {ProductDetail} from '../../../models/productDetail';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderList: Order[];
  productDetails: ProductDetail[];
  sum = 0;

  constructor(private orderService: OrderService,
              private productDetailService: ProductDetailService,
              private token: TokenStorageService,
              private route: ActivatedRoute) {
  }
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.productDetailService.findByOrderId(id).subscribe(
      next => {
        this.productDetails = next ;
      },
      error => {
        console.log(error);
        this.productDetails = null;
      }
    );
  }
  // findAllByOrderId(orderId) {
  //   this.productDetailService.findByOrderId(orderId).subscribe(next => {
  //     this.productDetails = next;
  //   } );
  // }
}
