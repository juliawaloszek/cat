import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/service/model/user';
import { THEMES_DATA, ThemeService, ACTIVE_THEME } from 'src/app/service/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor( private userService: UserService,
               private themeService: ThemeService,
              ) { }
  activeUser$: Observable<User>;
  user: User;
  themesElements: Array<any> = THEMES_DATA;
  themeActive = ACTIVE_THEME;

  ngOnInit() {
    this.userService.active()
    .subscribe(user => {
      this.user = user;
    }, err => {
      throw err;
    });


    this.themeService.theme$.subscribe(theme => {
      this.themeActive = theme;
  });
  }

  changeTheme($event) {
    const themeId = $event.source.value;
    const themeClassName = this.themesElements.filter(theme => theme.id === themeId)[0].className;
    this.themeService.setTheme(themeClassName);
  }

}
