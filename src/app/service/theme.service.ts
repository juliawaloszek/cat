import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


export enum Themes {
  LIGHT = 'light-theme',
  DARK = 'dark-theme',
  UNICORN = 'unicorn-theme',
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  // defaultTheme = Themes.LIGHT;
  theme = Themes.LIGHT;

  themeSource = new BehaviorSubject<any>(this.theme);
  theme$ = this.themeSource.asObservable();
  cookieName = 'THEME';


  constructor( private cookieService: CookieService, ) { }

  setTheme(themeName: string) {

    this.theme = Themes[themeName];
    console.log(this.theme);

    this.cookieService.set( this.cookieName , themeName, 365);
    this.themeSource.next(this.theme);

    // if (!this.cookieService.check( this.cookieName )) {
    //   this.cookieService.set( this.cookieName , this.theme , 365);
    // }



  }

  getTheme() {
    console.log(this.theme);
    return this.theme;
  }

}
