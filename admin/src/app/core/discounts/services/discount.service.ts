import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { token: this.token } };
  }

  create_discount(data: any, file: any): Observable<any> {
    const url = `${base_url}/discounts/create_discount`;
    const fd = new FormData();
    fd.append('title', data.title);
    fd.append('discount', data.discount);
    fd.append('start_date', data.start_date);
    fd.append('finish_date', data.finish_date);
    fd.append('banner', file);
    return this.http.post(url, fd, this.headers);
  }

  read_discounts(filter: any): Observable<any> {
    const url = `${base_url}/discounts/read_discounts/${filter}`;
    return this.http.get(url, this.headers);
  }

  read_discount_by_id(id: any): Observable<any> {
    const url = `${base_url}/discounts/read_discount_by_id/${id}`;
    return this.http.get(url, this.headers);
  }

  update_discount(id: any, data: any): Observable<any> {
    const url = `${base_url}/discounts/update_discount/${id}`;
    if (data.banner) {
      const fd = new FormData();
      fd.append('title', data.title);
      fd.append('discount', data.discount);
      fd.append('start_date', data.start_date);
      fd.append('finish_date', data.finish_date);
      fd.append('banner', data.banner);
      return this.http.put(url, fd, this.headers);
    } else {
      return this.http.put(url, data, this.headers);
    }
  }

  delete_discount(id: any): Observable<any> {
    const url = `${base_url}/discounts/delete_discount/${id}`;
    return this.http.delete(url, this.headers);
  }
}
