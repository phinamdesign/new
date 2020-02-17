import { Component, OnInit } from '@angular/core';
import {Product} from '../../../models/product';
import {Category} from '../../../models/category';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../services/category.service';
import {ProductService} from '../../../services/product.service';
import {SupplierService} from '../../../services/supplier.service';
import {Supplier} from '../../../models/supplier';

@Component({
  selector: 'app-product-supplier',
  templateUrl: './product-supplier.component.html',
  styleUrls: ['./product-supplier.component.css']
})
export class ProductSupplierComponent implements OnInit {

  p = 1;
  productListBySupplier: Product[];
  supplier: Supplier;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private supplierService: SupplierService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      const id = param.id;
      // this.categoryService.getCategoryById(id).subscribe(nextCategory => {
      //   this.category = nextCategory;
      this.productService.getListProductBySupplierId(id).subscribe(next => {
        this.productListBySupplier = next;
      }, error => (console.log(error)));
    }, errorCategory => {
      console.log(errorCategory);
    });
    // });

  }
  detailsProduct(id: number) {
    this.router.navigate(['details', id]);
  }

}

