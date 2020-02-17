import { Component, OnInit } from '@angular/core';
import {Order} from '../../../models/order';
import {OrderService} from '../../../services/order.service';
import {ProductDetailService} from '../../../services/product-detail.service';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-order-user-filter',
  templateUrl: './order-user-filter.component.html',
  styleUrls: ['./order-user-filter.component.css']
})
export class OrderUserFilterComponent implements OnInit {

  orderListOrder: Order[];
  orderListProcessing: Order[];
  orderListDone: Order[];
  orderListCancel: Order[];

  constructor(private orderService: OrderService,
              private productDetailService: ProductDetailService,
              private token: TokenStorageService) {
  }

  ngOnInit() {
    this.updateList();
  }

  updateList() {
    this.orderService.findAllByUserId(this.token.getUserId()).pipe(
      map(res => res.filter((order, i) => order.status === 'order'))
    ).subscribe(orderListOrder => {
      this.orderListOrder = orderListOrder;
    });
    this.orderService.findAllByUserId(this.token.getUserId()).pipe(
      map(res => res.filter((order, i) => order.status === 'processing'))
    ).subscribe(orderListProcessing => {
      this.orderListProcessing = orderListProcessing;
    });
    this.orderService.findAllByUserId(this.token.getUserId()).pipe(
      map(res => res.filter((order, i) => order.status === 'Done'))
    ).subscribe(orderListDone => {
      this.orderListDone = orderListDone;
    });
    this.orderService.findAllByUserId(this.token.getUserId()).pipe(
      map(res => res.filter((order, i) => order.status === 'Cancel'))
    ).subscribe(orderListCancel => {
      this.orderListCancel = orderListCancel;
    });
  }
}

