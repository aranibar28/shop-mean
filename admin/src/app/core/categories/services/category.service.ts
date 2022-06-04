import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { token: this.token } };
  }

  create_category(data: any, file: any): Observable<any> {
    const url = `${base_url}/categories/create`;
    const fd = new FormData();
    fd.append('title', data.title);
    fd.append('icon', data.icon);
    fd.append('description', data.description);
    fd.append('image', file);
    return this.http.post(url, fd, this.headers);
  }

  read_category(filter: any): Observable<any> {
    const url = `${base_url}/categories/search/${filter}`;
    return this.http.get(url, this.headers);
  }

  read_category_by_id(id: any): Observable<any> {
    const url = `${base_url}/categories/${id}`;
    return this.http.get(url, this.headers);
  }

  update_category(id: any, data: any): Observable<any> {
    const url = `${base_url}/categories/${id}`;
    if (data.image) {
      const fd = new FormData();
      fd.append('title', data.title);
      fd.append('icon', data.icon);
      fd.append('description', data.description);
      fd.append('image', data.image);
      return this.http.put(url, fd, this.headers);
    } else {
      return this.http.put(url, data, this.headers);
    }
  }

  delete_category(id: any): Observable<any> {
    const url = `${base_url}/categories/${id}`;
    return this.http.delete(url, this.headers);
  }
}
