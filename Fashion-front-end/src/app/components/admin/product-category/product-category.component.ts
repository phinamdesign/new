import { Component, OnInit } from '@angular/core';
import {Product} from '../../../models/product';
import {Category} from '../../../models/category';
import {CategoryService} from '../../../services/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  p = 1;
  productListByCategory: Product[];
  category: Category;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      const id = param.id;
      // this.categoryService.getCategoryById(id).subscribe(nextCategory => {
      //   this.category = nextCategory;
      this.productService.getListProductByCategoryId(id).subscribe(next => {
          this.productListByCategory = next;
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
