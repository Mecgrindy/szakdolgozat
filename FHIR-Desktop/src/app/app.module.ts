import { TranslatePipe } from './translate/translate.pipe';
import { TranslateService } from './translate/translate.service';
import { TRANSLATION_PROVIDERS } from './translate/translations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import {CdkTableModule} from '@angular/cdk/table';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import 'hammerjs';
import { RegistrationComponent } from './registration/registration.component';
import { NotFoundComponent } from './not-found/not-found.component';

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
export class MyMaterialModule {}

@NgModule({
  declarations: [
    AppComponent, LoginComponent, RegistrationComponent, NotFoundComponent, TranslatePipe
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MyMaterialModule,
    RouterModule.forRoot(
      appRoutes,
    ),
  ],
  providers: [TRANSLATION_PROVIDERS, TranslateService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
