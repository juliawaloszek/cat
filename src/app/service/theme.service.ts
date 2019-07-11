import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


export const THEMES_DATA: Array<any> = [
  {id: 0, name: 'LIGHT', className: 'light-theme', displayName: 'Jasne tło'},
  {id: 1, name: 'DARK', className: 'dark-theme', displayName: 'Ciemne tło'},
  {id: 2, name: 'TEST', className: 'test-theme', displayName: 'Test'}
];


export let ACTIVE_THEME: any = THEMES_DATA[0].className;

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  theme = ACTIVE_THEME;

  themeSource = new BehaviorSubject<any>(this.theme);
  theme$ = this.themeSource.asObservable();
  cookieName = 'THEME';


  constructor( private cookieService: CookieService, ) { }

  setTheme(themeName: string) {
    this.themeSource.next(themeName);
    console.log('SERVICE: ' + themeName);

    this.cookieService.set( this.cookieName , themeName, 365);

  }

  getThemes(): Array<any> {
      return THEMES_DATA;
  }

  initialTheme(): Array<any> {
    if (!this.cookieService.check( this.cookieName )) {
      console.log('Nie ma ciasteczka!');
      this.cookieService.set( this.cookieName , this.theme , 365);
    } else {
      console.log('om nom nom - COOKIES!');
      this.cookieService.get(this.cookieName);
      console.log(this.cookieService.get(this.cookieName));
      this.setTheme(this.cookieService.get(this.cookieName));
    }
    return THEMES_DATA;
  }

  getActiveTheme() {
    return ACTIVE_THEME;
  }


}

















// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Subject } from 'rxjs';
// import { CookieService } from 'ngx-cookie-service';


// export enum Themes {
//   LIGHT = 'light-theme',
//   DARK = 'dark-theme',
//   UNICORN = 'unicorn-theme',
// }

// export const THEMES_DATA: Array<any> = [
//   {id: 0, name: 'LIGHT', className: 'light-theme', displayName: 'Jasne tło'},
//   {id: 1, name: 'DARK', className: 'dark-theme', displayName: 'Ciemne tło'},
//   {id: 2, name: 'TEST', className: 'test-theme', displayName: 'Test'}
// ];

// export let ACTIVE_THEME: any = THEMES_DATA[0].className;

// @Injectable({
//   providedIn: 'root'
// })
// export class ThemeService {

//   // defaultTheme = Themes.LIGHT;
//   // theme = Themes.LIGHT;
//   // theme = Themes['light-theme'];
//   theme = ACTIVE_THEME;

//   themeSource = new BehaviorSubject<any>(this.theme);
//   theme$ = this.themeSource.asObservable();
//   cookieName = 'THEME';


//   constructor( private cookieService: CookieService, ) { }

//   setTheme(themeName: string) {
//     console.log('setTheme: Theme.Service: ', themeName);

//     ACTIVE_THEME = themeName;
//     // this.theme =
//     // const themeClassName = this.themesElements.filter(theme => theme.id === themeId)[0].className;
//     this.theme = themeName;
//     console.log(this.theme);

//     // this.cookieService.set( this.cookieName , themeName, 365);
//     this.themeSource.next(this.theme);

//     // if (!this.cookieService.check( this.cookieName )) {
//     //   this.cookieService.set( this.cookieName , this.theme , 365);
//     // }

//   }


//   getTheme() {
//     console.log(this.theme);
//     return this.theme;
//   }


//   // findTheme(id) {

//   //   this.tempDATA = THEMES_DATA.filter(theme => theme.id === id);
//   //   console.log('this.tempDATA: ' + this.tempDATA );

//   // }


// }
