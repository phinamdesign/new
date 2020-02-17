import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../../auth/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PaymentService} from '../../../../services/payment.service';
import {Payment} from '../../../../models/payment';

@Component({
  selector: 'app-payment-update',
  templateUrl: './payment-update.component.html',
  styleUrls: ['./payment-update.component.css']
})
export class PaymentUpdateComponent implements OnInit {

  private editForm: FormGroup;
  payment: Payment;
  info: any;
  constructor(
    private paymentService: PaymentService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenStorageService
  ) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.paymentService.getPaymentById(id).subscribe(
      next => {
        this.payment = next;
        this.editForm.patchValue(this.payment);
      },
      error => {
        console.log(error);
        this.payment = null;
      }
    );
    this.info = {
      token: this.tokenService.getToken(),
      username: this
    };
  }
  editPayment() {
    const { value } = this.editForm;
    console.log(this.editForm);
    this.paymentService.updatePayment(value).subscribe(
      next => {
        alert('Edit this Payment is successful!');
        this.router.navigate(['payment/list']);
      },
      error => console.log(error)
    );
  }
}
