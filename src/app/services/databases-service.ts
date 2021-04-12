import {Database} from '../../models/database';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

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

  public createDatabase(databaseObject: Database): Promise<any> {
    return this.http.post('/api/database_connections/databases',
      {
        headers: this.header,
        body: {
          host_name: databaseObject.host_name,
          port: databaseObject.port,
          username: databaseObject.username,
          password: databaseObject.password,
          schema: databaseObject.schema
        }
      }
    ).toPromise();
  }
}
