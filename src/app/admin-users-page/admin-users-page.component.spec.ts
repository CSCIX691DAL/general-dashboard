import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersPageComponent } from './admin-users-page.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('AdminUsersPageComponent', () => {
  let component: AdminUsersPageComponent;
  let fixture: ComponentFixture<AdminUsersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ AdminUsersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
