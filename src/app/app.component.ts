import {Component, HostListener, OnInit, ViewChild, HostBinding} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { UserService } from './service/user.service';
import { User } from './service/model/user';
import {Observable} from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SettingsComponent } from './content/settings/settings.component';
import { CookiesService } from './service/cookies.service';
import { CookieService } from 'ngx-cookie-service';
import { ThemeService, ThemesList } from './service/theme.service';

@Component({
  // selector: 'body', //https://stackoverflow.com/questions/34430666/angular-2-x-bind-class-on-body-tag
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(private userService: UserService,
              private overlayContainer: OverlayContainer,
              private cookiesService: CookiesService,
              private cookieService: CookieService,
              private themeService: ThemeService, ) {
  }
  @ViewChild('sidenavMenu') sidenav: MatSidenav;
  private activeUser$: Observable<User>;
  ThemesList = ThemesList;
  currentTheme: Observable<ThemesList>;



  // @HostBinding('class.custom-light-theme')
  // LightThemeClass = true;

  // @HostBinding('class.custom-black-theme')
  // DarkThemeClass = false;

  // isThemeDark: Observable<themeService.Theme>;


// ThemesList
  linksList = [{
    name: 'Strona Główna',
    iconClass: 'appmenu-icon',
    link: '/'
  }, {
    type: 'application',
    name: 'Aplikacje',
    iconClass: 'appmenu-icon',
    link: '/application',
    matIcon: 'web',
  }, {
    type: 'configuration',
    name: 'Konfiguracja',
    iconClass: 'sidenav-icon',
    matIcon: 'settings',
    link: '/configuration'
  }];
  title = 'CAT';
  logged = false;
  // theme = 'custom-light-theme';

  // @ViewChild(SettingsComponent) child;
  // message: string;


  ngOnInit() {
    // this.activeUser$ = this.userService.active();
    this.userService.active().subscribe();
    this.themeService.test();
    // this.eventsService.getEvents().subscribe(events => this.events = events);
    // console.log(this.activeUser$);

    this.currentTheme = this.themeService.currentTheme;

    // this.updateThemeOverlay();



    // this.cookiesService.setCookie('Theme', 'custom-light-theme');
    // this.cookieService.set( 'Theme', 'custom-light-theme' , 365);
    // console.log(this.cookieService.get('Theme'));



    // this.cookieService.set( 'Test', 'Hello World' );
    // this.cookieValue = this.cookieService.get('Test');
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.sidenav.close();
  }

  onLoggingButtonClick(): void {
    if (this.activeUser$) {
      this.activeUser$ = undefined;
    } else {
      // this.activeUser$ = this.userService.active();

    }
  }

  // onThemeChange() {
  //   if (this.theme === 'custom-light-theme') {
  //     this.LightThemeClass = true;
  //     this.DarkThemeClass = false;
  //   }

  //   if (this.theme === 'custom-black-theme') {
  //     this.LightThemeClass = false;
  //     this.DarkThemeClass = true;
  //   }

  //   this.updateThemeOverlay();
  // }

  // updateThemeOverlay() {
  //   const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
  //   const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
  //   if (themeClassesToRemove.length) {
  //        overlayContainerClasses.remove(...themeClassesToRemove);
  //     }
  //   overlayContainerClasses.add(this.theme);
  // }


  changeTheme(newTheme: ThemesList) {
    this.themeService.changeTheme(newTheme);
    console.log(newTheme);
  }

}
