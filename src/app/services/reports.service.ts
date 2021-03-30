import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Parameter, Report} from '../../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  constructor(private http: HttpClient) {
  }

  private parseParams(rawParams: string): Parameter[]{
    const json = JSON.parse(rawParams);
    const params: Parameter[] = [];
    json.params.forEach(data => {
      params.push({name: data.name, type: data.type});
    });
    return params;
  }

  public createReport(id: number, name: string, displayName: string, sql: string, inputParams: Parameter[]): Promise<any>{
    const params = this.inputParamRevert(inputParams);
    return this.http.post(
      '/api/reports/create',
      {
        headers: this.header,
        body: {
          ID: id,
          Name: name,
          Display_name: displayName,
          Input_params: params,
          Model_name: 'employees.js', // this will have to change from hardcode to user input via parameter from form, when implemented.
          Database_connection_fk: 2, // this will have to change from hardcode to user input via parameter from form, when implemented.
        }
      }
    ).toPromise();
  }
  public inputParamRevert(inputParamsValues: Parameter[]): string
  {
    return '{"params":' + JSON.stringify(inputParamsValues) + '}';
  }

  /**
   * Get all the reports in the database
   * Example:
   *   async test(): Promise<void>{
   *      const reports = await readReport();
   *   }
   */
  public async readReports(): Promise<Report[]>{
    return new Promise<Report[]>((resolve, reject) => this.http.get<Report[]>('/api/reports').subscribe(reports => {
      // need to parse the nested parameter array from string to json to a valid parameter object array
      reports.forEach(report => report.input_params = this.parseParams(report.input_params.toString()));
      resolve(reports);
    }));
  }

  public updateReport(): Observable<any>{
    throw new Error('not implemented');
  }

  public deleteReport(): Observable<any>{
    throw new Error('not implemented');
  }
}
