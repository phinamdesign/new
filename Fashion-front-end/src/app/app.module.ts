import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {httpInterceptorProviders} from './auth/auth-interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ListProductComponent} from './components/product/list-product/list-product.component';
import {CreateProductComponent} from './components/product/create-product/create-product.component';
import {UpdateProductComponent} from './components/product/update-product/update-product.component';
import {DetailsProductComponent} from './components/product/details-product/details-product.component';
import {FooterComponent} from './components/Structure/footer/footer.component';
import {HomeComponent} from './components/Structure/home/home.component';
import {DeleteProductComponent} from './components/product/delete-product/delete-product.component';
import { CategoryCreateComponent } from './components/admin/category/category-create/category-create.component';
import { CategoryEditComponent } from './components/admin/category/category-edit/category-edit.component';
import { CategoryListComponent } from './components/admin/category/category-list/category-list.component';
import { ListSizeComponent } from './components/admin/size/list-size/list-size.component';
import { DetailSizeComponent } from './components/admin/size/detail-size/detail-size.component';
import { UpdateSizeComponent } from './components/admin/size/update-size/update-size.component';
import { CreateSizeComponent } from './components/admin/size/create-size/create-size.component';
import { ListColorComponent } from './components/admin/color/list-color/list-color.component';
import { DetailColorComponent } from './components/admin/color/detail-color/detail-color.component';
import { UpdateColorComponent } from './components/admin/color/update-color/update-color.component';
import { CreateColorComponent } from './components/admin/color/create-color/create-color.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { SupplierListComponent } from './components/admin/suppliers/supplier-list/supplier-list.component';
import { SupplierCreateComponent } from './components/admin/suppliers/supplier-create/supplier-create.component';
import { SupplierEditComponent } from './components/admin/suppliers/supplier-edit/supplier-edit.component';
import { ProductDetailCreateComponent } from './components/product-detail/product-detail-create/product-detail-create.component';
import { ProductDetailListComponent } from './components/product-detail/product-detail-list/product-detail-list.component';
import { ProductDetailEditComponent } from './components/product-detail/product-detail-edit/product-detail-edit.component';
import { CartComponent } from './components/public/cart/cart.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { ProductCategoryComponent } from './components/admin/product-category/product-category.component';
import { ProductSupplierComponent } from './components/admin/product-supplier/product-supplier.component';
import { CartListComponent } from './components/public/cart-list/cart-list.component';
import { ActionProductComponent } from './components/product/action-product/action-product.component';
import { OrderManagerComponent } from './components/admin/order-manager/order-manager.component';
import { OrderUserComponent } from './components/public/order-user/order-user.component';
import { OrderDetailComponent } from './components/public/order-detail/order-detail.component';
import {MenuTopComponent} from './components/Structure/menu-top/menu-top.component';
import {TopSlideShowComponent} from './components/Structure/top-slide-show/top-slide-show.component';
import { OrderFilterComponent } from './components/admin/order-filter/order-filter.component';
import {OrderUserFilterComponent} from './components/public/order-user-filter/order-user-filter.component';
import { AboutComponent } from './components/Structure/about/about.component';
import { SecurityComponent } from './components/Structure/policy/security/security.component';
import { TransportComponent } from './components/Structure/policy/transport/transport.component';
import { GuaranteeComponent } from './components/Structure/policy/guarantee/guarantee.component';
import { RegulationsComponent } from './components/Structure/policy/regulations/regulations.component';
import { HeaderComponent } from './components/Structure/header/header.component';
import { AdminMenuComponent } from './components/Structure/admin-menu/admin-menu.component';
import { ListUserComponent } from './components/admin/user-manager/list-user/list-user.component';
import { UserDetailsComponent } from './components/admin/user-manager/user-details/user-details.component';
import { PaymentListComponent } from './components/public/payment/payment-list/payment-list.component';
import { PaymentCreateComponent } from './components/public/payment/payment-create/payment-create.component';
import { PaymentUpdateComponent } from './components/public/payment/payment-update/payment-update.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ListProductComponent,
    CreateProductComponent,
    UpdateProductComponent,
    DetailsProductComponent,
    FooterComponent,
    HomeComponent,
    DeleteProductComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    CategoryListComponent,
    ListSizeComponent,
    DetailSizeComponent,
    UpdateSizeComponent,
    CreateSizeComponent,
    ListColorComponent,
    DetailColorComponent,
    UpdateColorComponent,
    CreateColorComponent,
    HomeComponent,
    SupplierListComponent,
    SupplierCreateComponent,
    SupplierEditComponent,
    ProductDetailCreateComponent,
    ProductDetailListComponent,
    ProductDetailEditComponent,
    CartComponent,
    UserProfileComponent,
    ProductCategoryComponent,
    ProductSupplierComponent,
    CartListComponent,
    ActionProductComponent,
    OrderManagerComponent,
    MenuTopComponent,
    TopSlideShowComponent,
    OrderManagerComponent,
    OrderUserComponent,
    OrderDetailComponent,
    OrderFilterComponent,
    OrderUserFilterComponent,
    AboutComponent,
    SecurityComponent,
    TransportComponent,
    GuaranteeComponent,
    RegulationsComponent,
    HeaderComponent,
    AdminMenuComponent,
    ListUserComponent,
    UserDetailsComponent,
    AdminMenuComponent,
    PaymentListComponent,
    PaymentCreateComponent,
    PaymentUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
