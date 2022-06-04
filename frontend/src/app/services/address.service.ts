import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('x-token') || '';
  }

  get headers() {
    return { headers: { token: this.token } };
  }

  create_address(data: any): Observable<any> {
    const url = `${base_url}/public/create_address`;
    return this.http.post(url, data, this.headers);
  }

  read_address(id: any): Observable<any> {
    const url = `${base_url}/public/read_address/${id}`;
    return this.http.get(url, this.headers);
  }

  update_address(id: any, customer: any): Observable<any> {
    const url = `${base_url}/public/update_address/${id}/${customer}`;
    return this.http.put(url, { data: true }, this.headers);
  }

  delete_address(id: any): Observable<any> {
    const url = `${base_url}/public/delete_address/${id}`;
    return this.http.delete(url, this.headers);
  }

  principal_address(id: any): Observable<any> {
    const url = `${base_url}/public/principal_address/${id}`;
    return this.http.get(url, this.headers);
  }
}
