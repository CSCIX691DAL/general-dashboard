import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/*
  URLs for http requests are prefixed with the type of request they are.
  E.G:
    GET requests are /gets/<RESOURCE>
    POST requests are /posts/<RESOURCE>

  This is to get around CORS Policy blocking when we try to redirect to another domain directly,
  so we send the request through a proxy
 */
export class DatabaseService {

  header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  createUser(id: string, password: string ): Observable<any>{

    return this.http.request('post',
       '/api/user',
       {
         headers: this.header,
         body: {
           ID: id,
           Password: password
         }
       }
      );
  }

  getUsers(): Observable<any>{
    return this.http.get('/api/users');
  }

  getUser(user: String): Observable<any>{
    return this.http.get('/api/users/' + user);
  }

  deleteUser(user: String): Observable<any>{
    return this.http.request('delete',
      '/api/users/' + user,
      {
        headers: this.header,
        body:{
          user: user
        }
      }
      );
  }

  getAllEmployees(): Observable<any>{
    return this.http.get('/api/employees/getAllEmployees');
  }

  getEmployeesGender(): Observable<any>{
    return this.http.get('/api/employees/countByGender');
  }

  readHomepageJson(): Observable<any> {
    return this.http.get('/api/userRoute/homepageContentJson');
  }
}
