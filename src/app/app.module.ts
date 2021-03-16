import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ExampleFeaturesComponent } from './example-features/example-features.component';
import {ChartComponent} from './chart/chart.component';
import { AppDescComponent } from './app-desc/app-desc.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserhomeComponent } from './userhome/userhome.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { EmployeesService } from './services/employees.service';
import { ModalBasicComponent } from './modal-basic/modal-basic.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from './auth.service';
import {AuthTokenInterceptor} from './auth-token.interceptor';
import { ChartsModule } from 'ng2-charts';
import { AdminReportPageComponent } from './admin-report-page/admin-report-page.component';
import { AdminUsersPageComponent } from './admin-users-page/admin-users-page.component';
import { AdminDatabasesPageComponent } from './admin-databases-page/admin-databases-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ExampleFeaturesComponent,
    AppDescComponent,
    RegistrationComponent,
    HomeComponent,
    LoginComponent,
    UserhomeComponent,
    ModalBasicComponent,
    ChartComponent,
    AdminReportPageComponent,
    AdminUsersPageComponent,
    AdminDatabasesPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    ChartsModule
  ],
  providers: [EmployeesService, AuthService, {provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
