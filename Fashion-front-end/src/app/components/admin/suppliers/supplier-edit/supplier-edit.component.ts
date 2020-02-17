import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../../models/category";
import {CategoryService} from "../../../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../../auth/token-storage.service";
import {SupplierService} from "../../../../services/supplier.service";
import {Supplier} from "../../../../models/supplier";

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css']
})
export class SupplierEditComponent implements OnInit {

  private editForm: FormGroup;
  supplier: Supplier;
  info: any;
  constructor(
    private supplierService: SupplierService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenStorageService
  ) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      supplierId: [''],
      supplierName: ['', [Validators.required, Validators.minLength(3)]],
    });
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.supplierService.getSupplierById(id).subscribe(
      next => {
        this.supplier = next;
        this.editForm.patchValue(this.supplier);
      },
      error => {
        console.log(error);
        this.supplier = null;
      }
    );
    this.info = {
      token: this.tokenService.getToken(),
      username: this
    };
  }
  editSupplier() {
    const { value } = this.editForm;
    console.log(this.editForm);
    this.supplierService.updateSupplier(value).subscribe(
      next => {
        alert('Edit this supplier is successful!');
        this.router.navigate(['suppliers']);
      },
      error => console.log(error)
    );
  }
}
