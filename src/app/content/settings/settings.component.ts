import { Component, OnInit, HostBinding } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/service/model/user';
import { THEMES_DATA, ThemeService } from 'src/app/service/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  overlayContainer: any;
  theme$: Observable<any>;
  themesElements: any = THEMES_DATA;


  constructor( private userService: UserService,
               private cookieService: CookieService,
               private themeService: ThemeService,
              ) { }
  // activeUser$: Observable<User>;
  user: User;

  @HostBinding('class.custom-light-theme')
  LightThemeClass = true;

  @HostBinding('class.custom-black-theme')
  DarkThemeClass = false;

  theme = 'custom-light-theme';



  ngOnInit() {
    this.userService.active()
    .subscribe(user => {
      console.log(user); // Example
      this.user = user;
    }, err => {
      throw err;
    });
  }


// swich
  onThemeChange() {
    if (this.theme === 'custom-light-theme') {
      this.LightThemeClass = true;
      this.DarkThemeClass = false;
      // this.cookiesService.setCookie('Theme', 'custom-light-theme');
      this.cookieService.set( 'Theme', 'custom-light-theme' , 365);
      console.log(this.cookieService.get('Theme'));
      console.log('custom-light-theme ');
    }

    if (this.theme === 'custom-black-theme') {
      this.LightThemeClass = false;
      this.DarkThemeClass = true;
      // this.cookiesService.setCookie('Theme', 'custom-dark-theme');
      this.cookieService.set( 'Theme', 'custom-black-theme' , 365);
      console.log(this.cookieService.get('Theme'));
      console.log('custom-black-theme');
    }

    this.updateThemeOverlay();
  }

  updateThemeOverlay() {
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
    if (themeClassesToRemove.length) {
         overlayContainerClasses.remove(...themeClassesToRemove);
      }
    overlayContainerClasses.add(this.theme);
  }

  changeTEST($event) {
    const themeId = $event.source.value;
    var themeClassName;
    // console.log(event);
    console.log($event.source.value);
    themeClassName = this.themesElements.filter(theme => theme.id === themeId)[0].className;
    console.log(themeClassName);
    // console.log(event.source.value, event.source.selected);

    this.overlayContainer.getContainerElement().classList.add(themeClassName);
    console.log('theme: ' + themeClassName);

    // this.componentCssClass = themeClassName;

    this.updateThemeOverlay();
  }

  changeTheme($event) {
    console.log('FUNC: Settings.Component');
    const themeId = $event.source.value;
    const themeClassName = this.themesElements.filter(theme => theme.id === themeId)[0].className;
    console.log('Ustaw theme na: ' + themeClassName);
    this.themeService.setTheme(themeClassName);
  }


}
