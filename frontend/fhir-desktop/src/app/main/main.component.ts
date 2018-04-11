import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../translate';
import { SidenavService } from '../components/sidenav/sidenav.service';

@Component({
  selector: 'app-main',
  providers: [SidenavService],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public translatedText: string;
  public supportedLangs: any[];

  constructor(private _translate: TranslateService) { }

  ngOnInit() {
    this.supportedLangs = [
      { display: 'English', value: 'en' },
      { display: 'Magyar', value: 'hu' }
    ];

    this.subscribeToLangChanged();
    this._translate.setDefaultLang('en');
    this._translate.enableFallback(true);

    this.selectLang('en');
  }

  isCurrentLang(lang: string) {
    return lang === this._translate.currentLang;
  }

  selectLang(lang: string) {
    this._translate.use(lang);
  }

  refreshText() {
    this.translatedText = this._translate.instant('sing_in');
  }

  subscribeToLangChanged() {
    return this._translate.onLangChanged.subscribe(x => this.refreshText());
  }

}
