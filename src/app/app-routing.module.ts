import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import { UserhomeComponent } from './userhome/userhome.component';
import {GuestGuard} from './guest.guard';
import {LoggedInGuard} from './logged-in.guard';

export const routes: Routes = [
  { path: 'registration', component: RegistrationComponent, canActivate: [GuestGuard]},
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
  { path: 'userhome', component: UserhomeComponent, canActivate: [LoggedInGuard]},
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
