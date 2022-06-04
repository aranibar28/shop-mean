import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private http: HttpClient) {}

  get id(): string {
    return localStorage.getItem('x-id') || '';
  }

  get user(): string {
    return localStorage.getItem('x-user') || '';
  }

  get token(): string {
    return localStorage.getItem('x-token') || '';
  }

  get headers() {
    return { headers: { token: this.token } };
  }

  read_customer_by_id(id: any): Observable<any> {
    const url = `${base_url}/public/read_customer_by_id/${id}`;
    return this.http.get(url, this.headers);
  }

  update_customer_by_id(id: any, data: any): Observable<any> {
    const url = `${base_url}/public/update_customer/${id}`;
    return this.http.put(url, data, this.headers);
  }
}
