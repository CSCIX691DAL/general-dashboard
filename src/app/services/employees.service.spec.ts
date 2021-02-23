import { TestBed } from '@angular/core/testing';

import { EmployeesService } from './employees.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EmployeesService', () => {
  let service: EmployeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EmployeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
