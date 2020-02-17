import {Component, OnInit} from '@angular/core';
import {Product} from '../../../models/product';
import {ProductService} from '../../../services/product.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../../services/category.service';
import {SupplierService} from '../../../services/supplier.service';
import {PictureService} from '../../../services/picture.service';
import {AppComponent} from '../../../app.component';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {Category} from '../../../models/category';
import {Supplier} from '../../../models/supplier';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
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
    private token: TokenStorageService
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
      this.createProduct();
    }, 1200);
  }

  onSelectFile(event) {
    this.useFile = [];
    this.useFile = event.srcElement.files;
    console.log(this.useFile);
    this.preview();
  }

  createProduct() {
    this.product.pictures = this.pictures;
    this.product.category = this.category;
    this.product.supplier = this.supplier;
    this.productService.createProduct(this.product).subscribe(next => {
      this.ngOnInit();
      this.message = true;
      alert('Created a new product!');
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
