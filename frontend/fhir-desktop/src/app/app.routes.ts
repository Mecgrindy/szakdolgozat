import { Routes, CanActivate } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '**', component: NotFoundComponent },
  /*{ path: '', component: CoverComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'add', component: AddComponent },
  { path: 'profile', component: ProfileComponent },

  { path: '', redirectTo: '', pathMatch: 'full' },

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
