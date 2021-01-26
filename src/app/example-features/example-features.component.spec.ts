import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleFeaturesComponent } from './example-features.component';

describe('ExampleFeaturesComponent', () => {
  let component: ExampleFeaturesComponent;
  let fixture: ComponentFixture<ExampleFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleFeaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
