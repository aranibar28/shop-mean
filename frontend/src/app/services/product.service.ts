import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('x-token') || '';
  }

  get headers() {
    return { headers: { token: this.token } };
  }

  list_categories(filter: any): Observable<any> {
    const url = `${base_url}/categories/search/${filter}`;
    return this.http.get(url, this.headers);
  }

  list_products(filter: any): Observable<any> {
    const url = `${base_url}/products/search/${filter}`;
    return this.http.get(url, this.headers);
  }

  list_product_by_slug(slug: any): Observable<any> {
    const url = `${base_url}/public/list_product_by_slug/${slug}`;
    return this.http.get(url, this.headers);
  }

  list_product_recomended(category: any): Observable<any> {
    const url = `${base_url}/public/list_product_recomended/${category}`;
    return this.http.get(url, this.headers);
  }

  list_product_news(): Observable<any> {
    const url = `${base_url}/public/list_product_news`;
    return this.http.get(url, this.headers);
  }

  list_product_sales(): Observable<any> {
    const url = `${base_url}/public/list_product_sales`;
    return this.http.get(url, this.headers);
  }

  get_discount_active(): Observable<any> {
    const url = `${base_url}/discounts/get_discount_active`;
    return this.http.get(url, this.headers);
  }

  read_review_product(id: any): Observable<any> {
    const url = `${base_url}/public/read_review_product/${id}`;
    return this.http.get(url, this.headers);
  }
}
