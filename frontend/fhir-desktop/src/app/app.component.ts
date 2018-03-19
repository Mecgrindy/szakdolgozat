import { TranslateService } from './translate/translate.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public translatedText: string;
  public supportedLangs: any[];

  constructor(private _translate: TranslateService) { }

  ngOnInit() {
    // standing data
    this.supportedLangs = [
      { display: 'English', value: 'en' },
      { display: 'Magyar', value: 'hu' }
    ];

    this.subscribeToLangChanged();
    // set current langage
    this._translate.setDefaultLang('en'); // set English as default
    this._translate.enableFallback(true); // enable fallback

    this.selectLang('en');
  }

  isCurrentLang(lang: string) {
    // check if the selected lang is current lang
    return lang === this._translate.currentLang;
  }

  selectLang(lang: string) {
    // set current lang;
    this._translate.use(lang);
    // this.refreshText();
  }

  refreshText() {
    // refresh translation when language change
    this.translatedText = this._translate.instant('sing_in');
  }

  subscribeToLangChanged() {
    // refresh text
    // please unsubribe during destroy
    return this._translate.onLangChanged.subscribe(x => this.refreshText());
  }
}
