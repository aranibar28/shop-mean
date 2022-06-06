import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { token: this.token } };
  }

  get_sales_admin(from: any, to: any): Observable<any> {
    const url = `${base_url}/config/get_sales_admin/${from}/${to}`;
    return this.http.get(url, this.headers);
  }

  read_orders_detail(id: any): Observable<any> {
    const url = `${base_url}/public/read_orders_detail/${id}`;
    return this.http.get(url, this.headers);
  }

  kpi_mounth_earnings(): Observable<any> {
    const url = `${base_url}/config/kpi_mounth_earnings`;
    return this.http.get(url, this.headers);
  }
}
