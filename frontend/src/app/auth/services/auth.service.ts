import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;
declare var iziToast: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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

  isAuthenticated(): boolean {
    if (!this.token) {
      return false;
    }
    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(this.token);

      if (helper.isTokenExpired(this.token)) {
        localStorage.clear();
        return false;
      }

      if (!decodedToken) {
        localStorage.clear();
        return false;
      }
    } catch (error) {
      localStorage.clear();
      return false;
    }
    return true;
  }

  login_public(data: any): Observable<any> {
    const url = `${base_url}/login/public`;
    return this.http.post(url, data, this.headers).pipe(
      tap((res: any) => {
        localStorage.setItem('x-id', res.data.id);
        localStorage.setItem('x-token', res.token);
        localStorage.setItem('x-user', JSON.stringify(res.data));
      })
    );
  }

  success(msg: string) {
    iziToast.show({
      title: 'SUCESS',
      titleColor: '#1dc74c',
      color: '#fff',
      class: 'text-success',
      position: 'topCenter',
      message: msg,
    });
  }

  danger(msg: string) {
    iziToast.show({
      title: 'ERROR',
      titleColor: '#ff0000',
      color: '#fff',
      class: 'text-danger',
      position: 'topCenter',
      message: msg,
    });
  }
}
