import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChartComponent } from './chart/chart.component';
import { AppDescComponent } from './app-desc/app-desc.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { EmployeesService } from './services/employees.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth.service';
import { AuthTokenInterceptor } from './auth-token.interceptor';
import { ChartsModule } from 'ng2-charts';
import { AdminUsersPageComponent } from './admin-users-page/admin-users-page.component';
import { AdminDatabasesPageComponent } from './admin-databases-page/admin-databases-page.component';
import { ReportCreationComponent } from './report-creation/report-creation.component';
import { ReportCreationBasicTemplateComponent } from './report-creation-basic-template/report-creation-basic-template.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { VERSION } from '@angular/core';

console.log(VERSION.full);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AppDescComponent,
    RegistrationComponent,
    HomeComponent,
    LoginComponent,
    UserhomeComponent,
    ChartComponent,
    AdminUsersPageComponent,
    AdminDatabasesPageComponent,
    ReportCreationComponent,
    ReportCreationBasicTemplateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    ChartsModule,
    NgMultiSelectDropDownModule.forRoot(),
    AngularMultiSelectModule,
  ],
  providers: [
    EmployeesService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
