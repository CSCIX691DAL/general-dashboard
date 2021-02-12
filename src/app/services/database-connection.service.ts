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

  uri = 'https://general-dashboard-api.herokuapp.com';

  header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  createUser(id: string, password: string ): Observable<any>{
    return this.http.request('post',
       this.uri + '/user',
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
    console.log(this.uri + '/users');
    return this.http.get(this.uri + '/users');
  }

  getUser(user: String): Observable<any>{
    return this.http.get(this.uri + '/users/' + user);
  }

  deleteUser(user: String): Observable<any>{
    return this.http.request('delete',
      this.uri + '/users/' + user,
      {
        headers: this.header,
        body:{
          user: user
        }
      }
      );
  }

  getAllEmployees(): Observable<any>{
    return this.http.get(this.uri + '/employees/getAllEmployees');
  }

  getEmployeesGender(): Observable<any>{
    return this.http.get(this.uri + '/employees/countByGender');
  }
}
