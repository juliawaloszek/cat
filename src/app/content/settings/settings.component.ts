import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/service/model/user';
import { THEMES_DATA, ThemeService, ACTIVE_THEME } from 'src/app/service/theme.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user: User;
  themesElements: Array<any> = THEMES_DATA;
  themeActive = ACTIVE_THEME;
  selected = '0';
  editable = false;

  constructor(private userService: UserService,
              private themeService: ThemeService,
              private cookieService: CookieService) {
    this.themeService.theme$.subscribe(theme => {
      this.themeActive = theme;
    });
  }

  ngOnInit() {
    this.userService.active().subscribe(
      user => {
        this.user = user;
      },
      err => {
        throw err;
      });

    this.selected = this.themesElements
      .find(theme => theme.className === this.cookieService.get('THEME')).id.toString();
  }

  changeTheme($event) {
    const themeId = $event.source.value;
    const themeClassName = this.themesElements.find(theme => theme.id === themeId).className;
    this.themeService.setTheme(themeClassName);
  }

}
