import { Component, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { UserService } from './service/user.service';
import { User } from './service/model/user';
import { Observable } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ACTIVE_THEME, ThemeService } from './service/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  @ViewChild('sidenavMenu') sidenav: MatSidenav;
  activeUser$: Observable<User>;

  @HostBinding('class')
  themeClass;

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
  }, {
    type: 'eligibility',
    name: 'Uprawnienia',
    iconClass: 'sidenav-icon',
    matIcon: 'settings',
    link: '/eligibility/users'
  }];
  title = 'CAT';
  logged = false;

  themeActive = ACTIVE_THEME;

  constructor(private userService: UserService,
              private overlayContainer: OverlayContainer,
              private themeService: ThemeService) { }

  ngOnInit() {
    this.activeUser$ = this.userService.active();
    this.themeService.theme$.subscribe(theme => {
        this.themeActive = theme;
        this.themeClass = theme;
        this.themeService.updateThemeOverlay();
    });
    this.themeService.initialTheme();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.sidenav.close();
  }

  onLoggingButtonClick(): void {
    if (this.activeUser$) {
      this.activeUser$ = undefined;
    } else {
      this.activeUser$ = this.userService.active();
    }
  }

  setTheme($event) {
    this.themeService.setTheme($event.source.value);
  }

}
