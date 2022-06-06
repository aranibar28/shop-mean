import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('x-token') || '';
  }

  get headers() {
    return { headers: { token: this.token } };
  }

  get_cart_customer(id: any): Observable<any> {
    const url = `${base_url}/cart/get_cart_customer/${id}`;
    return this.http.get(url, this.headers);
  }

  add_item_cart(data: any): Observable<any> {
    const url = `${base_url}/cart/add_item_cart`;
    return this.http.post(url, data, this.headers);
  }

  delete_item_cart(id: any): Observable<any> {
    const url = `${base_url}/cart/delete_item_cart/${id}`;
    return this.http.delete(url, this.headers);
  }

  validate_coupon(coupon: any): Observable<any> {
    const url = `${base_url}/public/validate_coupon/${coupon}`;
    return this.http.get(url, this.headers);
  }

  register_sale(data: any): Observable<any> {
    const url = `${base_url}/public/register_sale`;
    return this.http.post(url, data, this.headers);
  }

  send_email_sale(id: any): Observable<any> {
    const url = `${base_url}/public/send_email_sale/${id}`;
    return this.http.get(url, this.headers);
  }

  get_token_culqi(data: any): Observable<any> {
    const token_public = 'pk_test_511ba1be6cbb98e4';
    let headers = { headers: { Authorization: `Bearer ${token_public}` } };
    const url = 'https://secure.culqi.com/v2/tokens';
    return this.http.post(url, data, headers);
  }

  get_charge_culqi(data: any): Observable<any> {
    const token_private = 'sk_test_abe377a1d2e60fdb';
    let headers = { headers: { Authorization: `Bearer ${token_private}` } };
    const url = 'https://api.culqi.com/v2/charges';
    return this.http.post(url, data, headers);
  }

  read_orders_customer(id: any): Observable<any> {
    const url = `${base_url}/public/read_orders_customer/${id}`;
    return this.http.get(url, this.headers);
  }

  read_orders_detail(id: any): Observable<any> {
    const url = `${base_url}/public/read_orders_detail/${id}`;
    return this.http.get(url, this.headers);
  }

  read_review_customer(id: any): Observable<any> {
    const url = `${base_url}/public/read_review_customer/${id}`;
    return this.http.get(url, this.headers);
  }

  read_review_product(id: any): Observable<any> {
    const url = `${base_url}/public/read_review_product/${id}`;
    return this.http.get(url, this.headers);
  }

  send_review_product(data: any): Observable<any> {
    const url = `${base_url}/public/send_review_product`;
    return this.http.post(url, data, this.headers);
  }
}
