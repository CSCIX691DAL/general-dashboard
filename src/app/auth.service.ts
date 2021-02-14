import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private Http: HttpClient) { }

  getToken(): string | null {
    return localStorage.getItem('auth-token');
  }

  removeToken(): void {
    localStorage.removeItem('auth-token');
  }

  hasToken(): boolean {
    return this.getToken() !== null;
  }

  async validateToken(): Promise<any> {
    return this.Http.get('/api/auth/validate', {responseType: 'text'}).toPromise();
  }

  async authenticate(username: string, password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.Http.post('/api/auth/authenticate', {username , password}, {responseType: 'text'})
        .toPromise()
        .then(value => {
          localStorage.setItem('auth-token', value);
          return resolve();
        }, reject);
    });
  }

  async register(username: string, password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.Http.post('/api/auth/register', {username , password}, {responseType: 'text'})
        .toPromise()
        .then(value => {
          localStorage.setItem('auth-token', value);
          return resolve();
        }, reject);
    });
  }
}
