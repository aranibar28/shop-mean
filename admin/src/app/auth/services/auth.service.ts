import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register';
import { LoginForm } from '../interfaces/login';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  register_user(data: RegisterForm) {
    return this.http.post(`${base_url}/users/create`, data);
  }

  login_user(data: LoginForm) {
    return this.http.post(`${base_url}/login`, data);
  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
  }

  isAuthenticated(allowRoles: string[]): boolean {
    if (!this.token) {
      return false;
    }
    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(this.token);
      if (!decodedToken) {
        localStorage.removeItem('token');
      }
    } catch (error) {
      localStorage.removeItem('token');
      return false;
    }
    return allowRoles.includes(decodedToken['role']);
  }
}
