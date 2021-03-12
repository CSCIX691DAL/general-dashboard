import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) {
  }

  public createReport(): Observable<any>{
    throw new Error('not implemented');
  }

  public readReport(): Observable<any>{
    throw new Error('not implemented');
  }

  public updateReport(): Observable<any>{
    throw new Error('not implemented');
  }

  public deleteReport(): Observable<any>{
    throw new Error('not implemented');
  }
}
