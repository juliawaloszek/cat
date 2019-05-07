import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import { ApplicationsService } from './service/applications.service';
import { MatSidenav, MatSidenavContainer } from '@angular/material';
import { UserService } from './service/user.service';
import { User } from './service/class/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  @ViewChild('sidenavMenu') sidenav: MatSidenav;
  private activeUser: User;
  // @ViewChild('MatSidenavContainer') container: MatSidenavContainer;

  linksList = [{
    name: 'Strona Główna',
    iconClass: 'appmenu-icon',
    link: '/'
  }, {
    type: 'application',
    name: 'Aplikacje',
    iconClass: 'appmenu-icon',
    link: '/application'
  }, {
    type: 'configuration',
    name: 'Konfiguracja',
    iconClass: 'sidenav-icon',
    // link: '/configuration'
  }];
  title = 'CAT';
  logged = false;

  constructor(
    private applicationsService: ApplicationsService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.activeUser.subscribe(user => {
      if (user.hasOwnProperty('name')) {
        this.activeUser = user;
        this.logged = true;
      } else {
        this.logged = false;
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.sidenav.close();
  }

  onLoggingButtonClick(): void {
    this.logged = !this.logged;
  }
}
