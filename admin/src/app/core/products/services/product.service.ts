import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { token: this.token } };
  }

  create_product(data: any, file: any): Observable<any> {
    const url = `${base_url}/products/create`;
    const fd = new FormData();
    fd.append('title', data.title);
    fd.append('price', data.price);
    fd.append('stock', data.stock);
    fd.append('category', data.category);
    fd.append('description', data.description);
    fd.append('container', data.container);
    fd.append('image', file);
    return this.http.post(url, fd, this.headers);
  }

  read_product(filter: any): Observable<any> {
    const url = `${base_url}/products/search/${filter}`;
    return this.http.get(url, this.headers);
  }

  read_product_by_id(id: any): Observable<any> {
    const url = `${base_url}/products/${id}`;
    return this.http.get(url, this.headers);
  }

  update_product(id: any, data: any): Observable<any> {
    const url = `${base_url}/products/${id}`;
    if (data.image) {
      const fd = new FormData();
      fd.append('title', data.title);
      fd.append('price', data.price);
      fd.append('stock', data.stock);
      fd.append('category', data.category);
      fd.append('description', data.description);
      fd.append('container', data.container);
      fd.append('image', data.image);
      return this.http.put(url, fd, this.headers);
    } else {
      return this.http.put(url, data, this.headers);
    }
  }

  delete_product(id: any): Observable<any> {
    const url = `${base_url}/products/${id}`;
    return this.http.delete(url, this.headers);
  }

  // Inventory
  read_inventory(id: any): Observable<any> {
    const url = `${base_url}/products/read_inventory/${id}`;
    return this.http.get(url, this.headers);
  }

  register_stock(data: any): Observable<any> {
    const url = `${base_url}/products/register_stock`;
    return this.http.post(url, data, this.headers);
  }

  remove_stock(id: any): Observable<any> {
    const url = `${base_url}/products/remove_stock/${id}`;
    return this.http.delete(url, this.headers);
  }

  // Status
  change_status(id: any): Observable<any> {
    const url = `${base_url}/products/status/${id}`;
    return this.http.put(url, this.headers);
  }

  // Variety
  change_variety(id: any, data: any): Observable<any> {
    const url = `${base_url}/products/variety/${id}`;
    return this.http.put(url, data, this.headers);
  }

  // Galery
  add_items_galery(id: any, data: any): Observable<any> {
    const url = `${base_url}/products/add_items_galery/${id}`;
    const fd = new FormData();
    fd.append('_id', data._id);
    fd.append('image', data.image);
    return this.http.put(url, fd, this.headers);
  }

  del_items_galery(id: any, data: any): Observable<any> {
    const url = `${base_url}/products/del_items_galery/${id}`;
    return this.http.put(url, data, this.headers);
  }

  // Reviews
  read_review_product(id: any): Observable<any> {
    const url = `${base_url}/public/read_review_product/${id}`;
    return this.http.get(url, this.headers);
  }
}
