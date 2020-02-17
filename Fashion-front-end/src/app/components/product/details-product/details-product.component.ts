import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Product} from '../../../models/product';
import {ProductService} from '../../../services/product.service';
import {Observable, Observer} from 'rxjs';
import {CartComponent} from '../../public/cart/cart.component';
// import {ShoppingCartService} from '../../../services/shopping-cart.service';
import {Commenter} from '../../../models/commenter';
import {CommenterService} from '../../../services/commenter.service';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {DomSanitizer} from '@angular/platform-browser';
import {FormControl, FormGroup} from '@angular/forms';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  isAdminRole = false;
  username: string;
  id: number;
  product: Product;
  iShow = false;
  iEdit: boolean;
  public products: Observable<Product[]>;
  listCommenter: Commenter[] = [];
  userId: string;
  tokenJWT: string;
  idCommenter: string;
  productId: string;
  info: { name: string; avatar: string; userId: string; authorities: string[]; token: string; username: string };

  formCommenterCreate = new FormGroup({
    contentInput: new FormControl('')
  });
  contentUpdate = new FormControl();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cart: CartComponent,
    private commenterService: CommenterService,
    private domSanitizer: DomSanitizer,
    private token: TokenStorageService
    // private shoppingCartService: ShoppingCartService
  ) {
    this.route.params.subscribe(params => {
      this.productId = params.id;
    });
    this.userId = this.token.getUserId();
    this.tokenJWT = this.token.getToken();
  }

//
  ngOnInit() {
    this.product = new Product();
    this.id = this.route.snapshot.params.id;
    this.productService.getProduct(this.id)
      .subscribe(
        data => {
          console.log(data);
          this.product = data;
        }, error => console.log(error));
    this.products = this.productService.getListProduct();
    this.info = {
      name: this.token.getName(),
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      userId: this.token.getUserId(),
      avatar: this.token.getAvatar()
    };
    this.getAllCommentThisProduct();
    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = this.info.authorities;

      this.isAdminRole = this.roles.includes('ROLE_ADMIN');
      this.username = user.username;
    }
  }

  backToList() {
    this.router.navigate(['product']);
  }

  getAllCommentThisProduct() {
    this.commenterService.getAllCommenterByProductId(this.productId).pipe(
      map(res => res.sort((a, b) => a.date < b.date ? 1 : -1))
    ).subscribe(
      result => {
        this.listCommenter = result;
      }, error => {
        console.log(error);
      }
    );
  }

  closeForm(closeModalRef: HTMLAnchorElement) {
    closeModalRef.click();
    this.getAllCommentThisProduct();
    this.contentUpdate.reset();
  }

  createCommenter() {
    const {contentInput} = this.formCommenterCreate.value;
    if (contentInput === '' || contentInput === null || contentInput === undefined) {
      return;
    }

    const commenter: Commenter = {
      productId: this.productId,
      content: contentInput,
      user: {
        id: this.token.getUserId(),
        name: this.token.getName(),
        phone: this.token.getPhone(),
        address: this.token.getAddress(),
        password: this.token.getPassword()
      }
    };
    this.commenterService.createCommenter(commenter).subscribe(
      result => {
        console.log(result, 'ok');
        this.getAllCommentThisProduct();
        this.formCommenterCreate.reset();
      }, error => {
        console.log(error);
      }
    );
  }

  getIdComment1(id: string) {
    this.idCommenter = id;
  }

  closeForm1(closeModalRef: HTMLAnchorElement) {
    closeModalRef.click();
    this.getAllCommentThisProduct();
    this.contentUpdate.reset();
  }

  updateCommenter1(commenterId: string, closeModalRef: HTMLAnchorElement) {
    if (this.contentUpdate.value === null || this.contentUpdate.value === '' || this.contentUpdate.value === undefined) {
      return this.closeForm(closeModalRef);
    }
    const commenter: Commenter = {
      id: commenterId,
      content: this.contentUpdate.value
    };
    this.commenterService.editComment(commenter).subscribe(
      result => {
        this.closeForm1(closeModalRef);
      }, error => {
        console.log(error);
      }
    );
    console.log(commenter);
  }

  deleteComment1(closeModalRef2: HTMLButtonElement) {
    this.commenterService.deleteComment(this.idCommenter).subscribe(
      result => {
        this.getAllCommentThisProduct();
        closeModalRef2.click();
      }, error => {
        console.log(error);
      }
    );
  }

 addCart(idProduct) {
    this.cart.addCart(idProduct);
    alert('You just added this product in your cart');
  }
}
