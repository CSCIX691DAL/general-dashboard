import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JSONObject} from 'puppeteer';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  bool;
  // To fix admin refresh bug - gets called in ngOnInit() of navbar.component.ts
  checkAdmin(): void{
    if (this.hasToken()){
      this.getAdmin();
    }
  }
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
  // Retrieves Admin value stored in json token
  async getAdmin(): Promise<any>{
    return this.Http.get('/api/auth/validate', {responseType: 'json'}).toPromise().then(data => {
      let adminValue = data as JSONObject;
      // @ts-ignore
      if (!adminValue.data.admin){
        return;
      }
      // @ts-ignore
      adminValue = adminValue.data.admin;
      // @ts-ignore
      this.bool = adminValue;
    });
  }
  // Determines whether or not to show Configurations nav element depending on value stored in this.bool
  isAdmin(): boolean{
    return this.bool;
  }

  async authenticate(username: string, password: string): Promise<void> {
    const login = await new Promise<void>((resolve, reject) => {
      this.Http.post('/api/auth/authenticate', {username , password}, {responseType: 'text'})
        .toPromise()
        .then(value => {
          localStorage.setItem('auth-token', value);
          return resolve();
        }, reject);
    });
    // Check if User is Admin after authenticating login
    await this.getAdmin();
    return login;
  }

  async register(username: string, password: string, adminAccount: boolean): Promise<void> {
    const register = await new Promise<void>((resolve, reject) => {
      this.Http.post('/api/auth/register', {username , password, adminAccount}, {responseType: 'text'})
        .toPromise()
        .then(value => {
          localStorage.setItem('auth-token', value);
          return resolve();
        }, reject);
    });
    // Check if User is Admin after they have been registered
    await this.getAdmin();
    return register;
  }
}
