import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Supplier} from '../../../models/supplier';
import {Category} from '../../../models/category';
import {CategoryService} from '../../../services/category.service';
import {SupplierService} from '../../../services/supplier.service';
import {PictureService} from '../../../services/picture.service';
import {AppComponent} from '../../../app.component';
import {TokenStorageService} from '../../../auth/token-storage.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  productForm: FormGroup;
  product: Product;
  message = false;
  category: any;
  supplier: any;
  previewUrl: any[];
  useFile: any[];
  pictures: any[];
  price: any;
  name: any;
  quantity: any;
  supplierList: Supplier[];
  categoryList: Category[];
  constructor(
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private pictureService: PictureService,
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private app: AppComponent,
    private token: TokenStorageService,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit() {
    if (!this.token.getToken()) {
      this.router.navigate(['/login']);
    }
    this.app.setIsShow(true);
    this.productForm = this.fb.group({
      id: '',
      name: ['', [Validators.required, Validators.minLength(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      // category: [''],
      // supplier: [''],
    });
    this.supplierService.getAllSupplier().subscribe(next => this.supplierList = next);
    this.categoryService.getCategory().subscribe(next => this.categoryList = next);
    this.useFile = [];
    this.previewUrl = [];
    this.pictures = [];
    this.category = [];
    this.supplier = [];
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id).subscribe(
      next => {
        this.productForm.patchValue(next);
        this.supplier = next.supplier;
        this.category = next.category;
        for (const picture of next.pictures) {
          this.previewUrl.push(picture.src);
        }
      }, error => {
        console.log(error);
        this.product = null;
      }
    );
  }

  onSubmit() {
    if (this.productForm.valid) {
      const {value} = this.productForm;
      this.product = value;
      for (const preview of this.previewUrl) {
        this.pictureService.createPicture(preview).subscribe(
          next => {
            this.pictures.push({
              id: next
            });
          }
        );
      }
    } else {
      console.log('error');
    }
    setTimeout(() => {
      this.updateProduct();
    }, 1200);
  }

  onSelectFile(event) {
    this.useFile = [];
    this.useFile = event.srcElement.files;
    console.log(this.useFile);
    this.preview();
  }

  updateProduct() {
    this.product.pictures = this.pictures;
    this.product.category = this.category;
    this.product.supplier = this.supplier;
    this.productService.updateProduct(this.product).subscribe(next => {
      this.ngOnInit();
      this.message = true;
      alert('Update is succeed!');
      this.router.navigate(['action-product']);
    });
  }

  preview() {
    // Show preview
    for (let i = 0; i < this.useFile.length; i++) {
      const mimeType = this.useFile[i].type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(this.useFile[i]);
      reader.onload = event => {
        if (typeof reader.result === 'string') {
          this.previewUrl[i] = reader.result;
        }
      };
    }
    console.log(this.previewUrl);
  }
  addCategory(id) {
    this.categoryService.getCategoryById(id).subscribe(next => this.category = next);
  }

  addSupplier(id) {
    this.supplierService.getSupplierById(id).subscribe(next => this.supplier = next);
  }
}

