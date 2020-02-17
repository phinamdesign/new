import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from '../models/product';
import {Commenter} from '../models/commenter';

@Injectable({
  providedIn: 'root'
})
export class CommenterService {
  private baseUrl = 'http://localhost:8080/api/auth/commenter/';

  constructor(private http: HttpClient) { }

  getAllCommenterByProductId(id: string): Observable<Commenter[]> {
    return this.http.get<Commenter[]>(this.baseUrl + 'product/' + id);
  }

  createCommenter(commenter: Commenter): Observable<Commenter> {
    return this.http.post<Commenter>(this.baseUrl , commenter);
  }

  editComment(commenter: Commenter): Observable<Commenter> {
    return this.http.put<Commenter>(this.baseUrl + commenter.id , commenter);
  }

  deleteComment(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl +  id);
  }
}
