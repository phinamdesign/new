import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SupplierService} from '../../../../services/supplier.service';

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css']
})
export class SupplierCreateComponent implements OnInit {

  createForm = new FormGroup({
    supplierName: new FormControl(''),
  });
  constructor(private supplierService: SupplierService) { }

  ngOnInit() {
  }

  addSupplier() {
    console.log('aaa');
    const {value} = this.createForm;
    this.supplierService.createSupplier(value).subscribe(next => {
      this.supplierService;
      alert('created a new supplier!');
      this.createForm.reset();
    });
  }
}
