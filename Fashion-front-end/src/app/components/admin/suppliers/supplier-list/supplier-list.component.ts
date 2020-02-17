import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../../../../auth/token-storage.service';
import {Supplier} from '../../../../models/supplier';
import {SupplierService} from '../../../../services/supplier.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  suppliers: Observable<Supplier[]>;
  info: any;
  constructor(private supplierService: SupplierService,
              private tokenService: TokenStorageService) {
  }

  reloadData() {
    this.suppliers = this.supplierService.getAllSupplier();
  }
  ngOnInit() {
    this.reloadData();
    this.info = {
      token: this.tokenService.getToken(),
      username: this
    };
  }
  deleteSupplier(id: number) {
    const choice = (confirm('Are you sure to delete this supplier?'));
    if (choice) {
      this.supplierService.deleteSupplier(id)
        .subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error)
        );
    }
  }
}
