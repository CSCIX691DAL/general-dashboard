import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetSidebarComponent } from './widget-sidebar.component';

describe('WidgetSidebarComponent', () => {
  let component: WidgetSidebarComponent;
  let fixture: ComponentFixture<WidgetSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
