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
  getAdminStorage(): string{
    return localStorage.getItem('isAdmin');
  }
  isAdmin(): boolean{
    return this.getAdminStorage() === 'true';
  }
  async getAdmin(adminUsername: string): Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
      this.Http.post('api/auth/getAdmin', {adminUsername}).toPromise().then(Response => {
        // @ts-ignore
        localStorage.setItem('isAdmin', Response);
        // @ts-ignore
        return resolve(Response);
      });
    });
  }

  async authenticate(username: string, password: string): Promise<void> {
    this.getAdmin(username);
    return new Promise<void>((resolve, reject) => {
      this.Http.post('/api/auth/authenticate', {username , password}, {responseType: 'text'})
        .toPromise()
        .then(value => {
          localStorage.setItem('auth-token', value);
          return resolve();
        }, reject);
    });
  }

  async register(username: string, password: string, adminAccount: boolean): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.Http.post('/api/auth/register', {username , password, adminAccount}, {responseType: 'text'})
        .toPromise()
        .then(value => {
          localStorage.setItem('auth-token', value);
          return resolve();
        }, reject);
    });
  }
}
