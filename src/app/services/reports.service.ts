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

  public createReport(name: string,
                      displayName: string,
                      sql: string,
                      inputParamsJson: string,
                      modelName: string,
                      databaseID: number): Promise<any>{
    // const params = this.inputParamRevert(inputParams);
    return this.http.post(
      '/api/reports/create',
      {
        headers: this.header,
        body: {
          name,
          display_name: displayName,
          sql,
          input_params: inputParamsJson,
          model_name: modelName,
          database_connection_fk: databaseID
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

  public async readReportsForDatabase(databaseID: number): Promise<Report[]>{
    return new Promise<Report[]>((resolve, reject) => this.http.get<Report[]>('/api/reports/' + databaseID).subscribe(reports => {
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
