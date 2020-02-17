import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SearchProductByName} from '../../../models/SearchProductByName';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product';
import {AuthService} from '../../../auth/auth.service';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {CartComponent} from '../../public/cart/cart.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private nameProduct = '';
  content: string;
  listProduct: Product[] = [];
  info: { name: string; avatar: string; userId: string; authorities: string[]; token: string; username: string };
  productForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private token: TokenStorageService,
    private cartComponent: CartComponent,
    private router: Router
  ) { }

  ngOnInit() {
    this.productService.getListProduct().subscribe(next =>
      (this.listProduct = next), err =>
      (this.content = this.content = JSON.parse(err.error).message));
    this.info = {
      name: this.token.getName(),
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      userId: this.token.getUserId(),
      avatar: this.token.getAvatar(),
    };
  }

  searchProductByName() {
    const nameForm: SearchProductByName = {
      nameProduct: this.nameProduct
    };
    this.productService.searchProductByName(nameForm).subscribe(
      result => {
        this.listProduct = result;
      }, error => {
        console.log(error);
      }
    );
  }

  logout() {
    const choice = confirm('Are you sure to logout this page?');
    if (choice) {
      this.token.signOut();
      this.router.navigateByUrl('/');
      // this.ngOnDestroy();
      this.ngOnInit();
      this.cartComponent.ngOnInit();
      window.location.reload();
    }
  }

}
