import { TestBed } from '@angular/core/testing';

import { ReportsService } from './reports.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ReportsService', () => {
  let service: ReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]

    });
    service = TestBed.inject(ReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
