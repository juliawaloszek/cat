import {Component, HostListener, OnInit, ViewChild, HostBinding} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { UserService } from './service/user.service';
import { User } from './service/model/user';
import {Observable} from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SettingsComponent } from './content/settings/settings.component';

@Component({
  // selector: 'body', //https://stackoverflow.com/questions/34430666/angular-2-x-bind-class-on-body-tag
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(private userService: UserService,
              private overlayContainer: OverlayContainer) {
  }
  @ViewChild('sidenavMenu') sidenav: MatSidenav;
  private activeUser$: Observable<User>;

  @HostBinding('class.custom-light-theme')
  LightThemeClass = true;

  @HostBinding('class.custom-black-theme')
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
  theme = 'custom-light-theme';

  @ViewChild(SettingsComponent) child;
  message: string;

// tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit() {
    this.message = this.child.message;
  }

  ngOnInit() {
    // this.activeUser$ = this.userService.active();
    this.userService.active().subscribe();
    // this.eventsService.getEvents().subscribe(events => this.events = events);
    console.log(this.activeUser$);
    this.updateThemeOverlay();
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

  onThemeChange() {
    if (this.theme === 'custom-light-theme') {
      this.LightThemeClass = true;
      this.DarkThemeClass = false;
    }

    if (this.theme === 'custom-black-theme') {
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

  themeComponent() {
    console.log();
  }
}
