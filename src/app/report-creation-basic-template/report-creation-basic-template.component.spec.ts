import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCreationBasicTemplateComponent } from './report-creation-basic-template.component';

describe('ReportCreationBasicTemplateComponent', () => {
  let component: ReportCreationBasicTemplateComponent;
  let fixture: ComponentFixture<ReportCreationBasicTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCreationBasicTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCreationBasicTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
