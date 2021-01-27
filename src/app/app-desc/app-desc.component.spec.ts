import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDescComponent } from './app-desc.component';

describe('AppDescComponent', () => {
  let component: AppDescComponent;
  let fixture: ComponentFixture<AppDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDescComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
