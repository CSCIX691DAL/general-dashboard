import { TestBed } from '@angular/core/testing';

import { AuthTokenInterceptor } from './auth-token.interceptor';

import { MockAuthService } from './mock-auth.service';
import { AuthService } from './auth.service';

describe('AuthTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthTokenInterceptor,
	  { provide: AuthService, useClass: MockAuthService }
	]
  }));

  it('should be created', () => {
    const interceptor: AuthTokenInterceptor = TestBed.inject(AuthTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
