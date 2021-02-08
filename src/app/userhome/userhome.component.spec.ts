import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserhomeComponent } from './userhome.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('UserhomeComponent', () => {
  let component: UserhomeComponent;
  let fixture: ComponentFixture<UserhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ UserhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
