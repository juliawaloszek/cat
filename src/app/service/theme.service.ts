import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export enum Themes {
  LIGHT = 'light-theme',
  DARK = 'dark-theme',
  UNICORN = 'unicorn-theme',
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  defaultTheme = Themes.LIGHT;
  theme = Themes.LIGHT;
  themeSource = new BehaviorSubject<any>(this.theme);
  theme$ = this.themeSource.asObservable();


  constructor() { }

  setTheme(themeName: string) {

    this.theme = Themes[themeName];
    console.log(this.theme);

    // this.theme = this.themes[this.themes.findIndex(theme => {
    //   return name === theme.name;
    //     })];
    //     this.setHighchartTheme();
    //     localStorage.setItem('theme', JSON.stringify(this.theme));

  //   for (var enumMember in myEnum) {
  //     var isValueProperty = parseInt(enumMember, 10) >= 0
  //     if (isValueProperty) {
  //        console.log("enum member: ", myEnum[enumMember]);
  //     }
  //  }
  }

  getTheme() {
    console.log(this.theme);
    return this.theme;
  }

}
