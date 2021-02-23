import { TestBed } from '@angular/core/testing';

import { LoggedInGuard } from './logged-in.guard';

import { MockAuthService } from './mock-auth.service';
import { AuthService } from './auth.service';

describe('LoggedInGuard', () => {
  let guard: LoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [
	  { provide: AuthService, useClass: MockAuthService }
	]
	});
    guard = TestBed.inject(LoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
