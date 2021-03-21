import { TestBed } from '@angular/core/testing';

import { LoggedInGuard } from './logged-in.guard';

import { MockAuthService } from './mock-auth.service';
import { AuthService } from './auth.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('LoggedInGuard', () => {
  let guard: LoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
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
