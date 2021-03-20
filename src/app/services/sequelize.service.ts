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

  public getModels(): Observable<any>{
    return this.http.get('/api/sequelize/models');
  }

  public async getModel(model: string): Promise<any>{
    return this.http.get('/api/sequelize/models/' + model).toPromise();
  }

  public generateModels(): Observable<any>{
    return this.http.post('/api/sequelize/generate', {headers: this.header});
  }

}
