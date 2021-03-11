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
  // Returns the Admin credentials currently in localStorage of the User
  getAdminStorage(): string{
    return localStorage.getItem('isAdmin');
  }
  // Determines whether or not this User is an Admin - used to display/not display Configurations in navbar
  isAdmin(): boolean{
    return this.getAdminStorage() === 'true';
  }

  /**
   * @desc returns true or false depending on if this User is registered as an Admin in the database
   * @param adminUsername - The username being checked against the database to determine if User is an Admin
   */
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
    const login = await new Promise<void>((resolve, reject) => {
      this.Http.post('/api/auth/authenticate', {username , password}, {responseType: 'text'})
        .toPromise()
        .then(value => {
          localStorage.setItem('auth-token', value);
          return resolve();
        }, reject);
    });
    // Check if User is Admin after authenticating login
    this.getAdmin(username);
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
    this.getAdmin(username);
    return register;
  }
}
