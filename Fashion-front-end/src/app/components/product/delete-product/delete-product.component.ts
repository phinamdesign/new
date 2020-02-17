import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  products: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.products = this.productService.getListProduct();
  }

  deleteProduct(id: number) {
   const choice = confirm('Bạn có chắc chắn muốn xoas ?');
   if (choice) {
     this.productService.deleteProduct(id)
       .subscribe(
         data => {
           console.log(data);
           this.reloadData();
           this.router.navigate(['delete-product']);
         },
         error => console.log(error)
       );
   }
  }
}
