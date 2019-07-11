import { Component, OnInit, HostBinding } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/service/model/user';
import { THEMES_DATA, ThemeService, ACTIVE_THEME } from 'src/app/service/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  // overlayContainer: any;
  // theme$: Observable<any>;
  // themesElements: any = THEMES_DATA;


  constructor( private userService: UserService,
               private cookieService: CookieService,
               private themeService: ThemeService,
              ) { }
  activeUser$: Observable<User>;
  user: User;
  themesElements: Array<any> = THEMES_DATA;
  themeActive = ACTIVE_THEME;

  ngOnInit() {
    this.userService.active()
    .subscribe(user => {
      console.log(user); // Example
      this.user = user;
    }, err => {
      throw err;
    });


    this.themeService.theme$.subscribe(theme => {
      this.themeActive = theme;
  });
  }


  changeTheme($event) {
    console.log('FUNC: Settings.Component');
    const themeId = $event.source.value;
    const themeClassName = this.themesElements.filter(theme => theme.id === themeId)[0].className;
    console.log('Ustaw theme na: ' + themeClassName);
    this.themeService.setTheme(themeClassName);
    // subject.next(Math.random());
  }


}
