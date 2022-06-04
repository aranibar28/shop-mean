import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { token: this.token } };
  }

  create_customer_admin(data: any): Observable<any> {
    const url = `${base_url}/customers/create`;
    return this.http.post(url, data, this.headers);
  }

  read_customers(type: any, filter: any): Observable<any> {
    const url = `${base_url}/customers/search/${type}/${filter}`;
    return this.http.get(url, this.headers);
  }

  read_customer_by_id(id: any): Observable<any> {
    const url = `${base_url}/customers/${id}`;
    return this.http.get(url, this.headers);
  }

  update_customer(id: any, data: any): Observable<any> {
    const url = `${base_url}/customers/${id}`;
    return this.http.put(url, data, this.headers);
  }

  delete_customer(id: any): Observable<any> {
    const url = `${base_url}/customers/${id}`;
    return this.http.delete(url, this.headers);
  }
}
