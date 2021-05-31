import { TestBed } from '@angular/core/testing';

import { SequelizeService } from './sequelize.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('SequelizeService', () => {
  let service: SequelizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]

    });
    service = TestBed.inject(SequelizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
