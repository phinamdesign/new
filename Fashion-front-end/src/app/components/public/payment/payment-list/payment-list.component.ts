import { Component, OnInit } from '@angular/core';
import {PaymentService} from '../../../../services/payment.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

  payments: Observable<any>;
  p = 1;
  constructor(private paymentService: PaymentService, private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.payments = this.paymentService.getPaymentList();
  }
  deletePayment(id: number) {
    const choice = confirm('Are you sure to delete this payment');
    if (choice) {
      this.paymentService.deletePayment(id).subscribe(data => {console.log(data); this.reloadData(); },
        error => console.log(error));
    }
  }
  updatePayment(id: number) {
    this.router.navigate(['payment', id]);
  }

}
