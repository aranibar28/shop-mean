import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { token: this.token } };
  }

  create_user(data: any): Observable<any> {
    const url = `${base_url}/users/create`;
    return this.http.post(url, data, this.headers);
  }

  read_users(): Observable<any> {
    const url = `${base_url}/users/search`;
    return this.http.get(url, this.headers);
  }

  read_user_by_id(id: any): Observable<any> {
    const url = `${base_url}/users/${id}`;
    return this.http.get(url, this.headers);
  }

  update_user(id: any, data: any): Observable<any> {
    const url = `${base_url}/users/${id}`;
    return this.http.put(url, data, this.headers);
  }

  delete_user(id: any): Observable<any> {
    const url = `${base_url}/users/${id}`;
    return this.http.delete(url, this.headers);
  }
}
