import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Product} from '../../../models/product';
import {ShoppingCart} from '../../../models/shopping-cart';
import {Category} from '../../../models/category';
import {Supplier} from '../../../models/supplier';
import {User} from '../../../models/User';
import {AuthLoginInfo} from '../../../auth/login-infor';
import {AuthService} from '../../../auth/auth.service';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {ProductService} from '../../../services/product.service';
import {CategoryService} from '../../../services/category.service';
import {SupplierService} from '../../../services/supplier.service';
import {CartComponent} from '../../public/cart/cart.component';

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css']
})
export class MenuTopComponent implements OnInit, OnDestroy {
  private roles: string[];
  isLoggedIn = false;
  isAdminRole = false;
  username: string;

  public itemCount: number;
  public products: Observable<Product[]>;
  private cartSubscription: Subscription;
  public cart: Observable<ShoppingCart>;
  private categories: Category[];
  private suppliers: Supplier[];
  user: User;
  loginInfo: AuthLoginInfo;
  returnUrl: string;
  info: { name: string; avatar: string; userId: string; authorities: string[]; token: string; username: string };
  constructor(private authService: AuthService, private token: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private productsService: ProductService,
              private categoryService: CategoryService,
              private supplierService: SupplierService,
              private cartComponent: CartComponent
  ) { }

  ngOnInit() {
    this.productsService.getListProduct();
    this.info = {
      name: this.token.getName(),
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      userId: this.token.getUserId(),
      avatar: this.token.getAvatar(),
    };
    console.log(this.info);
    if (this.info.userId) {
    }
    this.categoryService.getCategory().subscribe(next => {
      this.categories = next;
    }, error => (console.log(error)));
    this.supplierService.getAllSupplier().subscribe(next => {
      this.suppliers = next;
    }, error => (console.log(error)));
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/login';
    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      this.roles = this.info.authorities;
      this.isAdminRole = this.roles.includes('ROLE_ADMIN');
    }
  }

  logout() {
    const choice = confirm('Are you sure to logout this page?');
    if (choice) {
      this.token.signOut();
      this.router.navigateByUrl('/');
      // this.ngOnDestroy();
      this.ngOnInit();
      this.cartComponent.ngOnInit();
    }
  }

  // gerUserByUserID() {
  //   this.userService.getUserById(this.info.userId).subscribe(
  //     result => {
  //       this.user = result;
  //     }, error => {
  //       console.log(error);
  //     }
  //   );
  // }

  reloadPage() {
    window.location.reload();
  }

  ngOnDestroy(): void {
    this.reloadPage();
  }

}
