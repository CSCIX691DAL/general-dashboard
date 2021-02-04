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

  createUser(id: string, fName: string, lName: string, password: string ): Observable<any>{

    return this.http.request('post',
       '/posts/user',
       {
         headers: this.header,
         body: {
           ID: id,
           FirstName: fName,
           LastName: lName,
           Password: password
         }
       }
      );
  }

  getUsers(): Observable<any>{
    return this.http.get('/gets/users');
  }

  getUser(user: String): Observable<any>{
    return this.http.get('/gets/users/' + user);
  }

  deleteUser(user: String): Observable<any>{
    return this.http.request('delete',
      '/gets/users/' + user,
      {
        headers: this.header,
        body:{
          user: user
        }
      }
      );
  }
}