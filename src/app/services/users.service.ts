import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Employee} from '../../models/employee';
import {DatabaseService} from './database-connection.service';
import {Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// TODO: move other user endpoints here
export class UsersService {
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient, private conn: DatabaseService) { }

  public async deleteUser(email: string): Promise<any>{
    return new Promise<any>((resolve, reject) => this.http.delete('/api/users/' + email,
      {
        headers: this.header,
      }).subscribe(reports => {
      resolve(reports);
    }));
  }

  public getUserGeneratedReport(userId: string, reportId: string, dbConnId: string): Promise<any[]> {
    const empReport = [];
    return new Promise<any>((resolve, reject) => this.conn.getUserGeneratedReport(userId, reportId, dbConnId)
      .subscribe(data => {
        console.log(data);
        for (const item of data) {
          const itemAttr = [];
          for (const key in item){
            // console.log('key: ' + key + '\t' + item[key]);
            itemAttr.push(item[key]);
          }
          empReport.push(new Employee(itemAttr));
        }
        resolve(data);
      }));
  }
}
