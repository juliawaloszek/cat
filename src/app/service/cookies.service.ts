import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

enum themeEnum {
  light = 'custom-light-theme',
  dark = 'custom-dark-theme',
  lala1 = 'custom-lala1-theme',
  lala2 = 'custom-lala2-theme',
}


@Injectable({
  providedIn: 'root'
})
export class CookiesService {


  defaultValue = 'custom-light-theme';

constructor( private cookieService: CookieService ) { }

// setCookie( cookieName, cookieValue?) {
//   // const cookieExists: boolean = this.cookieService.check( cookieName );
//   // console.log(cookieValue);

//   if (!this.cookieService.check( 'cookieName' ) && !cookieValue) {
//     this.cookieService.set( cookieName , this.defaultValue , 365);
//     this.getCookie(cookieName);
//     console.log('domyślne ciastko');
//   } else {
//     this.cookieService.set( cookieName , cookieValue , 365);
//     this.getCookie(cookieName);
//   }
// }

setCookie( cookieName, cookieValue) {
  // const cookieExists: boolean = this.cookieService.check( cookieName );
  // console.log(cookieValue);

  if (!this.cookieService.check( cookieName ) && !cookieValue) {
    this.cookieService.set( cookieName , this.defaultValue , 365);
    this.getCookie(cookieName);
    console.log('domyślne ciastko');
  } else {
    this.cookieService.set( cookieName , cookieValue , 365);
    this.getCookie(cookieName);
  }
}

getCookie(cookieName) {
    console.log(this.cookieService.get(cookieName));
    return (this.cookieService.get(cookieName));
}

}
// this.cookieService.set( cookieName , this.defaultValue , 365);
// console.log(this.cookieService.get(cookieName));

// import { Injectable } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';

// // enum themeEnum {
// //   light = 'custom-light-theme',
// //   dark = 'custom-dark-theme',
// //   lala1 = 'custom-lala1-theme',
// //   lala2 = 'custom-lala2-theme',
// // }

// @Injectable({
//   providedIn: 'root'
// })
// export class CookiesService {

//   cookieValue = 'UNKNOWN';
//   defaultValue = 'custom-light-theme';

//   onstructor( private cookieService: CookieService ); { }

// setCookie( cookieName, cookieValue ?    ); {
//   // const cookieExists: boolean = this.cookieService.check( cookieName );
//   console.log(cookieValue);

//   if (!this.cookieService.check( cookieName ) && !!cookieValue) {
//     this.cookieService.set( cookieName , this.defaultValue , 365);
//     this.getCookie(cookieName);
//     console.log('domyślne ciastko');
//   } else {
//     this.cookieService.set( cookieName , cookieValue , 365);
//     this.getCookie(cookieName);
//   }
// }

// getCookie(cookieName); {
//     this.cookieValue = this.cookieService.get(cookieName);
//     console.log('getCookie');
//     console.log(this.cookieValue);
//     // return(this.cookieValue);
// }

// }
