import { NewPage } from './../pages/new/new';
import { LoginPage } from './../pages/login/login';
import { InfoPage } from './../pages/info/info';
import { PatientPage } from './../pages/patient/patient';
import { OrganizationPage } from './../pages/organization/organization';
import { GroupPage } from './../pages/group/group';
import { CarePage } from './../pages/careTeam/care';
import { PersonPage } from './../pages/person/person';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    PersonPage,
    CarePage,
    GroupPage,
    OrganizationPage,
    PatientPage,
    InfoPage,
    TabsPage,
    LoginPage,
    NewPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PersonPage,
    CarePage,
    GroupPage,
    OrganizationPage,
    PatientPage,
    TabsPage,
    InfoPage,
    LoginPage,
    NewPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
