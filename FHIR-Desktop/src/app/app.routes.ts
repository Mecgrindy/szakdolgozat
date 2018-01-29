import { Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },

  { path: '', redirectTo: 'registration', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },

  /*{
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: 'search', component: SearchComponent },
      { path: 'outlet', component: OutletComponent, canActivate: [RolesGuard] },
      { path: 'binding', component: BindingComponent },
      { path: 'audit', component: AuditComponent, canActivate: [RolesGuard] },
      { path: 'management', component: ManagementComponent, canActivate: [RolesGuard] },
      { path: 'reports', component: ReportsComponent, canActivate: [RolesGuard] },
      { path: '', redirectTo: 'search', pathMatch: 'full' },
    ]
  },*/
  /*
  { path: 'confirmtoken', component: NewPassComponent },*/
];
