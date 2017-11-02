import { InfoPage } from './../info/info';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-person',
  templateUrl: 'person.html'
})
export class PersonPage {

  constructor(public navCtrl: NavController) {

  }
  openPerson(){
    this.navCtrl.push(InfoPage);
  }
}
