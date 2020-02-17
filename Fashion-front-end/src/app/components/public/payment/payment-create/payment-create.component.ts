import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PaymentService} from '../../../../services/payment.service';

@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html',
  styleUrls: ['./payment-create.component.css']
})
export class PaymentCreateComponent implements OnInit {

  createForm = new FormGroup({
    name: new FormControl(''),
  });
  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
  }

  addPayment() {
    console.log('aaa');
    const {value} = this.createForm;
    this.paymentService.createPayment(value).subscribe(next => {
      this.paymentService;
      alert('created a new payment!')
      this.createForm.reset();
    });
  }
}
