import { TestBed } from '@angular/core/testing';

import { ChartFactoryService } from './chart-factory.service';

describe('ChartFactoryService', () => {
  let service: ChartFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
