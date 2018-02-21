import { ProfilePage } from './../profile/profile';
import { SearchPage } from './../search/search';
import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AddPage } from '../add/add';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = AddPage;
  tab4Root = ProfilePage;

  constructor() {

  }
}
