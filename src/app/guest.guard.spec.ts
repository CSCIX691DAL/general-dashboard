import { TestBed } from '@angular/core/testing';

import { GuestGuard } from './guest.guard';

import { MockAuthService } from './mock-auth.service';
import { AuthService } from './auth.service';

describe('GuestGuard', () => {
  let guard: GuestGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [
	  { provide: AuthService, useClass: MockAuthService }
	]
	});
    guard = TestBed.inject(GuestGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
