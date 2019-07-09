import {Component, HostListener, OnInit, ViewChild, Renderer2, HostBinding, Pipe, PipeTransform} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { UserService } from './service/user.service';
import { User } from './service/model/user';
import {Observable} from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { debug } from 'util';
import { ThemeService, Themes, THEMES_DATA } from './service/theme.service';

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

  // @HostBinding('class.light-theme')
  // LightThemeClass = true;

  // @HostBinding('class.dark-theme')
  // DarkThemeClass = false;

  @HostBinding('class')
  componentCssClass;

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
  theme2 = 'light-theme';
  // theme2 = '';

  themes = Themes;
  themesElements: any = THEMES_DATA;


  tempDATA: any;


  theme$: Observable<any>;

  constructor(private userService: UserService,
              private overlayContainer: OverlayContainer,
              private themeService: ThemeService,
              ) { }


  ngOnInit() {
    // debugger;
    this.activeUser$ = this.userService.active();
    this.updateThemeOverlay();
    // this.onThemeChange3('unicorn-theme');
    // this.themeService.theme$.subscribe();
    // this.theme$ = this.themeService.theme$;

    console.log(this.themesElements);
    console.log(this.themesElements.filter(theme => theme.id === 2)[0].displayName);



  }

//   ngAfterViewInit() {
//     this.themeService.theme$.subscribe(() => {
//         this.datagrid.resize();
//     });
// }

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

  // onThemeChange() {
  //   if (this.theme2 == 'light-theme') {
  //     this.LightThemeClass = true;
  //     this.DarkThemeClass = false;
  //   }

  //   if (this.theme2 == 'dark-theme') {
  //     this.LightThemeClass = false;
  //     this.DarkThemeClass = true;
  //   }
  //   console.log('this.THEME' + this.theme2);
  //   this.updateThemeOverlay();
  // }

  onThemeChange3(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    console.log('theme: ' + theme);
    console.log('theme2: ' + this.theme2);
    this.componentCssClass = theme;

    this.updateThemeOverlay();
  }

  updateThemeOverlay() {
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
    if (themeClassesToRemove.length) {
         overlayContainerClasses.remove(...themeClassesToRemove);
      }
    overlayContainerClasses.add(this.theme2);
  }

  test() {
    this.themeService.setTheme('DARK');
    console.log('test udany');
  }


  callType(value) {
    console.log(value);
    // console.log(this.themesElements.filter(theme => theme.id === 2)[0].displayName);
  }

  changeTEST($event) {
    const themeId = $event.source.value;
    let themeClassName;
    // console.log(event);
    console.log($event.source.value);
    themeClassName = this.themesElements.filter(theme => theme.id === themeId)[0].className;
    console.log(themeClassName);
    // console.log(event.source.value, event.source.selected);

    this.overlayContainer.getContainerElement().classList.add(themeClassName);
    console.log('theme: ' + themeClassName);

    this.componentCssClass = themeClassName;

    this.themeService.setTheme(themeClassName);

    this.updateThemeOverlay();
  }

}
