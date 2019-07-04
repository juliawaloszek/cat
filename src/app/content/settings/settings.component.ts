import { Component, OnInit, Output, EventEmitter, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/service/model/user';
import { UserService } from 'src/app/service/user.service';
import { CookiesService } from 'src/app/service/cookies.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  overlayContainer: any;


  constructor( private userService: UserService,
               private cookiesService: CookiesService,
               private cookieService: CookieService ) { }
  // activeUser$: Observable<User>;
  user: User;

  @HostBinding('class.custom-light-theme')
  LightThemeClass = true;

  @HostBinding('class.custom-black-theme')
  DarkThemeClass = false;

  theme = 'custom-light-theme';



  ngOnInit() {
    this.userService.active()
    .subscribe(user => {
      console.log(user); // Example
      this.user = user;
    }, err => {
      throw err;
    });
  }


// swich
  onThemeChange() {
    if (this.theme === 'custom-light-theme') {
      this.LightThemeClass = true;
      this.DarkThemeClass = false;
      // this.cookiesService.setCookie('Theme', 'custom-light-theme');
      this.cookieService.set( 'Theme', 'custom-light-theme' , 365);
      console.log(this.cookieService.get('Theme'));
      console.log('custom-light-theme ');
    }

    if (this.theme === 'custom-black-theme') {
      this.LightThemeClass = false;
      this.DarkThemeClass = true;
      // this.cookiesService.setCookie('Theme', 'custom-dark-theme');
      this.cookieService.set( 'Theme', 'custom-black-theme' , 365);
      console.log(this.cookieService.get('Theme'));
      console.log('custom-black-theme');
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


}
