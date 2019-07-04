import {Component, HostListener, OnInit, ViewChild, Renderer2, HostBinding} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { UserService } from './service/user.service';
import { User } from './service/model/user';
import {Observable} from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { debug } from 'util';
import { ThemeService } from './service/theme.service';

@Component({
  // selector: 'body',
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  @ViewChild('sidenavMenu') sidenav: MatSidenav;
  private activeUser$: Observable<User>;
  themeClass: string;

  @HostBinding('class.light-theme')
  LightThemeClass = true;

  @HostBinding('class.dark-theme')
  DarkThemeClass = false;

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
  theme = 'light-theme';

  constructor(private userService: UserService,
              private overlayContainer: OverlayContainer,
              private themeService: ThemeService) {
  }

  ngOnInit() {
    this.activeUser$ = this.userService.active();
    this.updateThemeOverlay();
  }

  // ngOnDestroy() {
  //   this.renderer.removeClass(document.body, 'modal-open'); 
  // }

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

  onThemeChange() {
    if (this.theme === 'light-theme') {
      this.LightThemeClass = true;
      this.DarkThemeClass = false;
    }

    if (this.theme === 'dark-theme') {
      this.LightThemeClass = false;
      this.DarkThemeClass = true;
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

  test() {
    this.themeService.setTheme('DARK');
    console.log('test udany');
  }
}
