import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Parameter} from '../../models/report';

@Injectable({
  providedIn: 'root'
})
// TODO: move other user endpoints here
export class UsersService {
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) { }

  public async deleteUser(email: string): Promise<any>{
    return new Promise<any>((resolve, reject) => this.http.delete('/api/users/' + email,
      {
        headers: this.header,
      }).subscribe(reports => {
      resolve(reports);
    }));
  }
  public createUserReport(reportID: number, inputParamsValues: Parameter[]): Promise<any>{
    const params = this.inputParamRevert(inputParamsValues);
    return this.http.post(
      '/api/user_generated_reports/execute',
      {
        body: {
          report_id_fk: reportID,
          isActive: true,
          input_params_values: params
        }
      }
    ).toPromise();
  }
  public inputParamRevert(inputParamsValues: Parameter[]): string
  {
    return '{"params":' + JSON.stringify(inputParamsValues) + '}';
  }
}
