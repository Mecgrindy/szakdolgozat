import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { CdkTableModule } from '@angular/cdk/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { appRoutes } from './app.routes';
import { TRANSLATION_PROVIDERS, TranslateService } from './translate';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { GroupListComponent } from './entities/group/group-list.component';
import { LoginComponent } from './pages/login/login.component';
import { AddComponent } from './pages/add/add.component';
import { TranslatePipe } from './translate/translate.pipe';
import { ManagementComponent } from './pages/management/management.component';
import { PermissionsComponent } from './pages/permissions/permissions.component';
import { RolesComponent } from './pages/roles/roles.component';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';
import { PersonDetailComponent } from './entities/person/person-detail.component';
import { DeleteDialogComponent } from './modals/modals';
import { OrganizationListComponent } from './entities/organization/organization-list.component';
import { PersonTableComponent } from './entities/person/person-table.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MainComponent } from './main/main.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
})
export class MyMaterialModule { }

@NgModule({
  declarations: [
    AppComponent, NotFoundComponent, HomeComponent, PersonTableComponent, GroupListComponent, OrganizationListComponent,
    DeleteDialogComponent, PersonDetailComponent, ClickStopPropagationDirective,
    LoginComponent, AddComponent, TranslatePipe, ManagementComponent,
    RolesComponent, PermissionsComponent, MainComponent, ToolbarComponent, SidenavComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MyMaterialModule, ReactiveFormsModule, FormsModule, HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
    ), MatDialogModule
  ],
  entryComponents: [
    DeleteDialogComponent
  ],
  providers: [TRANSLATION_PROVIDERS, TranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
