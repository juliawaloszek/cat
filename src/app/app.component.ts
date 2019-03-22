import {AfterViewInit, Component, HostListener, ViewChild} from '@angular/core';
import {ApplicationsService} from './service/applications.service';
import {MatSidenav, MatSidenavContainer} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @ViewChild('sidenavMenu') sidenav: MatSidenav;
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

  constructor(private applicationsService: ApplicationsService) {
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
