import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { token: this.token } };
  }

  create_coupon(data: any): Observable<any> {
    const url = `${base_url}/coupons/create`;
    return this.http.post(url, data, this.headers);
  }

  read_coupons(filter: any): Observable<any> {
    const url = `${base_url}/coupons/search/${filter}`;
    return this.http.get(url, this.headers);
  }

  read_coupon_by_id(id: any): Observable<any> {
    const url = `${base_url}/coupons/${id}`;
    return this.http.get(url, this.headers);
  }

  update_coupon(id: any, data: any): Observable<any> {
    const url = `${base_url}/coupons/${id}`;
    return this.http.put(url, data, this.headers);
  }

  delete_coupon(id: any): Observable<any> {
    const url = `${base_url}/coupons/${id}`;
    return this.http.delete(url, this.headers);
  }
}
