import { GroupListComponent } from './entities/group/group-list.component';
import { PersonListComponent } from './entities/person/person-list.component';
import { Routes, CanActivate } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { OrganizationListComponent } from './entities/organization/organization-list.component';
import { PersonDetailComponent } from './entities/person/person-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { AddComponent } from './pages/add/add.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'person', pathMatch: 'full' },
      { path: 'person', component: PersonListComponent },
      { path: 'patient', component: PersonListComponent },
      { path: 'group', component: GroupListComponent },
      { path: 'organization', component: OrganizationListComponent },
      { path: 'careteam', component: PersonListComponent },
    ]
  },
  { path: 'add', component: AddComponent },

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
