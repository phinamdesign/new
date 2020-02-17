import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from '../models/product';
import {SearchProductByName} from '../models/SearchProductByName';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/admin/product';
  private url = 'http://localhost:8080/api/auth/product';

  constructor(private http: HttpClient) { }

  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }
  createProduct(product: Product): Observable<any> {
    console.log(product);
    return this.http.post(this.baseUrl, {
      name: product.name,
      price: product.price,
      description: product.description,
      quantity: product.quantity,
      pictures: product.pictures,
      category: product.category,
      supplier: product.supplier
    });
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(this.baseUrl + '/' + product.id, {
      name: product.name,
      price: product.price,
      description: product.description,
      quantity: product.quantity,
      pictures: product.pictures,
      category: product.category,
      supplier: product.supplier
    });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getListProduct(): Observable<any> {
    return this.http.get<Product[]>(`${this.url}`);
  }

  searchByName(product: Product): Observable<Product[]> {
    return this.http.post<Product[]>(this.url + '/search-by-name', product);
  }
  // searchProductByName(product: Product): Observable<Product[]> {
  //   return this.http.post<Product[]>(this.url + '/search-product-by-name', product);
  // }
  searchProductByName(nameProduct: SearchProductByName): Observable<Product[]> {
    return this.http.post<Product[]>(this.url + '/search-product-by-name', nameProduct);
  }
  getListProductByCategoryId(id: number): Observable<any> {
    return this.http.get<Product[]>(`${this.url}/list/category/${id}`);
  }
  getListProductBySupplierId(id: number): Observable<any> {
    return this.http.get<Product[]>(`${this.url}/list/supplier/${id}`);
  }
}
