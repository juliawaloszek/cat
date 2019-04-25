import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import { ApplicationsService } from './service/applications.service';
import { MatSidenav, MatSidenavContainer } from '@angular/material';
import { ActiveUserService } from './service/activeuser.service';
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
  logged = true;

  constructor(
    private applicationsService: ApplicationsService,
    private activeUserService: ActiveUserService
  ) {}

  ngOnInit() {
    this.activeUserService.user.subscribe(user => {
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

  // ngAfterViewInit(): void {
  //   this.container.scrollable.elementScrolled().subscribe(() => {});
  // }

  onLoggingButtonClick(): void {
    this.logged = !this.logged;
  }
}
