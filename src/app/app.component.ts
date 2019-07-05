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

  @HostBinding('class.light-theme')
  LightThemeClass = true;

  @HostBinding('class.dark-theme')
  DarkThemeClass = false;

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
  themesData = THEMES_DATA;
  // themesDataSelections = THEMES_DATA;
  // themeKeys = THEMES_DATA.[displayName];



  // values = Object.keys(this.themes);
  // values = Object.keys;

  keys = Object.keys;
  symbols = Themes;
  themeSelections = Themes;

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
    // console.log('this.theme$ ');
    // console.log(this.theme$ );
    console.log('test: ' + this.themesData);
    console.log(this.themesData);
    console.log(this.themesData.filter(theme => theme.id === 2));
    console.log((this.themesData.filter(theme => theme.id === 2)).toString());
    // var test = this.themesData.filter(theme => theme.id === 2)['name'];
    // console.log(test.);
    // console.log(Object.values(this.themesData.filter(theme => theme.id === 2)));

    // this.tempDATA = THEMES_DATA.filter(theme => theme.id === id);

    // this.themeService.theme$.subscribe(theme => this.theme2 = theme);
    // console.log(this.theme2 );
    // console.log(this.themes );

    // currentMessage.subscribe(message => this.message = message

    // this.findTheme(0);


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

  onThemeChange() {
    if (this.theme2 == 'light-theme') {
      this.LightThemeClass = true;
      this.DarkThemeClass = false;
    }

    if (this.theme2 == 'dark-theme') {
      this.LightThemeClass = false;
      this.DarkThemeClass = true;
    }
    console.log('this.THEME' + this.theme2);
    this.updateThemeOverlay();
  }

  onThemeChange3(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
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
  }

  findTheme(id) {

    this.tempDATA = THEMES_DATA.filter(theme => theme.id === id);
    console.log('this.tempDATA: ' + this.tempDATA );

  }


}
