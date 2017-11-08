import { EditPage } from './../edit/edit';
import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {
  defSelect: string = "basic";
  isAndroid: boolean = false;
  info: String;

  constructor(platform: Platform, public navCtrl: NavController) {
    this.isAndroid = platform.is('android');
    this.info = this.defSelect;
  }
  openEdit(){
    this.navCtrl.push(EditPage);
  }
}

