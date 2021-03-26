import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { stringify } from 'querystring';
import {Database} from '../../models/database';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  createUser(id: string, password: string, adminAccount: boolean): Observable<any>{

    return this.http.request('post',
       '/api/user',
       {
         headers: this.header,
         body: {
           ID: id,
           Password: password,
         }
       }
      );
  }

  getUsers(): Observable<any>{
    return this.http.get('/api/users');
  }

  getUser(user: string): Observable<any>{
    return this.http.get('/api/users/' + user);
  }

  deleteUser(user: string): Observable<any>{
    return this.http.request('delete',
      '/api/users/' + user,
      {
        headers: this.header,
        body: {
          user
        }
      }
      );
  }

  readHomepageJson(): Observable<any> {
    return this.http.get('/api/users/homepage');
  }


  updateHomepage(jsonString: string): Observable<any> {
    return this.http.put(
      '/api/users/homepage',
      {
        headers: this.header,
        body: {
          homepageContents: jsonString
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

  getEmployeesReport(sql: string): Observable<any>{
    console.log('SQL ' + sql);
    const result = escape(sql);
    const query = `?sql=${result}`;
    return this.http.get('/api/employees/execute' + query);
  }

  getDatabaseConnections(): Promise<Database[]>{
    return this.http.get<Database[]>('/api/databases').toPromise();
  }
}
