import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <h1> with "Login"', () => {
    const h1Element: HTMLElement = fixture.nativeElement;
    const h1 = h1Element.querySelector('h1');
    expect(h1.textContent).toEqual('Login');
  });

  it('should find the <label> for Username and Password)', () => {
    const labelDe: DebugElement = fixture.debugElement;
    const labelEl: HTMLElement = labelDe.nativeElement;

    expect(labelEl.querySelectorAll('label')[0].textContent).toEqual('Username');
    expect(labelEl.querySelectorAll('label')[1].textContent).toEqual('Password');
  });


  it('should find the <button> for Login)', () => {
    const buttonDe: DebugElement = fixture.debugElement;
    const buttonDeEl: HTMLElement = buttonDe.nativeElement;
    const button = buttonDeEl.querySelector('button');

    expect(button.textContent).toEqual('Log in');
  });

  it('should find <input> elements for Username and Password)', () => {
    const inputDe: DebugElement = fixture.debugElement;
    const inputDeEl: HTMLElement = inputDe.nativeElement;

    expect(inputDeEl.querySelector('#username').getAttribute('type')).toEqual['text'];
    expect(inputDeEl.querySelector('#username').getAttribute('placeholder')).toEqual('Enter Username:');

    expect(inputDeEl.querySelector('#password').getAttribute('type')).toEqual['text'];
    expect(inputDeEl.querySelector('#password').getAttribute('placeholder')).toEqual('Enter Password:');
  });
});
