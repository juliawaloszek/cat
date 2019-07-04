import { Injectable, HostBinding } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

export enum ThemesList {
  light = 'light-theme',
  dark = 'dark-theme',
  unicorn = 'unicorn-theme',
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

constructor() { }

private theme: Subject<ThemesList> = new Subject<ThemesList>();
  currentTheme = this.theme.asObservable();

  setDarkTheme(currentTheme: ThemesList) {
    this.theme.next(currentTheme);
  }

  changeTheme(currentTheme: ThemesList) {
    this.theme.next(currentTheme);
  }

  test() {
    console.log('test');
  }


}
