import { CarePage } from './../careTeam/care';
import { GroupPage } from './../group/group';
import { OrganizationPage } from './../organization/organization';
import { PatientPage } from './../patient/patient';
import { PersonPage } from './../person/person';
import { Component } from '@angular/core';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PersonPage;
  tab2Root = PatientPage;
  tab3Root = OrganizationPage;
  tab4Root = GroupPage;
  tab5Root = CarePage;

  constructor() {

  }
}
