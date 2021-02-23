import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClient, HttpEvent, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

class Responder extends HttpHandler {
  constructor(private body: string, private status: number) { super(); }
  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return new Observable<HttpEvent<any>>(sub => {
      sub.next(new HttpResponse({body: this.body, status: this.status}));
      sub.complete();
    });
  }
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should return the token on ok', () => {
    service = new AuthService(new HttpClient(new Responder('{"token":"abc"}', 200)));
    service.authenticate('a', 'b').then(() => {
      expect(service.getToken() === '{"token":"abc"}').toBeTrue();
    });
  });
});
