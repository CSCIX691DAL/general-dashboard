import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { GuestGuard } from './guest.guard';
import { LoggedInGuard } from './logged-in.guard';
import { AdminUsersPageComponent } from './admin-users-page/admin-users-page.component';
import { AdminDatabasesPageComponent } from './admin-databases-page/admin-databases-page.component';


export const routes: Routes = [
  {
    path: 'userhome',
    component: UserhomeComponent,
    canActivate: [LoggedInGuard],
  },
  { path: 'home', component: HomeComponent },
  { path: 'admin-users-page', component: AdminUsersPageComponent },
  { path: 'admin-databases-page', component: AdminDatabasesPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
