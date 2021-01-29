import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router} from '@angular/router';
import { DebugElement } from '@angular/core';
import { Location } from '@angular/common';

import { routes } from './app-routing.module';

import { AppComponent } from './app.component';


describe('GeneralDashboard Routings', () => {
  let router: Router;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        AppComponent,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(AppComponent);
    debugElement = fixture.debugElement;

    router.initialNavigation();
  });

  it('should test redirection to default path (async)', () => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/home');
    });

  });

  it('should test component navigating from home to login', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    router.navigate(['login']);
    tick();
    expect(location.path()).toBe('/login');
  }));

  it('should test component navigating to registration', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    router.navigate(['registration']);
    tick();
    expect(location.path()).toBe('/registration');
  }));

});


