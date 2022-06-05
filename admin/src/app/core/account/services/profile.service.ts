import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  get id(): string {
    return localStorage.getItem('id') || '';
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { token: this.token } };
  }

  get_user_by_id(id: any): Observable<any> {
    const url = `${base_url}/users/${id}`;
    return this.http.get(url, this.headers);
  }

  get_messages_admin(): Observable<any> {
    const url = `${base_url}/config/get_messages_admin`;
    return this.http.get(url, this.headers);
  }

  close_message_admin(id: any, data: any): Observable<any> {
    const url = `${base_url}/config/close_message_admin/${id}`;
    return this.http.put(url, data, this.headers);
  }
}
