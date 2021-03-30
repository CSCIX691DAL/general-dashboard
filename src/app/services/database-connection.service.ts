import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { User } from '../../models/users';
import { UserGeneratedReport } from '../../models/userGeneratedReport';
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

  public async getUsers(): Promise<User[]>{
    return new Promise<User[]>((resolve, reject) => this.http.get<User[]>('/api/users/getAllUsers').subscribe(reports => {
      resolve(reports);
    }));
  }

  getUser(user: string): Observable<any>{
    return this.http.get('/api/users/' + user);
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

  getUserGeneratedReport(userId: string, reportId: string, dbConnId: string): Observable<any>{
    return this.http.get('/api/users/' + userId + '/execute?reportId=' + reportId + '&dbConnId=' + dbConnId);
  }

  public async getUserRecords(): Promise<UserGeneratedReport[]> {
    return new Promise<UserGeneratedReport[]>((resolve, reject) => this.http.get<UserGeneratedReport[]>('/api/user_generated_reports/generatedReports').subscribe(reports => {
      resolve(reports);
    }));
  }
    getDatabaseConnections(): Promise<Database[]>{
      return this.http.get<Database[]>('/api/databases').toPromise();

    }
}
