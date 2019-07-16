import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { debug } from 'util';


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

  constructor( private cookieService: CookieService,
               private overlayContainer: OverlayContainer ) { }

  setTheme(id: string) {
    const themeClassName = THEMES_DATA.filter(theme => theme.className === id)[0].className;
    this.themeSource.next(themeClassName);
    this.cookieService.set(this.cookieName, themeClassName, 365);
    ACTIVE_THEME = themeClassName;
  }


  getThemes(): Array<any> {
      return THEMES_DATA;
  }

  initialTheme(): Array<any> {
    if (!this.cookieService.check(this.cookieName)) {
      this.cookieService.set(this.cookieName, this.theme, 365);
    } else {
      this.cookieService.get(this.cookieName);
      this.setTheme(this.cookieService.get(this.cookieName));
    }
    return THEMES_DATA;
  }

  getActiveTheme() {
    return ACTIVE_THEME;
  }

  updateThemeOverlay() {
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
    if (themeClassesToRemove.length) {
         overlayContainerClasses.remove(...themeClassesToRemove);
      }
    overlayContainerClasses.add(this.themeSource.value);
  }

}
