import { Injectable, Inject, EventEmitter } from '@angular/core';
import { TRANSLATIONS } from './translations'; // import our opaque token

@Injectable()
export class TranslateService {
  private _currentLang: string;
  private PLACEHOLDER = '%'; // our placeholder
  public onLangChanged: EventEmitter<string> = new EventEmitter<string>();
  private _defaultLang: string;
  private _fallback: boolean;

  public get currentLang() {
    return this._currentLang || this._defaultLang;
  }

  public setDefaultLang(lang: string) {
    this._defaultLang = lang; // set default lang
  }

  public enableFallback(enable: boolean) {
    this._fallback = enable; // enable or disable fallback language
  }

  // inject our translations
  constructor(@Inject(TRANSLATIONS) private _translations: any) {
  }

  public use(lang: string): void {
    // set current language
    this._currentLang = lang;
    this.onLangChanged.emit(lang);
  }

  private translate(key: string): string { // refactor our translate implementation
    const translation = key;

    // found in current language
    if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
      return this._translations[this.currentLang][key];
    }

    // fallback disabled
    if (!this._fallback) {
      return translation;
    }

    // found in default language
    if (this._translations[this._defaultLang] && this._translations[this._defaultLang][key]) {
      return this._translations[this._defaultLang][key];
    }

    // not found
    return translation;
  }

  public replace(word: string = '', words: string | string[] = '') {
    let translation: string = word;

    const values: string[] = [].concat(words);
    values.forEach((e, i) => {
      translation = translation.replace(this.PLACEHOLDER.concat(<any>i), e);
    });

    return translation;
  }

  public instant(key: string, words?: string | string[]) { // add optional parameter
    const translation: string = this.translate(key);

    if (!words) { return translation; }
    return this.replace(translation, words); // call replace function
  }

}