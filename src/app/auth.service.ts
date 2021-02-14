import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private Http: HttpClient) { }

  // tslint:disable-next-line:ban-types
  Authenticate(username: string, password: string): Observable<Object> {
    return this.Http.post('/api/auth/authenticate', {username , password} );
  }
}
