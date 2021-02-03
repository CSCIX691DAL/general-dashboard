import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ExampleFeaturesComponent } from './example-features/example-features.component';
import { AppDescComponent } from './app-desc/app-desc.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
<<<<<<< HEAD
import { ReactiveFormsModule} from '@angular/forms';
=======
import { UserhomeComponent } from './userhome/userhome.component';
import {RouterModule} from '@angular/router';
>>>>>>> a2948887b74a87501c05b118c59b802f2ba63b5b

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    ReactiveFormsModule
=======
    RouterModule
>>>>>>> a2948887b74a87501c05b118c59b802f2ba63b5b
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
