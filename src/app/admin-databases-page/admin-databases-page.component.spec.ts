import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDatabasesPageComponent } from './admin-databases-page.component';

describe('AdminDatabasesPageComponent', () => {
  let component: AdminDatabasesPageComponent;
  let fixture: ComponentFixture<AdminDatabasesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDatabasesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDatabasesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
