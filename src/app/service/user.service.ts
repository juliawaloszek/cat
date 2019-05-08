import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { isDevMode } from '@angular/core';

import { User } from './class/user';
import { Application } from './class/application';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private httpOptions = {
    withCredentials: true // necessary for dev version
  };
  private usersCache$: Observable<User[]>;
  private activeUserCache$: Observable<User>;
  private activeUserUrl;
  private url;

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.activeUserUrl = 'https://vm-kajko:8181/setup/user';
      this.url = 'https://vm-kajko:8181/setup/realms/iuip/users';
    } else {
      this.activeUserUrl = window.location.origin + '/setup/user';
      this.url = window.location.origin + '/setup/realms/iuip/users';
    }
  }

  get users(): Observable<User[]> {
    if (!this.usersCache$) {
      this.usersCache$ = this.http.get<User[]>(this.url, this.httpOptions).pipe(
        map(response => response = response.user),
        tap(response => {
          response = response.sort((u1: User, u2: User) => {
            return u1.name.full > u2.name.full;
          });
          console.log(response);
        }),
        catchError(this.handleError<User[]>('getUsers', []))
      ).pipe(
        shareReplay()
      );
    }
    return this.usersCache$;
  }

  get activeUser(): Observable<User> {
    if (!this.activeUserCache$) {
      this.activeUserCache$ = this.http.get<User>(this.activeUserUrl, this.httpOptions).pipe(
        tap(response => console.log(response)),
        // catchError(this.handleError<User>('getApplications', ''))
      ).pipe(
        shareReplay()
      );
    }
    return this.activeUserCache$;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('${operation} failed: ${error.message}');

      return of(result as T);
    };
  }

}
