import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  linksList = [{
    name: 'Strona Główna',
    iconClass: 'appmenu-icon',
    link: '/'
  }, {
    name: 'Aplikacje',
    iconClass: 'appmenu-icon',
    link: '/application'
  }, {
    name: 'Konfiguracja',
    iconClass: 'sidenav-icon',
    // link: '/configuration'
  }];
  title = 'CAT';
  logged = true;
  activeApp = '';

  onLoggingButtonClick(): void {
    this.logged = !this.logged;
  }
}
