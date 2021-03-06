import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { UserGeneratedReport } from '../../models/userGeneratedReport';
import {Employee} from '../../models/employee';
import {DatabaseService} from './database-connection.service';
import {Observable, Subscription} from 'rxjs';
import {Parameter} from '../../models/report';

@Injectable({
  providedIn: 'root'
})
// TODO: move other user endpoints here
export class UsersService {
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
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


  executeUserGeneratedReportRaw(reportId: string): Observable<any>{
    return this.http.get('/api/users/execute?reportId=' + reportId);
  }

  public async executeUserGeneratedReport(reportId: string): Promise<any[]> {
    return this.executeUserGeneratedReportRaw(reportId).toPromise();
  }

  getUserGeneratedReportsByUserIdRaw(): Observable<any>{
    return this.http.get('/api/userGeneratedReports/getReportsByUserId');
  }

  public async getUserGeneratedReportsByUserId(): Promise<any[]> {
    const empReport = [];
    return new Promise<any[]>((resolve, reject) => this.getUserGeneratedReportsByUserIdRaw()
      .subscribe(data => {
        for (const item of data) {
          const itemAttr = [];
          // tslint:disable-next-line:forin
          for (const key in item) {
            // console.log('key: ' + key + '\t' + item[key]);
            itemAttr.push(item[key]);
          }
          empReport.push(new Employee(itemAttr));
        }
        resolve(data);
      }));
  }


  public createUserReport(reportID: number, inputParamsValues: string, selectedChartType: string): Promise<any>{
    return this.http.post(
      '/api/userGeneratedReports/create',
      {
        headers: this.header,
        body: {
          report_id_fk: reportID,
          input_params_values: inputParamsValues,
          chart_type: selectedChartType
        }
      }
    ).toPromise();
  }

  public updateIsActive(userGeneratedReportID: number, isActive: number): Promise<any>{
    return this.http.put(
      '/api/userGeneratedReports/' + userGeneratedReportID + '/update',
      {
        headers: this.header,
        body: {
          isActive

        }
      }
    ).toPromise();
  }

  public async deleteUserReport(reportID : number): Promise<any> {
     return new Promise<any>((resolve, reject) => this.http.delete('/api/userGeneratedReports/'
     + reportID, {headers: this.header,}).subscribe(reports => {
     resolve(reports);
    }));
  }
}
