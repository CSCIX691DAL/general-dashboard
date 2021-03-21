import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCreationComponent } from './report-creation.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ReportCreationComponent', () => {
  let component: ReportCreationComponent;
  let fixture: ComponentFixture<ReportCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ ReportCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
