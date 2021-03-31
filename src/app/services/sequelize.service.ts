import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Report} from '../../models/report';
import {Observable, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SequelizeService {
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });

  constructor(private http: HttpClient) { }

  public getModels(databaseId: number): Promise<string[]>{
    return this.http.get<string[]>('/api/sequelize/' + databaseId + '/models').toPromise();
  }

  public async getModel(databaseId: number, model: string): Promise<any>{
    return this.http.get('/api/sequelize/' + databaseId + '/models/' + model).toPromise();
  }

  public generateModels(databaseId: number): Promise<any>{
    return this.http.post('/api/sequelize/' + databaseId + '/generate', {headers: this.header}).toPromise();
  }

  public executeReport(userId: number, reportId: number, dbID: number): void{
    // DO stuff
  }
}
