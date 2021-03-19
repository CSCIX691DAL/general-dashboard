import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Parameter, Report} from '../../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

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

  public createReport(report: Report): Observable<any>{
    throw new Error('not implemented');
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
